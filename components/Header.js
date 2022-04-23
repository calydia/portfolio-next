import Link from 'next/link';
import ActiveLink from './ActiveLink'

const Header = () => {

  return (
      <div className="text-center pt-2 pb-8 lg:py-4 clear-both lg:clear:none">
        <Link className="home-main" href="/" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="inline-block p-4-px lg:p-6-px border-y-4 border-transparent
            hover:decoration-2 hover:underline-offset-4 hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
            focus:outline focus:outline-2 lg:focus:outline-offset-4	focus:outline-black dark:focus:outline-white">
            <span className="block text-3xl font-title text-black dark:text-white dark:text-shadow-text">Sanna Mäkinen</span>
            <span className="block text-lg mt-2 font-title leading-none text-black dark:text-white dark:text-shadow-text">Portfolio</span>
          </a>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap justify-center lg:mt-4 p-0 mb-0">
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">Home</a>
              </ActiveLink>
            </li>
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/work-experience">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">Work Experience</a>
              </ActiveLink>
            </li>
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/skills-and-tools">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">Skills and tools</a>
              </ActiveLink>
            </li>
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/education">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">Education</a>
              </ActiveLink>
            </li>
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/projects">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">Projects</a>
              </ActiveLink>
            </li>
            <li className="m-3.5">
              <ActiveLink activeClassName="underline decoration-2 underline-offset-4 text-lt-purple dark:text-dk-blue-light" href="/about-me">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="text-xl p-1 text-black dark:text-white dark:text-shadow-text
                hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-4
                focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white">About me</a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
      </div>
  );
}

export default Header;
