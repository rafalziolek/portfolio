import Text from '../Text/text';
import Image from 'next/image';
// import WatsonHeading from '@/app/[projectSlug]/Components/WatsonHeading';
export const components = {
  //   WatsonHeading: () => <WatsonHeading />,
  Image: (props) => {
    return (
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={{
          gridColumn: 'span 12',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
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
        marginBottom: 'var(--space-l)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </Text>
  ),
};
