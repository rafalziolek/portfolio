import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, className = '', ...props }) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      className={`text-foreground decoration-foreground/40 hover:decoration-foreground underline decoration-dotted decoration-1 underline-offset-4 transition-all hover:decoration-solid ${className}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
