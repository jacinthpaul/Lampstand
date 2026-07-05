import { useState, useEffect, useMemo } from 'react'
import { useMemoryDeck } from '../lib/useMemoryDeck'
import { memoryText } from '../data/memoryVerses'
import { GRADES, previewInterval, isDue, statusOf } from '../lib/sm2'
import { FlameIcon } from '../components/Icons'

const STATUS_META = {
  new: { label: 'New', color: '#7A5A1F', bg: '#F3E9D2' },
  learning: { label: 'Learning', color: '#2E5A57', bg: '#DDEBE9' },
  memorized: { label: 'Memorized', color: '#3C5A2E', bg: '#E2EBD6' },
}

const GRADE_BUTTONS = [
  { key: 'again', label: 'Again', q: GRADES.again, color: '#6F2F33' },
  { key: 'hard', label: 'Hard', q: GRADES.hard, color: '#7A5A1F' },
  { key: 'good', label: 'Good', q: GRADES.good, color: '#2E5A57' },
  { key: 'easy', label: 'Easy', q: GRADES.easy, color: '#3C5A2E' },
]

function humanizeInterval(days) {
  if (days <= 0) return 'soon'
  if (days === 1) return '1 day'
  if (days < 30) return `${days} days`
  if (days < 365) return `${Math.round(days / 30)} mo`
  return `${Math.round(days / 365)} yr`
}

function humanizeDue(due, now) {
  const diff = due - now
  if (diff <= 0) return 'due now'
  const days = Math.ceil(diff / 86400000)
  return `in ${humanizeInterval(days)}`
}

