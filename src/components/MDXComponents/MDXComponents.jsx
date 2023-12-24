import Text from '../Text/text';
import Image from 'next/image';
import WatsonHeading from '@/app/[projectSlug]/Components/WatsonHeading';
import { Stack } from '../Stack/Stack';
import List from '../List/List';

export const components = {
  WatsonHeading: () => <WatsonHeading />,
  Image: (props) => {
    return (
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={{
          gridColumn: 'span 12',
          paddingBottom: 'var(--space-l)',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          ...props.style,
        }}
      />
    );
  },
  Stack: (props) => {
    return (
      <Stack
        style={{
          gridColumn: 'span 12',
          width: '100%',
        }}
      >
        {props.children}
      </Stack>
    );
  },
  h1: (props) => (
    <Text
      as='h1'
      type='mainHeading'
      style={{
        marginBottom: 'var(--space-m)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </Text>
  ),
  h2: (props) => (
    <Text
      as='h2'
      type='heading'
      style={{
        paddingTop: 'var(--space-xl)',
        marginBottom: 'var(--space-xs)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </Text>
  ),
  h3: (props) => (
    <Text
      as='h3'
      type='heading'
      color='secondary'
      style={{
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
        marginBlock: 'var(--space-xs) var(--space-xxs)',
      }}
    >
      {props.children}
    </Text>
  ),
  p: (props) => (
    <Text
      as='p'
      type='body'
      style={{
        paddingBottom: 'var(--space-l)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </Text>
  ),
  ul: (props) => (
    <List
      style={{
        paddingBottom: 'var(--space-l)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </List>
  ),
};
