import { Inter } from 'next/font/google'
import './globals.css'

import Provider from './Provider';
// import Navbar from '@/components/Navbar';
import NavbarLayout from '@/components/navbar-layout';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Blog anime",
  default: "Anime"
} 


export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <>
        <NavbarLayout />
          </>
            {children}
        </Provider>
      </body>
    </html>
  )
}
