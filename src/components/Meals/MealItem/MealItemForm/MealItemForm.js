import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../../UI/Input";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setIsAmountValid(false);
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          htmlFor: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          ref: inputRef,
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please, enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
