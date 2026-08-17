'use client';

import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

import { useAppSelector } from '@/src/shared/store/hooks';

import scss from './CartList.module.scss';

import { cartActions, selectCartItems } from '@/src/entities/cart';
import { selectProducts } from '@/src/entities/product';
import { IconButton } from '@/src/shared/ui/IconButton/IconButton';

export function CartList() {
    const dispatch = useDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const products = useAppSelector(selectProducts);

    const cartProducts = cartItems
        .map((item) => {
            const product = products.find((p) => p.id === item.productId);

            return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);

    const total = cartProducts.reduce(
        (sum, item) =>
            sum +
            (item?.price_discount || item?.price || 0) * (item?.quantity || 1),
        0,
    );

    if (cartItems.length === 0) {
        return (
            <div className={scss.empty}>
                <p>В корзине пока ничего нет</p>
                <Link href="/">Перейти в каталог</Link>
            </div>
        );
    }

    return (
        <div className={scss.container}>
            <div className={scss.items}>
                {cartProducts.map((item) => {
                    if (!item) return null;
                    const price =
                        item.price_discount < item.price
                            ? item.price_discount
                            : item.price;

                    return (
                        <div
                            key={item.id}
                            className={scss.item}
                        >
                            <div className={scss.imageWrap}>
                                <Image
                                    fill
                                    alt={item.name}
                                    sizes="80px"
                                    className={scss.image}
                                    src={
                                        item.preview_picture ||
                                        '/placeholder.png'
                                    }
                                />
                            </div>
                            <div className={scss.info}>
                                <h3>{item.name}</h3>
                                <p className={scss.price}>
                                    {price.toLocaleString('ru-RU')} ₽
                                </p>
                                <div className={scss.quantity}>
                                    <button
                                        aria-label="Уменьшить"
                                        onClick={() =>
                                            dispatch(
                                                cartActions.decreaseQuantity(
                                                    item.id,
                                                ),
                                            )
                                        }
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        aria-label="Увеличить"
                                        onClick={() =>
                                            dispatch(
                                                cartActions.increaseQuantity(
                                                    item.id,
                                                ),
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className={scss.total}>
                                {(price * item.quantity).toLocaleString(
                                    'ru-RU',
                                )}{' '}
                                ₽
                            </div>
                            <IconButton
                                ariaLabel="Удалить"
                                onClick={() =>
                                    dispatch(
                                        cartActions.removeFromCart(item.id),
                                    )
                                }
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div className={scss.summary}>
                <p className={scss.totalLabel}>
                    Итого: <span>{total.toLocaleString('ru-RU')} ₽</span>
                </p>
            </div>
        </div>
    );
}
