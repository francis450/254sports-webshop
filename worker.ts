import { onRequestGet as catalogGet } from './functions/api/catalog';
import { onRequestPost as ordersPost } from './functions/api/orders';
import { onRequestGet as debugGet } from './functions/api/debug';

interface Env {
  ERPNEXT_BASE_URL: string;
  ERPNEXT_API_KEY: string;
  ERPNEXT_API_SECRET: string;
  ERPNEXT_GUEST_CUSTOMER: string;
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/catalog' && request.method === 'GET') {
      return catalogGet({ request, env });
    }

    if (pathname === '/api/orders' && request.method === 'POST') {
      return ordersPost({ request, env });
    }

    if (pathname === '/api/debug' && request.method === 'GET') {
      return debugGet({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
