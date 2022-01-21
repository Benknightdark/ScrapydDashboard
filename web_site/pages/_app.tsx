import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import ThemeSwitch from './components/theme-switch';
import { SiProbot } from 'react-icons/si'
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-50 dark:bg-black" style={{ height: "100vh" }}>
      <Head>
        <title>Spider Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons"
          rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-popRpmFF9JQgExhfw5tZT4I9/CI5e2QcuUZPOVXb1m7qUmeR2b50u+YFEYe1wgzy" crossOrigin="anonymous"></script>
      </Head>
      <ThemeProvider attribute="class">
        <div className="dark:bg-indigo-600 bg-yellow-300">
          <div className="p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg dark:bg-indigo-800 bg-yellow-600">
                  <SiProbot className="h-6 w-6 text-white" aria-hidden="true"></SiProbot>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className='dark:text-white text-black hover:font-bold'>Scrapy Dashboard</span>
                </p>
              </div>
              <div className="flex-shrink-0  justify-end">
                <div
                  className="-mr-1 flex p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default MyApp
