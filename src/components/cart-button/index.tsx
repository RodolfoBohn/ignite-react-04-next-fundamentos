
import { Handbag, X } from "phosphor-react";
import { ButtonWrapper, CartWrapper, CloseButton, ContentWrapper, FinishButton, ImageContainer, ProductItem, ProductsWrapper, QuantityWrapper, SummaryWrapper, ValueWrapper } from "./styles";
import { useCartContext } from "@/context/cart-context";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";


export const CartButton = () => {
  const {products, removeProductFromList} = useCartContext()
  const [isLoading, setIsLoading] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const productsQuantity = products.length
  const cartButtonIsDisabled = productsQuantity === 0

  const totalValue = products.reduce((acc, product) => {
    return acc + product.price
  }, 0)

  const formattedTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency', 
    currency: 'BRL'
  }).format(totalValue)

  function handleCartClick() {
    setOpenCart(state => !state)
  }

  function handleRemoveItem(productId: string) {
    removeProductFromList(productId)
  }

  async function handleBuyButton() {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout', {
        pricesId: products.map(product => product.priceId)
      })

        const { checkoutUrl } = response.data
        window.location.href = checkoutUrl
      } catch (error) {
      //ferramentas de observabilidade (datalog / sentry)
      setIsLoading(false)
      console.log("ERRO!")
    }
  }
  
  useEffect(() => {
    if(cartButtonIsDisabled) {
      setOpenCart(false)
    }
  }, [cartButtonIsDisabled])

  return (
    <>
    <ButtonWrapper onClick={handleCartClick} disabled={cartButtonIsDisabled}>
      <Handbag size={32} weight="bold" />
      {!!productsQuantity && <span>{productsQuantity}</span>}
    </ButtonWrapper>

      <CartWrapper data-visible={openCart}>
        <CloseButton onClick={handleCartClick}>
          <X size={24} weight="bold" />
        </CloseButton>
        <ContentWrapper>
          <h2>Sacola de compras</h2>
          <ProductsWrapper>
            {products.map(product => {
              return (
                <ProductItem key={product.id}>
                  <ImageContainer>
                    <Image src={product.imageUrl} height={94} width={94} alt="" />
                  </ImageContainer>
                  <div>
                      <p>{product.name}</p>
                      <span>{product.formattedPrice}</span>
                      <button onClick={() => handleRemoveItem(product.id)}>Remover</button>
                    </div>
                </ProductItem>
              )
            })}
          </ProductsWrapper>
        </ContentWrapper>
        <SummaryWrapper>
          <QuantityWrapper>
            <p>Quantidade</p>
            <span>{productsQuantity} {productsQuantity === 1 ? 'item' : 'itens'}</span>
          </QuantityWrapper>
          <ValueWrapper>
            <span>Valor total</span>
            <span>{formattedTotalValue}</span>
          </ValueWrapper>
          <FinishButton onClick={handleBuyButton} disabled={isLoading}>
            Finalizar compra
          </FinishButton>
          </SummaryWrapper>
      </CartWrapper>
    </>
  )
}  