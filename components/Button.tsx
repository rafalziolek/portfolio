import React from 'react';
import { Icon } from './Icon';

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  iconStart?: string;
  iconEnd?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  iconStart,
  iconEnd,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
}) => {
  const variants = {
    primary: 'bg-neutral-400 text-black',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                flex gap-0.5 items-center justify-center px-2.5 h-[42px] rounded-full font-medium text-lg -tracking-[0.02em] min-w-[42px] w-fit
                ${variants[variant]}
                ${className}
            `}
    >
      {iconStart && <Icon name={iconStart} size={20} />}
      {label && <span className="px-1.5">{label}</span>}
      {iconEnd && <Icon name={iconEnd} size={20} />}
    </button>
  );
};

export default Button;
