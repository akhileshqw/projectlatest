import React, { useContext } from "react";
import "../styles/loginstyle.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
const LoginForCustomer = () => {
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
        alert("Login Successful...");
    };
    const failed = (msg) => {
        alert(msg);
    };
    const onSubmit = async (data) => {
        reset();
        console.log(data);
        let response = await fetch("http://localhost:3000/login", {
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
        }
    };

    return (
        <>
            {resMessage.success ? (
                <>
                    <Navigate to={"/"} />
                </>
            ) : (
                <div>
                    <div className="container login ">
                        <div
                            className="smalloginbox clr"
                            style={{
                                border: "1px solid black",
                                padding: "20px",
                                boxShadow: "5px 10px #888888",
                                marginTop: "50px",
                            }}
                        >
                            <div className="head">Milk on the Way</div>
                            <b style={{ fontSize: 20, marginTop: 20 }}>
                                {" "}
                                Login for Customer
                            </b>
                            {/* add a border for the below form in bootstrap add a shadow */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleInputname"
                                        className="form-label"
                                    >
                                        Enter your Email
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputname"
                                        aria-describedby="emailHelp"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleInputPassword1"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder=""
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message:
                                                    "This field is required",
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
                                    <br />
                                    <a href="">forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    id="log"
                                    style={{
                                        marginTop: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "white",
                                        fontWeight: 600,
                                        borderRadius: 10,
                                        border: "3px solid #0dca",
                                    }}
                                    className="btn btn-info"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginForCustomer;
