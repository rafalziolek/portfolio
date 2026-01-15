'use client';

import React from 'react';
import DottedProgressBar from './DottedProgressBar';

type LearningItem = {
  id: string;
  title: string;
  description: string; // Used as the bottom-right text
  progress: number;
  width: string;
};

const items: LearningItem[] = [
  {
    id: 'vienosserie',
    title: 'Vegan vienosserie',
    description: 'Can make decent croissants',
    progress: 0.6,
    width: '100%',
  },
  {
    id: 'japanese',
    title: 'Japanese',
    description: 'Getting the hang of Kanji...',
    progress: 0.2,
    width: '100%',
  },
  {
    id: 'react-native',
    title: 'React native',
    description: 'Know React, learning the mobile quirks',
    progress: 0.1,
    width: '100%',
  },
];

export default function LearningSection() {
  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((item) => (
        <DottedProgressBar
          key={item.id}
          label={item.title}
          description={item.description}
          progress={item.progress}
          width={item.width}
        />
      ))}
    </div>
  );
}
