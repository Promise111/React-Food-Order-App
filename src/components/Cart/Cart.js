import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(cartCtx.totalAmount.toFixed(2));

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          // onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  const onCartCloseClick = () => {
    props.onCartCloseClick();
  };
  return (
    <Modal onOverlayClick={props.onCartCloseClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onCartCloseClick}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button
            className={classes.button}
            onClick={() => console.log("Ordering...")}
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
