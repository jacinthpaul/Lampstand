import { useNavigate } from 'react-router-dom'
import { BookIcon, TimelineIcon, MapPinIcon, ChatIcon, FlameIcon } from '../components/Icons'
import { useVerseLibrary } from '../lib/useVerseLibrary'

const TOOLS = [
  {
    id: 'study', label: 'Study Companion', desc: 'Understand any verse in depth.',
    color: '#2E5A57', status: 'live', path: '/app/study',
    icon: (s) => <BookIcon size={s} stroke="#DCEDEA" />,
  },
  {
    id: 'timeline', label: 'Timeline Explorer', desc: "See Scripture's whole story in order.",
    color: '#3C5A2E', status: 'live', path: '/app/timeline',
    icon: (s) => <TimelineIcon size={s} stroke="#E2EBD6" />,
  },
  {
    id: 'journey', label: 'Journey Planner', desc: 'Walk the routes of Scripture.',
    color: '#7A5A1F', status: 'soon', path: null,
    icon: (s) => <MapPinIcon size={s} stroke="#F0E2C2" />,
  },
  {
    id: 'chat', label: 'Character Chat', desc: 'Converse with biblical figures.',
    color: '#4A3A6B', status: 'soon', path: null,
    icon: (s) => <ChatIcon size={s} stroke="#E4DCF0" />,
  },
]

export default function Hub() {
  const navigate = useNavigate()
  const { recent } = useVerseLibrary()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div style={{ flex: 1 }}>
      {/* Hero */}
      <section style={{
        background: '#F3EAD8',
        padding: '46px 32px 40px',
        borderBottom: '1px solid #E3D6BE',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 560 }}>
          <div className="eyebrow">Today · {today}</div>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 46, lineHeight: 1.05, marginTop: 8, color: '#2B2218' }}>
            Good morning, friend.
          </div>
          <div style={{ fontSize: 18, color: '#5C4F3C', marginTop: 10, lineHeight: 1.5 }}>
            Pick up where you left off, or open a tool below.
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/app/study/Romans 8:28')}
              style={{
                background: '#6F2F33', color: '#F6EEDB', fontFamily: "'Public Sans',sans-serif",
                fontWeight: 600, fontSize: 15, padding: '13px 24px', borderRadius: 9,
                border: 'none', cursor: 'pointer',
              }}
            >
              Continue: Romans 8 →
            </button>
            <button
              onClick={() => navigate('/app/study')}
              style={{
                background: '#fff', border: '1.5px solid #D8C7A6', color: '#5C4F3C',
                fontFamily: "'Public Sans',sans-serif", fontWeight: 600, fontSize: 15,
                padding: '12px 24px', borderRadius: 9, cursor: 'pointer',
              }}
            >
              Today's devotional
            </button>
          </div>
        </div>

        {/* Verse of the day */}
        <div style={{
          background: '#fff', border: '1px solid #E9DCC2', borderRadius: 14,
          padding: 22, boxShadow: '0 2px 8px rgba(43,34,24,.06)',
          minWidth: 260, maxWidth: 320, flexShrink: 0,
        }}>
          <div className="eyebrow">Verse of the day</div>
          <div className="font-display" style={{ fontSize: 25, lineHeight: 1.25, marginTop: 10, color: '#2B2218' }}>
            "Be still, and know that I am God."
          </div>
          <div className="font-ui" style={{ fontSize: 13, color: '#8A7B62', marginTop: 10, fontWeight: 600 }}>
            Psalm 46:10
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section style={{ padding: '30px 32px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <div className="font-display" style={{ fontWeight: 600, fontSize: 26 }}>Your tools</div>
          <button
            onClick={() => navigate('/library')}
            className="font-ui"
            style={{ fontSize: 13, color: '#A9792A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            See all 12 →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {TOOLS.map(tool => (
            <ToolCard key={tool.id} tool={tool} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section style={{ padding: '0 32px 48px' }}>
        <div className="font-display" style={{ fontWeight: 600, fontSize: 22, marginBottom: 14 }}>Recent study</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {recent.slice(0, 6).map(ref => (
            <button
              key={ref}
              onClick={() => navigate(`/app/study/${ref}`)}
              style={{
                background: '#FBF5EA', border: '1px solid #E9DCC2', borderRadius: 20,
                padding: '8px 16px', fontFamily: "'Public Sans',sans-serif", fontSize: 13,
                color: '#5C4F3C', cursor: 'pointer', fontWeight: 500,
              }}
            >
              {ref}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function ToolCard({ tool, navigate }) {
  const isLive = tool.status === 'live'
  return (
    <div
      onClick={() => isLive && tool.path && navigate(tool.path)}
      style={{
        background: '#FBF5EA', border: '1px solid #E9DCC2', borderRadius: 14,
        padding: 22, cursor: isLive ? 'pointer' : 'default',
        opacity: isLive ? 1 : 0.8,
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => { if (isLive) e.currentTarget.style.boxShadow = '0 4px 16px rgba(43,34,24,.1)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 12, background: tool.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
      }}>
        {tool.icon(24)}
      </div>
      <div className="font-display" style={{ fontWeight: 600, fontSize: 20 }}>{tool.label}</div>
      <div style={{ fontSize: 13, color: '#6E5F4A', lineHeight: 1.45, marginTop: 4 }}>{tool.desc}</div>
      <div className="font-ui" style={{
        fontSize: 11, fontWeight: 600, marginTop: 12,
        color: isLive ? tool.color : '#9A8B70',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {isLive ? '● Live' : '○ Coming soon'}
      </div>
    </div>
  )
}
