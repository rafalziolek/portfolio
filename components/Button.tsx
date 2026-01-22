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
    primary:
      'dark:bg-neutral-400 dark:text-black dark:hover:text-black bg-black text-neutral-300 hover:bg-neutral-900 hover:text-neutral-200 dark:hover:bg-neutral-300',
  };

  const commonClasses = `flex h-9 ${
    label ? 'w-fit px-2.5' : 'w-9 px-0'
  } items-center justify-center gap-0.75 leading-none rounded-full text-md font-normal -tracking-[0.02em] transition-all ease-out  active:scale-96 ${variants[variant]} ${className} `;

  const content = (
    <>
      {iconStart && <Icon name={iconStart} size={18} />}
      {label && <span className="px-0.5">{label}</span>}
      {iconEnd && <Icon name={iconEnd} size={18} />}
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
