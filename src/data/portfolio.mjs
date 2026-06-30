export const cta = {
  label: 'Selected works',
  href: '/work',
};

export const homepageSections = [
  {
    heading: 'Rafal J. Ziolek',
    body: [
      'A software designer, currently at Docplanner. I design and build product interfaces. Apps, websites, design systems.',
      'I work best when design and code function as one. I believe in prototypes over processes—the fastest way to understand something is to build it.',
    ],
  },
  {
    heading: 'Worked with',
    items: [
      { label: 'CartPanda', meta: '2025', href: 'https://cartpanda.com/' },
      { label: 'Multitood', meta: '2024', href: 'https://www.multitood.com/' },
      { label: 'Semiflat', meta: '2022–2024', href: 'https://www.semiflat.com/' },
    ],
  },
  {
    heading: 'Outside of design',
    items: [
      { label: 'Photography' },
      { label: 'Baking' },
      { label: 'Learning Japanese【日本ほ】' },
    ],
  },
  {
    heading: 'Connect',
    items: [
      { label: 'Email', href: 'mailto:rafal.ziolek@icloud.com' },
      { label: 'x.com', href: 'https://x.com/rafal_ziolek' },
      { label: 'Instagram', href: 'https://www.instagram.com/rafal.ziolek/' },
      { label: 'Are.na', href: 'https://www.are.na/rafal-ziolek' },
    ],
  },
];

const placeholderHeights = [
  'h-[220px]',
  'h-[360px]',
  'h-[520px]',
  'h-[280px]',
  'h-[640px]',
  'h-[260px]',
  'h-[440px]',
  'h-[340px]',
  'h-[540px]',
  'h-[300px]',
  'h-[420px]',
  'h-[620px]',
  'h-[240px]',
  'h-[480px]',
  'h-[320px]',
  'h-[560px]',
  'h-[380px]',
  'h-[700px]',
  'h-[260px]',
  'h-[500px]',
  'h-[460px]',
  'h-[300px]',
  'h-[600px]',
  'h-[340px]',
  'h-[520px]',
  'h-[240px]',
  'h-[580px]',
  'h-[400px]',
  'h-[680px]',
  'h-[280px]',
  'h-[460px]',
  'h-[360px]',
];

const placeholderColors = [
  'bg-neutral-800',
  'bg-stone-800',
  'bg-zinc-800',
  'bg-slate-800',
  'bg-red-950/45',
  'bg-orange-950/45',
  'bg-yellow-950/35',
  'bg-lime-950/35',
  'bg-emerald-950/40',
  'bg-teal-950/40',
  'bg-cyan-950/40',
  'bg-blue-950/40',
  'bg-violet-950/40',
  'bg-fuchsia-950/35',
  'bg-rose-950/40',
  'bg-gray-800',
];

export const workItems = placeholderHeights.map((height, index) => {
  const number = String(index + 1).padStart(2, '0');

  return {
    id: `selected-work-${number}`,
    title: `Selected work ${number}`,
    meta: 'Placeholder',
    tags: ['placeholder', `selected work ${number}`],
    height,
    color: placeholderColors[index % placeholderColors.length],
  };
});

export function filterWorks(items, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return items;
  }

  return items.filter((item) => {
    const searchableText = [
      item.title,
      item.meta,
      ...item.tags,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
