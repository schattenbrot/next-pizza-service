import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  type?: 'submit' | 'reset' | 'button';
  color?: 'primary' | 'secondary';
  size?: 'normal' | 'large';
  showShadow?: boolean;
  showHover?: boolean;
  showActive?: boolean;
  styles?: string;
  onClick?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  children: ReactNode;
};

export default ({
  href,
  type = 'submit',
  color = 'primary',
  size = 'normal',
  showShadow = false,
  showHover = false,
  showActive = false,
  styles = '',
  onClick = undefined,
  onMouseEnter = undefined,
  onMouseLeave = undefined,
  children,
}: ButtonProps) => {
  const buttonPadding = `px-${size === 'normal' ? '2' : '4'} py-${
    size === 'normal' ? '1' : '2'
  }`;
  const buttonColor =
    color === 'primary' ? 'bg-purple-700 text-purple-200' : 'bg-purple-200';
  const buttonBorderRadius = `rounded-tl-${
    size === 'normal' ? '2' : ''
  }xl rounded-br-${size === 'normal' ? '2' : ''}xl`;
  const buttonShadow = `shadow-lg`;
  const buttonHover = 'hover:scale-105';
  const buttonActive = 'active:scale-95';

  let buttonClasses =
    buttonPadding + ' ' + buttonColor + ' ' + buttonBorderRadius;
  if (showShadow) buttonClasses += ' ' + buttonShadow;
  if (showHover) buttonClasses += ' ' + buttonHover;
  if (showActive) buttonClasses += ' ' + buttonActive;
  if (styles) buttonClasses += ' ' + styles;

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};
