import floozIcon from '@/assets/projects/flooz-icon.png';
import ninjaApp3 from '@/assets/projects/ninja-app-3.png';
import ninjaBranding from '@/assets/projects/ninja-branding.png';
import ninjaPoster1 from '@/assets/projects/ninja-poster-1.png';
import rainbowApp2 from '@/assets/projects/rainbow-app-2.png';
import regentApp4 from '@/assets/projects/regent-app-4.png';
import shrineApp2 from '@/assets/projects/shrine-app-2.png';
import surfBranding2 from '@/assets/projects/surf-branding-2.png';
import { StaticImageData } from 'next/image';

export interface ProjectImage {
  id: string;
  title: string;
  src: StaticImageData;
  alt: string;
}

export const PROJECTS: ProjectImage[] = [
  {
    id: 'flooz-icon',
    title: 'Flooz Icon',
    src: floozIcon,
    alt: 'Flooz Icon',
  },
  {
    id: 'ninja-app-3',
    title: 'Ninja App',
    src: ninjaApp3,
    alt: 'Ninja App Interface',
  },
  {
    id: 'ninja-branding',
    title: 'Ninja Branding',
    src: ninjaBranding,
    alt: 'Ninja Branding',
  },
  {
    id: 'ninja-poster-1',
    title: 'Ninja Poster',
    src: ninjaPoster1,
    alt: 'Ninja Poster Design',
  },
  {
    id: 'rainbow-app-2',
    title: 'Rainbow App',
    src: rainbowApp2,
    alt: 'Rainbow App Interface',
  },
  {
    id: 'regent-app-4',
    title: 'Regent App',
    src: regentApp4,
    alt: 'Regent App Interface',
  },
  {
    id: 'shrine-app-2',
    title: 'Shrine App',
    src: shrineApp2,
    alt: 'Shrine App Interface',
  },
  {
    id: 'surf-branding-2',
    title: 'Surf Branding',
    src: surfBranding2,
    alt: 'Surf Branding',
  },
];
