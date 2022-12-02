import React, { useState } from "react";
import "./Cart.css";

const API = [
  {
    name: "$5.00 Donation",
    price: 5.0,
    count: 0,
    counterVal: 1,
    inCart: false,
  },
  {
    name: "$10.00 Donation",
    price: 10.0,
    count: 0,
    counterVal: 1,
    inCart: false,
  },
  {
    name: "$15.00 Donation",
    price: 15.0,
    count: 0,
    counterVal: 1,
    inCart: false,
  },
  {
    name: "$20.00 Donation",
    price: 20.0,
    count: 0,
    counterVal: 1,
    inCart: false,
  },
];

function Cart() {
  const [cart, setCart] = useState(API);

  const addToCart = (i) => {
    setCart((prevState) =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal,
          };
        }
        return item;
      })
    );
  };

  const increaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1,
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false,
          };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Cart is empty</b>
    ) : (
      <>
        <b>
          <p>Items in Cart: {cartCountTotal}</p>
          <p>
            Total Price: $
            {Number.isInteger(cartPriceTotal)
              ? cartPriceTotal
              : cartPriceTotal.toFixed(2)}
          </p>
        </b>
      </>
    );

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.name}>
      {item.inCart && (
        <>
          <p> Item Name: {item.name}</p>
          <p className='increment-button'>
            Item Count: <button onClick={() => decreaseQuantity(i)}>-</button>{" "}
            {item.count} <button onClick={() => increaseQuantity(i)}>+</button>
          </p>
          <p>
            Item Subtotal: $
            {Number.isInteger(item.count * item.price)
              ? item.count * item.price
              : `${(item.count * item.price).toFixed(2)}`}
          </p>
          <button onClick={() => removeFromCart(i)}>Remove From Cart</button>
          <hr />
        </>
      )}
    </React.Fragment>
  ));

  const cartProducts = () => (
    <div className='flexParent'>
      {cart.map((item, i) => (
        <div key={item.name}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          {!item.inCart ? (
            <>
              <button
                className='donation-button'
                onClick={() => decreaseQuantity(i)}
              >
                -
              </button>
              <input className="donation-qty"readOnly type='text' value={item.counterVal} />
              <button
                className='donation-button'
                onClick={() => increaseQuantity(i)}
              >
                +
              </button>
              <br />
              <button onClick={() => addToCart(i)}>add</button>
            </>
          ) : (
            <p>
              <b>Item added!</b>
            </p>
          )}
        </div>
      ))}
    </div>
  );
  return (
    <div className='cart-donation'>
      <h1>Your Selected Donations</h1>
      {cartItems}
      {cartTotals()}
      {cartProducts()}
    </div>
  );
}

export default Cart;
