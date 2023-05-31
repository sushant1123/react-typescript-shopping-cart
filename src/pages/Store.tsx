import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products?limit=10&select=id,title,price,images"
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
