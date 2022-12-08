import fetch from "node-fetch";

class HttpClient {
  async get(url, headers) {
    const res = await fetch(url, { headers });
    let data = res;
    if (!headers || (headers && headers["Content-Type"] !== "text/html")) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    return data;
  }
}

export { HttpClient };
