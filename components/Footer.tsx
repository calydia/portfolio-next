import Image from 'next/image';
import Script from 'next/script';

const Footer = () => {
  return (
    <footer className="mt-12 p-4-px lg:p-12-px border-t-8 border-solid border-blue-tory bg-lt-blue-light dark:bg-dk-purple">
      <div className="md:flex md:justify-between max-w-[1500px] mx-auto">
        <ul className="flex items-center list-none m-0 p-4-px">
          <li>
            <a className="some-icon github-link bg-center block bg-no-repeat" href="https://github.com/calydia" rel="noopener noreferrer">Visit my page on GitHub</a>
          </li>
          <li>
            <a className="some-icon gitlab-link bg-center block bg-no-repeat" href="https://gitlab.com/Calydia" rel="noopener noreferrer">Visit my page on GitLab</a>
          </li>
          <li>
            <a className="some-icon linkedin-link bg-center block bg-no-repeat" href="https://www.linkedin.com/in/sanna-makinen" rel="noopener noreferrer">Visit my profile on LinkedIn</a>
          </li>
        </ul>
      </div>
      <Script src="/skip-content.js"></Script>
    </footer>
  );
};

export default Footer;
