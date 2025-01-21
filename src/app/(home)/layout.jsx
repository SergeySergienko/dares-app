import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'DARES',
  description: 'Diving And Repair Equipment Service',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
