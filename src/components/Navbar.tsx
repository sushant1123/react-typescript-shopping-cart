import { Navbar as NavBarBS, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { cartQuantity, openCart, closeCart } = useShoppingCart();

  return (
    <NavBarBS sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/store"}>
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/about"}>
            About
          </Nav.Link>
        </Nav>

        <Button
          variant="outline-primary"
          className="rounded-circle"
          style={{ position: "relative", height: "3rem", width: "3rem" }}
          onClick={openCart}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor">
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM228.1,67.2a8.1,8.1,0,0,0-6.4-3.2H48.3L40.2,35.6A16.1,16.1,0,0,0,24.8,24H8A8,8,0,0,0,8,40H24.8l9.8,34.1v.2L61,166.6A24.1,24.1,0,0,0,84.1,184h95.8A24.1,24.1,0,0,0,203,166.6l26.4-92.4A8,8,0,0,0,228.1,67.2Z"
              id="mainIconPathAttribute"
              strokeWidth="0"
              stroke="#ff0000"
              fill="blue"
            ></path>
          </svg>

          {cartQuantity > 0 && (
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                position: "absolute",
                height: "1.5rem",
                width: "1.5rem",
                right: "0px",
                bottom: "0px",
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavBarBS>
  );
};

export default Navbar;
