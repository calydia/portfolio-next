import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import Image from 'next/image';
import dayjs from 'dayjs';

export default function Home({ page, listing }) {

  const siteName = 'Portfolio - Sanna Mäkinen';

  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <title>{`${page.title} | ${siteName}`}</title>
        <meta name="description" content={page.metaDescription} />
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
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        { page.title }
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      <section aria-label="Newest accessibility posts from my blog" className="mt-12 md:p-4-px lg:p-8-px md:border-4 gradient-border-light dark:gradient-border-dark">
        <h2 className="block md:text-center font-bold mb-8 text-3xl md:text-4xl text-lt-gray dark:text-white
        ">My newest posts on accessibility</h2>
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-8" role="list">
            {listing.items.map((node, index) => {
                  return (
                    <li key={`list-item${index}`} className="grid items-stretch p-2 border-solid border-4 gradient-border-light bg-lt-blue-light text-lt-gray
                    dark:gradient-border-dark dark:bg-dk-purple dark:text-white
                    ">
                      <a key={index} href={`https://blog.sanna.ninja/${node.category.toLowerCase()}${node.slug}`} className="post-link border-2 border-transparent focus:outline focus:outline-4 focus:outline-offset-15	focus:outline-black dark:focus:outline-white hover:border-lt-purple dark:hover:border-dk-blue-light">
                        <Image
                          src={node.listingImage}
                          alt=""
                          width={1025}
                          height={600}
                          layout="responsive"
                        />
                        <div className="self-center text-center">
                          <span id={`blog-title${index}`} className="post-title block text-lg font-bold md:text-2xl py-4 px-2
                          after:bg-black after:h-0.5 after:block after:w-10 after:mt-4 after:mb-0 after:mx-auto after:content-['']
                          dark:after:bg-white">
                            {node.title}
                          </span>
                          <span className="sr-only">on</span>
                          <span className="block text-base md:text-xl pb-4">
                            {dayjs(node.date)
                              .format(`MMMM DD, YYYY`)}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                }
              )
            }
          </ul>
        </div>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetFrontPage {
        portfolioPage(id: 58) {
          title
          content
          metaDescription
        }
      }
    `
  });
  
  const listing = await client.query({
    query: gql`
      query GetA11yArticles {
        articles(limit: 3, category: 21) {
          items {
            title
            slug
            date
            listingImage
            category
          }
        }
      }
    `
  });

  return {
    props: {
      page: result.data.portfolioPage,
      listing: listing.data.articles
    },
    revalidate: 60
  };
}