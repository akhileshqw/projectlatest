import React, { useEffect } from "react";
import "../styles/footer.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Contact = () => {
  // const [width,setWidth]=useState(window.innerWidth)
  const notify = (msg) =>
    toast(msg, {
      position: "top-center",
    });
  const [resMessage, setresMessage] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  function emailSent() {
    // alert("Your query has been submitted successfully");
    notify("Your query has been submitted successfully");
  }
  function failed() {
    // alert("Email not sent");
    notify("Email not sent");
  }
  const onSubmit = async (data) => {
    console.log(data);
    let response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/contact`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );
    let content = await response.json();
    if (content.success) {
      reset();
      emailSent();
    } else {
      failed();
    }
  };
 

  return (
    <div className="container">
 
      <div  className="row w-100 d-flex flex-column-reverse flex-md-row" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2rem',
        padding: '2rem 0',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
      }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flex: '1',
            width: '100%'
          }}
        >
          <ToastContainer position="top-center" transition={Bounce} />
          <div className="container my-4">
            <h2>Contact Us</h2>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
                    message: "The username must consist of at least 3 characters.",
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
              <option value={"Issue with the vendor"}>Issue with the vendor</option>
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

        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column-reverse',
          // display: window.innerWidth <= 768 ? 'none' : 'flex'
        }}>
        
          <img 
            src="support.jpg" 
            alt="Contact us illustration"
            style={{
              //  display: window.innerWidth <= 768 ? 'none' : 'flex',
              maxWidth: '80%',
              height: 'auto',
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius: '8px'
            }}
          />

        </div>

        {/* <div style={{
          flex: '1',
          display: window.innerWidth <= 768 ? 'flex' : 'none',
          
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
           
          
        </div> */}
      </div>
    </div>
  

  );
};

export default Contact;
