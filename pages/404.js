import Head from 'next/head';

export default function Custom404() {
  return (
    <main className="max-w-5xl mx-auto px-4-px">
      <Head>
        <title>{`Page not found | Portfolio - Sanna Mäkinen`}</title>
      </Head>
      <h1 id="skip-target" className="block font-bold my-8 lg:mt-16 text-4xl md:text-5xl text-lt-gray dark:text-white">
        Page not found
      </h1>
      <div className="bodytext text-xl text-lt-gray dark:text-dk-gray">
        Apologies, the page you were looking for is not available.
      </div>
    </main>
  );
}
