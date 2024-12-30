import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Skeleton from "react-loading-skeleton";
import { UserCircleIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { LoginUser } = useContext(userContext);
  const [ready, setready] = useState(false);
  const handleClick = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    setTimeout(() => {
      setready(true);
    }, 200);
  }, []);

console.log("navbar component",LoginUser)


  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark smaller"
        data-bs-theme="dark"
        style={{
          position: "fixed",
          top: "0",
          height: "80px",
          width: "100%",
          backgroundColor: "#333",
          color: "white",
          zIndex: "1000",
        }}
      >
        <div
          className="container-fluid"
          style={{ zIndex: "100", backgroundColor: "#333" }}
        >
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
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
                    <Link className="dropdown-item" to="/milk">
                      Milk
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ghee">
                      Ghee
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/curd">
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

            {/* <ul class="dropdown-menu">
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
            </ul> */}

            {ready ? (
              <>
                {!!LoginUser ? (
                  <>
                    <div className="dropdown justify-content-center">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          border: "1px solid white",
                          padding: "5px",
                          borderRadius: "5px",
                          boxShadow: "2px 2px 5px black",
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
                   {LoginUser.isVendor && <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/verify">
                            Get Verified
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/products" style={{textWrap:"wrap"}}>
                            Manage Products and Cost
                          </Link>
                        </li>

                        <li
                          onClick={handleClick}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginLeft: "18px",
                          }}
                        >
                          <div>Logout</div>
                        </li>
                      </ul>}   
                      {!LoginUser.isVendor && <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/rating">
                            Rate the Vendors
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/view-rating">
                            View Ratings
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/premium">
                            Get Premium
                          </Link>
                        </li>

                        <li
                          onClick={handleClick}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginLeft: "18px",
                          }}
                        >
                          <div>Logout</div>
                        </li>
                      </ul>}  
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
                      className="btn btn-danger"
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
                    window.location.href = "/login-customer";
                  }}
                >
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
    </>
  );
};

export default Navbar;
