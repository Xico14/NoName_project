import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoName Frontend',
  description: 'Frontend for NoName project'
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
