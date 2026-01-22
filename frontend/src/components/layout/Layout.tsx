import type { ReactNode } from 'react';
import { Header } from './Header';
import { CRTOverlay } from '../common/CRTOverlay';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <CRTOverlay />
      <Header />
      <main className="layout__content">{children}</main>
    </div>
  );
}
