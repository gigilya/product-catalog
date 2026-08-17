import Image from 'next/image';

import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

import scss from './Cart.module.scss';

import { Product } from '@/src/entities/product';

interface CardProps {
    product: Product;
    isInCart: boolean;
    isInFavorites: boolean;
    onAddToCart: () => void;
    onToggleFavorite: () => void;
    onClick: () => void;
}

export function Cart({
    product,
    isInCart,
    isInFavorites,
    onAddToCart: handleOnAddToCart,
    onToggleFavorite: handleOnToggleFavorite,
    onClick: handleClick,
}: CardProps) {
    const isOutOfStock = !product.available || product.quantity === 0;
    const hasDiscount = product.price_discount < product.price;

    const buttonText = isOutOfStock
        ? 'Отсутствует'
        : isInCart
          ? 'В корзине'
          : 'В корзину';

    return (
        <article className={scss.card}>
            <div
                className={scss.imageWrap}
                onClick={handleClick}
            >
                <Image
                    fill
                    src={product.preview_picture || '/placeholder.png'}
                    alt={product.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={scss.image}
                />
                {hasDiscount && (
                    <span className={scss.discountBadge}>
                        {product.labels.discount}
                    </span>
                )}
                {product.labels.new && (
                    <span className={scss.newBadge}>{product.labels.new}</span>
                )}
            </div>
            <div className={scss.content}>
                <h2
                    className={scss.title}
                    onClick={handleClick}
                >
                    {product.name}
                </h2>
                <div className={scss.priceRow}>
                    {hasDiscount ? (
                        <>
                            <span className={scss.priceDiscount}>
                                {product.price_discount.toLocaleString('ru-RU')}{' '}
                                ₽
                            </span>
                            <span className={scss.priceOld}>
                                {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                        </>
                    ) : (
                        <span className={scss.price}>
                            {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                    )}
                </div>
                <div className={scss.actions}>
                    <Button
                        text={buttonText}
                        disabled={isOutOfStock || isInCart}
                        onClick={handleOnAddToCart}
                    />
                    <IconButton
                        active={isInFavorites}
                        ariaLabel={
                            isInFavorites
                                ? 'Удалить из избранного'
                                : 'Добавить в избранное'
                        }
                        onClick={handleOnToggleFavorite}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </IconButton>
                </div>
            </div>
        </article>
    );
}