export default function Memory() {
  const { deck, cards, grade, resetDeck } = useMemoryDeck()
  const [revealed, setRevealed] = useState(false)
  const [reviewAhead, setReviewAhead] = useState(false)
  const now = Date.now()

  const dueCards = useMemo(
    () => cards.filter(c => isDue(c, now)).sort((a, b) => a.due - b.due),
    [cards, now],
  )

  // When nothing is due, "review ahead" pulls the soonest upcoming card.
  const queue = useMemo(() => {
    if (dueCards.length > 0) return dueCards
    if (!reviewAhead) return []
    return [...cards].sort((a, b) => a.due - b.due).slice(0, 1)
  }, [dueCards, cards, reviewAhead])

  const current = queue[0] || null

  // Collapse the answer whenever we move to a different card.
  useEffect(() => { setRevealed(false) }, [current?.ref])

  const counts = useMemo(() => {
    const c = { due: dueCards.length, learning: 0, memorized: 0 }
    for (const card of cards) {
      const s = statusOf(card)
      if (s === 'learning' || s === 'new') c.learning += 1
      if (s === 'memorized') c.memorized += 1
    }
    return c
  }, [cards, dueCards])

  function handleGrade(q) {
    if (!current) return
    grade(current.ref, q)
    setRevealed(false)
    if (dueCards.length <= 1) setReviewAhead(false)
  }

  const nextDue = useMemo(() => {
    if (cards.length === 0) return null
    return cards.reduce((min, c) => (c.due < min ? c.due : min), Infinity)
  }, [cards])

  return (
    <div style={{ padding: '32px', maxWidth: 900 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>Memory Coach</div>
      <div className="font-display" style={{ fontWeight: 700, fontSize: 36, color: '#2B2218', marginBottom: 6 }}>
        Hide God's word in your heart
      </div>
      <div style={{ fontSize: 16, color: '#6E5F4A', marginBottom: 26 }}>
        Spaced repetition schedules each verse right before you'd forget it. Your progress stays on this device.
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatTile label="Due now" value={counts.due} color="#6F2F33" />
        <StatTile label="Learning" value={counts.learning} color="#2E5A57" />
        <StatTile label="Memorized" value={counts.memorized} color="#3C5A2E" />
      </div>

      {/* Review area */}
      {current ? (
        <ReviewCard
          card={current}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onGrade={handleGrade}
          ahead={dueCards.length === 0}
        />
      ) : (
        <CaughtUp nextDue={nextDue} now={now} onReviewAhead={() => setReviewAhead(true)} hasCards={cards.length > 0} />
      )}

      {/* Deck list */}
      <div style={{ marginTop: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="font-display" style={{ fontWeight: 600, fontSize: 22 }}>Your deck</div>
        <button
          onClick={() => { if (confirm('Reset all memory progress? This cannot be undone.')) resetDeck() }}
          className="font-ui"
          style={{ fontSize: 12, color: '#A9792A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Reset progress
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginTop: 14 }}>
        {Object.keys(deck).map(ref => {
          const card = deck[ref]
          const meta = STATUS_META[statusOf(card)]
          return (
            <div key={ref} style={{
              background: '#FBF5EA', border: '1px solid #E9DCC2', borderRadius: 12,
              padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span className="font-display" style={{ fontWeight: 600, fontSize: 16, color: '#2B2218' }}>{ref}</span>
                <span className="font-ui" style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: meta.color, background: meta.bg, borderRadius: 20, padding: '3px 9px',
                }}>
                  {meta.label}
                </span>
              </div>
              <div className="font-ui" style={{ fontSize: 12, color: '#8A7B62', marginTop: 6 }}>
                {isDue(card, now) ? 'Ready to review' : humanizeDue(card.due, now)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatTile({ label, value, color }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #E9DCC2', borderRadius: 12,
      padding: '16px 22px', minWidth: 110, flex: '1 1 110px', maxWidth: 180,
    }}>
      <div className="font-display" style={{ fontSize: 34, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div className="font-ui" style={{ fontSize: 12, color: '#8A7B62', marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>
  )
}

function ReviewCard({ card, revealed, onReveal, onGrade, ahead }) {
  const text = memoryText(card.ref)
  return (
    <div style={{
      background: '#F3EAD8', border: '1px solid #E3D6BE', borderRadius: 16,
      padding: '40px 32px', textAlign: 'center',
    }}>
      {ahead && (
        <div className="font-ui" style={{ fontSize: 12, color: '#A9792A', fontWeight: 600, marginBottom: 14 }}>
          Reviewing ahead of schedule
        </div>
      )}
      <div className="eyebrow" style={{ marginBottom: 12 }}>Recall this verse</div>
      <div className="font-display" style={{ fontWeight: 700, fontSize: 30, color: '#2B2218' }}>{card.ref}</div>

      {!revealed ? (
        <button
          onClick={onReveal}
          style={{
            marginTop: 30, background: '#6F2F33', color: '#F6EEDB',
            fontFamily: "'Public Sans',sans-serif", fontWeight: 600, fontSize: 15,
            padding: '13px 30px', borderRadius: 9, border: 'none', cursor: 'pointer',
          }}
        >
          Show verse
        </button>
      ) : (
        <>
          <div className="font-display" style={{
            fontSize: 22, lineHeight: 1.5, color: '#3A3022', marginTop: 24,
            maxWidth: 620, marginLeft: 'auto', marginRight: 'auto',
          }}>
            "{text}"
          </div>
          <div className="font-ui" style={{ fontSize: 13, color: '#8A7B62', marginTop: 16, marginBottom: 26 }}>
            How well did you recall it?
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {GRADE_BUTTONS.map(btn => (
              <button
                key={btn.key}
                onClick={() => onGrade(btn.q)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  background: '#fff', border: `1.5px solid ${btn.color}`, color: btn.color,
                  borderRadius: 10, padding: '10px 20px', cursor: 'pointer', minWidth: 78,
                  fontFamily: "'Public Sans',sans-serif", fontWeight: 600, fontSize: 14,
                }}
              >
                {btn.label}
                <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}>
                  {humanizeInterval(previewInterval(card, btn.q))}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function CaughtUp({ nextDue, now, onReviewAhead, hasCards }) {
  return (
    <div style={{
      background: '#F3EAD8', border: '1px solid #E3D6BE', borderRadius: 16,
      padding: '44px 32px', textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <FlameIcon size={40} />
      </div>
      <div className="font-display" style={{ fontWeight: 700, fontSize: 26, color: '#2B2218' }}>
        You're all caught up
      </div>
      <div style={{ fontSize: 15, color: '#6E5F4A', marginTop: 8 }}>
        {hasCards && nextDue != null && nextDue !== Infinity
          ? `Next review ${humanizeDue(nextDue, now)}.`
          : 'No verses in your deck yet.'}
      </div>
      {hasCards && (
        <button
          onClick={onReviewAhead}
          style={{
            marginTop: 22, background: '#fff', border: '1.5px solid #D8C7A6', color: '#5C4F3C',
            fontFamily: "'Public Sans',sans-serif", fontWeight: 600, fontSize: 14,
            padding: '11px 24px', borderRadius: 9, cursor: 'pointer',
          }}
        >
          Review ahead
        </button>
      )}
    </div>
  )
}
