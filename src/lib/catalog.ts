import { CatalogItem } from "../types";
import catalogData from "../data/catalog.json";

// Typed cast of local mock data
const mockCatalog: CatalogItem[] = catalogData as CatalogItem[];

/**
 * Get all catalog items from the source of truth.
 * Currently reads from local duplicate catalog.json mirroring ERPNext v15.
 */
export async function getCatalog(): Promise<CatalogItem[]> {
  // Simulating a minor network delay for realistic visual transitions
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCatalog);
    }, 250);
  });
}

/**
 * Get a specific catalog item by its unique item_code.
 */
export async function getItemByCode(itemCode: string): Promise<CatalogItem | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockCatalog.find((i) => i.item_code === itemCode);
      resolve(item);
    }, 150);
  });
}

/**
 * ============================================================================
 * ERPNEXT/FRAPPE PRODUCTION INTEGRATION NOTE
 * ============================================================================
 * To replace the local mock JSON data with live ERPNext API synchronization, 
 * modify the implementation of this module. ERPNext (Frappe v15) exposes items
 * via REST out of the box.
 * 
 * Example ERPNext fetch implementation:
 * 
 * ```typescript
 * const ERPNEXT_BASE_URL = process.env.ERPNEXT_URL || "https://erp.254sports.co.ke";
 * const ERPNEXT_API_KEY = process.env.ERPNEXT_API_KEY;
 * const ERPNEXT_API_SECRET = process.env.ERPNEXT_API_SECRET;
 * 
 * export async function getCatalogFromERPNext(): Promise<CatalogItem[]> {
 *   const response = await fetch(`${ERPNEXT_BASE_URL}/api/resource/Item?fields=["item_code","item_name","description","standard_rate","custom_colorway","custom_gender","custom_sizes","custom_in_stock","image"]&filters=[["disabled","=",0],["show_in_website","=",1]]`, {
 *     headers: {
 *       "Authorization": `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}`,
 *       "Content-Type": "application/json",
 *     }
 *   });
 *   
 *   const result = await response.json();
 *   
 *   // Map ERPNext custom docfields to 254 Runner storefront expectations:
 *   return result.data.map((row: any) => ({
 *     item_code: row.item_code,
 *     item_name: row.item_name,
 *     description: row.description || "",
 *     price: row.standard_rate || 0,
 *     currency: "KES",
 *     colorway: row.custom_colorway || "Red",
 *     gender: row.custom_gender || "Men",
 *     sizes: row.custom_sizes ? JSON.parse(row.custom_sizes) : ["S","M","L","XL"],
 *     in_stock: row.custom_in_stock === 1,
 *     image: row.image ? `${ERPNEXT_BASE_URL}${row.image}` : "/src/assets/images/placeholder.jpg"
 *   }));
 * }
 * ```
 * 
 * Since all components import from this isolated file, updating this method 
 * updates the entire applet instantly.
 */
