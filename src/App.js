import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartModalStatus, setCartModalStatus] = useState(false);
  const CartButtonClickHandler = () => {
    setCartModalStatus((prevState) => {
      return !prevState;
    });
  };
  return (
    <CartProvider>
      {cartModalStatus && <Cart onCartCloseClick={CartButtonClickHandler} />}
      <Header onCartButtonClick={CartButtonClickHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
