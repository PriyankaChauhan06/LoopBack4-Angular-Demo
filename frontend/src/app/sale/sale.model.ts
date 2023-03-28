import { Product } from "../product/product.model";

export class Sale {
    id?: number;
    count?: number;
    message?: string;
    quantity?: number;
    itemPrice?: number;
    transactionDate?: string | any;
    productId?: number;
    name?: string;
    product?: Product;
    productPerSale?: number;
    length?: number;
    rows?: Sale[] = []
}
