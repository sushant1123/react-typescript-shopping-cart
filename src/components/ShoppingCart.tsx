import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import { products } from "../data/storeItems";

type CartType = {
  id: number;
  quantity: number;
};

type ShoppingCartProps = {
  cart: CartType[];
  isOpenCart: boolean;
};

const ShoppingCart = ({ cart, isOpenCart }: ShoppingCartProps) => {
  const { closeCart } = useShoppingCart();
  const navigate = useNavigate();

  return (
    <Offcanvas show={isOpenCart} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {cart.length === 0 && (
          <>
            <h2>Your Cart is empty</h2>
            <Button
              onClick={() => {
                closeCart();
                navigate("/store");
              }}
            >
              Go to Shopping
            </Button>
          </>
        )}

        {cart.length > 0 && (
          <Stack gap={3}>
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cart.reduce((total, cartItem) => {
                  const item = products.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
