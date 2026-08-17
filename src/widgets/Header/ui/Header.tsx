'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAppSelector } from '@/src/shared/store/hooks';

import scss from './Header.module.scss';

import { selectCartCount } from '@/src/entities/cart';
import { selectFavoritesCount } from '@/src/entities/favorites';

const LINKS = [
    { href: '/', label: 'Каталог' },
    { href: '/favorites', label: 'Избранное' },
    { href: '/cart', label: 'Корзина' },
];

export function Header() {
    const pathname = usePathname();
    const cartCount = useAppSelector(selectCartCount);
    const favoritesCount = useAppSelector(selectFavoritesCount);

    return (
        <header className={scss.header}>
            <nav className={scss.nav}>
                <Link
                    href="/"
                    className={scss.logo}
                ></Link>
                <ul className={scss.menu}>
                    {LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={
                                    pathname === link.href
                                        ? scss.active
                                        : undefined
                                }
                            >
                                {link.label}
                                {link.href === '/cart' && cartCount > 0 && (
                                    <span className={scss.badge}>
                                        {cartCount}
                                    </span>
                                )}
                                {link.href === '/favorites' &&
                                    favoritesCount > 0 && (
                                        <span className={scss.badge}>
                                            {favoritesCount}
                                        </span>
                                    )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
