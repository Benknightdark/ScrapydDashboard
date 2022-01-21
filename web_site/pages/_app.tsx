import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import ThemeSwitch from './components/theme-switch';
import {SiProbot} from 'react-icons/si'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-50 dark:bg-black" style={{ height: "100vh" }}>
      <ThemeProvider attribute="class">
        {/* <header className="py-2">
          <div className="flex justify-between items-center">
            <h2 className='text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight'>dashboard</h2>
            <ThemeSwitch />
          </div>
        </header> */}

        <div className="bg-indigo-600">
          <div className="p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-indigo-800">
                  <SiProbot className="h-6 w-6 text-white" aria-hidden="true"></SiProbot>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span>Scrapy Dashboard</span>
                </p>
              </div>
              <div className="flex-shrink-0  justify-end">
                <div
                  className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
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
