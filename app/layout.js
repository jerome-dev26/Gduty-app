import './globals.css'; // We will create this next
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'J. Silva Atelier | Security Operations',
  description: 'Private Guard Duty Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020617] text-slate-100 antialiased`}>
        {/* This is where your page.js content will be injected */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}