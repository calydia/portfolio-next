import { gql } from '@apollo/client';
import { client } from '../../lib/apollo';
import dayjs from 'dayjs';
import Image from 'next/image';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import Script from 'next/script';

export default function BlogPage({ page }) {

  const siteName = 'Portfolio - Sanna Mäkinen';

  return (
    <main>
      <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></Script>
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
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
      </Head>
      <div className="h-[250px] relative bg-cover bg-center" style={{ backgroundImage: 'url(' + page.decorativeImage + ')' }}>
        {page.decorativeImageCredits ? <div dangerouslySetInnerHTML={{ __html: page.decorativeImageCredits }} className="creditbox bg-white/80 dark:bg-black/80 absolute bottom-0 right-0 py-2 px-3 text-sm"></div> : ''}
      </div>
      <div className="max-w-5xl mx-auto px-4-px">
        <Breadcrumb extraLevel="true" extraLevelName="Projects" extraLevelPath="/projects" current={page.title} />
        <h1 id="skip-target" className="block font-bold my-8 lg:mt-12 text-4xl md:text-5xl text-lt-gray dark:text-white">
          { page.title }
        </h1>
        <div className="bodytext text-xl text-lt-gray dark:text-dk-gray" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      
        <h2 className="font-bold text-lt-gray dark:text-dk-gray">Roles in the project</h2>
        <ul className="list-disc ml-5 leading-8 my-6 bodytext text-xl text-lt-gray dark:text-dk-gray">
          {page.roles.map((role, index) => {
            return (
              <li key={`role-item${index}`}>{ role.name }</li>
            );
          })}
        </ul>

        <h2 className="font-bold text-lt-gray dark:text-dk-gray">Links to the project</h2>
        <div>
          <ul className="list-disc ml-5 leading-8 my-6 bodytext text-xl text-lt-gray dark:text-dk-gray">
            {page.repoLinks.map((repo, index) => {
              return (
                <li key={`repo-item${index}`}>
                  <a
                    href={repo.uri}
                    className="project--repo-link"
                  >
                    {repo.title}
                  </a>
                </li>
              );
            })}
            {page.projectLink.map((project, index) => {
              return (
                <li key={`project-link-item${index}`}>
                  <a
                    href={project.uri}
                    className="project--project-link"
                  >
                    {project.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <h2 className="font-bold text-lt-gray dark:text-dk-gray text-center">Technologies</h2>
        <ul className="logo-list">
          {page.technologies.map((tech, index) => {
            return (
              <li key={`tech-item${index}`} className={`logo-list--item logo--${tech.name.toLowerCase()}`}>
                <a href={tech.url}>{ tech.name }</a>
              </li>
            );
          })}
        </ul>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-solid border-4 p-8-px my-8 bg-lt-code-bg border-lt-code-border dark:bg-dk-code-bg dark:border-dk-code-border">
        <h2 className="font-bold text-lt-gray dark:text-dk-gray text-center md:col-start-1 md:col-end-3 lg:col-end-4">Project designs</h2>
          {page.projectImages.map((image, index) => {

            return (
              <a key={`gallery-item-${index}`} data-fancybox="gallery" href={image.url} data-caption={image.alt} className="focus:outline-offset-4 focus:outline-lt-purple dark:focus:outline-wheat">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={400}
                  height={400}
                  layout="responsive"
                  objectFit="cover"
                />
              </a>
            );
          })}
        </div>
      </div>

    
    </main>
  );
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
    query GetProjectsPages {
      projects {
        items {
          slug
        }
      }
    }
    `
  });

  const paths = result.data.projects.items.map(({ slug }) => {
    return {
      params: { slug: slug.substring(1)  }
    }
  });

  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const result = await client.query({
    query: gql`
      query GetProject($slug: String!) {
        projectSlug(slug: $slug) {
          title
          year
          content
          slug
          metaDescription
          technologies {
            id
            name
            url
          }
          roles {
            id
            name
          }
          repoLinks {
            uri
            title
          }
          projectLink {
            title
            uri
          }
          decorativeImageCredits
          decorativeImage
          projectImages {
            url
            thumb
            alt
          }
        }
      }

    `,
    variables: { slug }
  });

  return {
    props: {
      page: result.data.projectSlug,
    }
  };
}
