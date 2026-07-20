import Image from 'next/image';
import Text from '../Text/text';
import Link from 'next/link';

import { Stack } from '../Stack/Stack';
import Pill from '../Pill/Pill';
function Project({
  title,
  projectName,
  badgeText,
  path,
  imgWidth,
  imgHeight,
  children,
}) {
  return (
    <article className="group relative transition-all duration-200 max-[800px]:flex-col max-[800px]:gap-[var(--space-s)] [&_figure_div]:relative [&_figure_img]:z-1 [&_figure_img]:size-full [&_figure_img]:object-cover [&_figure_img]:opacity-60 [&_figure_img]:transition-all [&_figure_img]:duration-200 hover:[&_figure_img]:opacity-100 [@media(hover:none)_and_(pointer:coarse)]:[&_figure_img]:opacity-100 dark:[&_figure_img]:opacity-60 light:[&_figure_img]:opacity-90">
      {' '}
      <Link href={path ? path : ''}>
        <figure>
          <Image
            src={`/projects/${projectName}/image.png`}
            width={imgWidth}
            height={imgHeight}
            alt=""
          />
          <figcaption className="flex flex-col gap-[var(--space-xs)] py-[var(--space-xs)]">
            <Stack
              direction='row'
              gap='xs'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack
                direction='row'
                gap='2'
                // alignItems='center'
                style={{ width: '100%' }}
              >
                <Text as='h4' type='heading'>
                  {title}
                </Text>
                <Pill>{badgeText}</Pill>
              </Stack>
              {path ? (
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 max-[800px]:hidden">→</span>
              ) : (
                <span className="whitespace-nowrap text-[var(--font-size-caption)] text-[var(--color-foreground-secondary)] opacity-0 group-hover:opacity-100 max-[800px]:hidden">Coming soon</span>
              )}
            </Stack>
            <Text type='body-support' style={{ maxWidth: '50ch' }}>
              {children}
            </Text>
          </figcaption>
        </figure>{' '}
      </Link>
    </article>
  );
}

export default Project;
