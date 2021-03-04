import fetch from "node-fetch";

class HttpClient {
  async get(url, headers) {
    const res = await fetch(url, { headers });
    let data = res;
    console.log("headers")
    if(!headers || (headers && headers["Content-Type"] !== 'text/html')) {
      data  = await res.json();
    }
    return data;
  }
}

export { HttpClient };
