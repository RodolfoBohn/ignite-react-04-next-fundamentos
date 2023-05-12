import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    formattedPrice: string
    description: string
    price: number
    priceId: string
  };
}

export default function Product({ product }: ProductProps) {
  const [isLoading, setIsLoading] = useState(false)
  const {isFallback} = useRouter()

  if(isFallback) {
    return <p>Carregando...</p>
  }

  async function handleBuyButton() {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.priceId
      })

        const { checkoutUrl } = response.data
        window.location.href = checkoutUrl
      } catch (error) {
      //ferramentas de observabilidade (datalog / sentry)
      setIsLoading(false)
      console.log("ERRO!")
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button onClick={handleBuyButton} disabled={isLoading}>
              Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}


export const getStaticPaths:GetStaticPaths = () => {
  // Buscar posts mais acessados / produtos mais vendidos

  return {
    paths: [
      // {params: {id: 'id'}}
    ], 
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const productPrice = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: productPrice.unit_amount! / 100,
        formattedPrice: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(productPrice.unit_amount! / 100),
        priceId: productPrice.id,
        description: product.description,
      },
    },
  };
};
