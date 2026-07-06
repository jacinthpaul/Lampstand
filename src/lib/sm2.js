// SM-2 spaced-repetition algorithm (SuperMemo 2). Pure functions, no I/O.
// Cards recall the verse text from its reference; grading schedules the next
// review entirely in the browser.

const MS_PER_DAY = 86400000
export const MASTERED_INTERVAL = 21 // days retained before a card counts as memorized

// Quality grades exposed to the UI, mapped to SM-2's 0-5 scale.
export const GRADES = { again: 1, hard: 3, good: 4, easy: 5 }

export function newCard(ref) {
  return { ref, reps: 0, ef: 2.5, interval: 0, due: 0, lastReviewed: null }
}

// Interval (in whole days) a grade would produce for this card, for UI hints.
// Per SM-2 the current interval depends on rep count, not on q (once q >= 3);
// q only shifts the easiness factor for future reviews.
export function previewInterval(card, q) {
  if (q < 3) return 0
  if (card.reps === 0) return 1
  if (card.reps === 1) return 6
  return Math.round(card.interval * card.ef)
}

// Return a new card reflecting a review graded with quality q (0-5).
export function schedule(card, q, now = Date.now()) {
  let { reps, ef, interval } = card

  if (q < 3) {
    reps = 0
    interval = 0 // lapse: relearn in the same session
  } else {
    interval = previewInterval(card, q)
    reps += 1
  }

  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  if (ef < 1.3) ef = 1.3

  const due = q < 3 ? now : now + interval * MS_PER_DAY
  return { ...card, reps, ef, interval, due, lastReviewed: now }
}

export function isDue(card, now = Date.now()) {
  return card.due <= now
}

export function statusOf(card) {
  if (card.reps === 0 && card.lastReviewed == null) return 'new'
  if (card.interval >= MASTERED_INTERVAL) return 'memorized'
  return 'learning'
}
