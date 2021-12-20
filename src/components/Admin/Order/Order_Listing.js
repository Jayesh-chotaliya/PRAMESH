
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import $ from "jquery";
import * as $ from 'jquery';
window['jQuery'] = window['$'] = $;


// import '../../../js/jquery.js';

// import DataTable from '../../../js/Datatable.js';

// import '../../../js/Datatable.js';

class Order_Listing extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            order: [],
        };
    }
   
    async componentDidMount() 
    {

        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') 
        { 
            var url = 'http://localhost/pramesh/backend/api/get_all_order';
        }
        else 
        {
            var url = 'http://pramesh.justcodenow.com/backend/api/get_all_order';
        }
        const response = await fetch(url);
        const data = await response.json();
        this.setState({order: data.data });
        
    }

   
    
    render() {
        

        var order_data = this.state.order;

        // console.log(user_data);
        
        return(
            <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div class="container-fluid">
                    <div className="row">
                    <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="card">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Page visits</h3>
                            </div>
                            <div className="col text-right">
                               
                            </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            {/* <!-- Projects table --> */}
                            <table id="example" className="table align-items-center table-flush example">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col">TransactionId</th>
                                <th scope="col">Order Qty</th>
                                <th scope="col">Order Amount</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">AddedDate</th>
                               
                               
                               
                                </tr>
                            </thead>
                            <tbody>
                                {
                                order_data.map((user, index) =>
                                    (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{user.vTransactionId}</td>
                                            <td>{user.vOrderQty}</td>
                                            <td>{user.vOrderAmount}</td>
                                            <td>{user.vOrderCity}</td>
                                            <td>{user.vOrderState}</td>
                                            <td>{user.vOrderPhone}</td>
                                            <td>{user.dtAddedDate}</td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
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
                        </div>
                    </div>
                    
                    </div>
                    
                </div>
            </div>
            </>
        )
    }
}

export default Order_Listing;

