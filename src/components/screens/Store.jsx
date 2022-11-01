import { products } from "../../fakeDb/store/products";
import { ProductCard } from "../ProductCard";
import { useState } from "react";
export function Home() {
  const [data, setData] = useState(products);

  function renderProducts(p) {
    return p.map((x, i) => <ProductCard key={i} pet={x} />);
  }

  return (
    <>
    <h1>Welcome to the Donation Store</h1>
    <div className='home-container'>
        {renderProducts()}
    </div>
    </>
  )
}
