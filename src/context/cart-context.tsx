import { createContext, useContext, useState } from "react";

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  formattedPrice: string
  price: number
  priceId: string
}

interface CartContextProps {
  products: ProductProps[]
  addProductToList: (product:ProductProps) => void
  removeProductFromList: (productId: string) => void
}

const CartContext = createContext({} as CartContextProps)


interface CartContextProviderProps {
  children: React.ReactNode
}

export const CartContextProvider = ({children}: CartContextProviderProps) => {
  const [products, setProducts] = useState<ProductProps[]>([])

  function addProductToList(newProduct:ProductProps) {
    if(!products.some(product => product.id === newProduct.id)) {
      setProducts((state) => [...state, newProduct])
    }
  }

  function removeProductFromList(productId: string) {
    setProducts((state) => state.filter(product => product.id !== productId))
  }

  return (
    <CartContext.Provider value={{
      products, 
      addProductToList, 
      removeProductFromList
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)