import { GetServerSideProps } from "next";
import Image from "next/image";

import { HomeWrapper, Product } from "@/styles/home";
import {stripe} from "../lib/stripe";

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string, 
    name: string
    imageUrl: string
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
      <HomeWrapper ref={slidesref} className="keen-slider">
        {products.map(product => {
          return (
            <Product key={product.id} className='keen-slider__slide'>
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          )
        })}
      </HomeWrapper>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  console.log(response.data)
  
  const productsList = response.data.map(product => {
    const productPrice = product.default_price as Stripe.Price
    return {
      id: product.id, 
      name: product.name, 
      imageUrl: product.images[0], 
      price: productPrice.unit_amount!/100,
    }
  })
  return {
    props: {
      products: productsList
    }
  }
}