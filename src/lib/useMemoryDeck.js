import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { MEMORY_VERSES } from '../data/memoryVerses'
import { newCard, schedule } from './sm2'

// Persisted memory deck: a map of verse reference -> SM-2 card state.
// Seeded from the starter verses on first run.

const DECK_KEY = 'memoryDeck'

function seedDeck() {
  const deck = {}
  for (const ref of Object.keys(MEMORY_VERSES)) deck[ref] = newCard(ref)
  return deck
}

export function useMemoryDeck() {
  const [deck, setDeck] = useLocalStorage(DECK_KEY, seedDeck())

  const grade = useCallback((ref, q) => {
    setDeck(prev => {
      const card = prev[ref]
      if (!card) return prev
      return { ...prev, [ref]: schedule(card, q) }
    })
  }, [setDeck])

  const addCard = useCallback((ref) => {
    setDeck(prev => (prev[ref] ? prev : { ...prev, [ref]: newCard(ref) }))
  }, [setDeck])

  const removeCard = useCallback((ref) => {
    setDeck(prev => {
      if (!prev[ref]) return prev
      const next = { ...prev }
      delete next[ref]
      return next
    })
  }, [setDeck])

  const resetDeck = useCallback(() => setDeck(seedDeck()), [setDeck])

  const cards = useMemo(() => Object.values(deck), [deck])

  return { deck, cards, grade, addCard, removeCard, resetDeck }
}
