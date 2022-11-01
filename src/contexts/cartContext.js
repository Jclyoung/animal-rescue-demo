import React, { createContext, useReducer, useContext } from "react";
import cartReducer from "../reducer/cartReducer";

export const CartContext = createContext();

let initialCart;
try {
  initialCart = [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const contextValue = {
    cart,
    dispatch,
  };
  return <CartContext.Provider value={contextValue} {...props} />;
}

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error(
//       "useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
//     );
//   }
//   return context;
// }

// function CartProvider(props) {
//   const [cart, dispatch] = useReducer(cartReducer, initialItems);

//   const cartData = { items, dispatch };

//   return <CartProvider value={cartData} {...props} />;
// }

function useCartContext() {
  return useContext(CartContext);
}

export { CartProvider, useCartContext };
