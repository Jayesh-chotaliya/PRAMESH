import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import ScrollToTop from "../../Front/ScrollToTop";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { setProductListing, setAddtocartpage} from "../../../redux/actions/productActions";


// redux / actions / productActions

const AllProduct = () => {

    const [SelectedPrice, setSelectedPrice] = useState("");

    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    // var SubCategoryId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    if (answer_array[2] == 'localhost:3000') {
        var product_listing = `http://localhost/pramesh/backend/api/product_listing`;
    }
    else {
        var product_listing = `http://pramesh.justcodenow.com/backend/api/product_listing`;
    }

    const mainNavbar = async () => {
        const productdata = await axios.get(product_listing).catch((err) => {
            console.log("error", err);
        });
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    };
    const AddtocartProduct = async (e) => {
        var iProductId  = e.target.id;
        var vPrice       = e.target.getAttribute("data-id");

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
        mainNavbar();
    }, []);

    const Product_data = useSelector((state) => state.MainProductListing.MainProductListingArray);
    

    const [Pagenumber, setPagenumber] = useState(0);
    const usersPerPage = 12;
    const pagesvisited = Pagenumber * usersPerPage;

    const displayproduct = Product_data.slice(pagesvisited, pagesvisited + usersPerPage)
        .map(product => {
            var countdata = product.image.length;
            if (countdata > 0) {
                return <div className=" col-xl-3  col-lg-4 col-md-6 col-sm-12 mx-auto">
                    <div className=" imgEffect overflow-hidden position-relative">
                        <div className="heartDiv">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </div>
                        {
                            product.image.map(function (Pimg, index) {
                                // var $productid = encode_id(Pimg.iProductId);

                                if (index == 0) {
                                    if (Pimg.vImage != "") {
                                        var imagestyle = '';
                                    }
                                    else {
                                        var imagestyle = '';
                                    }
                                }
                                else {
                                    if (Pimg.vImage != "") {
                                        var imagestyle = 'img2';
                                    }
                                    else {
                                        var imagestyle = '';
                                    }
                                }
                                return (
                                    <>
                                        <Link to={`/addtocart/${btoa(Pimg.iProductId)}/${btoa(product.vPrice)}`}>
                                            <img id={`${Pimg.iProductId}`} data-id={`${product.vPrice}`} onClick={AddtocartProduct} src={Pimg.vImage} className={`img-fluid catoImg ${imagestyle}`}
                                            alt="Image" />
                                        </Link>

                                    </>
                                )
                            })
                        }
                    </div>
                    <h3>{product.vProductName}</h3>
                    <p> र {product.vPrice}</p>

                </div>
            }

        })

   

    const pageCount = Math.ceil(Product_data.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPagenumber(selected);
    }

    const filterclick = async (e) => {
        var SortByFilter = e.target.value;

        if (answer_array[2] == 'localhost:3000') {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?SortByFilter=${SortByFilter}@@${''}`;
        }
        else {
            var product_listing = `http://pramesh.justcodenow.com/backend/api/product_listing?SortByFilter=${SortByFilter}@@${''}`;
        }

        const productdata = await axios.get(product_listing);
        // console.log(data);
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    }
    // *********************************FILTER*************************************
    const category_filter = async (e) => {

        var Price = e.target.value;
        setSelectedPrice(Price);

        if (answer_array[2] == 'localhost:3000') {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?SubCategoryId=${''}@${Price}`;
        }
        else {
            var product_listing = `http://pramesh.justcodenow.com/backend/api/product_listing?SubCategoryId=${''}?Price=${Price}`;
        }

        const productdata = await axios.get(product_listing);

        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));

        }
    }
    // *****************************************************SUBCATEGORY FILTER********************************************
    const sub_category_filter = async (e) => {

        var iCategory = e.target.value;
        var Price = SelectedPrice;

        if (answer_array[2] == 'localhost:3000') {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?iCategory=${iCategory}@${Price}`;
        }
        else {
            var product_listing = `http://pramesh.justcodenow.com/backend/api/product_listing?iCategory=${iCategory}@${Price}`;
        }

        const productdata = await axios.get(product_listing);

        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));

        }
    }

    const maindata = useSelector((state) => state.Mainproductlisting.MainproductArray);

    return (
        <>
            <Navbar />
            <ScrollToTop />

            <section className="festive2 container-fluid mt-5">
                <h1>FESTIVE ENSEMBLES</h1>
                <p>EFFORTLESS STYLES TO THROW ON AND GO... </p>

                {/* ********CATEGORIES SECTION ********** */}

                <section className=" container-fluid categories mb-5">
                    <div className="dropdown">
                        <button
                            className=" myBtn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-th-large mr-4" aria-hidden="true"></i>
                            Category
                        </button>
                        <div
                            className="dropdown-menu "
                            aria-labelledby="dropdownMenuButton"
                        >
                            <div className="catoFlex">
                                <div className="price">
                                    <h2>PRICE</h2>
                                    <div className="flex">
                                        <div class="pretty p-icon p-smooth">
                                            <input type="radio" onClick={category_filter} name="price1" id="price1" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="price1">ALL PRICE</label>
                                            </div>
                                        </div>

                                        <div class="pretty p-icon p-smooth">
                                            <input type="radio" onClick={category_filter} value="5000-10000" name="price1" id="price1" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="price1">5000 - 10000</label>
                                            </div>
                                        </div>
                                        <div class="pretty p-icon p-smooth">
                                            <input type="radio" onClick={category_filter} value="10000-20000" name="price1" id="price2" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="price2">10000 - 20000</label>
                                            </div>
                                        </div>
                                        <div class="pretty p-icon p-smooth">
                                            <input type="radio" onClick={category_filter} value="30000-40000" name="price1" id="price3" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="price3">30000 - 40000</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="fabric">
                                    <h2>FABRIC</h2>
                                    <div className="flex">
                                        <div class="pretty p-icon p-smooth">
                                            <input type="radio" name="silk" id="silk" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="silk">All FABRIC</label>
                                            </div>
                                        </div>
                                        {
                                            maindata.map(function (MainCat, index) {
                                                return (<div class="pretty p-icon p-smooth">
                                                    <input type="radio" onClick={sub_category_filter} value={MainCat.iCategoryId} name="silk" id="silk" />
                                                    <div class="state p-maroon">
                                                        <i class="icon fa fa-check"></i>
                                                        <label htmlFor="silk">{MainCat.vTitle}</label>
                                                    </div>
                                                </div>)
                                            })
                                        }


                                        {/* <div class="pretty p-icon p-smooth">
                                            <input type="checkbox" name="artsilk" id="artsilk" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="artsilk"> ART SILK</label>
                                            </div>
                                        </div>
                                        <div class="pretty p-icon p-smooth">
                                            <input type="checkbox" name="cotton" id="cotton" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="cotton">COTTON SILK</label>
                                            </div>
                                        </div>
                                        <div class="pretty p-icon p-smooth">
                                            <input type="checkbox" name="banarasi" id="banarasi" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="banarasi">BANARASI SILK</label>
                                            </div>
                                        </div>
                                        <div class="pretty p-icon p-smooth">
                                            <input type="checkbox" name="gaji" id="gaji" />
                                            <div class="state p-maroon">
                                                <i class="icon fa fa-check"></i>
                                                <label htmlFor="gaji">GAJI SILK</label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button
                            className="myBtn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-exchange mr-4" aria-hidden="true"></i>
                            SORT BY
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="catoFlex">
                                <div className="flex cflex">
                                    <div class="pretty p-icon p-smooth">
                                        <input type="radio" onClick={filterclick} name="trending" id="highest" />
                                        <div class="state p-maroon">
                                            <i class="icon fa fa-check"></i>
                                            <label htmlFor="highest">ALL PRODUCTS</label>
                                        </div>
                                    </div>
                                    <div class="pretty p-icon p-smooth">
                                        <input type="radio" onClick={filterclick} value="HIGHEST" name="trending" id="highest" />
                                        <div class="state p-maroon">
                                            <i class="icon fa fa-check"></i>
                                            <label htmlFor="highest">PRICE - HIGH TO LOW</label>
                                        </div>
                                    </div>
                                    <div class="pretty p-icon p-smooth">
                                        <input type="radio" onClick={filterclick} value="LOWEST" name="trending" id="lowest" />
                                        <div class="state p-maroon">
                                            <i class="icon fa fa-check"></i>
                                            <label htmlFor="lowest">PRICE - LOW TO HIGH</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* *************** PHOTOS SECTION ***************** */}

                <div className="row mt-5 ">
                    {displayproduct.length > 0 ? displayproduct : <div className="col-md-12 col-sm-12">
                        <h2>RECORD NOT FOUND </h2>
                    </div>}
                    {
                        pageCount > 1 ?
                            <ReactPaginate
                                previousLabel="<"
                                nextLabel=">"
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationbtn"}
                                previousLinkClassName={"prebtn"}
                                nextLinkClassName={"nextbtn"}
                                disabledClassName={"paginationdisabled"}
                                activeClassName={"paginationActive"}
                            />
                            : ''
                    }

                </div>
            </section>
            <Footer />
        </>
    );
};

export default AllProduct;

