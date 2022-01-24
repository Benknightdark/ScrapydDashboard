import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import ThemeSwitch from './components/theme-switch';
import { GiSpiderMask } from 'react-icons/gi'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>Spider Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>

      </Head>
      <div className="dark:bg-indigo-600 bg-yellow-300">
        <div className="p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg dark:bg-indigo-800 bg-yellow-600">
                <GiSpiderMask className="h-6 w-6 text-white" aria-hidden="true"></GiSpiderMask>
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
      <div className="h-screen  bg-slate-50 dark:bg-black">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default MyApp
