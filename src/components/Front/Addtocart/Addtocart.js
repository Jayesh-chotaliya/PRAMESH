import React, { useState ,useEffect} from "react";
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
import { setAddtocartpage } from "../../../redux/actions/productActions";
const Addtocart = () => {
     // ****************Add to cart Cookie Proccess-***************
    var cookie = localStorage.getItem("cookie");
    if (cookie == null) {
        var now = new Date().getTime();
        localStorage.setItem("cookie", now);
    }
    const [num, setnum] = useState(0);
    const [Quntity, setQuntity] = useState(0);
    const [slide, setSlide] = useState(false);
    const [Totalproducterror, setTotalproducterror] = useState('');

    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    
    var iProductId  = atob(answer_array[4]);
    var vPrice      = atob(answer_array[5]);

    
    
    const AddtocartProduct = async () => {
        if (answer_array[2] == 'localhost:3000') {
            var product_listing = `http://localhost/pramesh/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
        }
        else {
            var product_listing = `http://pramesh.justcodenow.com/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
        }
       
        const productdata = await axios.get(product_listing);
    
        if (productdata.data.data) {
            dispatch(setAddtocartpage(productdata.data.data));
        }
    }
    useEffect(() => {
        AddtocartProduct();
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    

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
    }
    
    const addtocart = () => {
        // setCookie();
        // var username = getCookie("username");
        // console.log(username);s
        var vImage          = document.getElementById('vImage').value;
        var Addqty          = document.getElementById('Addqty').value;
        var vPrice          = document.getElementById('vPrice').value;
        var vProductName    = document.getElementById('vProductName').value;
        var vQty            = document.getElementById('vQty').value;

        console.log(Addqty,"&&&", vQty);

        if (answer_array[2] == 'localhost:3000') {
            var addtocart = 'http://localhost/pramesh/backend/api/addtocart';
        }
        else {
            var addtocart = 'http://pramesh.justcodenow.com/backend/api/addtocart';
        }

        const fd = new FormData();
        fd.append('iProductId', iProductId);
        fd.append('vProductName', vProductName);
        fd.append('vPrice', vPrice);
        fd.append('vImage', vImage);
        fd.append('vQty', Addqty);
        fd.append('vCookie',cookie);
        
        if (Addqty <= vQty)
        {
            setTotalproducterror('');
            const dataa = axios.post(addtocart, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        alert();
                        setTimeout(function () {
                            setSlide(true)
                        }, 1000);
                    }
                    else {
                    }
                })
                .catch(error => {
                })
        }
        else
        {
            setTotalproducterror(`available only  ` + vQty + ` quantity`)
        }  
    }
    const Single_product = useSelector((state) => state.MainAddtocartPage.MainAddtocartArray);

    // console.log("OKKKK", Single_product.vQty);
   

    return (
        <>
            <Navbar />

            <section className="addtocart  container-fluid">
                <div className="row  ">
                {
                    Single_product.map(function (product, i) {
                        
                        return(
                            <>
                                <div className="col-xl-5 col-lg-5 leftcart">
                                    {
                                        product.image.map(function(img,index)
                                        {
                                            return <div className="l-img ">
                                                        <img src={img.vImage} alt="cartImg" />
                                                <input type="hidden" id="vImage" value={img.vImage} />
                                                    </div>
                                                    
                                        })
                                    
                                    }
                                </div>
                                
                            <div className="col-xl-7 col-lg-7 rightcart">
                                    <h1>{product.vProductName}</h1>
                                    <input type="hidden" id="vProductName" value={product.vProductName} />
                                    <input type="hidden" id="vQty" value={product.vQty} />

                                    
                                    <p className="mb-5"> र {product.vPrice} </p>
                                    <input type="hidden" id="vPrice" value={product.vPrice} />

                            <div className="qty mt-5">
                                        <span className="mr-4">QUANTITY </span>
                                <button className="qty-count" onClick={minus}>
                                    -
                                </button>
                                <span className="product-qty"> {num} </span>
                                        <input type="hidden" id="Addqty" value={num} />
                             
                                <button className="qty-count" onClick={plus}>
                                    +
                                </button>
                                
                            </div>

                            <div className="bag mb-5 ">
                                <button className="btnbag" onClick={addtocart}>
                                    <i className="fa fa-shopping-bag mr-3" aria-hidden="true"></i>
                                    ADD TO CART
                                </button>
                                        
                                <span className="heart ml-4">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </span>
                            </div>
                            <span className="red">{Totalproducterror}</span>

                            <h2 className="mt-5">ESTIMATED SHIPPING : 10-12 DAYS</h2>
                           

                            <div className="desc">
                                <div class="tabs">
                                    <input type="radio" name="tabs" id="tabone" checked />
                                    <label for="tabone">DESCRIPTION</label>
                                    <div class="tab">
                                        <p>
                                            {product.iDescription}
                                        </p>
                                    </div>

                                    <input type="radio" name="tabs" id="tabtwo" />
                                    <label for="tabtwo">MORE INFORMATION</label>
                                    <div class="tab">
                                        <p>
                                            {product.tMoreInformation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> </>)
                    })
                }   
                </div>

                {/* SLICK MINI  Slider  */}




                <div className="slickslider">

                    <Slider {...settings}>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive3.png"} alt="img" />
                        </div>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive2.png"} alt="img" />
                        </div>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive1.png"} alt="img" />
                        </div>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive4.png"} alt="img" />
                        </div>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive2.png"} alt="img" />
                        </div>
                        <div>
                            <img src={process.env.PUBLIC_URL + "/Images/festive1.png"} alt="img" />
                        </div>
                    </Slider>
                </div>

                {/* Add on Cart section   */}

                <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
                    <button className="closed" onClick={sliding}>X</button>

                    <div className="scroll">

                        <div className="mycards">
                            <button className="close">X</button>
                            <div className="cardimg mr-4"><img className="img" src={process.env.PUBLIC_URL + "/Images/left1.jpg"} alt="img" /></div>
                            <div className="cartinfo">
                                <h2>ORANGE MUGA SILK SAREE</h2>
                                <p>Qty : <span>{num}</span></p>
                                <h4>र 23,160.00</h4>
                            </div>
                        </div>




                    </div>

                    <div className="total p-3">
                        <h2>CART SUBTOTAL :</h2>
                        <h3>र 23,160.00</h3>
                    </div>

                    <div className="checkout">
                        <button className="cbtn">VIEW CART</button>
                        <button className="pbtn">PROCEED TO CHECKOUT</button>
                    </div>





                </div>
            </section>

            <Footer />
        </>
    );
};

export default Addtocart;




