import { globalStyle } from '@/styles/global'
import type { AppProps } from 'next/app'
import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from '@/components/cart-button'
import {CartContextProvider} from '../context/cart-context'

globalStyle()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContextProvider>
        <Header>
          <Link href={'/'}>
            <Image src={logoImg} alt='' />
          </Link>
          <CartButton />
        </Header>
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
