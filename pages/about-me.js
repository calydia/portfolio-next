import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';

export default function Home({ page }) {

  const siteName = 'Portfolio - Sanna Mäkinen';

  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <title>{`${page.title} | ${siteName}`}</title>
        <meta name="Description" content={page.metaDescription} />
        <meta
          property="og:description"
          content={page.metaDescription}
        />
        <meta property="og:title" content={ page.title } />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content={ siteName } />
        <meta property="og:url" content="https://sanna.ninja/" />
        <meta property="og:image" content="../images/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Breadcrumb current={page.title} />
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        { page.title }
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray" dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </main>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetFrontPage {
        portfolioPage(id: 60) {
          title
          content
          metaDescription
        }
      }
    `
  });

  return {
    props: {
      page: result.data.portfolioPage,
    },
    revalidate: 60
  };
}
