import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
    title: 'Console Logs by Teja',
    description: 'A Digital Solar System - Portfolio by Teja',
    keywords: ['portfolio', 'webgl', 'creative developer', 'full stack'],
};

import Cursor from '@/components/ui/Cursor';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Cursor />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    );
}
