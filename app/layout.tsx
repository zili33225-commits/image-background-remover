import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Image Background Remover',
  description: 'Remove background from images using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
      </body>
    </html>
  );
}