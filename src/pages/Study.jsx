import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { VERSE_DATA, SAMPLE_CHAT } from '../data/verses'
import { SearchIcon, ArrowRightIcon, BookIcon, FlameIcon, BookmarkIcon } from '../components/Icons'
import { useVerseLibrary } from '../lib/useVerseLibrary'

const LENS_LABELS = {
  meaning: 'Meaning',
  context: 'Context',
  crossrefs: 'Cross-refs',
  application: 'Application',
  reflect: 'Reflect',
}

export default function Study() {
  const { reference } = useParams()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [activeLens, setActiveLens] = useState('meaning')
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)
  const chatEndRef = useRef(null)
  const { recent, saved, addRecent, isSaved, toggleSaved } = useVerseLibrary()

  const currentRef = reference || 'Romans 8:28'
  const verse = VERSE_DATA[currentRef] || VERSE_DATA['Romans 8:28']
  const lens = verse?.lenses?.[activeLens]

  useEffect(() => {
    const seed = SAMPLE_CHAT[currentRef]
    setMessages(seed || [])
    setActiveLens('meaning')
    if (VERSE_DATA[currentRef]) addRecent(currentRef)
  }, [currentRef, addRecent])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSearch(e) {
    e.preventDefault()
    const q = searchInput.trim()
    if (!q) return
    navigate(`/app/study/${encodeURIComponent(q)}`)
    setSearchInput('')
  }

  function handleSend(e) {
    e.preventDefault()
    const q = chatInput.trim()
    if (!q) return
    const userMsg = { role: 'user', text: q }
    setMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsThinking(true)
    setTimeout(() => {
      const aiMsg = {
        role: 'ai',
        text: `This is a thoughtful question about ${verse.reference}. In context, Paul's writing here draws from both the Old Testament covenant theology and his own experience. The key is understanding the theological framework established earlier in the chapter.`,
        cite: `${verse.reference}`,
      }
      setMessages(prev => [...prev, aiMsg])
      setIsThinking(false)
    }, 1400)
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100dvh - 58px - 60px)', overflow: 'hidden' }}>

      {/* Left sidebar */}
      <aside style={{
        width: 240, background: '#22190F', flexShrink: 0,
        padding: '22px 16px', color: '#E7DCC4', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 24 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: '#2E5A57',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BookIcon size={15} stroke="#DCEDEA" />
          </div>
          <span className="font-display" style={{ fontSize: 17, fontWeight: 600, color: '#F6EEDB' }}>
            Study Companion
          </span>
        </div>

        <div className="eyebrow" style={{ color: '#9C8862', marginBottom: 10 }}>Recent</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {recent.map(ref => (
            <button
              key={ref}
              onClick={() => navigate(`/app/study/${encodeURIComponent(ref)}`)}
              className="font-ui"
              style={{
                fontSize: 14, padding: '9px 12px', borderRadius: 8,
                background: ref === currentRef ? '#33271A' : 'transparent',
                color: ref === currentRef ? '#F6EEDB' : '#B6A988',
                border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              {ref}
            </button>
          ))}
        </div>

        <div className="eyebrow" style={{ color: '#9C8862', margin: '22px 0 10px' }}>Saved</div>
        {saved.length === 0 && (
          <div className="font-ui" style={{ fontSize: 13, color: '#8A7B62', lineHeight: 1.5, padding: '0 12px' }}>
            Tap the bookmark on any verse to save it here.
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {saved.map(ref => (
            <button
              key={ref}
              onClick={() => navigate(`/app/study/${encodeURIComponent(ref)}`)}
              className="font-ui"
              style={{
                fontSize: 14, padding: '9px 12px', borderRadius: 8,
                color: '#B6A988', background: 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              {ref}
            </button>
          ))}
        </div>
      </aside>

      {/* Center reading area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F3EAD8', overflow: 'hidden' }}>
        {/* Search bar */}
        <div style={{
          padding: '16px 28px', borderBottom: '1px solid #E3D6BE',
          background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              flex: 1, display: 'flex', gap: 10, alignItems: 'center',
              background: '#F6EFE2', border: '1px solid #E3D6BE', borderRadius: 9,
              padding: '10px 14px',
            }}>
              <SearchIcon />
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={`Search any verse, e.g. "John 3:16"…`}
                className="font-ui"
                style={{
                  flex: 1, border: 'none', background: 'transparent', outline: 'none',
                  fontSize: 14, color: '#2B2218',
                }}
              />
            </div>
            <button
              type="button"
              className="font-ui"
              style={{
                fontSize: 13, color: '#6E5F4A', border: '1px solid #E3D6BE',
                background: '#fff', borderRadius: 8, padding: '9px 14px',
                fontWeight: 600, cursor: 'pointer', flexShrink: 0,
              }}
            >
              {verse?.translation || 'ESV'} ▾
            </button>
          </form>
        </div>

        {/* Verse content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          {verse ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div className="eyebrow">{verse.book} {verse.chapter} · Verse {verse.verse}</div>
                <button
                  onClick={() => toggleSaved(verse.reference)}
                  className="font-ui"
                  title={isSaved(verse.reference) ? 'Remove from saved' : 'Save this verse'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                    background: isSaved(verse.reference) ? '#6F2F33' : '#fff',
                    color: isSaved(verse.reference) ? '#F6EEDB' : '#6E5F4A',
                    border: isSaved(verse.reference) ? 'none' : '1px solid #E3D6BE',
                    borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <BookmarkIcon size={15} filled={isSaved(verse.reference)} stroke={isSaved(verse.reference) ? '#F6EEDB' : '#A9792A'} />
                  {isSaved(verse.reference) ? 'Saved' : 'Save'}
                </button>
              </div>
              <div className="font-display" style={{
                fontWeight: 600, fontSize: 34, lineHeight: 1.32,
                marginTop: 16, color: '#2B2218',
              }}>
                "{verse.text}"
              </div>

              {/* Lens chips */}
              <div style={{ display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap' }}>
                {Object.entries(LENS_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveLens(key)}
                    className="font-ui"
                    style={{
                      fontSize: 13, fontWeight: key === activeLens ? 600 : 500,
                      padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
                      background: key === activeLens ? '#6F2F33' : '#fff',
                      color: key === activeLens ? '#F6EEDB' : '#6E5F4A',
                      border: key === activeLens ? 'none' : '1px solid #E3D6BE',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Lens content */}
              {lens && (
                <div style={{
                  background: '#fff', border: '1px solid #E9DCC2', borderRadius: 14,
                  padding: '24px 26px', marginTop: 22, borderLeft: '3px solid #A9792A',
                }}>
                  <div className="eyebrow">{lens.title}</div>
                  <div style={{ fontSize: 17, lineHeight: 1.6, color: '#3A3022', marginTop: 10, whiteSpace: 'pre-line' }}>
                    {lens.body}
                  </div>
                  {lens.sources.length > 0 && (
                    <div className="font-ui" style={{ fontSize: 12, color: '#A9792A', marginTop: 14, fontWeight: 600 }}>
                      Grounded in · {lens.sources.join(' · ')}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <div className="font-display" style={{ fontSize: 24, color: '#8A7B62' }}>
                Verse not found
              </div>
              <div style={{ color: '#6E5F4A', marginTop: 8 }}>Try searching for a different reference</div>
            </div>
          )}
        </div>
      </div>

      {/* Right AI panel */}
      <aside style={{
        width: 320, background: '#fff', flexShrink: 0,
        borderLeft: '1px solid #E3D6BE', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* AI header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #EFE6D2',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <FlameIcon size={18} fill="#E7C46B" innerFill="#F6EEDB" />
          <span className="font-display" style={{ fontWeight: 600, fontSize: 18 }}>Ask the AI</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: 24 }}>
              <div style={{ fontSize: 14, color: '#9A8B70', lineHeight: 1.5 }}>
                Ask a question about this verse to get started.
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: msg.role === 'user' ? '#6F2F33' : '#F4ECDC',
                color: msg.role === 'user' ? '#F6EEDB' : '#3A3022',
                fontSize: 14, lineHeight: 1.5, padding: '11px 15px',
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                maxWidth: 260,
              }}>
                {msg.text}
                {msg.cite && (
                  <div className="font-ui" style={{ fontSize: 11, color: '#A9792A', marginTop: 8, fontWeight: 600 }}>
                    ↳ {msg.cite}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div style={{ alignSelf: 'flex-start' }}>
              <div style={{
                background: '#F4ECDC', fontSize: 14, padding: '11px 15px',
                borderRadius: '14px 14px 14px 4px', color: '#9A8B70',
              }}>
                Thinking…
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid #EFE6D2' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#F6EFE2', border: '1px solid #E3D6BE', borderRadius: 22, padding: '10px 14px' }}>
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask about this verse…"
              className="font-ui"
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#2B2218' }}
            />
            <button
              type="submit"
              style={{
                width: 28, height: 28, borderRadius: '50%', background: '#6F2F33',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <ArrowRightIcon />
            </button>
          </form>
          <div className="font-ui" style={{ fontSize: 11, color: '#9A8B70', textAlign: 'center', marginTop: 10 }}>
            Answers cite Scripture. Always verify in context.
          </div>
        </div>
      </aside>
    </div>
  )
}
