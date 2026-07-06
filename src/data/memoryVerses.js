// Starter memory-verse deck. KJV text (public domain) so the bundled content
// carries no licensing burden. Phase 2 will let users add any verse via a
// Bible API; for now the deck is seeded from these classics.

export const MEMORY_VERSES = {
  'Psalm 119:105': 'Thy word is a lamp unto my feet, and a light unto my path.',
  'John 3:16': 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  'Psalm 23:1': 'The LORD is my shepherd; I shall not want.',
  'Philippians 4:13': 'I can do all things through Christ which strengtheneth me.',
  'Romans 8:28': 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
  'Proverbs 3:5': 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
  'Joshua 1:9': 'Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
  'Isaiah 40:31': 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
  'Jeremiah 29:11': 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
  'Matthew 6:33': 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
  'Philippians 4:6': 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
  '2 Timothy 1:7': 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
}

export function memoryText(ref) {
  return MEMORY_VERSES[ref] || ''
}
