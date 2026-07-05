import { useState, useEffect } from 'react'

// Foundation for all Phase 1 browser-only persistence. Reads/writes JSON to
// localStorage, tolerates private-mode / quota errors, and keeps tabs in sync.

const PREFIX = 'lampstand.'

export function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStored(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // quota exceeded or storage unavailable (private mode) — degrade to memory
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue))

  useEffect(() => {
    writeStored(key, value)
  }, [key, value])

  // Keep other open tabs in sync when this key changes elsewhere.
  useEffect(() => {
    function onStorage(e) {
      if (e.key !== PREFIX + key || e.newValue == null) return
      try {
        setValue(JSON.parse(e.newValue))
      } catch {
        // ignore malformed payloads from other tabs
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue]
}
