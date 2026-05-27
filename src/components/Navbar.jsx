import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Send, ClipboardList, FileText, Settings, ShieldCheck, LogOut, Menu, X, Bell } from 'lucide-react';
import NotificationBell from './NotificationBell';
import logo from '../campuspay_logo.png';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;
  if (user.role === 'canteen_owner') return null;

  const handleLogout = () => { logout(); navigate('/login'); };

  const navLinks = [
    { path: '/dashboard',    label: 'Dashboard', icon: LayoutDashboard },
    { path: '/pay',          label: 'Pay',        icon: Send },
    { path: '/transactions', label: 'History',    icon: ClipboardList },
    { path: '/statement',    label: 'Statement',  icon: FileText },
    { path: '/settings',     label: 'Settings',   icon: Settings },
  ];

  if (user.role === 'admin') {
    navLinks.push(
      { path: '/admin-dashboard', label: 'Admin',  icon: ShieldCheck },
      { path: '/admin-manage',    label: 'Manage', icon: Settings },
    );
  }

  return (
    <>
      {/* ── DESKTOP Navbar ── */}
      <nav className="navbar desktop-nav">
        <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
          <img src={logo} alt="CampusPay" className="navbar-logo" />
        </div>
        <div className="navbar-links">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={15} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
        <div className="navbar-user">
          {user?.role === 'student' && <NotificationBell />}
          <span className="user-name">{user?.name?.split(' ')[0] || 'Student'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={14} /> <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE Top bar ── */}
      <nav className="navbar mobile-nav">
        <div className="mobile-brand" onClick={() => navigate('/dashboard')}>
          <img src={logo} alt="CampusPay" className="navbar-logo" />
          <span className="mobile-brand-name">CampusPay</span>
        </div>
        <div className="mobile-nav-right">
          {user?.role === 'student' && <NotificationBell />}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE Dropdown menu ── */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-user">
              <div className="mobile-avatar">{user?.name?.charAt(0) || 'S'}</div>
              <div>
                <div className="mobile-user-name">{user?.name}</div>
                <div className="mobile-user-role">{user?.role}</div>
              </div>
            </div>
            <div className="mobile-menu-links">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <NavLink key={path} to={path}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}>
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}

      {/* ── MOBILE Bottom Tab Bar ── */}
      <div className="mobile-tab-bar">
        {navLinks.slice(0, 5).map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) => `mobile-tab ${isActive ? 'active' : ''}`}>
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}
