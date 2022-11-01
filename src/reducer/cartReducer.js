export default function cartReducer(cart, action) {
  let { id } = action;
  let itemInCart = cart.find((x) => x.id === id);
  switch (action.type) {
    case "empty":
      return [];
    case "updateQuantity": {
      const { quantity, id } = action;
      return quantity === 0
        ? cart.filter((x) => x.id !== id)
        : cart.map((x) => (x.id === id ? { ...x, quantity } : x));
    }
    case "add":
      if (itemInCart) {
        // Return new array with the matching item replaced
        return cart.map((x) =>
          x.id === id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        // Return new array with the new item appended
        return [...cart, { id, quantity: 1 }];
      }
    case "subtract":;
      if (itemInCart) {
          const newCart = cart.map((x) =>
          if (x.id === id){
            { ...x, quantity: x.quantity - 1 }: cart)} : cart.pop(x => id === id);
        } else {
        return cart;
      }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}
