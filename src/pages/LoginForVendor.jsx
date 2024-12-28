import React, { useContext } from "react";
import "../styles/loginstyle.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const LoginForVendor = () => {
  const [resMessage, setresMessage] = useState({});
  const [visible, setVisible] = useState(false);
  const { setLoginUser } = useContext(userContext);

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();

  const accountCreated = () => {
    alert("Login Successful...");
  };
  const failed = (msg) => {
    alert(msg);
  };
  const onSubmit = async (data) => {
    // reset();
    console.log(data);
    let response = await fetch("http://localhost:3000/login-vendor", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify(data),
    });
    let content = await response.json();
    console.log("in the cone");
    console.log(content);
    setresMessage(content);
    if (content.success) {
      accountCreated();
      setLoginUser(content.user);
    } else {
      failed(content.msg);
      resetField("password")
    }
  };

  return (
    <>
      {resMessage.success ? (
        <>
          <Navigate to={"/"} />
        </>
      ) : (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="row w-100">
            {/* Login Form (Left Side) */}
            <div
              className="col-12 col-md-5 p-4 shadow rounded"
              style={{
                backgroundColor: "#ffff",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <h2 className="text-center mb-4" style={{ color: "#d9534f" }}>
                Milk on the Way
              </h2>
              <p
                className="text-center"
                style={{ fontSize: "18px", color: "#333" }}
              >
                Vendor Portal
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    <strong>Email Address</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-danger mt-1">
                      <small>{errors.email.message}</small>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword" className="form-label">
                    <strong>Password</strong>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 7,
                        message: "The password must be at least 7 characters.",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger mt-1">
                      <small>{errors.password.message}</small>
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="d-flex flex-column mb-4">
                  <a
                    href="#"
                    className="text-primary text-decoration-none mb-2"
                  >
                    Forgot Password?
                  </a>
                  <Link
                    to="/login-customer"
                    className="text-primary text-decoration-none"
                  >
                    Are you a Customer?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-danger w-100"
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                >
                  Login
                </button>
              </form>
            </div>

            {/* Image Section (Right Side) */}
            <div className="col-12 col-md-7 d-flex justify-content-center align-items-center">
              <img
                src="vendorimage.avif"
                alt="Customer related"
                className="img-fluid"
                style={{
                  width: "65%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForVendor;
