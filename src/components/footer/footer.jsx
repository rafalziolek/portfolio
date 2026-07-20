import Text from '@/components/Text/text';
import Image from 'next/image';


function Footer() {
  return (
    <>
      <footer className="flex flex-col gap-[var(--space-xs)] px-[var(--space-s)] pt-[calc(4*var(--space-xxl))] pb-[var(--space-s)] max-[800px]:pt-[calc(2*var(--space-xxl))]">
        <div className="flex flex-col gap-[var(--space-s)] [&_a]:break-words [&_a]:underline">
          <Text type='display-heading' as='h3'>
            <a href='https://twitter.com/rafal_ziolek'>Twitter</a>,{' '}
            <a href='https://www.linkedin.com/in/rafal-ziolek/'>LinkedIn</a>,{' '}
            <a href='mailto://rafal.ziolek@icloud.com'>
              rafal.ziolek@icloud.com
            </a>
          </Text>
          <div className="flex flex-col gap-[var(--space-xxs)] [&_p]:max-w-[50ch] [&_span]:inline-block">
            <Text as='p' type='body'>
              Special thanks to my cats,{' '}
              <span>
                <Image
                  src='/tesla.jpg'
                  height={128}
                  width={128}
                  alt=''
                  className="mr-[var(--space-xxs)] size-5 rounded-full object-cover align-text-bottom"
                />
                Tesla
              </span>{' '}
              and{' '}
              <span>
                <Image
                  src='/newton.jpg'
                  height={128}
                  width={128}
                  alt=''
                  className="mr-[var(--space-xxs)] size-5 rounded-full object-cover align-text-bottom"
                />
                Newton
              </span>
              , for providing emotional support while building this website.
            </Text>
          </div>
        </div>
      </footer>
      <VerticalLines />
    </>
  );
}

export default Footer;

function VerticalLines() {
  const linesArr = Array.from(Array(20).keys());
  const numOfLines = linesArr.length;

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      {linesArr.map((num, index) => {
        const marginValue = Math.floor((numOfLines - index) / 2) - 1;
        return (
          <span
            key={index}
            style={{
              borderBottomWidth: `${index / 2}px`,
              marginBlock: marginValue > 0 ? `${marginValue}px` : '0',
            }}
            className="my-[10px] block w-full border-b-solid border-b-[var(--color-foreground-primary)] transition-all duration-100 hover:scale-y-110"
          ></span>
        );
      })}
    </div>
  );
}
