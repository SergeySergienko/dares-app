import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import '../globals.css';

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
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarTrigger />
          <main>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
