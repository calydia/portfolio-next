import { gql } from '@apollo/client';
import { client } from '../../lib/apollo';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';

export default function Home({ page, projects }) {

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
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-12 text-4xl md:text-5xl text-lt-gray dark:text-white">
        { page.title }
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul role="list">
        {projects.items.map((node, index) => {
          return (
            <li key={`list-item${index}`} className="relative my-8 p-4 pb-10 lg:my-12 lg:p-16 bg-cover" style={{ backgroundImage: 'url(' + node.decorativeImage + ')' }}>
              <article className="border-4 gradient-border-light dark:gradient-border-dark mx-auto bg-lt-blue-light dark:text-white dark:bg-dk-purple max-w-2xl p-8-px">
                <h2 className="mb-8">
                <Link key={`company-${index}`} href={`/projects${node.slug}`} className="
                    font-bold underline underline-offset-8 decoration-2 text-lt-gray dark:text-white
                  hover:text-lt-purple hover:decoration-4 dark:hover:text-wheat
                  focus:text-lt-purple dark:focus:text-wheat focus:outline-2 focus:outline-offset-8 focus:no-underline focus:outline-black dark:focus:outline-white">
                  {node.title}
                </Link>
                </h2>
                <div className="text-lg leading-normal" dangerouslySetInnerHTML={{ __html: node.contentSummary }}></div>
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                <ul role="list" className="logo-list" aria-label="List of technologies used in the project, visit the links to find out more about the technologies.">
                  {node.technologies.map((tech, index) => {
                    return (
                      <li key={`tech-item${index}`} className={`logo-list--item logo--${tech.name.toLowerCase()}`}>
                        { tech.url ?
                          <Link key={`company-${index}`} href={tech.url}>
                            { tech.name }
                          </Link>
                        : null }
                      </li>
                    );
                  })}
                </ul>
              </article>
              {node.decorativeImageCredits ?
                <div dangerouslySetInnerHTML={{ __html: node.decorativeImageCredits }} className="creditbox bg-white/80 dark:bg-black/80 absolute bottom-0 right-0 py-2 px-3 text-sm"></div>
              : ''}
            </li>
          );
        })}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetProjectsListingPage {
        portfolioPage(id: 59) {
          title
          content
          metaDescription
        }
      }
    `
  });

  const projects = await client.query({
    query: gql`
      query GetProjects {
        projects(limit: 100) {
          items {
            contentSummary
            slug
            title
            decorativeImageCredits
            decorativeImage
            technologies {
              id
              name
              url
            }
          }
        }
      }
    `
  });

  return {
    props: {
      page: result.data.portfolioPage,
      projects: projects.data.projects
    },
    revalidate: 60
  };
}
