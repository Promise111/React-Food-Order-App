import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  let price = `₦${props.price.toFixed(2)}`;
  const AddHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: 1,
    });
  };
  const RemoveHandler = () => {
    cartCtx.removeItem(props.id);
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onChange={props.onRemove} onClick={RemoveHandler}>
          −
        </button>
        <button onChange={props.onAdd} onClick={AddHandler}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
