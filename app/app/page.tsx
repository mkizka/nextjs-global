import { cache } from "../../cache";

export default function Home() {
  console.log('/appにアクセス')
  console.log('cache(app):', cache.get('foo'))
  return (
    <p>app: {cache.get('foo')}</p>
  );
}

export const dynamic = 'force-dynamic'
