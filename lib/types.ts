export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  link: string;
  image: string;
  brand?: string;
  hot?: boolean;
};

export type ProductStore = {
  products: Product[];
  updatedAt: string;
};

export const EMPTY_STORE: ProductStore = { products: [], updatedAt: "" };
