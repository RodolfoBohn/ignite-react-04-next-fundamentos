import { stripe } from "@/lib/stripe";
import { SuccessImageWrapper, SuccessWrapper } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  userName: string
  product: {
    name: string
    imageUrl: string
  }
}


export default function Success({userName, product}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex"/>
      </Head>
      <SuccessWrapper>
        <h1>Compra efetuada</h1>
        <SuccessImageWrapper>
          <Image src={product.imageUrl} height={110} width={120} alt="" />
        </SuccessImageWrapper>

        <p>
          Uhuul <strong>{userName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
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

  return {
    props: {
      userName: response.customer_details?.name, 
      product: {
        name: product.name, 
        imageUrl: product.images[0]
      }
    }
  }
}