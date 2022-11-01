import { useCartContext } from "../contexts/cartContext";

export default function ProductCard(product) {
  const { dispatch } = useCartContext();
  const id = product.id;

  return (
    <div id='detail'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id='price'>${product.price}</p>

      <p id='weight'>${product.weight} lbs</p>

      <p>
        <button
          disabled={!id}
          className='btn btn-primary'
          onClick={() => {
            dispatch({ type: "add", id });
          }}
        >
          Add to cart
        </button>
      </p>
    </div>
  );
}
