import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';

const navItems = [
  { to: '/', label: 'Summary' },
  { to: '/funnel', label: '퍼널 분석' },
  { to: '/sales', label: '매출/채널' },
  { to: '/crm', label: 'CRM/마케팅' },
  { to: '/service', label: 'A/S·충성도' },
  { to: '/issues', label: '이슈 로그' },
];

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <nav style={{ width: 200, background: '#282828', color: '#fff', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 20px 24px', fontSize: 15, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1 }}>
          SIDIZ KGI
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              display: 'block',
              padding: '11px 20px',
              color: isActive ? '#FFFFFF' : '#969696',
              background: isActive ? '#3C3C3C' : 'transparent',
              textDecoration: 'none',
              fontSize: 14,
              borderLeft: isActive ? '3px solid #336DFF' : '3px solid transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
