import React from 'react';

import { cn } from '@/lib/utils';
interface LogoProps {
  className?: string;
  wrapperClassName?: string;
  onlyLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  wrapperClassName = '',
  onlyLogo = false,
}) => {
  if (onlyLogo) {
    return (
      <a href="/">
        <img
          src="/images/logos/investipal_symbol_white.png"
          alt="Investipal Logo"
          width="58"
          height="58"
          className="object-contain"
        />
      </a>
    );
  }
  return (
    <div className={cn(``, wrapperClassName)}>
      <a href="/" className={cn(`relative block h-8 w-40`, className)}>
        <img
          src="/images/logos/investipal_logo_primary.png"
          alt="Investipal Logo"
          className="size-full object-contain"
        />
      </a>
    </div>
  );
};

export default Logo;
