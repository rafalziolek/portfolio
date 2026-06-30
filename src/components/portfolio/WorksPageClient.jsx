'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { filterWorks } from '@/data/portfolio.mjs';

function WorksSearch({ value, onChange }) {
  return (
    <div className='fixed left-4 top-4 z-20 w-[300px] max-w-[calc(100vw-112px)]'>
      <label className='sr-only' htmlFor='work-search'>
        Search works
      </label>
      <div className='relative'>
        <input
          id='work-search'
          className='h-11 w-full rounded-full bg-neutral-900 py-0 pl-6 pr-12 text-[14px] font-medium leading-[1.3] tracking-[-0.01em] text-neutral-100 outline-none placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200'
          onChange={(event) => onChange(event.target.value)}
          placeholder='Search'
          type='search'
          value={value}
        />
        <span
          aria-hidden='true'
          className='pointer-events-none absolute right-6 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-neutral-100'
        >
          <span className='absolute -bottom-1 -right-1 h-2 w-0.5 -rotate-45 rounded-full bg-neutral-100' />
        </span>
      </div>
    </div>
  );
}

function CloseButton() {
  return (
    <Link
      aria-label='Close works page'
      className='fixed right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-100 outline-none hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200'
      href='/'
    >
      <span aria-hidden='true' className='relative h-4 w-4'>
        <span className='absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rotate-45 rounded-full bg-neutral-100' />
        <span className='absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 -rotate-45 rounded-full bg-neutral-100' />
      </span>
    </Link>
  );
}

function WorkCard({ item }) {
  return (
    <article
      aria-label={item.title}
      className={`mb-2 break-inside-avoid ${item.color} ${item.height}`}
    />
  );
}

function WorksGrid({ items }) {
  if (items.length === 0) {
    return <div className='pt-19' />;
  }

  return (
    <div className='columns-1 gap-2 px-4 pb-20 pt-19 sm:columns-2 lg:columns-3 xl:columns-4'>
      {items.map((item) => (
        <WorkCard item={item} key={item.id} />
      ))}
    </div>
  );
}

export default function WorksPageClient({ items }) {
  const [query, setQuery] = useState('');
  const visibleItems = useMemo(() => filterWorks(items, query), [items, query]);

  return (
    <main className='min-h-screen bg-black text-neutral-200'>
      <WorksSearch onChange={setQuery} value={query} />
      <CloseButton />
      <WorksGrid items={visibleItems} />
    </main>
  );
}
