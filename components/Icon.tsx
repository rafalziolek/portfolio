import React, { SVGProps, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className, ...props }) => {
  const SvgIcon = useMemo(() => {
    return dynamic<SVGProps<SVGSVGElement>>(() =>
      import(`@/assets/icons/${name}.svg`).catch(() => {
        return function EmptyIcon() {
          return <></>;
        };
      })
    );
  }, [name]);

  return <SvgIcon width={size} height={size} className={className} {...props} />;
};

Icon.displayName = 'Icon';
