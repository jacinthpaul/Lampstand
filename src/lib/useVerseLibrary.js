import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { RECENT_VERSES, SAVED_VERSES } from '../data/verses'

// Real, persisted recent + saved verses (Phase 1, item 1). The static arrays
// in verses.js seed first-run state; after that this is the source of truth.

const RECENT_KEY = 'recentVerses'
const SAVED_KEY = 'savedVerses'
const MAX_RECENT = 12

export function useVerseLibrary() {
  const [recent, setRecent] = useLocalStorage(RECENT_KEY, RECENT_VERSES)
  const [saved, setSaved] = useLocalStorage(SAVED_KEY, SAVED_VERSES)

  const addRecent = useCallback((ref) => {
    if (!ref) return
    setRecent(prev => [ref, ...prev.filter(r => r !== ref)].slice(0, MAX_RECENT))
  }, [setRecent])

  const isSaved = useCallback((ref) => saved.includes(ref), [saved])

  const toggleSaved = useCallback((ref) => {
    if (!ref) return
    setSaved(prev => (prev.includes(ref) ? prev.filter(r => r !== ref) : [ref, ...prev]))
  }, [setSaved])

  return { recent, saved, addRecent, isSaved, toggleSaved }
}
