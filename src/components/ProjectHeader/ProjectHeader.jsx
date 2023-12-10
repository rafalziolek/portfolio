import styles from './ProjectHeader.module.scss';
import Text from '../Text/text';
import React from 'react';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import Link from 'next/link';

function ProjectHeader({ title, abstract, details }) {
  return (
    <Grid className={styles['header-wrapper']}>
      <GridItem startColumn={3} endColumn={13}>
        <header className={styles.header}>
          <div className={`${styles['header-layout']}`}>
            <div className={styles.title}>
              <Text as='h1' type='display-heading'>
                {title}
              </Text>
            </div>
            <div className={styles.details}>
              <Text>{abstract}</Text>
              <ul className={`${styles['details-list-wrapper']}`}>
                {details.map((item, index) => {
                  return (
                    <li key={index}>
                      <h4 className={`${styles['list-title']}`}>
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
