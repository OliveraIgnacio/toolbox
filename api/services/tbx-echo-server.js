import https from "https";

class EchoServerApiClient {
  constructor(token) {
    this._token = token;
  }

  makeRequest(endpoint, options, data = "") {
    if (endpoint.startsWith("/")) {
      endpoint = endpoint.slice(1);
    }

    return new Promise((resolve, reject) => {
      const req = https.request(
        `https://echo-serv.tbxnet.com/v1/${endpoint}`,
        {
          headers: {
            authorization: "Bearer " + this._token,
          },
        },
        (res) => {
          const chunks = [];

          res.on("data", (chunk) => chunks.push(chunk));
          res.on("error", reject);
          res.on("end", () => {
            const { statusCode, headers } = res;
            const body = chunks.join("");

            resolve({ statusCode, headers, body });
          });
        }
      );

      req.on("error", reject);
      req.write(data, "binary");
      req.end();
    });
  }

  async getSecretFiles() {
    return await this.makeRequest("/secret/files").then((data) =>
      JSON.parse(data.body)
    );
  }

  async getSecretFile(name) {
    return await this.makeRequest(`/secret/file/${name}`).then(
      (res) => res.body
    );
  }
}

export const echoServerApiCilent = new EchoServerApiClient("aSuperSecretKey");
