import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seokyoung-kim-portfolio.vercel.app'),
  title: 'SeoKyoung Kim — AI Portfolio',
  description: 'Explore SeoKyoung Kim’s AI portfolio as a focused CV or an interactive experience.',
  openGraph: {
    title: 'SeoKyoung Kim — AI Portfolio',
    description: 'A focused CV and interactive portfolio covering autonomous driving, anomaly detection, and vehicle monitoring.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'SeoKyoung Kim — AI Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeoKyoung Kim — AI Portfolio',
    description: 'A focused CV and interactive portfolio covering autonomous driving, anomaly detection, and vehicle monitoring.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
