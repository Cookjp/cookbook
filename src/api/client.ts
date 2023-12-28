interface KVResponse<T> {
  result: T;
}

const get = <T>(key: string): Promise<T> => {
  return fetch(`https://creative-mite-33542.kv.vercel-storage.com/get/${key}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
    },
  }).then((response) => response.json());
};

type ScanRes = KVResponse<[string, string[]]>;

const scan = (): Promise<string[]> => {
  return fetch("https://creative-mite-33542.kv.vercel-storage.com/scan/0", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
    },
  }).then((response: Response) =>
    (response.json() as Promise<ScanRes>).then((kv) => kv.result[1])
  );
};

export default { get, scan };
