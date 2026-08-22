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
  description: 'Portfolio of SeoKyoung Kim, an AI undergraduate at Hanyang University ERICA.',
  openGraph: {
    title: 'SeoKyoung Kim — AI Portfolio',
    description: 'AI undergraduate work in autonomous driving, industrial anomaly detection, and vehicle monitoring.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'SeoKyoung Kim — AI Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeoKyoung Kim — AI Portfolio',
    description: 'AI undergraduate work in autonomous driving, industrial anomaly detection, and vehicle monitoring.',
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
