import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import Variants from "./Variants";

const Product_edit = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    const p = answer_array[5];

    const [Category, setCategory]               = useState([]);
    const [SubCategory, setSubCategory]         = useState([]);
    const [CatId, setCatId]                     = useState([]);
    const [SubcatId, setSubcatId]               = useState([]);
    const [Product_v, setProduct_v]             = useState([]);

    const [CategoryId, setCategoryId]           = useState("");
    const [Product, setProduct]                 = useState("");
    const [SubCategory_id, setSubcategory]      = useState("");
    const [Gif, setGif]                         = useState(false);
    const [Product_variantid, setProduct_variantid] = useState("");

    const [Qty, setQty]                         = useState("");
    const [Price, setPrice]                     = useState("");
    const [Desc, setDesc]                       = useState("");
    const [Moredesc, setMoredesc]               = useState("");

    const [Status, setStatus]                   = useState("inActive");
    const [StatusHomepage, setStatusHomepage]   = useState("2");

    const [errorProduct, setErrroProduct]       = useState("");
    const [errorImage, setErrroImage]           = useState("");
    const [errorQty, setErrroQty]               = useState("");
    const [errorPrice, setErrroPrice]           = useState("");
    const [errorCategory_v, setErrroCategory_v] = useState("");
    const [SubCategory_i, setErrroSubCategory]  = useState("");
    const [Error, setErrro]                     = useState("false");
    const [DescError, setDescError]             = useState("");
    const [MoredescError, setMoredescError]     = useState("");

    var iProductId = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
    );


    const handleSubmit = (event) => {
        event.preventDefault();

        setErrro("");
        if (Product) {
            setErrroProduct("");
            setErrro("true");
        } else {
            setErrroProduct("Please Enter Product Name");
        }

        if (Qty) {
            setErrroQty("");
            setErrro("true");
        } else {
            setErrroQty("Please Enter Qty");
        }

        if (Price) {
            setErrroPrice("");
            setErrro("true");
        } else {
            setErrroPrice("Please Enter Price");
        }
        if (CategoryId && CategoryId != "0") {
            setErrroCategory_v("");
            setErrro("true");
        } else {
            setErrroCategory_v("Please Select Category");
        }
        if (SubCategory_id || SubcatId) {
            setErrroSubCategory("");
            setErrro("true");
        } else {
            setErrroSubCategory("Please Select Sub Category");
        }

        if (Desc != "") {
            setDescError('');
        }
        else {
            setDescError('Please Enter Product Description');
        }

        if (Moredesc != "") {
            setMoredescError('');
        }
        else {
            setMoredescError('Please Enter More Information');
        }

        if (answer_array[2] == "localhost:3000") {
            var url = "http://localhost/pramesh/backend/api/product_added";
        } else {
            var url = "http://pramesh.justcodenow.com/backend/api/product_added";
        }

        const fd = new FormData(event.target);

        if (iProductId && Product && CategoryId != "0" && Desc && Moredesc) {
            setGif(true);
            const dataa = axios
                .post(url, fd)
                .then((res) => {
                    if (res.data.Status == "0") {
                        setGif(false);
                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        setTimeout(function () {
                            history.push("/admin/product/listing");
                            // window.location.reload(1);
                        }, 1000);
                    } else {
                        setGif(false);
                        toast.error(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch((error) => { });
        }
    };

    async function category_change(e) {
        var iCategoryId = e.target.value;

        setCategoryId(iCategoryId);

        if (answer_array[2] == "localhost:3000") {
            var urls = `http://localhost/pramesh/backend/api/get_category?iCategoryId=${iCategoryId}`;
        } else {
            var urls = `http://pramesh.justcodenow.com/backend/api/get_category?iCategoryId=${iCategoryId}`;
        }

        try {
            const result = await axios.get(urls);
            setSubCategory(result.data.data);
        } catch (e) {
            console.log("error response", e.response);
        }
    }

    if (answer_array[2] == "localhost:3000") {
        var urlp = `http://localhost/pramesh/backend/api/all_product?iProductId=${iProductId}`;
    } else {
        var urlp = `http://pramesh.justcodenow.com/backend/api/all_product?iProductId=${iProductId}`;
    }
    useEffect(() => {
        axios
            .get(urlp)
            .then((res) => {
                console.log(res);
                setSubCategory(res.data.subcat);
                setProduct(res.data.data.vProductName);
                setDesc(res.data.data.iDescription);
                setMoredesc(res.data.data.tMoreInformation);
                setQty(res.data.data.vQty);
                setPrice(res.data.data.vPrice);
                setStatus(res.data.data.eStatus);
                setCatId(res.data.data.iCategoryId);
                setCategoryId(res.data.data.iCategoryId);
                setSubcatId(res.data.data.iSubcategoryId);
                setStatusHomepage(res.data.data.vHomePageDisplay);
                setProduct_v(res.data.product_variant);
                setProduct_variantid(res.data.product_variant[0].iVariantId);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (answer_array[2] == "localhost:3000") {
        var urls = `http://localhost/pramesh/backend/api/get_category`;
    } else {
        var urls = `http://pramesh.justcodenow.com/backend/api/get_category`;
    }

    useEffect(() => {
        axios
            .get(urls)
            .then((res) => {
                setCategory(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header border-0 d-flex">

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <Link to={`/admin/product/edit/${iProductId}`}>
                                                <button className={`btn genBtn ${p == 'edit' ? 'Active' : ''}`}>Product Edit</button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="row align-items-center">
                                        <div className="col ml-4">
                                            <Link to={`/admin/product-image/${iProductId}`}>
                                                <button className="btn genBtn">Product Image</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="iProductId" value={iProductId} />
                                        <h6 className="heading-small text-muted mb-4">
                                            Product information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">
                                                            Product Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="vProduct"
                                                            id="vTitle"
                                                            className="form-control"
                                                            placeholder="Title"
                                                            onChange={(e) => setProduct(e.target.value)}
                                                            value={Product}
                                                        />
                                                        <span className="red">{errorProduct}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6"></div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">
                                                            Category
                                                        </label>
                                                        <select
                                                            name="iCategoryId"
                                                            className="form-control"
                                                            onChange={category_change}
                                                        >
                                                            <option value="">Select Category</option>
                                                            {Category.map((cat, index) => (
                                                                <option
                                                                    selected={
                                                                        cat.iCategoryId == CatId ? "selected" : ""
                                                                    }
                                                                    value={cat.iCategoryId}
                                                                >
                                                                    {cat.vTitle}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <span className="red">{errorCategory_v}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-control-label"
                                                                for="vTitle"
                                                            >
                                                                SubCategory
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                name="iSubcategoryId"
                                                                onChange={(e) => setSubcategory(e.target.value)}
                                                            >
                                                                <option value="">Select Sub Category</option>
                                                                {SubCategory.map((subcat, index) => (
                                                                    <option
                                                                        selected={
                                                                            subcat.iSubcategoryId == SubcatId
                                                                                ? "selected"
                                                                                : ""
                                                                        }
                                                                        value={subcat.iSubcategoryId}
                                                                    >
                                                                        {subcat.vSubTitle}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="red">{SubCategory_i}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Variants
                                                    Product_variantid={Product_variantid}
                                                    iProductId={iProductId}
                                                    data={Product_v}
                                                />

                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Description</label>
                                                        <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" value={Desc} name="tDescription" rows="4" cols="50"></textarea>
                                                        <span className="red">{DescError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">More Information</label>
                                                        <textarea onChange={(e) => setMoredesc(e.target.value)} className="form-control" value={Moredesc} name="tMoreinformation" rows="4" cols="50"></textarea>
                                                        <span className="red">{MoredescError}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">
                                                            Status
                                                        </label>
                                                        <select
                                                            name="eStatus"
                                                            className="form-control"
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        >
                                                            <option
                                                                selected={
                                                                    Status == "Inactive" ? "selected" : ""
                                                                }
                                                                value="inActive"
                                                            >
                                                                Inactive
                                                            </option>
                                                            <option
                                                                selected={Status == "Active" ? "selected" : ""}
                                                                value="Active"
                                                            >
                                                                Active
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">
                                                            HomePage Display
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            name="vHomePageDisplay"
                                                            onChange={(e) =>
                                                                setStatusHomepage(e.target.value)
                                                            }
                                                        >
                                                            <option
                                                                selected={
                                                                    StatusHomepage == "1" ? "selected" : ""
                                                                }
                                                                value="1"
                                                            >
                                                                HomePage Show
                                                            </option>
                                                            <option
                                                                selected={
                                                                    StatusHomepage == "2" ? "selected" : ""
                                                                }
                                                                value="2"
                                                            >
                                                                Default
                                                            </option>
                                                            
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <input
                                                            type="submit"
                                                            className="btn  btn-primary"
                                                            value="Submit"
                                                        />
                                                        <Link to="/admin/product/listing">
                                                            <a>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning"
                                                                >
                                                                    Back
                                                                </button>
                                                            </a>
                                                        </Link>
                                                        {
                                                            Gif == true ?
                                                                <img className="loding_gif_product" src={process.env.PUBLIC_URL + "/Images/3.gif"} alt="img" />
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <ToastContainer
                                                        position="top-right"
                                                        autoClose={5000}
                                                        hideProgressBar={false}
                                                        newestOnTop={false}
                                                        closeOnClick
                                                        rtl={false}
                                                        pauseOnFocusLoss
                                                        draggable
                                                        pauseOnHover
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product_edit;
