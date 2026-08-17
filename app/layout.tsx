import React from 'react';
import type { Metadata } from 'next';

import { Providers } from './providers';

import './globals.scss';

import { Header } from '@/src/widgets/Header/ui/Header';

export const metadata: Metadata = {
    title: 'Каталог товаров',
    description: 'Каталог охотничьего оружия и снаряжения',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <Header />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
