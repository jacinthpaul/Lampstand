export function FlameIcon({ size = 24, fill = '#E7C46B', innerFill = '#F6EEDB' }) {
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2.5c2.8 3.3 5 5.6 5 9.2A5 5 0 0 1 12 17a5 5 0 0 1-5-5.3c0-2.7 1.9-4.8 5-8.2z" fill={fill} />
      <path d="M12 8c1.3 1.6 2.2 2.7 2.2 4.2A2.2 2.2 0 0 1 12 14.3a2.2 2.2 0 0 1-2.2-2.4c0-1.2.8-2.1 2.2-3.9z" fill={innerFill} />
    </svg>
  )
}

export function BookIcon({ size = 24, stroke = '#DCEDEA' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7">
      <path d="M4 6h13M4 6l-1.5-1.5M4 6 2.5 7.5" />
      <rect x="6" y="3.5" width="13" height="5" rx="1.3" />
      <path d="M4 6v12" />
      <circle cx="4" cy="18" r="1.4" fill="#E7C46B" stroke="none" />
    </svg>
  )
}

export function TimelineIcon({ size = 24, stroke = '#E2EBD6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7">
      <path d="M4 19V5M4 19h16" />
      <circle cx="8" cy="14" r="1.6" fill="#E7C46B" stroke="none" />
      <circle cx="13" cy="9" r="1.6" fill="#E7C46B" stroke="none" />
      <circle cx="18" cy="12" r="1.6" fill="#E7C46B" stroke="none" />
    </svg>
  )
}

export function MapPinIcon({ size = 24, stroke = '#F0E2C2' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7">
      <path d="M12 21s-6.5-5.6-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.4-6.5 10-6.5 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  )
}

export function ChatIcon({ size = 24, stroke = '#E4DCF0' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7">
      <path d="M5 5h14v10H9l-4 3z" />
    </svg>
  )
}

export function SearchIcon({ size = 18, stroke = '#A9792A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </svg>
  )
}

export function HomeIcon({ size = 22, stroke = '#6F2F33' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}

export function LibraryIcon({ size = 22, stroke = '#A79A82' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
      <rect x="4" y="3" width="14" height="18" rx="2" />
      <path d="M8 3v18" />
    </svg>
  )
}

export function UserIcon({ size = 22, stroke = '#A79A82' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 14, stroke = '#F6EEDB' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowLeftIcon({ size = 20, stroke = '#6F2F33' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

export function GridIcon({ size = 22, stroke = '#A79A82' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
