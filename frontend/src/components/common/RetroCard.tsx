import type { ReactNode } from 'react';

interface RetroCardProps {
  title?: string;
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

export function RetroCard({ title, glow = false, className = '', children }: RetroCardProps) {
  const glowClass = glow ? 'retro-card--glow' : '';

  return (
    <div className={`retro-card ${glowClass} ${className}`.trim()}>
      {title && <h2 className="retro-card__title">{title}</h2>}
      {children}
    </div>
  );
}
