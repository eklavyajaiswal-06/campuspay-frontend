import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Send, ClipboardList, FileText, Settings, ShieldCheck, LogOut, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import NotificationBell from './NotificationBell';
import logo from '../campuspay_logo.png';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      <nav className="navbar">
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
    </>
  );
}
