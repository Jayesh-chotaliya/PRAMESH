import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { gsap } from "gsap/all";
import {
    setMainheader,
    setProductListing,
    setMainproductdata,
    setAddtocartsavedata,
    setAddtocartsubtotal,
} from "../../redux/actions/productActions";

const Navbar = () => {
    var cookie = localStorage.getItem("cookie");
    var iUserId = localStorage.getItem("iUserId");

    const [slide, setSlide] = useState(false);
    const [search, setsearch] = useState(false)

    function searching() {
        
        if(search == false){
            setsearch(true)
         gsap.fromTo(
             ".searched",
             { y: -50, opacity: 0 , display : "none"},
             { y: 0, opacity: 1, display : "flex" ,duration: 0.5 }
         );
        }
 
        if(search == true){
         gsap.fromTo(
             ".searched",
             { y: 0, opacity: 1 ,display : "flex" },
             { y: -50, opacity: 0,  display : "none" , duration: 0.5 }
         );
         setsearch(false)
 
        }
    }
    
    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
        var header          = `http://localhost/pramesh/backend/api/header`;
        var url             = `http://localhost/pramesh/backend/api/main_product_listing`;
        var cartdatasave    = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    } else {
        var header          = `http://pramesh.justcodenow.com/backend/api/header`;
        var url             = `http://pramesh.justcodenow.com/backend/api/main_product_listing`;
        var cartdatasave    = `http://pramesh.justcodenow.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    }
    const mainNavbar = async () => {
        // ***************HEADER***************
        const headerdata = await axios.get(header).catch((err) => {
            console.log("error", err);
        });
        if (headerdata.data.data) {
            dispatch(setMainheader(headerdata.data.data));
        }
        // *********************ADD TO CART DATA ******************
        const addtocart = await axios.get(cartdatasave);

        if (addtocart.data.data) {
            dispatch(setAddtocartsavedata(addtocart.data.data));
            dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
        }

    };

    useEffect(() => {
        mainNavbar();
    }, []);

    const Remove_addtocart = (e) => {
        var iAddtocartId = e.target.id;

        if (answer_array[2] == 'localhost:3000') {
            var remove_product = `http://localhost/pramesh/backend/api/addtocartdelete`;
        }
        else {
            var remove_product = `http://pramesh.justcodenow.com/backend/api/addtocartdelete`;
        }

        const fd = new FormData();
        fd.append('iAddtocartId', iAddtocartId);
        fd.append('vCookie', cookie);
        fd.append('iUserId', iUserId);
        if (iAddtocartId != 'undefined') {
            const dataa = axios.post(remove_product, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        dispatch(setAddtocartsavedata(res.data.data));
                        dispatch(setAddtocartsubtotal(res.data.subtotal));

                    }
                    else {

                    }
                })
                .catch(error => {
                })
        }


    }

    const Header_data   = useSelector((state) => state.Mainheader.MainheaderArray);
    const Addtocart     = useSelector((state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray);
    const SubTotal      = useSelector((state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray);

    const SubcategortClick = async (e) =>
    {
        var SubCategoryId = e.target.id;
        if (answer_array[2] == 'localhost:3000') {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?SubCategoryId=${SubCategoryId}`;
        }
        else {
            var product_listing = `http://pramesh.justcodenow.com/backend/api/product_listing?SubCategoryId=${SubCategoryId}`;
        }
        const productdata = await axios.get(product_listing);
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    }

    const mainproductdata = async () => {
        const maindata = await axios.get(url).catch((err) => {
            console.log("error", err);
        });
        if (maindata.data.data) {
            dispatch(setMainproductdata(maindata.data.data));
        }
    };

    const show_addtocart_data = () => {
        setSlide(true);
    }
    const sliding = () => {
        setSlide(false);
    }


    useEffect(() => {
        mainproductdata();
    }, []);

    return (
        <>
        <div className="searched ">
            <div className="search">
                <div className="position-relative">
                    <input type="text" placeholder="Search" />
                    <i className="fa fa-search"></i>
                </div>
            </div>
        </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="nav-div">
                    <Link to="/">
                        <div className="navbar-brand" href="/">
                            <img
                                src={process.env.PUBLIC_URL + "/Images/logo.png"}
                                alt="logo"
                            />
                        </div>
                    </Link>
                    <div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>

                <div className="  collapse navbar-collapse " id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {Header_data.map(function (header, index) {
                            if (header.sub.length > 0) {
                                var x = header.sub.length;
                                if (x > 20) {
                                    var p = "col-xl-3  col-lg-4 col-md-6 col-sm-6";
                                    var size = "left_size1";
                                } else if (x < 5) {
                                    var p = "col-xl-12";
                                    var size = "left_size3";
                                } else if (x < 10) {
                                    var p = "col-xl-4 col-lg-4 col-md-4 col-sm-6";
                                    var size = "left_size4";
                                } else if (x < 15 && x != 3) {
                                    var p = "col-xl-4 col-lg-4 col-md-4 col-sm-6";
                                    var size = "left_size2";
                                }
                                return (
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="/"
                                            id="navbarDropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {header.vTitle}
                                        </a>

                                        <div
                                            className={`dropdown-menu ${size}`}
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <div className="row nItem pl-3">
                                                {header.sub.map(function (sub, ids) {
                                                    var subcatname = '';
                                                    var subcatname = sub.vSubTitle;
                                                    var name = subcatname.replace(/ /g, '');
                                                    return (
                                                        <div className={p}>
                                                            <i class="fa fa-snowflake-o" style={{ color: "#5e000a" }} aria-hidden="true"></i>
                                                            <Link to={`/product-listing/${name}/${sub.iSubcategoryId}`}>
                                                                <a id={`${sub.iSubcategoryId}`} onClick={SubcategortClick} className="dropdown-item">{sub.vSubTitle}</a>
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className=" previewImg">
                                                <img src={header.vImage} alt="Image" />
                                            </div>
                                        </div>
                                    </li>
                                );
                            } else {
                                return (
                                    <Link to="/product-listing">
                                        <li className="nav-item ">
                                            <a className="nav-link">{header.vTitle}</a>
                                        </li>
                                    </Link>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className="d-flex iconBox">
                    <div className="icons ">
                        <span onClick={searching}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </span>
                        <span>
                            <Link to='/register'>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            </Link>
                        </span>
                    </div>
                    <div className="cart position-relative" onClick={show_addtocart_data}  >
                            <i className="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
                        <span id="cartNum" >
                        {Addtocart.length}
                        </span>
                    </div>
                    <div className="inr">
                        <span>
                            <i className="fa fa-chevron-down mr-2" aria-hidden="true"></i>INR
                        </span>
                    </div>
                </div>
            </nav>
            {/* ******************************* */}
            {/* Add on Cart section   */}

            <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
                <button className="closed" onClick={sliding}>
                    <i className="fa fa-close"></i>
                </button>

                <div className="scroll">
                    {
                        Addtocart.length > 0 ?
                            Addtocart.map(function (addtoct, index) {
                                return <>
                                    <div className="mycards">
                                        <button id={`${addtoct.iAddtocartId}`} onClick={Remove_addtocart} className="close">X</button>
                                        <div className="cardimg mr-4"><img className="img" src={addtoct.vImage} alt="img" /></div>
                                        <div className="cartinfo">
                                            <h2>{addtoct.vProductName}</h2>
                                            <p>Qty : <span>{addtoct.vQty}</span></p>
                                            <h4>र {addtoct.vTotal}</h4>
                                        </div>
                                    </div>
                                </>

                            })
                            :
                            <><hr></hr>
                                <h1 className="text-center">Record Not Found!</h1>
                                <hr></hr>
                            </>
                    }
                </div>

                <div className="total p-3">
                    <h2>CART SUBTOTAL :</h2>
                    <h3>र {SubTotal}</h3>
                </div>
                <div className="checkout">
                    <button className="cbtn">VIEW CART</button>
                    <button className="pbtn">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
