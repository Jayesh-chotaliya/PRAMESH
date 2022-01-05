import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import Navbar from '../Navbar';
import axios from 'axios';
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    setProducts, setMinibanner,
    setFirstImage, setSecondImage,
    setThirdImage, setHomepagedata
} from "../../../redux/actions/productActions";
import ScrollToTop from "../ScrollToTop";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [image_zooming, setimage_zooming] = useState('');
 

    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var urls                    = `http://localhost/pramesh/backend/api/banner`;
        var minibanner              = `http://localhost/pramesh/backend/api/mini_banner`;
        var FirstImage              = `http://localhost/pramesh/backend/api/first_image`;
        var Secondimage             = `http://localhost/pramesh/backend/api/second_image`;
        var Thirdimage              = `http://localhost/pramesh/backend/api/third_image`;
        var homepage_producturl     = `http://localhost/pramesh/backend/api/homepage_product`;
    }
    else {
        var urls                    = `http://pramesh.justcodenow.com/backend/api/banner`;
        var minibanner              = `http://pramesh.justcodenow.com/backend/api/mini_banner`;
        var FirstImage              = `http://pramesh.justcodenow.com/backend/api/first_image`;
        var Secondimage             = `http://pramesh.justcodenow.com/backend/api/second_image`;
        var Thirdimage              = `http://pramesh.justcodenow.com/backend/api/third_image`;
        var homepage_producturl     = `http://pramesh.justcodenow.com/backend/api/homepage_product`;
    }








    // *******************banner Data Get*****************************
    const fetchbanner = async () => {
        const response = await axios.get(urls).catch((err) => {
            console.log("error", err);
        });

        const res = await axios.get(minibanner).catch((err) => {
            console.log("error", err);
        });

        const firstimage = await axios.get(FirstImage).catch((err) => {
            console.log("error", err);
        });

        if (response.data.data) {
            dispatch(setProducts(response.data.data));
        }
        if (res.data.data) {
            dispatch(setMinibanner(res.data.data));
        }
        if (firstimage.data.data) {
            dispatch(setFirstImage(firstimage.data.data));
        }

    };
    const fetchsecondimage = async () => {
        const secondimage = await axios.get(Secondimage).catch((err) => {
            console.log("error", err);
        });
        if (secondimage.data.data) {
            dispatch(setSecondImage(secondimage.data.data));
        }

    };
    const fetchthirddimage = async () => {
        const thirdimage = await axios.get(Thirdimage).catch((err) => {
            console.log("error", err);
        });

        const homepage_data = await axios.get(homepage_producturl).catch((err) => {
            console.log("error", err);
        });

        if (thirdimage.data.data) {
            dispatch(setThirdImage(thirdimage.data.data));
        }
        if (homepage_data.data.data) {
            dispatch(setHomepagedata(homepage_data.data.data));
        }

    };

    useEffect(() => {
        fetchbanner();
        fetchsecondimage();
    }, []);

    useEffect(() => {
        fetchthirddimage();
    }, []);

    function mouse_hover(e) {
        setimage_zooming(e.currentTarget.src)
    }

    const [isActive, setIsButtonActive] = React.useState(false);
    const [Banner, setBanner] = useState([]);

    const products_data = useSelector((state) => state.allProducts.products);
    const mini_banner = useSelector((state) => state.minibanner.minibanner);
    const firstiamgedata = useSelector((state) => state.FirstimageData.FirstiamgeArray);
    const secondiamgedata = useSelector((state) => state.SecondimageData.SecondiamgeArray);
    const thirdiamgedata = useSelector((state) => state.ThirdimageData.ThirdiamgeArray);
    const homepage_productdata = useSelector((state) => state.Homepageproduct.HomepageproductArray);

    var img = firstiamgedata.vImage;

    var img1 = secondiamgedata.vImage;
    var img2 = thirdiamgedata.vImage;

    const bannerList = products_data.map((pro, index) => {
        if (index == '0') {
            var ac = 'active';
        }
        else {
            var ac = '';
        }
        return (
            <div className={`carousel-item  ${ac}`}>
                <Link to='/product-listing'>
                    <img className="d-block w-100" style={{ height: "80rem" }} src={pro.vImage} alt="First slide" />
                </Link>
                <div className="txt">
                    <h3>MORDEN ARCHIVE</h3>
                    <h1>SHOP NOW </h1>
                </div>
            </div>
        );
    })
    // *****************************************Mini Banner Dynamic************************************
    const minibanner_list = mini_banner.map((banner, index) => {
        if (index == '0') {
            var ac = 'active';
        }
        else {
            var ac = '';
        }
        return (
            <div className={`carousel-item active_image ${ac}`}>
                <Link to='/product-listing'>
                <img onMouseOver={mouse_hover} className="d-block w-100 image_zooming" src={banner.vImage} alt="First slide" />
                </Link>
            </div>

        );
    })




    return (
        <>
            <ScrollToTop />
            <Navbar sticky = "yamin" />
            {/* ********** Main Section **************** */}
            <main>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>

                    <div className="carousel-inner overflow-hidden">
                        {bannerList}
                    </div>


                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                </div>
            </main>
            {/* **********Section Nostalgic************* */}
            <section className="nostalgic mb-6">
                <div className="row">
                    <div className="left col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <Link to='/product-listing'>
                        <img
                            src={

                                image_zooming ? image_zooming : img
                            }
                            className="img-fluid"
                            alt="Image"
                        />
                        </Link>
                    </div>
                    <div className="right text-center col-lg-6 col-md-8 col-sm-10  mx-auto">
                        <h1>NOSTALGIC MASTERPIECES</h1>
                        <p>RICH PLAY OF SURFACE TEXTURES ON PURE COTTON AND LINEN</p>
                        <div
                            id="carouselExampleIndicators1"
                            className="carousel slide "
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#carouselExampleIndicators1"
                                    data-slide-to="0"
                                    className="active"
                                ></li>
                                <li
                                    data-target="#carouselExampleIndicators1"
                                    data-slide-to="1"
                                ></li>
                                <li
                                    data-target="#carouselExampleIndicators1"
                                    data-slide-to="2"
                                ></li>
                                <li
                                    data-target="#carouselExampleIndicators1"
                                    data-slide-to="3"
                                ></li>
                            </ol>
                            <div className="carousel-inner">
                                {minibanner_list}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleIndicators1"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>

                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleIndicators1"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>

                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/************* Section Festive ********* */}
            <section className="festive container-fluid mt-5">
                <h1>FESTIVE ENSEMBLES</h1>
                <p>EFFORTLESS STYLES TO THROW ON AND GO...</p>
                <div className="row">
                    {
                        homepage_productdata.map((product, index) => (
                            <>

                                <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                                    <div className="overflow-hidden">
                                        <Link to={`/product-listing/${btoa(product.iCategoryId)}`}>
                                            <img
                                                src={product.vImage}
                                                className="img-fluid"
                                                alt="Image"
                                            />
                                        </Link>
                                    </div>
                                    <h3>{product.vProductName}</h3>
                                    <p> र {product.vPrice}</p>
                                </div>

                            </>
                        ))
                    }




                    {/* <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                        <div className="overflow-hidden">
                            <img
                                src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                                className="img-fluid"
                                alt="Image"
                            />
                        </div>
                        <h3>PALAZZO SAREE</h3>
                        <p> र23,160.00</p>
                    </div> */}
                    {/* <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                        <div className="overflow-hidden">
                            <img
                                src={process.env.PUBLIC_URL + "/Images/festive3.png"}
                                className="img-fluid"
                                alt="Image"
                            />
                        </div>
                        <h3>PALAZZO SAREE</h3>
                        <p> र23,160.00</p>
                    </div> */}
                    {/* <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                        <div className="overflow-hidden">
                            <img
                                src={process.env.PUBLIC_URL + "/Images/festive4.png"}
                                className="img-fluid"
                                alt="Image"
                            />
                        </div>
                        <h3>PALAZZO SAREE</h3>
                        <p> र23,160.00</p>
                    </div> */}
                </div>
            </section>
            {/* *********** Classic Section ************* */}
            <section className="classic">

                {/* <div className="classic-div2">
                    <h1>
                        TIME<span>LESS</span>
                    </h1>
                    <h1>
                        CLAS<span>SICS</span>
                    </h1>
                    <p>
                        MADE TO LAST,GETTIN<span>G</span>
                        <span> BETTER EVERY YEAR</span>
                    </p>
                    <button className="sareeBtn2">DISCOVER</button>
                </div> */}

                <div className="img">
                    <img src={img1} alt="Image" className="img-fluid" />
                </div>

                <div className="classic-div">
                    <h1>
                        TIME<span>LESS</span>
                    </h1>
                    <h1>
                        CLAS<span>SICS</span>
                    </h1>
                    <p>
                        MADE TO LAST,GETTIN<span>G</span>
                        <span> BETTER EVERY YEAR</span>
                    </p>
                    {/* <button className="sareeBtn">DISCOVER</button> */}
                </div>
            </section>
            {/* ************ Diwali section************  */}
            <section className="diwali">
                <div className="img">
                    <img
                        src={img2}
                        alt="Image"
                        className="img-fluid"
                    />
                </div>

                <div className="diwali-div">
                    <h1>DIWALI</h1>
                    <h1>CELEBRATION</h1>
                    <h1>SALE</h1>
                </div>
            </section>
            {/* *************Contact Section ************* */}
            <Footer />
        </>
    );
};

export default HomePage;
