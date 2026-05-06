import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Campus Notifications | Microservice Dashboard',
  description:
    'Stay updated with real-time campus notifications including events, results, and placement drives. Powered by the Campus Notifications Microservice.',
  keywords: ['campus', 'notifications', 'microservice', 'placements', 'events', 'results'],
  authors: [{ name: 'Campus Notify Team' }],
  openGraph: {
    title: 'Campus Notifications Microservice',
    description: 'Real-time campus notification dashboard with priority inbox',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
