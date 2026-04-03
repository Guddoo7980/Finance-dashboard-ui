import { MoonStar, SunMedium, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Header() {
  const { role, setRole, theme, setTheme } = useDashboard();

  return (
    <header className="topbar card">
      <div>
        <p className="eyebrow">Finance Dashboard UI</p>
        <h1>Finance Dashboard</h1>
      </div>

      <div className="topbar-actions">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
          <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
        </button>

        <div className="role-box">
          <ShieldCheck size={18} />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Role: Admin</option>
            <option value="viewer">Role: Viewer</option>
          </select>
        </div>

        <div className="avatar">Y</div>
      </div>
    </header>
  );
}
