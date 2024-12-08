import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../context/userContext";

const Register = () => {
    const [isVendor, SetIsVendor] = useState(false);
    const [resMessage, setresMessage] = useState({});
    const [visible, setVisible] = useState(false);
    const {setLoginUser} = useContext(userContext);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    } = useForm();
    const accountCreated = () => {
        alert("Account Created Successfully...");
    };
    const failed = () => {
        alert("Failed to create an account...");
    };

    const onSubmit = async (data) => {
        SetIsVendor(false);
        // reset();
        console.log(data);
        let response = await fetch("http://localhost:3000/createaccount", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        let content = await response.json();
        console.log(content);
        setresMessage(content);
        if (content.success) {
            accountCreated();
            setLoginUser(content.user);
        } else {
            failed();
        }
    };
    return (
        <>
            {resMessage.success ? (
                <>
                    <Navigate to={"/"} />
                </>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="container">
                            <h3>Register on Milk on the way</h3>
                            <div className="container my-4">
                                <div className="mb-3 qaz">
                                    <div className="ver">
                                        <label
                                            htmlFor="exampleFormControlInput1"
                                            className="form-label"
                                        >
                                            Enter your first Name
                                        </label>
                                        <input
                                            {...register("firstname", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "This field is required",
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "The firstname must consist of at least 3 characters.",
                                                },
                                            })}
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                        />
                                        {errors.firstname && (
                                            <span className="  text-danger text-danger">
                                                {errors.firstname.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="ver">
                                        <label
                                            htmlFor="exampleFormControlInput1"
                                            className="form-label"
                                        >
                                            Enter your last Name
                                        </label>
                                        <input
                                            {...register("lastname", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "This field is required",
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "The lastname must consist of at least 3 characters.",
                                                },
                                            })}
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                        />
                                        {errors.lastname && (
                                            <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                                {errors.lastname.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                        minLength: {
                                            value: 3,
                                            message:
                                                "The username must consist of at least 3 characters.",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                            message:
                                                "Please enter a valid email address.",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className="container">
                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder={+91}
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                        pattern: {
                                            value: /^[0-9]{10}$/i,
                                            message:
                                                "Please enter a valid phone number.",
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                        {errors.phone.message}
                                    </span>
                                )}
                                <div></div>

                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Enter your password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder=""
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                        minLength: {
                                            value: 7,
                                            message:
                                                "The password must consist of at least 7 characters.",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                        {errors.password.message}
                                    </span>
                                )}
                                <div></div>

                                <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label"
                                >
                                    Confirm your password
                                </label>

                                <input
                                    {...register("confirmpassword", {
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                        minLength: {
                                            value: 7,
                                            message:
                                                "The password must consist of at least 7 characters.",
                                        },
                                    })}
                                    type="password"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder=""
                                />
                                {errors.confirmpassword && (
                                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                        {errors.confirmpassword.message}
                                    </span>
                                )}

                                <div className="col-12">
                                    <label
                                        htmlFor="inputAddress"
                                        className="form-label"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="1234 Main St"
                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
                                            },
                                            minLength: {
                                                value: 3,
                                                message:
                                                    "The address must consist of at least 3 characters.",
                                            },
                                        })}
                                    />
                                    {errors.address && (
                                        <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                                            {errors.address.message}
                                        </span>
                                    )}
                                </div>

                                <div className="col-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="gridCheck"
                                            {...register("isVendor")}
                                            onClick={() =>
                                                SetIsVendor(!isVendor)
                                            }
                                        />

                                        <label
                                            className="form-check-label"
                                            htmlFor="gridCheck"
                                            style={{ fontSize: "larger" }}
                                        >
                                            Are you a vendor?
                                        </label>
                                    </div>
                                </div>

                                {isVendor && (
                                    <div id="show">
                                        <p>Select your Work</p>
                                        <select
                                            {...register("work", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "This field is required",
                                                },
                                            })}
                                            className="form-select"
                                            aria-label="Default select example"
                                        >
                                            <option
                                                selected=""
                                                value={"sells milk"}
                                            >
                                                sells milk wholesale
                                            </option>
                                            <option
                                                value={"sells Organic Milk"}
                                            >
                                                sells Organic Milk
                                            </option>
                                            <option value={"sells Fresh Cow Milk and Curd"}>
                                                sells Fresh Cow Milk and Curd
                                            </option>
                                            <option value={"Butter and Cream"}>
                                                sells Butter and Cream
                                            </option>

                                            <option value={"Butter and Cream"}>
                                                sells any type of animal milk
                                            </option>
                                        </select>
                                    </div>
                                )}
                                <fieldset className="row mb-3"></fieldset>

                                <input
                                    className="butt btn btn-primary"
                                    style={{ margin: "inherit" }}
                                    type="submit"
                                    defaultValue="Sign In"
                                />
                                <div
                                    className="container mb-4 d-flex"
                                    style={{ justifyContent: "space-between" }}
                                >
                                    <div
                                        className="footer"
                                        style={{ marginTop: 15 }}
                                    >
                                        © 2023-2024 Milk on the way, Inc.{" "}
                                        <span>
                                            <a
                                                href="#"
                                                style={{ fontSize: 20 }}
                                            >
                                                .Privacy
                                            </a>
                                        </span>
                                        <span>
                                            <a
                                                href="#"
                                                style={{ fontSize: 20 }}
                                            >
                                                · Terms
                                            </a>
                                        </span>
                                    </div>
                                    <a href="register.html">Back to top</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default Register;
