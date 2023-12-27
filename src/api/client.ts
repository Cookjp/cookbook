import { createClient } from "@vercel/kv";

export default createClient({
  url: import.meta.env.VITE_KV_REST_API_URL,
  token: import.meta.env.VITE_KV_REST_API_TOKEN,
});
