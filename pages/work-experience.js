import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import dayjs from 'dayjs';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';

export default function Home({ experiences }) {

  const experienceMetaDescription = "Work experience from the past ten years or so. What I've been up to professionally.";
  const pageTitle = 'Work experience';
  const siteName = 'Portfolio - Sanna Mäkinen';

  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <title>{`${pageTitle} | ${siteName}`}</title>
        <meta name="description" content={ experienceMetaDescription } />
        <meta
          property="og:description"
          content={ experienceMetaDescription }
        />
        <meta property="og:title" content={ pageTitle } />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content={ siteName } />
        <meta property="og:url" content="https://sanna.ninja/" />
        <meta property="og:image" content="../images/osiris.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Breadcrumb current={pageTitle} />
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        {pageTitle}
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray">
      {experiences.items.map((node, index) => {
          return (
            <article key={`experience-${index}`} className="experience-box p-4-px lg:p-8-px border-b-4 gradient-border-light dark:gradient-border-dark">
                <h2 className="project-content my-4">
                    {node.title}
                </h2>
                <div className="text-base">
                  <div className="mb-1">
                    {dayjs(node.startDate).format(`YYYY/MM`)}{ node.endDate ? ' - ' + dayjs(node.endDate).format(`YYYY/MM`) : ''}
                  </div>
                  {node.companyLink.map((company, index) => {
                    return (
                      <Link key={`company-${index}`} href={ company.uri }>
                        { company.title }
                      </Link>
                    );
                  })}
                </div>
                <div dangerouslySetInnerHTML={{ __html: node.content }}></div>
            </article>
          );
        })}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
    query GetExperiences {
      experiences(limit: 100) {
        items {
          companyLink {
            title
            uri
          }
          content
          endDate
          title
          startDate
        }
      }
    }
    `
  });

  return {
    props: {
      experiences: result.data.experiences,
    },
    revalidate: 60
  };
}
