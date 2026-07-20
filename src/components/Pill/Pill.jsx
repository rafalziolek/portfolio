import { Stack } from '../Stack/Stack';
import Text from '../Text/text';
function Pill({ children, circleText, className }) {
  if (circleText) {
    return (
      <Stack
        gap='xxs'
        direction='row'
        alignItems='center'
        className={className}
      >
        <span className="flex size-[10px] items-center justify-center rounded-full bg-[var(--color-orange)] text-[var(--font-size-xs)] text-black"></span>
        <span className={`box-border whitespace-nowrap rounded-full text-[var(--font-size-xs)] leading-[var(--line-height-m)] [font-variant-position:super] ${className || ''}`}>{children}</span>
      </Stack>
    );
  }
  return (
    <Text
      as='span'
      type='caption'
      color='secondary'
      className={`box-border whitespace-nowrap rounded-full text-[var(--font-size-xs)] leading-[var(--line-height-m)] [font-variant-position:super] ${className || ''}`}
    >
      {children}
    </Text>
  );
}

export default Pill;
