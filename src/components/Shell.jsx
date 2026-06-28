import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FlameIcon, HomeIcon, LibraryIcon, SearchIcon, UserIcon, TimelineIcon, BookIcon } from './Icons'

const APPS = [
  { id: 'study', label: 'Study Companion', path: '/app/study', color: '#2E5A57', icon: (s) => <BookIcon size={s} stroke="#DCEDEA" /> },
  { id: 'timeline', label: 'Timeline Explorer', path: '/app/timeline', color: '#3C5A2E', icon: (s) => <TimelineIcon size={s} stroke="#E2EBD6" /> },
]

export default function Shell() {
  const [showSwitcher, setShowSwitcher] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      {/* Desktop top bar */}
      <nav style={{
        background: '#22190F',
        padding: '0 32px',
        height: 58,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo / App Switcher trigger */}
        <button
          onClick={() => setShowSwitcher(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 9, background: '#6F2F33',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <FlameIcon size={17} />
          </div>
          <span className="font-display" style={{ color: '#F6EEDB', fontWeight: 700, fontSize: 21 }}>
            Lampstand
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <NavLink to="/" end style={({ isActive }) => navLinkStyle(isActive)}>Library</NavLink>
          <NavLink to="/app/study" style={({ isActive }) => navLinkStyle(isActive)}>My study</NavLink>
          <NavLink to="/app/timeline" style={({ isActive }) => navLinkStyle(isActive)}>Timeline</NavLink>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: '#6F2F33',
            cursor: 'pointer',
          }} />
        </div>
      </nav>

      {/* App switcher overlay */}
      {showSwitcher && (
        <div
          onClick={() => setShowSwitcher(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(34,25,15,0.6)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 70,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FBF5EA', borderRadius: 16, padding: 28,
              width: 380, boxShadow: '0 20px 60px rgba(34,25,15,0.3)',
              border: '1px solid #E3D6BE',
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 16 }}>Switch app</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <AppTile
                label="Hub" path="/" color="#6F2F33"
                icon={<FlameIcon size={26} />}
                onClick={() => { navigate('/'); setShowSwitcher(false) }}
              />
              {APPS.map(app => (
                <AppTile
                  key={app.id} label={app.label} path={app.path}
                  color={app.color} icon={app.icon(26)}
                  onClick={() => { navigate(app.path); setShowSwitcher(false) }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      {/* Mobile tab bar */}
      <div style={{
        background: '#fff',
        borderTop: '1px solid #E9DCC2',
        padding: '10px 8px 18px',
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
      }} className="mobile-tab-bar">
        <MobileTab to="/" icon={<HomeIcon />} label="Home" />
        <MobileTab to="/library" icon={<LibraryIcon />} label="Library" />
        <MobileTab to="/app/study" icon={<SearchIcon size={22} stroke="#A79A82" />} label="Study" />
        <MobileTab to="/app/timeline" icon={<TimelineIcon size={22} stroke="#A79A82" />} label="Timeline" />
        <MobileTab to="/me" icon={<UserIcon />} label="Me" />
      </div>
    </div>
  )
}

function navLinkStyle(isActive) {
  return {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: isActive ? '#E7C46B' : '#A7977A',
    textDecoration: 'none',
  }
}

function AppTile({ label, color, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8, background: 'none', border: 'none', cursor: 'pointer',
        padding: 8,
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 16, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <span className="font-ui" style={{ fontSize: 11, color: '#6E5F4A', maxWidth: 70, textAlign: 'center', lineHeight: 1.3 }}>
        {label}
      </span>
    </button>
  )
}

function MobileTab({ to, icon, label }) {
  return (
    <NavLink to={to} end style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none' }}>
      {({ isActive }) => (
        <>
          {icon}
          <span className="font-ui" style={{ fontSize: 10, color: isActive ? '#6F2F33' : '#A79A82', fontWeight: isActive ? 600 : 400 }}>{label}</span>
        </>
      )}
    </NavLink>
  )
}
