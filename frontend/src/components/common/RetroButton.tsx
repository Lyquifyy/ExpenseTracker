import type { ButtonHTMLAttributes } from 'react';

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger';
  size?: 'default' | 'small';
}

export function RetroButton({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: RetroButtonProps) {
  const variantClass = variant !== 'default' ? `retro-button--${variant}` : '';
  const sizeClass = size !== 'default' ? `retro-button--${size}` : '';

  return (
    <button
      className={`retro-button ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
