interface Env {
  ERPNEXT_BASE_URL: string;
  ERPNEXT_API_KEY: string;
  ERPNEXT_API_SECRET: string;
}

export async function onRequestGet(context: { env: Env; request: Request }): Promise<Response> {
  const { ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = context.env;

  const baseUrl = (ERPNEXT_BASE_URL ?? "").replace(/\/$/, "");
  const keyLen = ERPNEXT_API_KEY?.length ?? 0;
  const secretLen = ERPNEXT_API_SECRET?.length ?? 0;

  const url = `${baseUrl}/api/resource/Item?fields=${encodeURIComponent(
    JSON.stringify(["item_code", "standard_rate", "disabled"])
  )}&limit_page_length=5`;

  let erpStatus: number | null = null;
  let erpBody = "";
  let fetchError: string | null = null;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `token ${ERPNEXT_API_KEY}:${ERPNEXT_API_SECRET}` },
    });
    erpStatus = res.status;
    erpBody = await res.text();
  } catch (err) {
    fetchError = String(err);
  }

  return new Response(
    JSON.stringify({
      env: {
        ERPNEXT_BASE_URL: baseUrl || "MISSING",
        ERPNEXT_API_KEY: keyLen ? `${ERPNEXT_API_KEY.slice(0, 6)}... (${keyLen} chars)` : "MISSING",
        ERPNEXT_API_SECRET: secretLen ? `[set, ${secretLen} chars]` : "MISSING",
      },
      request_url: url,
      erp_status: erpStatus,
      erp_response: erpBody.slice(0, 3000),
      fetch_error: fetchError,
    }, null, 2),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
