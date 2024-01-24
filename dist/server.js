"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const crypto_1 = __importDefault(require("crypto"));
const cache_1 = require("./cache");
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    (0, http_1.createServer)((req, res) => {
        setTimeout(() => {
            if (!cache_1.cache.has('foo')) {
                cache_1.cache.set('foo', crypto_1.default.randomUUID());
                console.log('cache initialized: ', cache_1.cache.get('foo'));
            }
        }, 1000);
        const parsedUrl = (0, url_1.parse)(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port);
    console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
});
