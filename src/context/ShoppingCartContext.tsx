import { useState, createContext, useContext, ReactNode } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type CartType = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cart, setCart] = useLocalStorage<CartType[]>("shopping cart", []);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

  const openCart = () => setIsOpenCart(true);

  const closeCart = () => setIsOpenCart(false);

  const getItemQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    // 2 steps
    // 1. if item is not present in the cart, add item to the cart
    // 2. if item is present in the cart, increment the quantity of it

    setCart((cartItems) => {
      if (cartItems.find((item) => item.id === id) == null) {
        return [...cartItems, { id: id, quantity: 1 }];
      } else {
        return cartItems.map((cart) => {
          if (cart.id === id) {
            return { ...cart, quantity: cart.quantity + 1 };
          } else {
            return cart;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    // 2 steps
    // 1. if present items quantity is 1, remove item from the cart
    // 2. if item is present in the cart, decrement the quantity of it

    setCart((cartItems) => {
      if (cartItems.find((item) => item.id === id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return cartItems.map((cart) => {
          if (cart.id === id) {
            return { ...cart, quantity: cart.quantity - 1 };
          } else {
            return cart;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((cartItems) => {
      return cartItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity: cart.length,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart cart={cart} isOpenCart={isOpenCart} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
