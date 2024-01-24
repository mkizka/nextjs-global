import { createServer } from "http";
import { parse } from "url";
import next from "next";
import crypto from "crypto";
import { cache } from "./cache";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    setTimeout(() => {
      if (!cache.has('foo')) {
        cache.set('foo', crypto.randomUUID());
        console.log('cache initialized: ', cache.get('foo'))
      }
    }, 1000)
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`,
  );
});
