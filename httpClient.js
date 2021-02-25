import fetch from "node-fetch";

class HttpClient {
  async get(url, headers) {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return data;
  }
}

export { HttpClient };
