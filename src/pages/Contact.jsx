import React from "react";
import "../styles/footer.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Contact = () => {
    const [resMessage, setresMessage] = useState({});
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
    } = useForm();
    function emailSent() {
        alert("Your query has been submitted successfully");
    }
    function failed() {
        alert("Email not sent");
    }
    const onSubmit = async (data) => {
        reset();
        console.log(data);
        let response = await fetch("http://localhost:3000/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        let content = await response.json();
        if(content.success){
            emailSent()

        }else{
            failed()
        }
        ;
    };
    

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
            }}
        >
            <div className="container my-4">
                <h2>Contact Us</h2>
                <div className="mb-3">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputname"
                        aria-describedby="emailHelp"
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
                                message: "Please enter a valid email address.",
                            },
                        })}
                    />

                    {errors.email && (
                        <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <p>Select your Query</p>
                <select
                    {...register("query", {
                        required: {
                            value: true,
                            message: "This field is required",
                        },
                    })}
                    className="form-select"
                    aria-label="Default select example"
                >
                    {/* <option selected="">Product related</option> */}
                    <option value={"Issue with the vendor"}>
                        Issue with the vendor
                    </option>
                    <option value={"Quality related"}>Quality related</option>
                    <option value={"About our terms"}>About our terms</option>
                </select>
                {errors.query && (
                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                        {errors.query.message}
                    </span>
                )}

                <p style={{ marginTop: 20 }}>Elaborate Your Concern</p>
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: 100 }}
                        defaultValue={""}
                        {...register("concern", {
                            required: {
                                value: true,
                                message: "This field is required",
                            },
                        })}
                    />
                    <label htmlFor="floatingTextarea2">Comments</label>
                </div>
                {errors.concern && (
                    <span className=" flex gap-2 items-center ml-1 text-sm text-danger">
                        {errors.concern.message}
                    </span>
                )}
                <input
                    className="btn btn-primary"
                    style={{ margin: "inherit" }}
                    type="submit"
                    defaultValue="Submit"
                />
                <div
                    className="container mb-4 d-flex"
                    style={{ justifyContent: "space-between" }}
                >
                    <div className="footer text-nm">
                        © 2023-2024 Milk on the Way, Inc.{" "}
                        <span>
                            <a href="" style={{ fontSize: 20 }}>
                                .Privacy
                            </a>
                        </span>
                        <span>
                            <a href="" style={{ fontSize: 20 }}>
                                · Terms
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Contact;
