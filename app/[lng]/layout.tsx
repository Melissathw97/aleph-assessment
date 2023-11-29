import "../globals.css";
import type { Metadata } from "next";
import Favicon from '../favicon.ico';
import Providers from "../_providers";
import { Inter } from "next/font/google";
import { languages } from "../i18n/settings";
import Header from "../_components/layout/header";
import MobileHeader from "../_components/layout/mobile-header";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Melissa.',
  description: 'A simple form by Melissa',
  icons: [{ rel: 'icon', url: Favicon.src }]
}

async function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode,
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="hidden md:block">
            <Header lng={lng} />
          </div>
          <div className="md:hidden">
            <MobileHeader lng={lng} />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
