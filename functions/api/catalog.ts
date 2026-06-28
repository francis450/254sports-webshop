interface Env {
  ERPNEXT_BASE_URL: string;
  ERPNEXT_API_KEY: string;
  ERPNEXT_API_SECRET: string;
}

const STATIC_CATALOG = [
  {
    item_code: "MT-Red",
    item_name: "Men's Running T-Shirt — Red",
    description: "Premium quick-dry technical running tee engineered for high-altitude training in Iten.",
    price: 2500, currency: "KES", colorway: "Red", gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"], in_stock: true,
    image: "/images/IMG-20260427-WA0003.jpg", is_set: false,
  },
  {
    item_code: "MT-White",
    item_name: "Men's Running T-Shirt — White",
    description: "Lightweight moisture-wicking tee in clean white, designed for long-distance runners.",
    price: 2500, currency: "KES", colorway: "White", gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"], in_stock: true,
    image: "/images/IMG-20260424-WA0047.jpg", is_set: false,
  },
  {
    item_code: "MV-Red",
    item_name: "Men's Running Vest — Red",
    description: "Racerback singlet with superior airflow for elite training performance.",
    price: 2200, currency: "KES", colorway: "Red", gender: "Men",
    sizes: ["S", "M", "L", "XL"], in_stock: true,
    image: "/images/IMG-20260427-WA0005.jpg", is_set: false,
  },
  {
    item_code: "MV-White",
    item_name: "Men's Running Vest — White",
    description: "Clean white performance singlet cut for marathon pace and beyond.",
    price: 2200, currency: "KES", colorway: "White", gender: "Men",
    sizes: ["S", "M", "L", "XL"], in_stock: true,
    image: "/images/IMG-20260427-WA0004.jpg", is_set: false,
  },
  {
    item_code: "WT-Red",
    item_name: "Women's Running T-Shirt — Red",
    description: "Tailored women's running tee in bold scarlet red with moisture management fabric.",
    price: 2500, currency: "KES", colorway: "Red", gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"], in_stock: true,
    image: "/images/IMG-20260427-WA0008.jpg", is_set: false,
  },
  {
    item_code: "WT-White",
    item_name: "Women's Running T-Shirt — White",
    description: "Premium women's technical tee in pristine white, built for high performance.",
    price: 2500, currency: "KES", colorway: "White", gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"], in_stock: true,
    image: "/images/IMG-20260427-WA0007.jpg", is_set: false,
  },
  {
    item_code: "WV-Red",
    item_name: "Women's Running Vest — Red",
    description: "Sleek women's racing singlet engineered for heat management and elite aerodynamics.",
    price: 2200, currency: "KES", colorway: "Red", gender: "Women",
    sizes: ["XS", "S", "M", "L"], in_stock: true,
    image: "/images/IMG-20260427-WA0010.jpg", is_set: false,
  },
  {
    item_code: "WV-White",
    item_name: "Women's Running Vest — White",
    description: "Featherweight women's vest in clean white for optimal race-day performance.",
    price: 2200, currency: "KES", colorway: "White", gender: "Women",
    sizes: ["XS", "S", "M", "L"], in_stock: true,
    image: "/images/IMG-20260427-WA0009.jpg", is_set: false,
  },
];

export async function onRequestGet(context: { env: Env; request: Request }): Promise<Response> {
  const { ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = context.env;

  // If env vars are missing, return static catalog immediately
  if (!ERPNEXT_BASE_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) {
    return json(STATIC_CATALOG, 200);
  }

  const raw = ERPNEXT_BASE_URL.replace(/\/$/, "");
  const baseUrl = raw.startsWith("http") ? raw : `https://${raw}`;
  const fields = JSON.stringify([
    "item_code", "item_name", "description", "standard_rate", "image", "item_group",
  ]);
  const filters = JSON.stringify([["disabled", "=", 0]]);
  const url = `${baseUrl}/api/resource/Item?fields=${encodeURIComponent(fields)}&filters=${encodeURIComponent(filters)}&limit_page_length=200`;

  let erpRes: Response;
  try {
    erpRes = await fetch(url, {
      headers: { Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}` },
    });
  } catch {
    return json(STATIC_CATALOG, 200);
  }

  if (!erpRes.ok) {
    return json(STATIC_CATALOG, 200);
  }

  const data = await erpRes.json() as { data: Record<string, unknown>[] };
  const rows = data.data ?? [];

  // Fall back to static catalog if ERPNext returned no items
  if (rows.length === 0) {
    return json(STATIC_CATALOG, 200);
  }

  return json(groupIntoProducts(baseUrl, rows), 200);
}

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

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
