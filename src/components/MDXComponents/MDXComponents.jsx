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
      type='sectionHeading'
      style={{
        paddingTop: 'var(--space-l)',
        marginBottom: 'var(--space-m)',
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
      type='sectionHeading'
      color='secondary'
      style={{
        marginBottom: 'var(--space-xxs)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
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
        marginBottom: 'var(--space-xxl)',
        maxWidth: '50ch',
        gridColumnStart: 3,
        gridColumnEnd: 13,
      }}
    >
      {props.children}
    </Text>
  ),
};
