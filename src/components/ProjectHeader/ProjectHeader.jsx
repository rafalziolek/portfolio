import Text from '../Text/text';
import React from 'react';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import Link from 'next/link';
import WatsonHeading from '@/app/[projectSlug]/Components/WatsonHeading';

function ProjectHeader({ title, abstract, details, header }) {
  return (
    <Grid className="max-[1170px]:flex">
      <GridItem startColumn={3} endColumn={13}>
        <header className="my-[var(--space-xl)] mb-[var(--space-xxl)]">
          <div className="flex flex-col gap-[var(--space-s)]">
            {header ? (
              header
            ) : (
              <div>
                <Text as='h1' type='display-heading'>
                  {title}
                </Text>
              </div>
            )}

            <div className="flex w-fit flex-col gap-[var(--space-xxl)] [&>p]:max-w-[50ch] [&>p]:leading-[1.3]">
              <Text>{abstract}</Text>
              <ul className="flex list-none flex-col gap-[var(--space-2)]">
                {details.map((item, index) => {
                  return (
                    <li className="flex items-start gap-[var(--space-2)] [&_a]:text-[var(--font-size-body)] [&_a]:font-[var(--font-weight-m)] [&_span]:text-[var(--font-size-body)] [&_span]:font-[var(--font-weight-m)]" key={index}>
                      <h4 className="block w-1/5 min-w-[70px] text-[var(--font-size-xs)] leading-[var(--line-height-m)] font-[var(--font-weight-m)] text-[var(--color-foreground-secondary)] [font-variant-position:super]">
                        {item.title}
                      </h4>
                      {item.items.map((item, index) => (
                        <React.Fragment key={index}>
                          {typeof item.link === 'string' ? (
                            <Link href={item.link}>{item.text}</Link>
                          ) : (
                            <Text as='span'>{item.text}</Text>
                          )}
                        </React.Fragment>
                      ))}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </header>
      </GridItem>
    </Grid>
  );
}

export default ProjectHeader;
