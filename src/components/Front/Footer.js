import React from "react";
import "../../css/home.css";
const Footer = () => {
    return (
        <>
            <footer className="contact">
                <div className="logo mb-5">
                    <img
                        src={process.env.PUBLIC_URL + "/Images/logo.png"}
                        alt="Image"
                        className="img-fluid"
                    />
                </div>
                <div className="mb-5">
                    <h1>NEWS LETTER </h1>
                    <p>
                        Sign up and get notified about the latest launches and surprises
                    </p>
                </div>
                <div className="input mb-5">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="EMAIL ID"
                        required
                    />
                    <label htmlFor="email">
                        SUBSCRIBE <i class="fa fa-caret-right" aria-hidden="true"></i>
                    </label>
                </div>

                <div className="mb-5">
                    <h1>CUSTOMER CARE</h1>
                    <p>MON - SAT | 9:00 AM - 6:00 PM (IST)</p>
                    <p>+919289044698 | pramesh.orders@gmail.com</p>
                </div>

                <div className="mb-5">
                    <h1>STORE TIMINGS </h1>
                    <p> MON - SUN | 11:00 AM - 8:00 PM (IST)</p>
                    <p>Commerce House, 21, Saibaba Road, Kala Ghoda, Fort, Mumbai.</p>
                    <p>
                        Shop no. 10, Sefa House, Pali Mala Road, Opposite Bagle Shop Bandra,
                        Mumbai.
                    </p>
                    <p>
                        38 A & B, middle lane, Opposite Khan Chacha, Khan Market, New Delhi.
                    </p>
                </div>

                <div className="mb-5">
                    <h1>FOLLOW US</h1>
                    <div className="iconss">
                        <span>
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                <div className="footers">
                    <ul>
                        <li>
                            <a href="/">ABOUT US |</a>
                        </li>
                        <li>
                            <a href="/">STORES |</a>
                        </li>
                        <li>
                            <a href="/">CONTACT US |</a>
                        </li>
                        <li>
                            <a href="/">RETURN & EXCHANGE |</a>
                        </li>
                        <li>
                            <a href="/">PRIVACY TERMS & CONDITIONS </a>
                        </li>
                    </ul>
                    <p>
                        Powered by Just Code Softwares. All Rights Reserved &copy; Copyright
                        2021
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
