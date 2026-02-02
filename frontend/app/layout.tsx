import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matrix Terminal - AI Mental Coach',
  description: 'A Matrix-style terminal interface for your AI mental coach',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
