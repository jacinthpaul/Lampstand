import { useNavigate } from 'react-router-dom'
import { BookIcon, TimelineIcon, MapPinIcon, ChatIcon } from '../components/Icons'

const ALL_APPS = [
  { id: 'study', label: 'Study Companion', desc: 'Understand any verse — context, cross-refs, application.', color: '#2E5A57', status: 'live', path: '/app/study', icon: (s) => <BookIcon size={s} stroke="#DCEDEA" /> },
  { id: 'timeline', label: 'Timeline Explorer', desc: "See Scripture's whole story in order.", color: '#3C5A2E', status: 'live', path: '/app/timeline', icon: (s) => <TimelineIcon size={s} stroke="#E2EBD6" /> },
  { id: 'journey', label: 'Journey Planner', desc: "Walk Paul's routes, the Exodus, Jesus' ministry.", color: '#7A5A1F', status: 'soon', path: null, icon: (s) => <MapPinIcon size={s} stroke="#F0E2C2" /> },
  { id: 'chat', label: 'Character Chat', desc: 'Chat with Moses, David, Paul, and others.', color: '#4A3A6B', status: 'soon', path: null, icon: (s) => <ChatIcon size={s} stroke="#E4DCF0" /> },
  { id: 'sermon', label: 'Sermon Builder', desc: 'Generate sermon outlines from any topic.', color: '#6F2F33', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>📖</span> },
  { id: 'group', label: 'Group Facilitator', desc: 'Create discussion questions from study guides.', color: '#5A3A2E', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>👥</span> },
  { id: 'memory', label: 'Memory Coach', desc: 'Spaced repetition for verse memorization.', color: '#3A5A6B', status: 'live', path: '/app/memory', icon: () => <span style={{ fontSize: 20 }}>🧠</span> },
  { id: 'places', label: 'Places Explorer', desc: 'Google Maps for biblical locations.', color: '#4A6B3A', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>🗺️</span> },
  { id: 'plans', label: 'Reading Plans', desc: 'AI-generated reading plans for any goal.', color: '#6B5A3A', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>📅</span> },
  { id: 'quiz', label: 'Question Bank', desc: 'Kahoot-style quizzes for Sunday school.', color: '#3A3A6B', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>❓</span> },
  { id: 'multiagent', label: 'Multi-Agent Study', desc: 'Six AI agents collaborate on any verse.', color: '#6B3A5A', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>🤖</span> },
  { id: 'story', label: 'Visual Story Gen', desc: 'Story cards, maps, and quizzes for kids.', color: '#5A6B3A', status: 'soon', path: null, icon: () => <span style={{ fontSize: 20 }}>🎨</span> },
]

export default function Library() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '32px', maxWidth: 1200 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>All tools</div>
      <div className="font-display" style={{ fontWeight: 700, fontSize: 36, color: '#2B2218', marginBottom: 6 }}>
        12 lamps, one stand
      </div>
      <div style={{ fontSize: 16, color: '#6E5F4A', marginBottom: 30 }}>
        Live tools work today; the rest arrive with no redesign.
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <span className="font-ui" style={{ fontSize: 13, color: '#6E5F4A', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#2E5A57' }} />Live
        </span>
        <span className="font-ui" style={{ fontSize: 13, color: '#6E5F4A', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#C9B98F' }} />On roadmap
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {ALL_APPS.map(app => {
          const isLive = app.status === 'live'
          return (
            <div
              key={app.id}
              onClick={() => isLive && app.path && navigate(app.path)}
              style={{
                background: '#FBF5EA', border: '1px solid #E9DCC2', borderRadius: 14,
                padding: 22, cursor: isLive ? 'pointer' : 'default',
                opacity: isLive ? 1 : 0.78,
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={e => { if (isLive) e.currentTarget.style.boxShadow = '0 4px 16px rgba(43,34,24,.1)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12, background: app.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>
                {typeof app.icon === 'function' ? app.icon(24) : app.icon}
              </div>
              <div className="font-display" style={{ fontWeight: 600, fontSize: 19 }}>{app.label}</div>
              <div style={{ fontSize: 13, color: '#6E5F4A', lineHeight: 1.45, marginTop: 4 }}>{app.desc}</div>
              <div className="font-ui" style={{
                fontSize: 11, fontWeight: 600, marginTop: 12,
                color: isLive ? app.color : '#9A8B70',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {isLive ? '● Live' : '○ Coming soon'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
