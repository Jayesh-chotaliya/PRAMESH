import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fade } from "@material-ui/core";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap/all";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  setAddtocartpage,
  setAddtocartsavedata,
  setAddtocartsubtotal,
} from "../../../redux/actions/productActions";
import { Link } from "react-router-dom";

const Addtocart = () => {
  // ****************Add to cart Cookie Proccess-***************
  var cookie = localStorage.getItem("cookie");
  var iUserId = localStorage.getItem("iUserId");

  if (cookie === null) {
    var now = new Date().getTime();
    localStorage.setItem("cookie", now);
  }

  const [num, setnum] = useState(0);
  const [Quntity, setQuntity] = useState(0);
  const [slide, setSlide] = useState(false);
  const [Totalproducterror, setTotalproducterror] = useState("");
  const [Qtyerror, setQtyerror] = useState("");
  // const [Subtotal, setSubtotal] = useState('');

  const dispatch = useDispatch();
  var answer = window.location.href;
  const answer_array = answer.split("/");

  var iProductId = atob(answer_array[4]);
  var vPrice = atob(answer_array[5]);

  const AddtocartProduct = async () => {
    if (answer_array[2] == "localhost:3000") {
      var product_listing = `http://localhost/pramesh/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
      var cartdatasave = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    } else {
      var product_listing = `http://pramesh.justcodenow.com/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
      var cartdatasave = `http://pramesh.justcodenow.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    }

    const productdata = await axios.get(product_listing);
    if (productdata.data.data) {
      dispatch(setAddtocartpage(productdata.data.data));
    }
    // *********************ADD TO CART DATA ******************
    const addtocart = await axios.get(cartdatasave);

    if (addtocart.data.data) {
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
  };
  useEffect(() => {
    AddtocartProduct();
  }, []);

  var settings = {
    dots: true,
    cssEase: "linear",
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var Carousel = require("react-responsive-carousel").Carousel;

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

  const sliding = () => {
    setSlide(false);
  };

  const addtocart = () => {
    var vImage = document.getElementById("vImage").value;
    var Addqty = document.getElementById("Addqty").value;
    var vPrice = document.getElementById("vPrice").value;
    var vProductName = document.getElementById("vProductName").value;

    if (Addqty > 0) {
      setQtyerror("");
    } else {
      setQtyerror("Please Select Quntity");
    }

    const fd = new FormData();
    fd.append("iProductId", iProductId);
    fd.append("vProductName", vProductName);
    fd.append("vPrice", vPrice);
    fd.append("vImage", vImage);
    fd.append("vQty", Addqty);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);

    if (Addqty > 0) {
      if (answer_array[2] == "localhost:3000") {
        var addtocart = "http://localhost/pramesh/backend/api/addtocart";
      } else {
        var addtocart = "http://pramesh.justcodenow.com/backend/api/addtocart";
      }
      const dataa = axios
        .post(addtocart, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            setSlide(true);
            dispatch(setAddtocartsavedata(res.data.data));
            dispatch(setAddtocartsubtotal(res.data.subtotal));
          } else {
          }
        })
        .catch((error) => {});
    }
  };

  const Remove_addtocart = (e) => {
    var iAddtocartId = e.target.id;
    var p = "." + iAddtocartId + "";

    if (answer_array[2] == "localhost:3000") {
      var remove_product = `http://localhost/pramesh/backend/api/addtocartdelete`;
    } else {
      var remove_product = `http://pramesh.justcodenow.com/backend/api/addtocartdelete`;
    }

    const fd = new FormData();
    fd.append("iAddtocartId", iAddtocartId);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);
    if (iAddtocartId != "undefined") {
      const dataa = axios
        .post(remove_product, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            dispatch(setAddtocartsavedata(res.data.data));
            dispatch(setAddtocartsubtotal(res.data.subtotal));
            gsap.fromTo(
              "" + p + "",
              { y: 0, opacity: 1 },
              { y: 40, opacity: 0, duration: 2 }
            );
          } else {
          }
        })
        .catch((error) => {});
    }
  };
  const Single_product = useSelector(
    (state) => state.MainAddtocartPage.MainAddtocartArray
  );
  const Addtocart = useSelector(
    (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  );
  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );

  // console.log("OKKKK", SubTotal);

  return (
    <>
      <Navbar />

      <section className="addtocart  container-fluid">
        <div className="row  ">
          {Single_product.map(function (product, i) {
            return (
              <>
                {/* <div className="col-xl-5 col-lg-5 leftcart">
                  {product.image.map(function (img, index) {
                    return (
                      <div className="l-img ">
                        <img src={img.vImage} alt="cartImg" />
                        <input type="hidden" id="vImage" value={img.vImage} />
                       
                      </div>
                    );
                  })}
                </div> */}
                <div className="col-xl-5 col-lg-5 leftcart">
                  <Carousel showArrows={false}>
                    {product.image.map(function (img, index) {
                      return (
                        <div>
                          <img src={img.vImage} alt="" />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
                <div className="col-xl-7 col-lg-7 rightcart">
                  <h1>{product.vProductName}</h1>
                  <input
                    type="hidden"
                    id="vProductName"
                    value={product.vProductName}
                  />
                  <input type="hidden" id="vQty" value={product.vQty} />
                  <p className="mb-5 pri"> र {product.vPrice} </p>

                  <div className="sizes">
                    <h3>Size</h3>

                    <div className="d-flex">
                      <div>
                        <input type="radio" name="size" id="sizexs" />
                        <label htmlFor="sizexs">XS</label>
                      </div>
                      <div>
                        <input type="radio" name="size" id="sizes" />
                        <label htmlFor="sizes">S</label>
                      </div>
                      <div>
                        <input type="radio" name="size" id="sizem" />
                        <label htmlFor="sizem">M</label>
                      </div>
                      <div>
                        <input type="radio" name="size" id="sizel" />
                        <label htmlFor="sizel">L</label>
                      </div>
                      <div>
                        <input type="radio" name="size" id="sizexl" />
                        <label htmlFor="sizexl">XL</label>
                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="vPrice" value={product.vPrice} />
                  <div className="qty mt-5">
                    <span className="mr-4">Quantity : </span>

                    <button className="qty-count" onClick={minus}>
                      <i class="fa fa-minus"></i>
                    </button>

                    <span className="product-qty"> {num} </span>

                    <input type="hidden" id="Addqty" value={num} />
                    
                    <button className="qty-count" onClick={plus}>
                      <i class="fa fa-plus"></i>
                    </button>
                    <span className="red">{Qtyerror}</span>
                  </div>

                  <div className="bag mb-5 ">
                    <button className="btnbag" onClick={addtocart}>
                      <i
                        className="fa fa-shopping-bag mr-3"
                        aria-hidden="true"
                      ></i>
                      ADD TO CART
                    </button>
                    <span className="heart ml-4">
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </span>
                  </div>
                  <span className="red">{Totalproducterror}</span>

                  <h2 className="mt-5">Estimated Shipping : 10-12 DAYS</h2>

                  <div className="desc">
                    <div class="tabs">
                      <input type="radio" name="tabs" id="tabone" checked />
                      <label for="tabone">DESCRIPTION</label>
                      <div class="tab">
                        <p>{product.iDescription}</p>
                      </div>

                      <input type="radio" name="tabs" id="tabtwo" />
                      <label for="tabtwo">MORE INFORMATION</label>
                      <div class="tab">
                        <p>{product.tMoreInformation}</p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </>
            );
          })}
        </div>

        {/* SLICK MINI  Slider  */}

        <div className="slickslider">
          <Slider {...settings}>
            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive3.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>
            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>

            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>
            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive4.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>
            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>
            <div className="sliderImg">
              <img
                src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                alt="img"
              />
              <h3 className="text-center">New Panjabi Sarees</h3>
              <p className="text-center">र 16000</p>
            </div>
          </Slider>
        </div>

        {/* Add on Cart section   */}

        <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
          <button className="closed" onClick={sliding}>
            <i className="fa fa-times"></i>
          </button>

          <div className="scroll">
            {Addtocart.length > 0 ? (
              Addtocart.map(function (addtoct, index) {
                return (
                  <>
                    <div className={`mycards ${addtoct.iAddtocartId}`}>
                      <button
                        id={`${addtoct.iAddtocartId}`}
                        onClick={Remove_addtocart}
                        className="close"
                      >
                        <i className="fa fa-close"></i>
                      </button>
                      <div className="cardimg mr-4">
                        <img className="img" src={addtoct.vImage} alt="img" />
                      </div>
                      <div className="cartinfo">
                        <h2>{addtoct.vProductName}</h2>
                        <p>
                          Qty : <span>{addtoct.vQty}</span>
                        </p>
                        <h4>र {addtoct.vTotal}</h4>
                      </div>
                    </div>
                  </>
                );

                // return<><h1>Record Not Found!</h1></>
              })
            ) : (
              <>
                <hr></hr>
                <h1 className="text-center">Record Not Found!</h1>
                <hr></hr>
              </>
            )}
          </div>

          <div className="total p-3">
            <h2>CART SUBTOTAL :</h2>
            <h3>र {SubTotal}</h3>
          </div>

          <div className="checkout">
            <Link to="/viewcart" style={{ display: "contents" }}>
              <button className="cbtn">VIEW CART</button>
            </Link>
            <button className="pbtn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Addtocart;
