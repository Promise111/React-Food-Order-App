import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm/MealItemForm";
import CartContext from "../../../store/cart-context";

function Meal(props) {
  const cartContext = useContext(CartContext);

  const price = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(props.meal.price.toFixed(2));

  const onAddToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3 className={classes.name}>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
}

export default Meal;
