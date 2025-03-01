import './globals.scss';
import type { Metadata } from 'next';
import { Providers } from '@/store/providers';
import AppHeader from '@/components/Layout/AppHeader/AppHeader';
import AppSidebar from '@/components/Layout/AppSidebar/AppSidebar';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import StarryBackground from '@/components/StarryBackground/StarryBackground';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A modern weather application built with Next.js and Redux',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            <StarryBackground />
            <div className="app-container">
              <AppSidebar />
              <div className="main-content">
                <AppHeader />
                <main className="content-area">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}