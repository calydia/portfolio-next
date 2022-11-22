import { gql } from '@apollo/client';
import { client } from '../lib/apollo';
import Head from 'next/head';
import dayjs from 'dayjs';
import Breadcrumb from '../components/Breadcrumb';

export default function Home({ page, courses }) {

  console.log(courses);

  const siteName = 'Portfolio - Sanna Mäkinen';
  const items = courses.items;

  // https://stackoverflow.com/a/46431916/2124978
  const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

  const groupedItems = groupBy(items, "year");

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
      <div className="bodytext text-xl text-lt-gray dark:text-white" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      {Object.keys(groupedItems).reverse().map((item, index) => {
          return(
            <div key={`course--${index}`} className="my-4">
              <h2 className="text-2xl	lg:text-3xl	inline-block my-0 px-2 lg:px-8 lg:my-4 border-b-4 gradient-border-light text-lt-gray dark:text-white dark:gradient-border-dark">{item}</h2>
              {groupedItems[item].map((node, index) => {
                return (
                  <div key={`course-item-${node.year}-${index}`} className="text-lt-gray dark:text-white p-4-px lg:py-4 lg:px-12-px">
                    <h3 className="mb-4 text-lg">
                        {node.title}
                    </h3>
                    <div>
                      <span className="block text-base my-1 mx-5">{dayjs(node.date).format(`YYYY/MM`)}</span>
                      <span className="block text-base my-1 mx-5">Educator: {node.educator}</span>

                      {node.relatedExperienceName ? <span>Related to work experience: {node.relatedExperienceName}</span> : ''}
                      {node.certificateLink.uri ? <a href={node.certificateLink.uri}>{node.cerfificateLink.title}</a> : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </main>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetEducationtPage {
        portfolioPage(id: 66) {
          title
          content
          metaDescription
        }
      }
    `
  });

  const courses = await client.query({
    query: gql`
    query GetCourses {
      courses(limit: 100) {
        items {
          title
          certificateLink {
            uri
            title
          }
          date
          educator
          year
          relatedExperienceName
        }
      }
    }
    `
  });

  return {
    props: {
      page: result.data.portfolioPage,
      courses: courses.data.courses
    },
    revalidate: 60
  };
}
