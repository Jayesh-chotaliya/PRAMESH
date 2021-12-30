import React, { useState } from "react";
import "../../../css/home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Viewcart = () => {
  const [num, setnum] = useState(0);

  const plus = () => {
    if (num < 30) {
      setnum(num + 1);
    }
  };

  const minus = () => {
    if (num > 0) {
      setnum(num - 1);
    }
  };
  return (
    <>
      <Navbar />

      <section className="viewcart">
        <div className="row bord">
          <div className="col-xl-5 col-lg-5">
            <h1>ITEM</h1>
          </div>
          <div className="col-xl-3 col-lg-3">
            <h1>QTY</h1>
          </div>
          <div className="col-xl-3 col-lg-3">
            <h1>PRICE</h1>
          </div>
        </div>
        <div className="row mt-2 bordb">
          <span className="close">
            {" "}
            <i className="fa fa-close"></i>
          </span>
          <div className="col-xl-5 col-lg-5 d-flex">
            <img
              src={process.env.PUBLIC_URL + "/Images/patola.png"}
              alt="Image"
              className="mr-3"
            />
            <div>
              <h2>BERT JACKET </h2>
              <h2>SIZE : XS</h2>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 d-flex align-items-center">
            <div className="qty mt-5">
              <button className="qty-count" onClick={minus}>
                -
              </button>
              <span className="product-qty"> {num} </span>
              <input type="hidden" id="Addqty" value={num} />
              <button className="qty-count" onClick={plus}>
                +
              </button>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 d-flex align-items-center">
            <h2>₹8,900</h2>
          </div>
        </div>

        <div className="cartTotal mt-5">
          <div className="d-flex justify-content-between">
            <h5>CART SUBTOTAL</h5>
            <h5>र 23,160.00</h5>
          </div>
          <div className="d-flex justify-content-between">
            <h5>SHIPPING</h5>
            <h5>र 200</h5>
          </div>
          <div className="d-flex justify-content-between">
            <h5>ORDER TOTAL </h5>
            <h5>र 23,160.00</h5>
          </div>
        </div>
        <button className="checkBtn">PROCEED TO CHECKOUT</button>
      </section>

      <Footer />
    </>
  );
};

export default Viewcart;
