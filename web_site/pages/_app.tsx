import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import ThemeSwitch from './components/theme-switch';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-50 dark:bg-black">
      <ThemeProvider attribute="class">
        <header className="py-2">
          <div className="flex justify-between items-center">
            <h2 className='text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight'>dashboard</h2>
            <ThemeSwitch />
          </div>
        </header>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default MyApp
