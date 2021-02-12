import fetch from "node-fetch";

class HttpClient {
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

export { HttpClient };
