import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const BASE = process.env.ERPNEXT_BASE_URL ?? "";
const KEY = process.env.ERPNEXT_API_KEY ?? "";
const SECRET = process.env.ERPNEXT_API_SECRET ?? "";
const GUEST_CUSTOMER = process.env.ERPNEXT_GUEST_CUSTOMER ?? "254Sports Walk-in";

const authHeader = `token ${KEY}:${SECRET}`;

app.get("/api/catalog", async (_req, res) => {
  const fields = JSON.stringify([
    "item_code", "item_name", "description", "standard_rate", "image", "item_group",
  ]);
  const filters = JSON.stringify([["disabled", "=", 0]]);
  const url = `${BASE}/api/resource/Item?fields=${encodeURIComponent(fields)}&filters=${encodeURIComponent(filters)}&limit_page_length=200`;

  try {
    const erpRes = await fetch(url, { headers: { Authorization: authHeader } });
    if (!erpRes.ok) {
      const body = await erpRes.text();
      return res.status(502).json({ error: "ERPNext catalog error", detail: body });
    }
    const data = await erpRes.json() as { data: Record<string, unknown>[] };
    res.json(groupIntoProducts(BASE, data.data ?? []));
  } catch (err) {
    res.status(502).json({ error: "Cannot reach ERPNext", detail: String(err) });
  }
});

app.post("/api/orders", async (req, res) => {
  const { items, customer_name, phone, delivery_area } = req.body ?? {};

  if (!items?.length || !customer_name || !phone || !delivery_area) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const delivery_date = deliveryDate.toISOString().split("T")[0];

  const soPayload = {
    customer: GUEST_CUSTOMER,
    customer_name,
    delivery_date,
    order_type: "Sales",
    po_no: phone,
    remarks: `Phone: ${phone}\nDelivery Area: ${delivery_area}`,
    items: items.map((i: { item_code: string; quantity: number; price: number }) => ({
      item_code: i.item_code,
      qty: i.quantity,
      rate: i.price,
      delivery_date,
    })),
  };

  try {
    const erpRes = await fetch(`${BASE}/api/resource/Sales Order`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify(soPayload),
    });

    if (!erpRes.ok) {
      let detail: unknown;
      try { detail = await erpRes.json(); } catch { detail = await erpRes.text(); }
      return res.status(502).json({ error: "Failed to create order in ERPNext", detail });
    }

    const result = await erpRes.json() as { data: { name: string } };
    res.json({ order_id: result.data.name });
  } catch (err) {
    res.status(502).json({ error: "Cannot reach ERPNext", detail: String(err) });
  }
});


const ITEM_IMAGES: Record<string, string> = {
  "MT-Red":   "/images/IMG-20260427-WA0003.jpg",
  "MT-White": "/images/IMG-20260424-WA0047.jpg",
  "MV-Red":   "/images/IMG-20260427-WA0005.jpg",
  "MV-White": "/images/IMG-20260427-WA0004.jpg",
  "WT-Red":   "/images/IMG-20260427-WA0008.jpg",
  "WT-White": "/images/IMG-20260427-WA0007.jpg",
  "WV-Red":   "/images/IMG-20260427-WA0010.jpg",
  "WV-White": "/images/IMG-20260427-WA0009.jpg",
};

const ITEM_NAMES: Record<string, string> = {
  "MT-Red":   "Men's Running T-Shirt — Red",
  "MT-White": "Men's Running T-Shirt — White",
  "MV-Red":   "Men's Running Vest — Red",
  "MV-White": "Men's Running Vest — White",
  "WT-Red":   "Women's Running T-Shirt — Red",
  "WT-White": "Women's Running T-Shirt — White",
  "WV-Red":   "Women's Running Vest — Red",
  "WV-White": "Women's Running Vest — White",
};

const KNOWN_SIZES = ["XXL", "XS", "XL", "S", "M", "L", "2XL", "3XL", "XXS"];
const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL"];

function extractBase(itemCode: string): { base: string; size: string | null } {
  for (const size of KNOWN_SIZES) {
    if (itemCode.endsWith(`-${size}`)) {
      return { base: itemCode.slice(0, -(size.length + 1)), size };
    }
  }
  return { base: itemCode, size: null };
}

function deriveColorway(base: string): "Red" | "White" {
  return base.toLowerCase().includes("white") ? "White" : "Red";
}

function deriveGender(base: string): "Men" | "Women" | "Unisex" {
  const prefix = base.split("-")[0]?.toUpperCase() ?? "";
  if (prefix.startsWith("W")) return "Women";
  if (prefix.startsWith("M")) return "Men";
  return "Unisex";
}

type ERPRow = Record<string, unknown>;

function groupIntoProducts(base: string, rows: ERPRow[]) {
  const groups = new Map<string, ERPRow[]>();
  for (const row of rows) {
    const code = row.item_code as string;
    const { base: baseCode } = extractBase(code);
    if (!groups.has(baseCode)) groups.set(baseCode, []);
    groups.get(baseCode)!.push(row);
  }

  return Array.from(groups.entries()).map(([baseCode, variants]) => {
    const first = variants[0];
    const sizes = variants
      .map((v) => extractBase(v.item_code as string).size)
      .filter(Boolean) as string[];
    const sortedSizes = [...new Set(sizes)].sort(
      (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b)
    );

    const bestImage = variants.find(
      (v) => v.image && (v.image as string).startsWith("/files/")
    );

    return {
      item_code: baseCode,
      item_name: ITEM_NAMES[baseCode] ?? (first.item_name as string) ?? baseCode,
      description: (first.description as string) ?? "",
      price: (first.standard_rate as number) ?? 0,
      currency: "KES",
      colorway: deriveColorway(baseCode),
      gender: deriveGender(baseCode),
      sizes: sortedSizes.length ? sortedSizes : ["S", "M", "L", "XL"],
      in_stock: true,
      image: ITEM_IMAGES[baseCode]
        ?? (bestImage ? `${base}${bestImage.image}` : ""),
      is_set: typeof first.item_group === "string" && first.item_group.toLowerCase().includes("set"),
    };
  });
}

function resolveImage(base: string, erpImage: string | null, itemCode: string): string {
  if (erpImage && erpImage.startsWith("/")) return `${base}${erpImage}`;
  if (erpImage && erpImage.startsWith("http")) return erpImage;
  return `${base}/assets/sports_254/images/${itemCode}.jpg`;
}

const PORT = 3001;
app.listen(PORT, () => console.log(`Dev API server → http://localhost:${PORT}`));
