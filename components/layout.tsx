import Alert from './alert';
import Avatar from './avatar';
import Container from './container';
import Meta from './meta';
import * as React from 'react';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <Container>
          <div className="flex flex-col items-center py-8 lg:flex-row">
            <div className="flex flex-row content-center items-center justify-center p-5">
              <a className="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start">
                <img
                  src={'/assets/blog/authors/KimPossibleAvatar.jpeg'}
                  className="mr-4 hidden h-10 w-10 rounded-full ring-green-500/20 hover:ring-4 lg:block"
                  alt="Image of Kim's avatar"
                />
                <span className="ml-3 text-xl text-gray-500 sm:ml-4  sm:border-r-2 sm:border-gray-200 sm:py-2 sm:pr-4">
                  Kim Todd
                </span>
              </a>

              {/* <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a> */}
              {/* <a className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a> */}

              <a
                className="ml-3 text-gray-500"
                href="https://www.linkedin.com/in/kim-todd-1a65a413/"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>

              <a
                className="ml-3 text-gray-500"
                href="https://github.com/KimboTodd"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-5 w-5"
                  width="24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </a>
            </div>

            {/* <span className="mt-4 inline-flex justify-center  sm:mt-0 sm:justify-start"> */}
            <p className="text-sm text-gray-500 sm:ml-auto">
              © 2023{' '}
              <a
                href="https://github.com/KimboTodd"
                className="ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @KimboTodd
              </a>
            </p>
            {/* </span> */}
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
