import { useNavigate } from 'react-router-dom';

export function Icon({ children, className = '' }) { return <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">{children}</span>; }

export function Brand() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/')} className="brand" aria-label="DevGen AI home"><span className="brand-mark">&gt;_</span>DevGen AI</button>;
}

export function AppNav({ active = '', compact = false }) {
  const navigate = useNavigate();
  const nav = [['projects', 'Projects', '/create/projects'], ['resume', 'Resume', '/create'], ['build', 'AI Build', '/create/review'], ['preview', 'Preview', '/create/preview']];
  return <header className="nav"><div className="page flex h-[76px] items-center justify-between gap-5"><Brand /><nav className="hidden items-center gap-8 md:flex">{nav.map(([id, label, path]) => <button key={id} onClick={() => (id === 'preview' ? null : navigate(path))} className={`${active === id ? 'text-black' : ''} nav-link`}>{label}</button>)}</nav>{compact ? <button className="text-xl" aria-label="Menu">☰</button> : <button onClick={() => navigate('/create')} className="btn btn-dark !px-5 !py-3">Get Started</button>}</div></header>;
}

export function FlowFrame({ children, active }) { return <div className="screen"><div className="screen-inner"><AppNav active={active} compact />{children}</div></div>; }

export const Arrow = () => <span className="text-xl leading-none">→</span>;
