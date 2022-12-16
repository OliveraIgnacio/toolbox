import { Router } from "express";
import { echoServerApiCilent } from "../../services/tbx-echo-server.js";

export const routes = Router();

routes.get("/data", async (req, res, next) => {
  try {
    const { files } = await echoServerApiCilent.getSecretFiles();
    const { fileName } = req.query;

    const fileNames = {};
    const output = [];

    for (const file of files) {
      fileNames[file] = {
        file,
        lines: [],
      };

      const pageData = await echoServerApiCilent.getSecretFile(file);
      const isError = /"status":\d{3}/.test(pageData.split("\n").join(" "));

      if (isError) {
        continue;
      }

      for (const data of pageData.split("\n")) {
        const [name, text, number, hex] = data.split(",");

        if (name === "name" || number === "number" || hex === "hex") continue;

        fileNames[file].lines.push({
          text: text || null,
          number: number || null,
          hex: hex || null,
        });
      }
    }

    // respuesta de ejemplo segun la consigna
    //    [
    //      {
    //        "file": "file1.csv",
    //        "lines": [
    //          {
    //            "text": "RgTya",
    //            "number": 64075909,
    //            "hex": "70ad29aacf0b690b0467fe2b2767f765"
    //          },
    //          . . .
    //        ]
    //      }
    //    ]

    if (fileName) {
      output.push(fileNames[fileName]);
      return res.status(200).send(output);
    }

    output.push(fileNames[Object.keys(fileNames)[0]]);
    res.status(200).send(output);
  } catch (err) {
    next(err);
  }
});

routes.get("/list", async (req, res, next) => {
  try {
    res.status(200).send(await echoServerApiCilent.getSecretFiles());
  } catch (err) {
    next(err);
  }
});
