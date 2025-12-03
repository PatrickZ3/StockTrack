import Overview from './stocks-component/overview';
import ProductLog from './stocks-component/product-log';
import { useEffect, useState } from 'react';

// id, user_id, name, description, quantity, status, created_at, updated_at

function Stocks() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:4000/products", {headers: {Authorization: `Bearer ${token}`,},});
      
      const data = await res.json();
      
      console.log("Fetched Products:", data);

      if(res.ok){
        setProducts(data.products);
      }

      setLoading(false);
    };
    fetchProducts();
  },[]);
  
  if (loading) {
    return (
      <div className="stocks" style={{ padding: "2rem", fontSize: "1.5rem" }}>
        Loading products...
      </div>
    );
  }

  
  return (
    <div className='stocks'>
      <Overview data={products} />
      <ProductLog data={products} />
    </div>
  );
}

export default Stocks;
