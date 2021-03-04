import fetch from "node-fetch";

class HttpClient {
  async get(url, headers) {
    const res = await fetch(url, { headers });
    let data = res;
    if(headers["Content-Type"] !== 'text/html') {
      data  = await res.json();
    }
    return data;
  }
}

export { HttpClient };
