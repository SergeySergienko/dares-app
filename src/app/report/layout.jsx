import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Image from 'next/image';
import Link from 'next/link';

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

export default function ReportLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className='mx-auto'>
          <Link href='/'>
            <Image
              src='/inspection_form_logo.jpg'
              alt='inspection form logo'
              width={400}
              height={95}
              priority={true}
            />
          </Link>
        </div>
        <section>{children}</section>
      </body>
    </html>
  );
}
