import {  GetStaticProps } from "next";
import Image from "next/image";

import { HomeWrapper, Product } from "@/styles/pages/home";
import {stripe} from "../lib/stripe";

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Head from "next/head";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    formattedPrice: string
    price: number
}[]
}

export default function Home({products}: HomeProps) {
  const [ slidesref ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeWrapper ref={slidesref} className="keen-slider">
        {products.map(product => {
          return (

            // Com prefetch false ele não faz o pré carregamento da página referente ao link, somente quando no hover do link
            // <Product className='keen-slider__slide' key={product.id} href={`/product/${product.id}`} prefetch={false}>

            <Product className='keen-slider__slide' key={product.id} href={`/product/${product.id}`}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
              </footer>
            </Product>
          )
        })}
      </HomeWrapper>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const productsList = response.data.map(product => {
    const productPrice = product.default_price as Stripe.Price
    return {
      id: product.id, 
      name: product.name, 
      imageUrl: product.images[0], 
      price: productPrice.unit_amount!/100,
      formattedPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL'
      }).format(productPrice.unit_amount!/100)
    }
  })
  return {
    props: {
      products: productsList
    }, 
    revalidate: 60 * 60 * 2, //2 horas
  }
}