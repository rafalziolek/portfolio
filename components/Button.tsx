import Link from 'next/link';
import React from 'react';
import { Icon } from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label?: string;
  iconStart?: string;
  iconEnd?: string;
  variant?: 'primary';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  iconStart,
  iconEnd,
  className = '',
  variant = 'primary',
  href,
  ...props
}) => {
  const variants = {
    primary: 'bg-neutral-400 text-black',
  };

  const commonClasses = `flex h-10 ${
    label ? 'w-fit px-3' : 'w-10 px-0'
  } items-center justify-center gap-0.5 leading-none rounded-full text-lg font-medium -tracking-[0.02em] transition-all ease-out hover:bg-neutral-300 active:scale-96 ${variants[variant]} ${className} `;

  const content = (
    <>
      {iconStart && <Icon name={iconStart} size={22} />}
      {label && <span className="px-1">{label}</span>}
      {iconEnd && <Icon name={iconEnd} size={22} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} aria-label={props['aria-label']}>
        {content}
      </Link>
    );
  }

  return (
    <button className={commonClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;
