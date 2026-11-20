import { Router } from 'express';
import multer from 'multer';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const isPdfMime = file.mimetype && (file.mimetype.includes('pdf') || file.mimetype === 'application/octet-stream');
    const isPdfExt = file.originalname && file.originalname.toLowerCase().endsWith('.pdf');
    
    if (isPdfMime || isPdfExt) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: received mimetype "${file.mimetype}" for file "${file.originalname}". Only PDF files are allowed.`), false);
    }
  },
});

router.post('/parse', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err) {
      console.error('[Multer Upload Error]:', err.message || err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No resume file provided. Make sure to send a file under field name "resume".' });
    }

    try {
      const buffer = req.file.buffer;

      // Validate PDF Magic Bytes (%PDF-)
      const header = buffer.slice(0, 4).toString();
      if (header !== '%PDF') {
        console.error('[PDF Validation Error]: Buffer header is', header);
        return res.status(400).json({ error: 'Uploaded file is not a valid PDF document (missing %PDF header).' });
      }

      const pdfData = await pdfParse(buffer);
      const rawText = pdfData && pdfData.text ? pdfData.text.trim() : '';

      return res.json({ rawText });
    } catch (parseError) {
      console.error('[PDF Parse Error]:', parseError);
      return res.status(400).json({ error: `Could not parse PDF content: ${parseError.message || parseError}` });
    }
  });
});

export default router;
