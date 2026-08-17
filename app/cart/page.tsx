import type { Metadata } from 'next';

import { CartList } from '@/src/widgets/CartList/ui/CartList';

export const metadata: Metadata = {
    title: 'Корзина',
};

export default function CartPage() {
    return <CartList />;
}
