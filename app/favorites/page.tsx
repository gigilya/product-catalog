import type { Metadata } from 'next';

import { FavoritesList } from '@/src/widgets/FavoritesList/ui/FavoritesList';

export const metadata: Metadata = {
    title: 'Избранное',
};

export default function FavoritesPage() {
    return <FavoritesList />;
}
