export interface CatalogItem {
  item_code: string;
  item_name: string;
  description: string;
  price: number;
  currency: string;
  colorway: "White" | "Red";
  gender: "Men" | "Women" | "Unisex";
  sizes: string[];
  in_stock: boolean;
  image: string;
  is_set?: boolean; // top + shorts set
}

export interface CartItem {
  item_code: string;
  item_name: string;
  colorway: "White" | "Red";
  gender: "Men" | "Women" | "Unisex";
  size: string;
  quantity: number;
  price: number;
  image: string;
  is_set?: boolean;
}

export interface OrderInput {
  customer_name: string;
  phone: string;
  delivery_area: string;
}
