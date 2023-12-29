interface KVResponse<T> {
  result: T;
}

type GetRes = KVResponse<string>;

const get = <T>(key: string): Promise<T> => {
  return fetch(`https://creative-mite-33542.kv.vercel-storage.com/get/${key}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
    },
  }).then((response) =>
    (response.json() as Promise<GetRes>).then((kv) => JSON.parse(kv.result))
  );
};

interface SetRes {
  result: string;
}

const set = <T>(key: string, value: T): Promise<string> => {
  return fetch(`https://creative-mite-33542.kv.vercel-storage.com/set/${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_UPDATE_KV_REST_API_TOKEN}`,
    },
    body: JSON.stringify(value),
  }).then((response) =>
    (response.json() as Promise<SetRes>).then((setRes) => setRes.result)
  );
};

type ScanRes = KVResponse<[string, string[]]>;

const scan = (): Promise<string[]> => {
  return fetch("https://creative-mite-33542.kv.vercel-storage.com/scan/0", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
    },
  }).then((response) =>
    (response.json() as Promise<ScanRes>).then((kv) => kv.result[1])
  );
};

export default { get, set, scan };
