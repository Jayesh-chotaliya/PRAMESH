import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useBeforeunload } from 'react-beforeunload';
import axios from 'axios';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: [],
            Last: [],
            Banner: [],
            Stories: [],
            Order: [],
        };
    }


    async componentDidMount() {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/all_user_get';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/all_user_get';
        }

        const response = await fetch(url);
        const data = await response.json();

        this.setState({ count: data.count });
        this.setState({ Last: data.last });
        this.setState({ Banner: data.banner });
        this.setState({ Stories: data.stories });
        this.setState({ Order: data.order });

    }

    render() {
        var count = this.state.count;
        var Last = this.state.Last;
        var Banner = this.state.Banner;
        var Stories = this.state.Stories;
        var Order = this.state.Order;

        return (
            <>
                <Sidebar />
                <div className="main-content" id="panel" >
                    <Header />
                    <div className="header bg-primary pb-6">
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-center py-4">
                                    <div className="col-lg-6 col-7">
                                        <h6 className="h2 text-white d-inline-block mb-0">Dashboard</h6>
                                        <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                        </nav>
                                    </div>

                                </div>
                                {/* <!-- Card stats --> */}
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            {/* <!-- Card body --> */}
                                            <div className="card-body   dashShadow">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Total User</h5>
                                                        <span className="h2 font-weight-bold mb-0">{count}</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to='/admin/listing'>
                                                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                                <i className="ni ni-active-40"></i>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            {/* <!-- Card body --> */}
                                            <div className="card-body  dashShadow">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Total Banner</h5>
                                                        <span className="h2 font-weight-bold mb-0">{Banner}</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to='/admin/banner'>
                                                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                                <i className="ni ni-chart-pie-35"></i>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            {/* <!-- Card body --> */}
                                            <div className="card-body dashShadow">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Total Stories</h5>
                                                        <span className="h2 font-weight-bold mb-0">{Stories}</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to='/admin/stories'>
                                                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                                <i className="ni ni-money-coins"></i>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Link to='/admin/order/listing'> */}
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card card-stats">
                                            <div className="card-body dashShadow">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-title text-uppercase text-muted mb-0">Order</h5>
                                                        <span className="h2 font-weight-bold mb-0">{Order}</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link to='/admin/order/listing'>
                                                            <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                                <i className="ni ni-chart-bar-32"></i>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-0 text-sm">
                                                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                                                    <span className="text-nowrap">Since last month</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Page content --> */}
                    <div class="container-fluid mt--6">
                        <div class="row">

                            <div classname="col-xl-4">
                                <div classname="card">
                                    <div classname="card-header bg-transparent">
                                        <div classname="row align-items-center">
                                            <div classname="col">
                                                <h6 classname="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                                <h5 classname="h3 mb-0">Total orders</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div classname="card-body">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="card  dashShadow">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">LATEST USER DATA</h3>
                                            </div>
                                            <div className="col text-right">
                                                <a href="/admin/listing" className="btn btn-sm btn-primary">See all</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {/* <!-- Projects table --> */}
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">FirstName</th>
                                                    <th scope="col">LastName</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Last.map((l, index) =>
                                                    (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{l.vFirstName}</td>
                                                            <td>{l.vLastName}</td>
                                                            <td>{l.vEmail}</td>
                                                            <td>{l.eStatus}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="card dashShadow">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Social traffic</h3>
                                            </div>
                                            <div className="col text-right">
                                                <a href="#!" className="btn btn-sm btn-primary">See all</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {/* <!-- Projects table --> */}
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Referral</th>
                                                    <th scope="col">Visitors</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        Facebook
                                                    </th>
                                                    <td>
                                                        1,480
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-2">60%</span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-gradient-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Facebook
                                                    </th>
                                                    <td>
                                                        5,480
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-2">70%</span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Google
                                                    </th>
                                                    <td>
                                                        4,807
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-2">80%</span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-gradient-primary" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        Instagram
                                                    </th>
                                                    <td>
                                                        3,678
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-2">75%</span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%;" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        twitter
                                                    </th>
                                                    <td>
                                                        2,645
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-2">30%</span>
                                                            <div>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-gradient-warning" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{ width: "30%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Footer --> */}
                        <footer className="footer pt-0">
                            <div className="row align-items-center justify-content-lg-between">
                                <div className="col-lg-6">
                                    <div className="copyright text-center  text-lg-left  text-muted">
                                        &copy; 2021 <a href="http://pramesh.justcodenow.com/" className="font-weight-bold ml-1" target="_blank">Pramesh.com</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

            </>
        )
    }

}
export default Dashboard;
