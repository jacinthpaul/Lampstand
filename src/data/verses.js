export const VERSE_DATA = {
  'Romans 8:28': {
    reference: 'Romans 8:28',
    book: 'Romans',
    chapter: 8,
    verse: 28,
    text: 'And we know that for those who love God all things work together for good, for those who are called according to his purpose.',
    translation: 'ESV',
    lenses: {
      meaning: {
        title: 'In plain language',
        body: "Paul isn't promising that only good things will happen — he's promising that God weaves every circumstance, even suffering, toward the ultimate good of those who love him. \"Good\" here means being shaped into the likeness of Christ, not comfort.",
        sources: ['Romans 8:29', 'Genesis 50:20'],
      },
      context: {
        title: 'Historical context',
        body: "Paul wrote Romans around AD 57 from Corinth, to a church he had not yet visited — addressing both Jewish and Gentile believers in the empire's capital. The letter is his most systematic treatment of the gospel.",
        sources: ['Romans 1:7', 'Acts 20:2–3'],
      },
      crossrefs: {
        title: 'Cross-references',
        body: "This promise builds on the Joseph narrative (Genesis 50:20) and anticipates the \"golden chain\" of Romans 8:29–30. See also Psalm 84:11, Jeremiah 29:11, and James 1:2–4 for parallel assurances.",
        sources: ['Genesis 50:20', 'Romans 8:29–30', 'Psalm 84:11'],
      },
      application: {
        title: 'Modern application',
        body: 'In seasons of loss, illness, or injustice, this verse grounds believers in a theological conviction rather than a feeling. It doesn\'t dismiss pain but reframes it: every experience is raw material in the hands of a purposeful God.',
        sources: ['James 1:2–4', 'Philippians 4:11'],
      },
      reflect: {
        title: 'Reflection questions',
        body: '1. What "all things" in your current life are hardest to trust God with?\n\n2. How does the phrase "those who love God" shape your understanding of who this promise is for?\n\n3. What would it look like to act as if this were true today?',
        sources: [],
      },
    },
  },
  'Psalm 23:1': {
    reference: 'Psalm 23:1',
    book: 'Psalm',
    chapter: 23,
    verse: 1,
    text: 'The Lord is my shepherd; I shall not want.',
    translation: 'ESV',
    lenses: {
      meaning: {
        title: 'In plain language',
        body: "This opening line is a declaration of total reliance. A shepherd in the ancient Near East was responsible for every need of the flock — food, water, safety, direction. \"I shall not want\" doesn't mean never desiring things; it means every essential need is met.",
        sources: ['Psalm 23:2–3', 'John 10:11'],
      },
      context: {
        title: 'Historical context',
        body: 'Attributed to David, who began as a literal shepherd before becoming king. The shepherd metaphor would have been immediately vivid to his original audience. This psalm was likely composed during a time of personal crisis or reflection.',
        sources: ['1 Samuel 16:11', '2 Samuel 7:8'],
      },
      crossrefs: {
        title: 'Cross-references',
        body: 'Jesus takes up this exact metaphor in John 10, calling himself the Good Shepherd who lays down his life for the sheep. Ezekiel 34 critiques Israel\'s human shepherds and promises God himself will shepherd his people.',
        sources: ['John 10:11', 'Ezekiel 34:15', 'Isaiah 40:11'],
      },
      application: {
        title: 'Modern application',
        body: 'In an age of constant self-sufficiency, this psalm invites a posture of rest and trust. Begin each day naming the specific "wants" you\'re carrying and consciously placing them under God\'s care.',
        sources: ['Matthew 6:25–34', 'Philippians 4:19'],
      },
      reflect: {
        title: 'Reflection questions',
        body: '1. What does it mean to you personally that God is your shepherd?\n\n2. What "wants" are you struggling to release to God\'s care?\n\n3. How might your day look different if you started it with this declaration?',
        sources: [],
      },
    },
  },
  'John 3:16': {
    reference: 'John 3:16',
    book: 'John',
    chapter: 3,
    verse: 16,
    text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.',
    translation: 'ESV',
    lenses: {
      meaning: {
        title: 'In plain language',
        body: "This is the gospel in miniature. \"So loved\" doesn't mean \"loved so much\" but describes the manner of love — it's the kind of love that acts dramatically. God's love took concrete form: giving his Son. The offer is universal (\"whoever\") but conditional on belief.",
        sources: ['John 3:17–18', '1 John 4:9–10'],
      },
      context: {
        title: 'Historical context',
        body: 'Jesus speaks these words in a nighttime conversation with Nicodemus, a Pharisee and member of the Jewish ruling council. Nicodemus came secretly, suggesting he was drawn to Jesus but feared public association. This context makes the universal scope of God\'s love all the more striking.',
        sources: ['John 3:1–2', 'John 19:39'],
      },
      crossrefs: {
        title: 'Cross-references',
        body: 'See 1 John 4:9–10 for John\'s parallel language in his letter. Romans 5:8 amplifies the love theme. The "only Son" language echoes the sacrifice of Isaac (Genesis 22:2).',
        sources: ['1 John 4:9–10', 'Romans 5:8', 'Genesis 22:2'],
      },
      application: {
        title: 'Modern application',
        body: 'The universal "whoever" dismantles any sense that God\'s love is reserved for the religious or the worthy. It also places the weight of response on belief — an active trust, not mere intellectual acknowledgment.',
        sources: ['Romans 10:9', 'Ephesians 2:8–9'],
      },
      reflect: {
        title: 'Reflection questions',
        body: '1. What does "believing in him" mean beyond intellectual agreement?\n\n2. How does knowing God loved the world (not just you) shape your view of others?\n\n3. What would your life look like if you lived as if this were definitively true?',
        sources: [],
      },
    },
  },
}

export const RECENT_VERSES = ['Romans 8:28', 'Psalm 23:1', 'John 3:16', 'Philippians 4:6']
export const SAVED_VERSES = ['Matthew 5:14', 'Isaiah 40:31']

export const SAMPLE_CHAT = {
  'Romans 8:28': [
    { role: 'user', text: 'What does "called according to his purpose" mean?' },
    {
      role: 'ai',
      text: "It refers to God's saving call — those he has drawn to himself. Paul unpacks this in the next verses as a chain: foreknew → predestined → called → justified → glorified.",
      cite: 'Romans 8:29–30',
    },
  ],
}
