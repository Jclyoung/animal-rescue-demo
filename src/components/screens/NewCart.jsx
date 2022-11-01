import React from "react";
import {products} from "../../fakeDb/store/products";
import { useCartContext } from "./cartContext";

export default function Cart() {
  const { cart, dispatch } = useCartContext();
  
  function renderItem(itemInCart) {
    const { id, quantity } = itemInCart;
    const { price, name, weight } = products.find((p) => p.id === id);

    return (
      <li key={id} className='cart-item'>
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>{`Weight: ${weight} lbs`}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} weight ${weight} lbs.`}
              onChange={(e) =>
                dispatch({
                  type: "updateQuantity",
                  id,
                  quantity: e.target.value,
                })
              }
              value={quantity}
            >
              <option value='0'>Remove</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </p>
        </div>
      </li>
    );
  };

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section id='cart'>
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>{cart.map(renderItem)}</ul>
      {cart.length > 0 && (
        <button
          className='btn btn-primary'
          onClick={() => {}}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
