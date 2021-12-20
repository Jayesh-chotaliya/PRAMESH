import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Select from 'react-select'
import { SketchPicker } from 'react-color'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Variants extends React.Component {

    state = {
        rows: [{}],
        ArrayVariants: [],
        OptionArray: [],
        VariantsId: '',
        background: '#fff',
    };
  

    async componentDidMount() 
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var variant_url = `http://localhost/pramesh/backend/api/get_variants`;
        }
        else 
        {
            var variant_url = `http://pramesh.justcodenow.com/backend/api/get_variants`;
        }
        const response = await fetch(variant_url);
        const data = await response.json();
        this.setState({ ArrayVariants: data.data });   
    }


    Change_variants = (e) =>
    {
        this.setState({ OptionArray: []});
        var iVariantsId = e.target.value;
        // Trigger
        this.option_create(iVariantsId);
        //State
        this.setState({ VariantsId: iVariantsId });
    }
    
    option_create(iVariantsId)
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var urls = `http://localhost/pramesh/backend/api/get_variants_wise_option?iVariantsId=${iVariantsId}`;
        }
        else {
            var urls = `http://pramesh.justcodenow.com/backend/api/get_variants_wise_option?iVariantsId=${iVariantsId}`;
        }
    
        axios.get(urls)
            .then((res) => 
            {
                if (res.data.Status=='1')
                {
                    const compare = res.data.data.map((film) => ({
                        label: film.vOptions,
                        value: film.iOptionId
                    }))
                    this.setState({ OptionArray: compare });
                }
            });
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        this.setState({
            rows
        });
    };
    handleAddRow = () => {
        const item = {
            name: "",
            mobile: ""
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
   
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }
    delete = (idx) => () => 
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/product_variyant_delete';
        }
        else {
            var del = 'http://pramesh.justcodenow.com/backend/api/product_variyant_delete';
        }
        const fd = new FormData();
        fd.append("iProduct_variantsId", idx);
        axios({
            method: "post",
            url: del,
            data: fd,
        })
        .then(function (res) {
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
                    // history.push("/admin/product/listing");
                    window.location.reload(1);
                }, 1000);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    submitdata = (e) =>{
        e.preventDefault();
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/variants_added';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/variants_added';
        }
        const data = new FormData(e.target);
    
        
    }
    
    render() {
        var ArrayVariant        = this.state.ArrayVariants;
        var OptionArray         = this.state.OptionArray;
        var background          = this.state.background;
        var VariantsId          = this.state.VariantsId;
        var Color               = this.state.ColorType;
        var product_v           = this.props.data;
        var iProductId          = this.props.iProductId;
        var Variantid_selected = this.props.Product_variantid;
        // console.log(product_v);

        var op = [];
        var op = ArrayVariant[0];

        return (
           <>
                <div className="row clearfix">
                    
                        <div className="col-lg-6">
                            <div className="form-group">
                            <label className="form-control-label" for="vTitle">Variants Name</label>
                            <select onChange={this.Change_variants}  name="iVariantId" className="form-control">
                                   <option>Select Variant Name</option>
                                    {
                                        ArrayVariant.map((namedata, index) => (
                                        <option selected={
                                                    Variantid_selected == namedata.iVariantId ?
                                                        'selected' : ''}
                                         value={namedata.iVariantId}>
                                             {namedata.vLabel}
                                       </option>
                                    ))}
                               </select>
                            </div>
                        </div>

                        <div className="col-md-12 column">
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic">
                                <thead>
                                    <tr>
                                    <th className="text-center"> Id </th>
                                    <th className="text-center"> Option Name </th>
                                        <th className="text-center"> Price</th>
                                        <th className="text-center"> Quntity</th>
                                        <th className="text-center"> SKU </th>
                                        <th className="text-center"> Action</th>
                                        <th />
                                    </tr>
                                </thead>
                                {
                                  iProductId ?
                                  <>
                                        <tbody>
                                            {product_v.map((item, idx) => (
                                                <tr id="addr0" key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={item.vOptions}
                                                            className="form-control"
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            readOnly
                                                            placeholder="Price"
                                                            value={item.vPrice}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <input
                                                            type="number"
                                                            readOnly
                                                            placeholder="Quntity"
                                                            value={item.vQty}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            placeholder="SKU"
                                                            value={item.vSku}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <a
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={this.delete(item.iProduct_variantsId)}
                                                        > Remove</a>

                                                    </td>
                                                </tr>
                                            ))}
                                            {/* ********************************NEW ADD ROW */}

                                            {this.state.rows.map((item, idx) => (
                                                <tr id="addr0" key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>
                                                        <Select name="OptionName[]" options={OptionArray}></Select>
                                                    </td>
                                                
                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="price[]"
                                                            placeholder="Price"
                                                            value={this.state.rows[idx].price}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="Qty[]"
                                                            value={this.state.rows[idx].qty}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="sku[]"
                                                            value={this.state.rows[idx].sku}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <a onClick={this.handleAddRow} className="btn btn-outline-primary btn-sm">Add Row</a>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={this.handleRemoveSpecificRow(idx)}
                                                        > Remove</button>

                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                  </> :
                                  <>
                                        <tbody>
                                            {this.state.rows.map((item, idx) => (
                                                <tr id="addr0" key={idx}>
                                                    <td>{idx + 1}</td>
                                                    <td>
                                                        <Select name="OptionName[]" options={OptionArray}></Select>
                                                    </td>
                                                    {
                                                        Color == 'Yes' ?
                                                            <td>
                                                                <input name="color[]" type="color" className="form-control w-101" />
                                                            </td> :
                                                            <></>
                                                    }

                                                    <td>
                                                        <input
                                                            type="number"
                                                            name="price[]"
                                                            placeholder="Price"
                                                            value={this.state.rows[idx].price}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="Qty[]"
                                                            value={this.state.rows[idx].qty}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            name="sku[]"
                                                            value={this.state.rows[idx].sku}
                                                            onChange={this.handleChange(idx)}
                                                            className="form-control"
                                                        />
                                                    </td>

                                                    <td>
                                                        <a onClick={this.handleAddRow} className="btn btn-outline-primary btn-sm">Add Row</a>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={this.handleRemoveSpecificRow(idx)}
                                                        > Remove</button>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                  </>

                                }
                                

                            </table>

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
                        {/* <div className="col-md-5"></div>
                        <div className="col-md-5 mt-5">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div> */}
                    

                </div>
            
           </>
        );
    }
}

export default Variants;