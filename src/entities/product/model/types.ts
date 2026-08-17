export interface ProductCharacteristic {
    label: string;
    name: string;
    value: string;
}

export interface ProductLabels {
    discount?: string;
    new?: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    price_discount: number;
    preview_picture: string;
    available: boolean;
    quantity: number;
    reviews: number;
    labels: ProductLabels;
    characteristics: ProductCharacteristic[];
}

export interface ProductsResponse {
    count_items: number;
    items: Product[];
}

export interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}
