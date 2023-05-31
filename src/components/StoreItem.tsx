import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type StoreItemProps = {
  item: Product;
};

const StoreItem = ({ item }: StoreItemProps) => {
  const { id, images, price, title } = item;

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={images[0]} height="300px" style={{ objectFit: "cover" }} />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="fs-3">{title}</span>
          <span className="fs-3 text-muted">{formatCurrency(price)}</span>
        </Card.Title>

        <div className="mt-auto">
          {quantity < 1 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: "0.5rem" }}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
