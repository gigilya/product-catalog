'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/src/shared/store/hooks';
import { useDebounce } from '@/src/shared/lib/hooks/useDebounce';

import scss from './ProductList.module.scss';

import { cartActions } from '@/src/entities/cart';
import { favoritesActions } from '@/src/entities/favorites';
import {
    loadProducts,
    Product,
    selectProducts,
    selectProductsError,
    selectProductsLoading,
} from '@/src/entities/product';
import { Button } from '@/src/shared/ui/Button/Button';
import { Cart } from '@/src/shared/ui/Cart/Cart';
import { Input } from '@/src/shared/ui/Input/Input';

type SortOption = 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

function ProductCard({ product }: { product: Product }) {
    // Если hooks.ts не исправлен, раскомментируйте следующую строку:
    // const dispatch = useAppDispatch() as AppDispatch;
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Проверка наличия в корзине (предполагаем, что CartItem имеет поле productId)
    const isInCart = useAppSelector((state) =>
        state.cart.items.some((item) => item.productId === product.id),
    );
    // Проверка в избранном (предполагаем массив ID)
    const isInFavorites = useAppSelector((state) =>
        state.favorites.items.includes(product.id),
    );

    return (
        <Cart
            product={product}
            isInCart={isInCart}
            isInFavorites={isInFavorites}
            onAddToCart={() => dispatch(cartActions.addToCart(product.id))}
            onClick={() => router.push(`/product/${product.id}`)}
            onToggleFavorite={() =>
                dispatch(favoritesActions.toggleFavorite(product.id))
            }
        />
    );
}

export function ProductList() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);

    const [search, setSearch] = useState('');
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState<SortOption>('price_asc');

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        dispatch(loadProducts());
    }, [dispatch]);

    const filteredItems = useMemo(() => {
        let result = [...items];

        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase();
            result = result.filter((item) =>
                item.name.toLowerCase().includes(query),
            );
        }

        if (onlyAvailable) {
            result = result.filter(
                (item) => item.available && item.quantity > 0,
            );
        }

        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        result = result.filter(
            (item) => item.price >= min && item.price <= max,
        );

        result.sort((a, b) => {
            switch (sort) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        return result;
    }, [items, debouncedSearch, onlyAvailable, minPrice, maxPrice, sort]);

    if (loading) {
        return (
            <div className={scss.container}>
                <div className={scss.skeletonGrid}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className={scss.skeletonCard}
                        >
                            <div className={scss.skeletonImage} />
                            <div className={scss.skeletonText} />
                            <div className={scss.skeletonTextShort} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={scss.container}>
                <div className={scss.error}>
                    <p>Пока ничего не нашли</p>
                    <Button
                        text="Повторить"
                        onClick={() => dispatch(loadProducts())}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={scss.container}>
            <div className={scss.controls}>
                <Input
                    value={search}
                    placeholder="Поиск по названию..."
                    onChange={setSearch}
                />
                <div className={scss.filters}>
                    <label className={scss.checkbox}>
                        <input
                            type="checkbox"
                            checked={onlyAvailable}
                            onChange={(e) => setOnlyAvailable(e.target.checked)}
                        />
                        Только в наличии
                    </label>
                    <div className={scss.priceInputs}>
                        <Input
                            value={minPrice}
                            placeholder="Цена от"
                            type="number"
                            min={0}
                            onChange={setMinPrice}
                        />
                        <Input
                            value={maxPrice}
                            placeholder="Цена до"
                            type="number"
                            min={0}
                            onChange={setMaxPrice}
                        />
                    </div>
                    <select
                        className={scss.select}
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                    >
                        <option value="price_asc">Цена: по возрастанию</option>
                        <option value="price_desc">Цена: по убыванию</option>
                        <option value="name_asc">Название: А — Я</option>
                        <option value="name_desc">Название: Я — А</option>
                    </select>
                </div>
            </div>

            {filteredItems.length === 0 ? (
                <p className={scss.empty}>Товары не найдены</p>
            ) : (
                <div className={scss.grid}>
                    {filteredItems.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
