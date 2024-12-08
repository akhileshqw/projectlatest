import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        // <header className="p-3 text-bg-dark">
        //     <div className="container">
        //         <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        //             <a
        //                 href="/"
        //                 className="title"
        //             >
        //                 Title
        //             </a>
        //             <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        //                 <li>
        //                     <Link
        //                         to="/"
        //                         className="nav-link px-2 text-secondary"
        //                     >
        //                         Home
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="nav-link px-2 text-white">
        //                         Features
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="nav-link px-2 text-white">
        //                         Pricing
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <Link to="/contactus" className="nav-link px-2 text-white">
        //                         Contact Us
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/aboutus" className="nav-link px-2 text-white">
        //                         About Us
        //                     </Link>
        //                 </li>
        //             </ul>
        //             <form
        //                 className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
        //                 role="search"
        //             >
        //                 <input
        //                     type="search"
        //                     className="form-control form-control-dark text-bg-dark"
        //                     placeholder="Search..."
        //                     aria-label="Search"
        //                 />
        //             </form>
        //             <div className="text-end">
        //                 <button
        //                     type="button"
        //                     className="btn btn-outline-light me-2"
        //                 >
        //                     Login
        //                 </button>
        //                 <button type="button" className="btn btn-warning">
        //                     Sign-up
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </header>
        <nav
            className="navbar navbar-expand-lg bg-body-tertiary bg-dark smaller"
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <a className="navbar-brand abc" href="index.html">
                    <img
                        src="logo.png"
                        alt="Logo"
                        width={82}
                        height={50}
                        className="d-inline-block align-text-center"
                    />
                    Milk on the Way
                </a>
                <button
                    id="nav-ref"
                    className="navbar-toggler"
                    type="button"
                    onclick=""
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="index.html"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="about.html">
                                About
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                id="wnat"
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Products
                            </a>
                            <ul id="why" className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="Milk.html"
                                    >
                                        Milk
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Ghee
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Curd
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Milk related sweets
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contactus.html">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-primary"
                            type="submit"
                        >
                            Search
                        </button>
                        {/* <button type="button" class="btn btn-danger">Login </button>
      <button type="button" class="btn btn-danger">SignUp </button> */}
                    </form>
                    <div className="mx-2 nav-extra">
                        <div
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                        >
                            Login
                        </div>
                        <div
                            id="signup123"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#signupModal"
                        >
                            Sign Up
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
