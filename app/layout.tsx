import { type FC, type ReactNode } from 'react'
import { outfit } from './_ui/fonts'
import './globals.css'
import Navbar from './_ui/components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { TrpcProvider } from '@/lib/server/trpc-provider'

const meta = {
  favicon: '/favicon.ico',
  title: 'Mango Entertainment',
  description: 'Generated by the best coders who eat mangoes',
  url: 'https://mango-entertainment.vercel.app/',
  type: 'website',
}

export const metadata = {
  title: meta.title,
  description: meta.description,
  url: meta.url,
  siteName: meta.title,
  images: [
    {
      url: `${meta.url}/mango-logo.png`,
      width: 716,
      height: 729,
    },
  ],
  locale: 'en_US',
  type: 'website',
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: meta.title,
    images: [
      {
        url: `${meta.url}/mango-logo.png`,
        width: 716,
        height: 729,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} overflow-x-hidden bg-entertainment-dark-blue p-0`}
        >
          <TrpcProvider>
            <div
              className={`h-min-screen grid w-screen grid-cols-1 items-start lg:grid-cols-[120px_1fr]`}
            >
              <Navbar />
              {children}
            </div>
          </TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
