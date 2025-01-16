import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../context/userContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {   useNavigate } from "react-router-dom";


const Register = () => {
  const [spinner,setSpinner]=useState(false);
  const [stopSpinner,setStopSpinner]=useState(false);
  const [isVendor, SetIsVendor] = useState(false);
    const navigate = useNavigate();

  const [resMessage, setresMessage] = useState({});
  const [visible, setVisible] = useState(false);
  const { setLoginUser } = useContext(userContext);
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  const genAI = new GoogleGenerativeAI("AIzaSyAAyyoBmFXaa-KH1gSTR5CPrYWpHAHOJFQ");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const accountCreated = () => {

    
  alert("Account Created Successfully...");
  navigate("/");
  

    
  };
  const failed = () => {
    setSpinner((prev)=>!prev)

    alert("Failed to create an account...");
  };

  async function giveCoordinates(location) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const prompt = `What are the latitude and longitude coordinates for the location: ${location}? If the location cannot be found, provide the coordinates of the nearest identifiable location. Ensure accuracy and clarity in your response.`;
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
  
      
      const regex = /([\d.-]+)°/g;
    
      const matches = [...text.matchAll(regex)];
      
      if (matches.length === 2) {
        const latitude = parseFloat(matches[0][1]);
        const longitude = parseFloat(matches[1][1]);
        
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      let ob=[]
      ob.push(latitude)
      ob.push(longitude)
      return ob
      } else {
        console.error("Could not extract coordinates from the response.");
      }
      
    } catch (error) {
      console.error(" parsing response:", error);
      throw new Error("Failed to retrieve coordinates");
    }
  }
  useEffect(() => {
    if (lat !== 0 && long !== 0) {
      console.log("Coordinates updated:", lat, long);
    }
  }, [lat, long]);





  const onSubmit = async (data) => {
    // Always include rating, default to null if not a vendor
    setSpinner(true)
    data.rating = isVendor ? 1 : null;

    // console.log("Data to be address:", data.address); // Debug log
   let ob= await giveCoordinates(data.address)
    
      
   
    
     
    
if(ob!=undefined){
  data.lat=ob[0]
    data.lng=ob[1]
    
    console.log("Data to be sent:", data);
    try {
      let response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/createaccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //main line
        credentials: "include",
        body: JSON.stringify(data),
      });
      let content = await response.json();
      console.log("Server response:", content);
      // setSpinner((prev)=>!prev)
      setStopSpinner(true)
      setresMessage(content);
      setSpinner(false)

      if (content.success) {
        accountCreated();
        setLoginUser(content.user);
      } else {
        failed();
      }
    } catch (error) {
      console.error("Error during API request:", error);
      failed();
    }
  }else{
    alert("failed to fetch location try again later ...")
  }
 
    SetIsVendor(false);
  };

  return (
    <>
      {resMessage.success ? (
        <>
          {/* <Navigate to={"/"} /> */}
          {setSpinner(false)}
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="container">
              <h3 style={{ textAlign: "center", fontSize: "35px" }}>
                Register on Milk on the way
              </h3>
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
                          message: "This field is required",
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
                          message: "This field is required",
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
                      message: "Please enter a valid phone number.",
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
                  <label htmlFor="inputAddress" className="form-label">
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
                        message: "This field is required",
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
                      onClick={() => SetIsVendor(!isVendor)}
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
                          message: "This field is required",
                        },
                      })}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="" value={"cow and buffalo milk"}>
                        sells cow and buffalo milk
                      </option>
                      <option value={"all types of animal milk"}>
                        sells any type of animal milk
                      </option>
                      <option value={"milk and curd"}>
                        sells Fresh Cow Milk and Curd
                      </option>
                      <option value={"butter and curd"}>
                        sells butter and cream
                      </option>
                    </select>
                  </div>
                )}
                <fieldset className="row mb-3"></fieldset>
                <div className="btn btn-primary" style={{width:"125px",height:"42px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <input
                  className="butt btn btn-primary"
                  style={{ margin: "inherit" }}
                  type="submit"
                  defaultValue="Submit"
                />
              { ( spinner && !stopSpinner)&&  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                </div>
               
                <div
                  className="container mb-4 d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="footer" style={{ marginTop: 15 }}>
                    © 2023-2024 Milk on the way, Inc.{" "}
                    <span>
                      <a href="#" style={{ fontSize: 20 }}>
                        .Privacy
                      </a>
                    </span>
                    <span>
                      <a href="#" style={{ fontSize: 20 }}>
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
