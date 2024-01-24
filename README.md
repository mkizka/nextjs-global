# カスタムサーバーとNext.jsでモジュールを共有できるのかのテスト

- /app ... App Router
- /pages ... Pages Router

```
$ pnpm next info

Operating System:
  Platform: linux
  Arch: x64
  Version: #1 SMP Thu Oct 5 21:02:42 UTC 2023
Binaries:
  Node: 20.11.0
  npm: 10.2.4
  Yarn: N/A
  pnpm: 8.5.1
Relevant Packages:
  next: 14.1.0
  eslint-config-next: N/A
  react: 18.2.0
  react-dom: 18.2.0
  typescript: 4.8.4
Next.js Config:
  output: N/A
```

## できない
```ts
export const cache = new Map<string, any>();
console.log('cache module loaded')
```

```log
$ pnpm start

> @ start /home/ubuntu/ghq/github.com/mkizka/nextjs-global
> cross-env NODE_ENV=production node dist/server.js

cache module loaded
> Server listening at http://localhost:3000 as production
cache module loaded
/pagesにアクセス
cache(pages): undefined
cache initialized:  cd2411c1-ca9d-4dee-8491-23383cf4d505
/pagesにアクセス
cache(pages): undefined
cache module loaded
/appにアクセス
cache(app): undefined
```

## できる
```ts
export const cache = global.cache ?? new Map<string, any>();
global.cache = cache;
console.log('cache module loaded')
```

```
$ pnpm start

> @ start /home/ubuntu/ghq/github.com/mkizka/nextjs-global
> cross-env NODE_ENV=production node dist/server.js

cache module loaded
> Server listening at http://localhost:3000 as production
cache module loaded
/pagesにアクセス
cache(pages): undefined
cache initialized:  37673cc2-6817-4317-9ed5-a1a5b77784e5
/pagesにアクセス
cache(pages): 37673cc2-6817-4317-9ed5-a1a5b77784e5
cache module loaded
/appにアクセス
cache(app): 37673cc2-6817-4317-9ed5-a1a5b77784e5
```