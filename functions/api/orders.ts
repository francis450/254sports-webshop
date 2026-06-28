interface Env {
  ERPNEXT_BASE_URL: string;
  ERPNEXT_API_KEY: string;
  ERPNEXT_API_SECRET: string;
  ERPNEXT_GUEST_CUSTOMER: string;
}

interface OrderRequestBody {
  items: Array<{ item_code: string; quantity: number; price: number }>;
  customer_name: string;
  phone: string;
  delivery_area: string;
}

export async function onRequestPost(context: { env: Env; request: Request }): Promise<Response> {
  const { ERPNEXT_BASE_URL: rawBaseUrl, ERPNEXT_API_KEY, ERPNEXT_API_SECRET, ERPNEXT_GUEST_CUSTOMER } = context.env;
  const raw = rawBaseUrl.replace(/\/$/, "");
  const ERPNEXT_BASE_URL = raw.startsWith("http") ? raw : `https://${raw}`;

  let body: OrderRequestBody;
  try {
    body = await context.request.json() as OrderRequestBody;
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const { items, customer_name, phone, delivery_area } = body;

  if (!items?.length || !customer_name || !phone || !delivery_area) {
    return json({ error: "Missing required fields: items, customer_name, phone, delivery_area" }, 400);
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const delivery_date = deliveryDate.toISOString().split("T")[0];

  const soPayload = {
    customer: ERPNEXT_GUEST_CUSTOMER || "254Sports Walk-in",
    customer_name,
    delivery_date,
    order_type: "Sales",
    po_no: phone,
    remarks: `Phone: ${phone}\nDelivery Area: ${delivery_area}`,
    items: items.map((i) => ({
      item_code: i.item_code,
      qty: i.quantity,
      rate: i.price,
      delivery_date,
    })),
  };

  let erpRes: Response;
  try {
    erpRes = await fetch(`${ERPNEXT_BASE_URL}/api/resource/Sales Order`, {
      method: "POST",
      headers: {
        Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(soPayload),
    });
  } catch (err) {
    return json({ error: "Cannot reach ERPNext" }, 502);
  }

  if (!erpRes.ok) {
    let detail: unknown;
    try { detail = await erpRes.json(); } catch { detail = await erpRes.text(); }
    return json({ error: "Failed to create order in ERPNext", detail }, 502);
  }

  const result = await erpRes.json() as { data: { name: string } };
  return json({ order_id: result.data.name }, 200);
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
