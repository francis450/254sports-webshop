import { CatalogItem } from "../types";

export async function getCatalog(): Promise<CatalogItem[]> {
  const res = await fetch("/api/catalog");
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error ?? `Catalog fetch failed (${res.status})`);
  }
  return res.json() as Promise<CatalogItem[]>;
}

export async function getItemByCode(itemCode: string): Promise<CatalogItem | undefined> {
  const items = await getCatalog();
  return items.find((i) => i.item_code === itemCode);
}
