import { Product, ProductsResponse } from '@/src/entities/product';

// Используем относительный путь, чтобы запрос шёл через прокси
const API_BASE = '';

export async function fetchProducts(): Promise<ProductsResponse> {
    const res = await fetch(`${API_BASE}/api/products`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error('Не удалось загрузить товары');
    }

    return res.json();
}

export async function fetchProductById(
    id: number,
): Promise<Product | undefined> {
    const data = await fetchProducts();

    return data.items.find((item: { id: number }) => item.id === id);
}
