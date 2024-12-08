import React, { useEffect } from "react";
import "./styles/homeStyles.css";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import { userContext } from "./context/userContext";
import { UserCircleIcon } from "lucide-react";
import Skeleton from "./components/Skeleton";

function App() {
    const { LoginUser } = useContext(userContext);
    const [ready, setReady] = useState(false);

    const handleClick = () => {
        fetch("http://localhost:3000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        window.location.reload();
    };
    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1000);
    }, []);
    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary bg-dark smaller"
                data-bs-theme="dark"
            >
                <div className="container-fluid">
                    <Link className="navbar-brand abc task_1" to="/">
                        <img
                            src="logo.png"
                            alt="Logo"
                            width={82}
                            height={50}
                            className="d-inline-block align-text-center"
                        />
                        <div>Milk on the Way</div>
                    </Link>
                    <button
                        id="nav-ref"
                        className="navbar-toggler"
                        type="button"
                        // onclick=""
                        onClick={""}
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
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    id="wnat"
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Products
                                </Link>
                                <ul id="why" className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/milk"
                                        >
                                            Milk
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/ghee"
                                        >
                                            Ghee
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/curd"
                                        >
                                            Curd
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>

                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </li>
                        </ul>

                        {ready ? (
                            <>
                                {!!LoginUser ? (
                                    <>
                                        <div class="dropdown justify-content-center">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{
                                                    border: "1px solid white",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    boxShadow:
                                                        "2px 2px 5px black",
                                                    display: "flex",
                                                    gap: "10px",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <UserCircleIcon />
                                                {LoginUser.username}
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        href="#"
                                                    >
                                                        Action
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        href="#"
                                                    >
                                                        Another action
                                                    </a>
                                                </li>

                                                <li
                                                    onClick={handleClick}
                                                    style={{
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "flex-start",
                                                        marginLeft: "18px",
                                                    }}
                                                >
                                                    <div>Logout</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mx-2 nav-extra task_2">
                                        <div
                                            className="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#loginModal"
                                        >
                                            Login
                                        </div>

                                        <div
                                            class="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#signupModal"
                                        >
                                            <Link
                                                to={"/register"}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "white",
                                                }}
                                            >
                                                SignUp
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Skeleton />
                        )}
                    </div>
                </div>
            </nav>
            <div id="loginModal" className="modal fade" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="box d-flex flex-direction-column justify-content-center gap-4">
                                <button
                                    type="button"
                                    id="fn"
                                    className="btn btn-success"
                                    onClick={() => {
                                        window.location.href =
                                            "/login-customer";
                                    }}
                                >
                                    {/* <Link

                                            to={"/login-customer"}
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                        >
                                        </Link> */}
                                    Login for Customer
                                </button>
                                <button
                                    type="button"
                                    id="sd"
                                    className="btn btn-success"
                                    onClick={() => {
                                        window.location.href = "/login-vendor";
                                    }}
                                >
                                    Login for Vendor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="carouselExampleCaptions"
                className="carousel carousel-fade slide mycar smaller"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                    />
                </div>
                <div className="carousel-inner smallimg">
                    <div className="carousel-item active">
                        <img
                            src="cows.jpg"
                            width="100%"
                            height="700px"
                            className="d-block w-100"
                            alt="..."
                        />
                        <div className="carousel-caption d-md-block black">
                            <h5
                                style={{
                                    fontSize: 30,
                                    textShadow: "4px -1px black",
                                }}
                            >
                                Pure Milk,Anytime,Anywhere
                            </h5>
                            <p
                                style={{
                                    fontSize: 17,
                                    textShadow: "0px 1px black",
                                }}
                            >
                                Bringing you the freshest dairy products,sourced
                                from local farms.
                            </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="milk.jpg"
                            width="100%"
                            height="700px"
                            className="d-block w-100"
                            alt="..."
                        />
                        <div className="carousel-caption   d-md-block">
                            <h5
                                style={{
                                    fontSize: 30,
                                    textShadow: "4px -1px black",
                                }}
                            >
                                Our Network of Trusted Vendors
                            </h5>
                            <p
                                style={{
                                    fontSize: 17,
                                    textShadow: "0px 1px black",
                                }}
                            >
                                We collaborate with reliable and certified
                                vendors to bring you the finest dairy products.
                            </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="products.jpg"
                            width="100%"
                            height="700px"
                            className="d-block w-100"
                            alt="..."
                        />
                        <div className="carousel-caption d-md-block">
                            <h5
                                style={{
                                    fontSize: 30,
                                    textShadow: "4px -1px black",
                                }}
                            >
                                Stored with Care
                            </h5>
                            <p
                                style={{
                                    fontSize: 18,
                                    textShadow: "2px 1px black",
                                }}
                            >
                                Our milk products are carefully stored in
                                state-of-the-art facilities to maintain
                                freshness and ensure top quality from farm to
                                table.
                            </p>
                        </div>
                    </div>
                </div>
                {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
    </button> */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container-fluid flu">
                <div className="container heritage">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="testimonialcont text-center">
                                <h2
                                    className="iceprolargehead clrltbrwn mb0 wow fadeInUp"
                                    data-wow-duration="1s"
                                    data-wow-delay=".2s"
                                    style={{
                                        visibility: "visible",
                                        color: "green",
                                        animationDuration: "1s",
                                        animationDelay: "0.2s",
                                        animationName: "fadeInUp",
                                    }}
                                >
                                    Milk on the Way limited
                                </h2>
                                <p
                                    className="procont wow fadeInUp"
                                    data-wow-duration="1s"
                                    data-wow-delay=".4s"
                                    style={{
                                        visibility: "visible",
                                        animationDuration: "1s",
                                        animationDelay: "0.4s",
                                        animationName: "fadeInUp",
                                    }}
                                >
                                    The Milk on the Way limited was founded by
                                    group of Btech students in the year 2024,
                                    which is one of the fastest growing Public
                                    Listed Companies in India, with business
                                    division - Dairy.{" "}
                                </p>
                            </div>
                            <div className="col-md-6 col-md-offset-3 vm">
                                <div className="readmore-wraper text-center">
                                    <Link
                                        className="readmore-btn"
                                        to="/about"
                                        tabIndex={-1}
                                    >
                                        <span style={{ color: "white" }}>
                                            View More
                                        </span>
                                        <span className="middlebar" />
                                        <span className="readmore-arrow">
                                            <i className="fa fa-angle-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 hidden-md hidden-lg hidden-sm">
                            <img
                                src="https://www.heritagefoods.in/static/images/cowandcalf.png"
                                className="img-responsive"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-wrap abcdef justify-content-center align-items-center">
                <div
                    className="footer-social-section clearfix"
                    style={{ margin: "auto" }}
                >
                    <ul
                        style={{
                            display: "flex",
                            gap: "22px 70px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay=".2s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "0.2s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <h3>Follow us :</h3>
                        </li>
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay=".4s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "0.4s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <Link to="#" target="_blank">
                                <img src="https://www.heritagefoods.in/static/images/fb.png" />
                            </Link>
                        </li>
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay=".6s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "0.6s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <Link to="#" target="_blank">
                                <img src="https://www.heritagefoods.in/static/images/tw.png" />
                            </Link>
                        </li>
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay=".8s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "0.8s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <Link to="#" target="_blank">
                                <img src="https://www.heritagefoods.in/static/images/lk.png" />
                            </Link>
                        </li>
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="1s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "1s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <Link to="#" target="_blank">
                                <img src="https://www.heritagefoods.in/static/images/is.png" />
                            </Link>
                        </li>
                        <li
                            className="wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="1.2s"
                            style={{
                                visibility: "visible",
                                animationDuration: "1s",
                                animationDelay: "1.2s",
                                animationName: "fadeInUp",
                            }}
                        >
                            <Link to="#" target="_blank">
                                <img src="https://www.heritagefoods.in/static/images/yt.png" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyrightsec text-center">
                <p>
                    Copyright © Milk on the Way Limited.{" "}
                    <span>
                        Designed by{" "}
                        <Link
                            style={{ fontSize: 20 }}
                            to="https://www.pixel-studios.com/"
                            target="_blank"
                        >
                            abcd
                        </Link>
                    </span>
                </p>
            </div>
        </>
    );
}

export default App;
