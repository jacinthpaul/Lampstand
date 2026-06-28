import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EVENTS, ERAS, getEventById } from '../data/timeline'
import { TimelineIcon } from '../components/Icons'

export default function Timeline() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [activeEra, setActiveEra] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [aiQuery, setAiQuery] = useState('')

  useEffect(() => {
    if (eventId) {
      const ev = getEventById(eventId)
      if (ev) setSelectedEvent(ev)
    } else {
      setSelectedEvent(EVENTS.find(e => e.id === 'david') || EVENTS[4])
    }
  }, [eventId])

  const filtered = activeEra === 'All' ? EVENTS : EVENTS.filter(e => e.era === activeEra)

  function handleSelect(ev) {
    setSelectedEvent(ev)
    navigate(`/app/timeline/${ev.id}`, { replace: true })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 58px - 60px)', overflow: 'hidden' }}>

      {/* App header bar */}
      <div style={{
        background: '#22190F', padding: '12px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: '#3C5A2E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TimelineIcon size={17} stroke="#E2EBD6" />
          </div>
          <span className="font-display" style={{ color: '#F6EEDB', fontWeight: 600, fontSize: 19 }}>
            Timeline Explorer
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#33271A', borderRadius: 9, padding: '9px 14px',
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span className="font-ui" style={{ fontSize: 13, color: '#E7DCC4' }}>
            "Show me everything around 1000 BC"
          </span>
        </div>
      </div>

      {/* Main split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Timeline column */}
        <div style={{ flex: 1, background: '#F3EAD8', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '28px 36px 0' }}>
            <div className="eyebrow">The story of Scripture</div>
            <div className="font-display" style={{ fontWeight: 700, fontSize: 30, marginTop: 6, color: '#2B2218' }}>
              From Creation to the Early Church
            </div>
            {/* Era filter chips */}
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              {ERAS.map(era => (
                <button
                  key={era}
                  onClick={() => setActiveEra(era)}
                  className="font-ui"
                  style={{
                    fontSize: 12, fontWeight: 600, padding: '7px 13px', borderRadius: 7,
                    border: activeEra === era ? 'none' : '1px solid #E3D6BE',
                    background: activeEra === era ? '#3C5A2E' : '#fff',
                    color: activeEra === era ? '#E2EBD6' : '#6E5F4A',
                    cursor: 'pointer',
                  }}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical timeline */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 36px 36px', position: 'relative' }}>
            <div style={{ position: 'relative', paddingLeft: 30 }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: 7, top: 6, bottom: 6,
                width: 2, background: '#D8C7A6',
              }} />

              {filtered.map((ev, i) => {
                const isSelected = selectedEvent?.id === ev.id
                return (
                  <div
                    key={ev.id}
                    onClick={() => handleSelect(ev)}
                    style={{
                      position: 'relative',
                      marginBottom: isSelected ? 24 : 20,
                      cursor: 'pointer',
                      ...(isSelected ? {
                        background: '#fff', border: '1px solid #C8DCBE',
                        borderRadius: 12, padding: '14px 16px',
                        marginLeft: -6, boxShadow: '0 2px 8px rgba(43,34,24,.07)',
                      } : {}),
                    }}
                  >
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: isSelected ? -30 : -30,
                      top: isSelected ? 18 : 3,
                      width: isSelected ? 18 : 16,
                      height: isSelected ? 18 : 16,
                      borderRadius: '50%',
                      background: isSelected ? '#3C5A2E' : '#fff',
                      border: isSelected ? '3px solid #F3EAD8' : '3px solid #C9B98F',
                    }} />

                    {isSelected ? (
                      <>
                        <div className="font-ui" style={{ fontSize: 12, fontWeight: 600, color: '#3C5A2E' }}>
                          {ev.date} · selected
                        </div>
                        <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#2B2218' }}>
                          {ev.title}
                        </div>
                        <div style={{ fontSize: 13, color: '#5C4F3C', marginTop: 2, lineHeight: 1.5 }}>
                          {ev.desc}
                        </div>
                        <div className="font-ui" style={{ fontSize: 11, color: '#A9792A', marginTop: 8, fontWeight: 600 }}>
                          {ev.refs.join(' · ')}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-ui" style={{ fontSize: 12, fontWeight: 600, color: '#8A7B62' }}>{ev.date}</div>
                        <div className="font-display" style={{ fontSize: 20, fontWeight: 600, color: '#2B2218' }}>{ev.title}</div>
                        <div style={{ fontSize: 13, color: '#6E5F4A' }}>{ev.subtitle}</div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {selectedEvent && (
          <div style={{
            width: 360, flexShrink: 0, borderLeft: '1px solid #E3D6BE',
            background: '#fff', overflowY: 'auto', padding: '28px 26px',
          }}>
            {/* Map placeholder */}
            <div style={{
              height: 150, borderRadius: 12, background: '#E9E0CB',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #E3D6BE', marginBottom: 18,
            }}>
              <span className="font-ui" style={{ fontSize: 12, color: '#9A8B70' }}>
                [ Map: {selectedEvent.title} ]
              </span>
            </div>

            <div className="eyebrow" style={{ marginBottom: 4 }}>Event detail</div>
            <div className="font-display" style={{ fontWeight: 600, fontSize: 26, color: '#2B2218' }}>
              {selectedEvent.title}
            </div>
            <div style={{ fontSize: 12, color: '#8A7B62', fontFamily: "'Public Sans',sans-serif", fontWeight: 600, marginTop: 4 }}>
              {selectedEvent.date}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.55, color: '#4A3F2E', marginTop: 10 }}>
              {selectedEvent.desc}
            </div>

            <div style={{ height: 1, background: '#EFE6D2', margin: '18px 0' }} />
            <div className="eyebrow" style={{ marginBottom: 8 }}>Meanwhile in the world</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: '#6E5F4A' }}>
              {selectedEvent.world}
            </div>

            <div style={{ height: 1, background: '#EFE6D2', margin: '18px 0' }} />
            <div className="eyebrow" style={{ marginBottom: 8 }}>Read in context</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selectedEvent.refs.map(ref => (
                <button
                  key={ref}
                  onClick={() => navigate(`/app/study/${encodeURIComponent(ref)}`)}
                  className="font-ui"
                  style={{
                    fontSize: 13, padding: '7px 13px', borderRadius: 8,
                    background: '#F4ECDC', color: '#6E5F4A', fontWeight: 500,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  {ref}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate(`/app/study/${encodeURIComponent(selectedEvent.refs[0])}`)}
              className="font-ui"
              style={{
                width: '100%', background: '#3C5A2E', color: '#EAF0E2',
                fontWeight: 600, fontSize: 14, padding: 12, borderRadius: 9,
                textAlign: 'center', marginTop: 20, border: 'none', cursor: 'pointer',
              }}
            >
              Open in Study Companion →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
