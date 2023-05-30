import { stripe } from "@/lib/stripe";
import { ImagesWrapper, SuccessImageWrapper, SuccessWrapper } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface ProductProps {
  name: string
  imageUrl: string
}

interface SuccessProps {
  userName: string
  product: ProductProps, 
  products: ProductProps[]
}


export default function Success({userName, product, products}: SuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex"/>
      </Head>
      <SuccessWrapper>
        <h1>Compra efetuada</h1>
        <ImagesWrapper>
          {products.map((product, index) => {
            return (
          <SuccessImageWrapper key={product.name} data-list={products.length > 0 && index > 0}>
            <Image src={product.imageUrl} height={130} width={130} alt="" />
          </SuccessImageWrapper>
            )
          })}
        </ImagesWrapper>

        <p>
          Uhuul <strong>{userName}</strong>, sua {products.length === 1 ? <strong>{product.name}</strong> : `compra de ${products.length} camisetas`} já está a caminho da sua casa.
        </p>
        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </SuccessWrapper>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/', 
        permanent: false,
      }
    }
  }
  
  const sessionId = query.session_id as string
  
  const response = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const product = response.line_items?.data[0].price?.product as Stripe.Product
  const productsList = response.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return {
      name: product.name, 
      imageUrl: product.images[0]
    }
  })
  return {
    props: {
      userName: response.customer_details?.name, 
      product: {
        name: product.name, 
        imageUrl: product.images[0]
      }, 
      products: productsList
    }
  }
}