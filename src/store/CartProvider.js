import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE":
      let removeUpdatedItems = [...state.items];
      const removeItemIndex = removeUpdatedItems.findIndex(
        (item) => item.id === action.id
      );
      let itemToBeRemoved = removeUpdatedItems[removeItemIndex];

      let removeUpdatedTotalAmount =
        state.totalAmount >= itemToBeRemoved.price
          ? state.totalAmount - itemToBeRemoved.price
          : state.totalAmount;

      if (itemToBeRemoved.amount === 1) {
        removeUpdatedItems = removeUpdatedItems.filter((item, index) => {
          return removeItemIndex !== index;
        });
      }

      if (itemToBeRemoved.amount > 1) {
        removeUpdatedItems[removeItemIndex] = {
          ...itemToBeRemoved,
          amount: itemToBeRemoved.amount - 1,
        };
      }

      return {
        items: removeUpdatedItems,
        totalAmount: removeUpdatedTotalAmount,
      };

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: "REMOVE", id: itemId });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  // useEffect(() => {
  //   console.log();
  // }, [cartState]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
