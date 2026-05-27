import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Send, ClipboardList, FileText, Settings, ShieldCheck, LogOut, Menu, X, Bell, ShoppingBag, SlidersHorizontal } from 'lucide-react';
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
      
      {/* ── Mobile Bottom Navigation ── */}
      <div className="mobile-bottom-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={22} strokeWidth={2} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/pay" className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}>
          <Send size={22} strokeWidth={2} />
          <span>Pay</span>
        </NavLink>
        <NavLink to="/canteen" className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}>
          <ShoppingBag size={22} strokeWidth={2} />
          <span>Canteen</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}>
          <ClipboardList size={22} strokeWidth={2} />
          <span>History</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}>
          <SlidersHorizontal size={22} strokeWidth={2} />
          <span>More</span>
        </NavLink>
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
      {/* Mobile Bottom Nav */}
<div className="mobile-nav">
  <NavLink to="/dashboard" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
    <LayoutDashboard size={20} strokeWidth={2} />
    <span>Home</span>
  </NavLink>
  <NavLink to="/pay" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
    <Send size={20} strokeWidth={2} />
    <span>Pay</span>
  </NavLink>
  <NavLink to="/canteen" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
    <span style={{fontSize:20}}>🍽️</span>
    <span>Canteen</span>
  </NavLink>
  <NavLink to="/transactions" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
    <ClipboardList size={20} strokeWidth={2} />
    <span>History</span>
  </NavLink>
  <NavLink to="/settings" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
    <Settings size={20} strokeWidth={2} />
    <span>More</span>
  </NavLink>
</div>
    </>
  );
}
