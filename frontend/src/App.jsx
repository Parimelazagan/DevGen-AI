import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Create from './pages/Create';
import Review from './pages/Review';
import Projects from './pages/Projects';
import PublicPortfolio from './pages/PublicPortfolio';
import Ats from './pages/Ats';
import TemplatePicker from './pages/TemplatePicker';
import Preview from './pages/Preview';
import CaseStudy from './pages/CaseStudy';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create/review" element={<Review />} />
      <Route path="/create/projects" element={<Projects />} />
      <Route path="/create/case-study" element={<CaseStudy />} />
      <Route path="/create/template" element={<TemplatePicker />} />
      <Route path="/create/preview" element={<Preview />} />
      <Route path="/p/:slug" element={<PublicPortfolio />} />
      <Route path="/create/ats" element={<Ats />} />
    </Routes>
  );
}
