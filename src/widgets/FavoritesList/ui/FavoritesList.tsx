'use client';

import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/src/shared/store/hooks';

import scss from './FavoritesList.module.scss';

import { cartActions, selectCartItems } from '@/src/entities/cart';
import { favoritesActions, selectFavorites } from '@/src/entities/favorites';
import { selectProducts } from '@/src/entities/product';
import { Cart } from '@/src/shared/ui/Cart/Cart';

export function FavoritesList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const favoriteIds = useAppSelector(selectFavorites);
    const products = useAppSelector(selectProducts);
    const cartItems = useAppSelector(selectCartItems);

    const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));
    const cartIds = cartItems.map((i) => i.productId);

    if (favoriteIds.length === 0) {
        return (
            <div className={scss.empty}>
                <p>В избранном пока ничего нет</p>
                <Link href="/">Перейти в каталог</Link>
            </div>
        );
    }

    return (
        <div className={scss.container}>
            <div className={scss.grid}>
                {favoriteProducts.map((product) => (
                    <Cart
                        key={product.id}
                        product={product}
                        isInCart={cartIds.includes(product.id)}
                        isInFavorites={true}
                        onClick={() => router.push(`/product/${product.id}`)}
                        onAddToCart={() =>
                            dispatch(cartActions.addToCart(product.id))
                        }
                        onToggleFavorite={() =>
                            dispatch(
                                favoritesActions.removeFromFavorites(
                                    product.id,
                                ),
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
}
