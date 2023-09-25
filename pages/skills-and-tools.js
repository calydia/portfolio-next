import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import BasicPageTemplate from '../templates/BasicPageTemplate';

export default function Home({ page }) {

  const siteName = 'Portfolio - Sanna Mäkinen';

  return (
    <BasicPageTemplate page={page} />
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetFrontPage {
        portfolioPage(id: 61) {
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
