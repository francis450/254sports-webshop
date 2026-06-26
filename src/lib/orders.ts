import { CartItem } from "../types";

export interface CreateOrderParams {
  items: CartItem[];
  customer_name: string;
  phone: string;
  delivery_area: string;
}

export interface CreateOrderResult {
  order_id: string;
}

export async function createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: params.items.map((i) => ({
        item_code: i.item_code,
        quantity: i.quantity,
        price: i.price,
      })),
      customer_name: params.customer_name,
      phone: params.phone,
      delivery_area: params.delivery_area,
    }),
  });

  const data = await res.json() as { order_id?: string; error?: string; detail?: unknown };

  if (!res.ok) {
    const msg = data.error ?? `Order creation failed (${res.status})`;
    throw new Error(msg);
  }

  return { order_id: data.order_id! };
}
