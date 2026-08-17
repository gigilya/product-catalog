export type {
    Product,
    ProductCharacteristic,
    ProductLabels,
    ProductsResponse,
    ProductState,
} from './model/types';

export { productReducer, loadProducts } from './model/slice';
export {
    selectProducts,
    selectProductsLoading,
    selectProductsError,
} from './model/selectors';
