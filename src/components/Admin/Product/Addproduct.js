
import React ,{useState , useEffect} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import Variants from "../Product/Variants";

import $ from 'jquery';
import e from "cors";

const Addproduct = () => {
    let history                         = useHistory();
    const [Category, setCategory]       = useState([]);
    const [SubCategory, setSubCategory] = useState([]);
    const [CategoryId, setCategoryId]   = useState("");
    const [Product, setProduct]         = useState("");
    const [Desc, setDesc]               = useState("");
    const [Moredesc, setMoredesc]       = useState("");

    const [SubCategory_id, setSubcategory]      = useState("");
    const [Image, setImage]                     = useState([]);  
    const [OptionId, setOptionId]               = useState([]);
    const [ArrayVariants, setArrayVariants]     = useState([]);
    const [ArrayOption, setArrayOption]         = useState([]);
    const [Status, setStatus]                   = useState('inActive');
    const [StatusHomepage, setStatusHomepage]   = useState('2');

    const [errorProduct, setErrroProduct]   = useState("");
    const [errorImage, setErrroImage]       = useState("");
    const [VariantsError, setVariantsError] = useState("");
    const [DescError, setDescError] = useState("");
    const [MoredescError, setMoredescError] = useState("");
    const [MultipleImage, setMultipleImage] = useState([]);
    
    const [errorCategory_v, setErrroCategory_v]     = useState("");
    const [SubCategory_i, setErrroSubCategory]      = useState("");
    

    function imagechange (e)
    {   
        let ImagesArray = Object.entries(e.target.files).map((e , key) =>
            e[1]
            );
        setImage([...Image, ...ImagesArray]);
    }
    function image_delele()
    {   
        $(".vImages").val('');
        $('.gallery').html("");
        setImage([]);
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        if (Product){
            setErrroProduct('');
        }
        else{
            setErrroProduct('Please Enter Product Name');
        }
        if(Image.length > 0) {
            setErrroImage('');
        }
        else {
            setErrroImage('Please Select Product Image');
        }
        
        if (Desc!="") {
            setDescError('');
        }
        else {
            setDescError('Please Enter Product Description');
        }

        if (Moredesc!="")
        {
            setMoredescError('');
        }
        else
        {
            setMoredescError('Please Enter More Information');
        }

        if (CategoryId) {
            setErrroCategory_v('');
        }
        else {
            setErrroCategory_v('Please Select Category');
        }
        if (SubCategory_id) {
            setErrroSubCategory('');
        }
        else {
            setErrroSubCategory('Please Select Sub Category');
        }

        var answer = window.location.href;
        const answer_array = answer.split('/');

        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/product_added';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/product_added';
        }
    
        if (Product && Image.length > 0 && CategoryId && SubCategory_id && Desc && Moredesc)
        {
           
            const dataa = axios.post(url, data)
                .then(res => {
                    if (res.data.Status == '0') {
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
                        }, 2000);
                    }
                    else {
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
                .catch(error => {
                })
        }
        
    }
    
    async function category_change(e) {
        var iCategoryId = e.target.value;
        setCategoryId(iCategoryId);
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var urls = `http://localhost/pramesh/backend/api/get_category?iCategoryId=${iCategoryId}`;

        }
        else {
            var urls = `http://pramesh.justcodenow.com/backend/api/get_category?iCategoryId=${iCategoryId}`;
        }

        try {
            const result = await axios.get(urls);
            setSubCategory(result.data.data);
        }
        catch (e) {
            console.log("error response", e.response);
        }

    }


    // async function handleChange(selectedOptions)
    // {
    //     var iVariantsId = selectedOptions.value;

    //     if (iVariantsId!="")
    //     {
    //         setVariantsId(iVariantsId);
    //         var answer = window.location.href;
    //         const answer_array = answer.split('/');
    //         if (answer_array[2] == 'localhost:3000') {
    //             var urls = `http://localhost/pramesh/backend/api/get_variants_wise_option?iVariantsId=${iVariantsId}`;
    //         }
    //         else {
    //             var urls = `http://pramesh.justcodenow.com/backend/api/get_variants_wise_option?iVariantsId=${iVariantsId}`;
    //         }

    //         try {
    //             const result = await axios.get(urls);

    //             const compare = result.data.data.map((film) => ({
    //                 label: film.vOptions,
    //                 value: film.iOptionId
    //             }))
    //             setArrayOption(compare);
    //         } 
    //         catch (e) {
    //             console.log("error response", e.response);
    //         }
    //         setVariantsError('');
    //     }
    //     else
    //     {
    //         setVariantsError('Please Select Variant Name');
    //     }
    // }

    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var urls        = `http://localhost/pramesh/backend/api/get_category`;
    }
    else {
        var urls        = `http://pramesh.justcodenow.com/backend/api/get_category`;
    }

    useEffect(() => {
        axios.get(urls)
            .then(res => {
                setCategory(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

  
    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Product Add</h3>
                                        </div>
                                        {/* <div className="">
                                            <Link to="/admin/product/variants">
                                            <button className="btn btn-success">Product Variants</button>
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <h6 className="heading-small text-muted mb-4">Product information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Product Name</label>
                                                        <input type="text" name="vProduct" id="vTitle" className="form-control" placeholder="Title" onChange={(e)=>setProduct(e.target.value)} />
                                                        <span className="red">{errorProduct}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">Product Image</label>
                                                            <input name="vImage[]" type="file" id="vImage" onChange={ imagechange } accept="image/*" className="form-control vImages" multiple/>
                                                            {
                                                                Image.length > 0 ?
                                                                    <spam onClick={image_delele} className="fa fa-trash red float-right mt-2"></spam> :
                                                                <></>
                                                            }
                                                            
                                                            <div className="gallery">
                                                            </div>
                                                            <span className="red">{errorImage}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Category</label>
                                                        <select name="iCategoryId" className="form-control" onChange={category_change}>
                                                            <option value="">Select Category</option>
                                                            {Category.map((cat, index) => (
                                                                <option value={cat.iCategoryId}>{cat.vTitle}</option>
                                                            ))}
                                                        </select>
                                                        <span className="red">{errorCategory_v}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vTitle">SubCategory</label>
                                                            <select name="iSubcategoryId" className="form-control" onChange={(e) => setSubcategory(e.target.value)}>
                                                                <option value="">Select Sub Category</option>
                                                                {SubCategory.map((subcat, index) => (
                                                                    <option value={subcat.iSubcategoryId}>{subcat.vSubTitle}</option>
                                                                ))}
                                                           </select>
                                                            <span className="red">{SubCategory_i}</span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <Variants/>

                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Description</label>
                                                        <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" name="tDescription" rows="4" cols="50"></textarea>
                                                        <span className="red">{DescError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">More Information</label>
                                                        <textarea onChange={(e) => setMoredesc(e.target.value)} className="form-control" name="tMoreinformation" rows="4" cols="50"></textarea>
                                                        <span className="red">{MoredescError}</span>
                                                        
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select name="eStatus" className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option value="inActive">Inactive</option>
                                                            <option value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">HomePage Display </label>
                                                        <select name="vHomePageDisplay" className="form-control" onChange={(e) => setStatusHomepage(e.target.value)}>
                                                            <option value="1">HomePage Show</option>
                                                            <option value="2">Default</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        {/* <button type="submit" className="btn  btn-primary">Submit</button> */}

                                                        <input type="submit" className="btn  btn-primary" value="Submit"/>

                                                        <Link to='/admin/product/listing'>
                                                            <a><button type="button" className="btn btn-warning">Back</button></a>
                                                        </Link>
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
    )
}


export default Addproduct;