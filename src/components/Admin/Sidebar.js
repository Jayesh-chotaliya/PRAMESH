import React from "react";
import logo from '../../image/0000003.png';
import {Link} from "react-router-dom";

const Sidebar = () =>
{
    return(
            <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                <div className="scrollbar-inner">
                {/* <!-- Brand --> */}
                <div className="sidenav-header  align-items-center">
                    <a className="navbar-brand" href="/admin">
                    <img src={ logo }  className="navbar-brand-img" alt="..." />
                    </a>
                </div>
                <div className="navbar-inner">
                    {/* <!-- Collapse --> */}
                    <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                    {/* <!-- Nav items --> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to='/admin/'>
                            <a className="nav-link active">
                                <i className="ni ni-tv-2 text-primary"></i>
                                <span className="nav-link-text">Dashboard</span>
                            </a>
                        </Link>
                      
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/listing'>
                                <a className="nav-link">
                                    <i className="ni ni-planet text-orange"></i>
                                    <span className="nav-link-text">User</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/banner'>
                                <a className="nav-link">
                                    <i className="ni ni-ui-04 text-primary"></i>
                                    <span className="nav-link-text">Banner</span>
                                </a>
                            </Link>

                        </li>
                        <li className="nav-item">
                            <Link to='/admin/image-content'>
                                <a className="nav-link">
                                    <i className="ni ni-send text-dark"></i>
                                    <span className="nav-link-text">Image Content</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/stories'>
                                <a className="nav-link">
                                    <i className="ni ni-single-02 text-yellow"></i>
                                    <span className="nav-link-text">Stories</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/product/listing'>
                            <a className="nav-link" href="/admin/product/listing">
                                <i className="ni ni-bullet-list-67 text-default"></i>
                                <span className="nav-link-text">Product</span>
                            </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                                <Link to='/admin/category/listing'>
                                <a className="nav-link">
                                    <i class="fab fa-slack"></i>
                                    <span className="nav-link-text">Category</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/subcategory/listing'>
                                <a className="nav-link">
                                    <i class="fab fa-cloudscale"></i>
                                    <span className="nav-link-text">Sub Category</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/variants/listing'>
                                <a className="nav-link">
                                    <i class="fab fa-accusoft" style={{'color':'blue'}}></i>
                                    <span className="nav-link-text">Variants</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/variant_option/listing'>
                                <a className="nav-link">
                                        <i class="fas fa-filter" style={{ 'color': '#22c099e0' }}></i>
                                    <span className="nav-link-text">Variants Options</span>
                                </a>
                            </Link>
                        </li>
                            
                        <li className="nav-item">
                            <Link to='/admin/order/listing'>
                                <a className="nav-link">
                                    <i className="ni ni-key-25 text-info"></i>
                                    <span className="nav-link-text">Order</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <hr className="my-3" />
                    </div>
                </div>
                </div>
            </nav>
    )
}


export default Sidebar;