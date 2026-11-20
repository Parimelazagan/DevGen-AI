import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioTemplate from '../components/PortfolioTemplate.jsx';

export default function PublicPortfolio() {
  const { slug } = useParams(); const [portfolio, setPortfolio] = useState(null); const [error, setError] = useState('');
  useEffect(() => { fetch(`http://localhost:5000/api/portfolios/${slug}`).then(async (res) => { const data = await res.json(); if (!res.ok) throw new Error(data.error); setPortfolio(data); }).catch((err) => setError(err.message)); }, [slug]);
  if (error) return <p className="max-w-3xl mx-auto p-8 text-red-700">{error}</p>;
  if (!portfolio) return <p className="max-w-3xl mx-auto p-8 text-gray-500">Loading portfolio...</p>;
  return <PortfolioTemplate data={portfolio.data} variant={portfolio.template} config={portfolio.config} />;
}
