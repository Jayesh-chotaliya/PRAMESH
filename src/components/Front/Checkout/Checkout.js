import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../../../css/home.css";

const Checkout = () => {
    const [hideinfos, sethideinfos] = useState(false);

    window.onload = () => {
        gsap.fromTo(
            ".leftcheck",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
        gsap.fromTo(
            ".rightcheck",
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        );
    }

    const hideinfo = () => {
        if (hideinfos == false) {
            sethideinfos(true);
        }
        if (hideinfos == true) {
            sethideinfos(false)
        }
    };

  

    return (
        <>
            <section className="checkoutp">
                <h1 className="text-center my-4">CHECKOUT</h1>

                <div className="row justify-content-center">
                    {/* LEFT CHECK */}

                    <div className="leftcheck   col-xl-6 col-lg-8 mx-auto ">
                        <h1>SHIPPING ADDRESS</h1>
                        <div className="loginoption">
                            <h3>Login Options</h3>
                            <input type="text" placeholder="Email Address" />
                            <p>You can create an account after Checkout</p>
                        </div>
                        <hr />
                        <div className="contactdetails">
                            <h3 className="mb-2">Contact Details</h3>
                            <div className="row pl-4 mb-5">
                                <input
                                    type="text"
                                    name="firstname"
                                    className="col-xl-3 col-lg-3   col-md-3  col-sm-10   mb-2 mr-2 "
                                    placeholder="First name"
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    className="col-xl-3  col-lg-3   col-md-3  col-sm-10  mb-2 mr-2  "
                                    placeholder="Last name"
                                />
                                <input
                                    type="text"
                                    name="phonenum"
                                    className="col-xl-4 col-lg-4  col-md-4  col-sm-10  mb-2 "
                                    placeholder="Phone Number"
                                />
                                <input
                                    type="text"
                                    className="col-xl-10  col-lg-10  col-md-10 col-sm-10  mb-2 "
                                    placeholder="Address "
                                    name="address"
                                />
                                <input
                                    type="text"
                                    className="col-xl-2 col-lg-2  col-md-2  col-sm-10  mr-2  "
                                    placeholder="City"
                                    name="city"
                                />
                                <select className="col-xl-3  col-lg-3   col-md-3 col-sm-10 mr-2 ">
                                    <option value="India">India</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                </select>
                                <select className="col-xl-3  col-lg-3  col-md-3  col-sm-10  mr-2 ">
                                    <option value="Goa">Goa</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Gujarat">Gujarat</option>
                                </select>
                                <input
                                    type="text"
                                    className="col-xl-2  col-lg-2   col-md-2 col-sm-10  "
                                    name="zip"
                                    placeholder="Zip/Postal code"
                                />
                            </div>
                        </div>

                        <div className="pay">
                            <h1>PAYMENT METHOD</h1>
                            <p>How would you like to pay for your order?</p>
                            <div class="pretty p-icon p-smooth mt-3" onClick={hideinfo}>
                                <input type="checkbox" name="bill" id="bill" />
                                <div class="state p-maroon">
                                    <i class="icon fa fa-check"></i>
                                    <label htmlFor="bill">
                                        My billing and shipping addresses are the same
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={`row hideinfo ${hideinfos ? "hide" : " "}  mt-4 `}>
                            <input
                                type="text"
                                name="firstname"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8   mb-2 "
                                placeholder="First name"
                            />
                            <input
                                type="text"
                                name="lastname"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 "
                                placeholder="Last name"
                            />
                            <input
                                type="text"
                                name="phonenum"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                                placeholder="Phone Number"
                            />
                            <input
                                type="text"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                                placeholder="Address "
                                name="address"
                            />
                            <input
                                type="text"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                                placeholder="City"
                                name="city"
                            />
                            <select className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 ">
                                <option value="India">India</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                            </select>
                            <select className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 ">
                                <option value="Goa">Goa</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Gujarat">Gujarat</option>
                            </select>
                            <input
                                type="text"
                                className="col-xl-8 col-lg-7 col-md-10 col-sm-8  "
                                name="zip"
                                placeholder="Zip/Postal code"
                            />
                        </div>

                        <div className="shipping mt-5">
                            <h1>SHIPPING METHOD</h1>
                            <p>₹200 Shipping Charges</p>
                        </div>
                    </div>

                    {/* RIGHT CHECK  */}

                    <div className="rightcheck  col-xl-5  col-lg-8 mx-auto">
                        <h1>ORDER SUMMARY</h1>
                        <h3>1 ITEM IN CART</h3>
                        <hr />

                        <div className="scroll">
                            <div className="mycards d-flex mb-4">
                                <div className="cardimg mr-4">
                                    <img
                                        className="img"
                                        src={process.env.PUBLIC_URL + "/Images/left1.jpg"}
                                        alt="img"
                                    />
                                </div>
                                <div className="cartinfo">
                                    <div className="d-flex justify-content-between">
                                        <h2>ORANGE MUGA SILK SAREE</h2>
                                        <h2>र 23,160.00</h2>
                                    </div>
                                    <p>Qty : 1</p>
                                    <p>Size : XL</p>
                                </div>
                            </div>

                            
                            
                        </div>

                        <div className="cartTotal">
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

                        <div className="discount mt-4">
                            <h3>Apply Discount Code</h3>
                            <div className="position-relative">
                                {" "}
                                <input
                                    type="text"
                                    name="coupon"
                                    className="discode"
                                    placeholder="ENTER DISCOUNT CODE"
                                />{" "}
                                <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
                            </div>

                            <div class="pretty p-icon p-smooth mt-5">
                                <input type="checkbox" name="bill" id="bill" />
                                <div class="state p-maroon">
                                    <i class="icon fa fa-check"></i>
                                    <label htmlFor="bill">Sign up for our Newsletter</label>
                                </div>
                            </div>
                            <div className="comment mt-3">
                                <h3>Order Comment</h3>
                                <textarea
                                    name="comment"
                                    style={{
                                        width: "100%",
                                        height: "5rem",
                                        border: "3px solid #efeae6",
                                    }}
                                ></textarea>
                            </div>
                            <buton className="checkoutbtn">CONTINUE CHECKOUT</buton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
