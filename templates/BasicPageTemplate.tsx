import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import { PageInterface } from '@/interfaces/pageInterface';

export default function BasicPageTemplate({ page }: PageInterface) {

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
      <Breadcrumb current={page.title} />
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        { page.title }
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray" dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </main>
  )
}