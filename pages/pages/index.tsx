import { cache } from "../../cache";

export default function Home({ value }) {
  return (
    <p>pages: {value}</p>
  );
}

export const getServerSideProps = () => {
  console.log('/pagesにアクセス')
  console.log('cache(pages):', cache.get('foo'))
  return {
    props: {
      value: cache.get('foo') ?? null
    },
  }
}
