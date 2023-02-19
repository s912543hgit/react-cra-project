//外部套件

import "./assets/scss/all.scss";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { CartContext, cartReducer, cartInit } from "./store";
import { useReducer } from "react";

function App() {
  const reducer = useReducer(cartReducer, cartInit);
  return (
    <CartContext.Provider value={reducer}>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-7">
            {/*內層格線*/}
            <Products />
          </div>
          <div className="col-md-5">
            <Cart />
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

function calculateTotalPrice(cartList) {
  return cartList
    .map((item) => item.quanity * item.price)
    .reduce((a, b) => a + b, 0);
}

export default App;
