import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { RegisterModel } from "./models/registerSchema.js";
import { RatingModal } from "./models/ratingSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import Cookies from "js-cookie";
import https from "https";
import fs from "fs";
import path from "path";

const app = express();

import dotenv from "dotenv";
import { certifiedVendorModal } from "./models/certifiedvendorSchema.js";
import { manageProductsModal } from "./models/manageProductsSchema.js";


dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
// console.log(process.env.EMAIL_PASS);
// const jwtSecret = "lasd4831231#^";

// console.log("after check")
// db connection

mongoose.connect(`${process.env.MONGO_STRING}`, {
  tls: true,
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(
//   cors({
//     origin: `${process.env.FRONTEND_URL}`,
//     credentials: true,
//   })
// );
// app.use(cors());

// const corsOptions = {
//   origin: `${process.env.FRONTEND_URL}`, // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
// };

// app.use(cors(corsOptions));

// // Ensure preflight requests are handled
// app.options('*', cors(corsOptions));

// const corsOptions = {
//   origin: `${process.env.FRONTEND_URL}`, // Allow your frontend origin
//   credentials: true, // Allow credentials (cookies, authorization headers)
// };
// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', `${process.env.FRONTEND_URL}`); // Frontend origin
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.sendStatus(200);
// });

const corsOptions = {
  origin: [
    "https://www.example.com",
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/createaccount", async (req, res) => {
  let iscertified = false;
  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    confirmpassword,
    address,
    isVendor,
    work,
    rating,
    lat,
    lng,
  } = req.body;

  let vendorEmail = email;
  let vendorLocation = address;
  let cowMilkPrice = 100;
  let cowMilkSells = false;
  let buffaloMilkPrice = 100;
  let buffaloMilkSells = false;
  let camelMilkPrice = 100;
  let camelMilkSells = false;
  let donkeyMilkPrice = 100;
  let donkeyMilkSells = false;
  let goatMilkPrice = 100;
  let goatMilkSells = false;
  let cowGheePrice = 100;
  let cowGheeSells = false;
  let buffaloGheePrice = 100;
  let buffaloGheeSells = false;
  let cowCurdPrice = 100;
  let cowCurdSells = false;
  let buffaloCurdPrice = 100;
  let buffaloCurdSells = false;

  const existingUser = await RegisterModel.findOne({ email });
  if (existingUser) {
    res.status(200).send({ success: false, msg: "User already exists" });
    return;
  }

  if (isVendor) {
    const createUser = await manageProductsModal.create({
      vendorEmail,
      vendorLocation,
      phone,
      cowMilkPrice,
      cowMilkSells,
      buffaloMilkPrice,
      buffaloMilkSells,
      camelMilkPrice,
      camelMilkSells,
      donkeyMilkPrice,
      donkeyMilkSells,
      goatMilkPrice,
      goatMilkSells,
      cowGheePrice,
      cowGheeSells,
      buffaloGheePrice,
      buffaloGheeSells,
      cowCurdPrice,
      cowCurdSells,
      buffaloCurdPrice,
      buffaloCurdSells,
    });
  }

  //  code for encryption
  let milk = false;
  let curd = false;
  let ghee = false;
  try {
    const createUser = await RegisterModel.create({
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmpassword,
      address,
      isVendor,
      work,
      rating,
      isCertified: iscertified,
      milk: milk,
      curd: curd,
      ghee: ghee,
      lat,
      lng,
    });

    const userObj = {
      username: firstname + " " + lastname,
      email: email,
      isVendor: isVendor,
      isCertified: iscertified,
      lat: lat,
      lng: lng,
    };
    // console.log("before jwt");
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            sameSite: "none",
            //modified
            secure: "true",
          })
          .send({
            success: true,
            msg: "Account created Successfully",
            user: userObj,
          });
      }
    );
    
    // console.log("after jwt");
    // console.log(res.getHeader())
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});
app.post("/certifyvendor", async (req, res) => {
  const { name, email, phone, businessAddress, hasOtherBusiness, imageUrl } =
    req.body;
  let vendorName = name;
  let vendorEmail = email;
  let Address = businessAddress;
  let anotherBusiness = hasOtherBusiness;

  try {
    const existingUser = await RegisterModel.findOne({ email });
    if (!existingUser.isVendor) {
      res.status(200).send({ success: false, msg: "you are not a vendor" });
      return;
    }
    if (existingUser.isCertified) {
      res
        .status(200)
        .send({ success: false, msg: "Vendor is already Certified" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const result = await RegisterModel.updateOne(
      { email: email },
      { $set: { isCertified: true } }
    );
  } catch (error) {}

  //  code for encryption
  try {
    const certifiedVendor = await certifiedVendorModal.create({
      vendorName,
      vendorEmail,
      phone,
      Address,
      anotherBusiness,
      imageUrl,
    });
    // it is neccessary to refresh the databases so that new collection will appear
    res.send({
      success: true,
      msg: "Application submitted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});

app.post("/login-vendor", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log("login route");

  const findUser = await RegisterModel.findOne({ email });
  if (!findUser) {
    res.send({ success: false, msg: "User not found" });
  }
  if (!findUser.isVendor) {
    res.send({ success: false, msg: "User is not a vendor" });
  }
  const userObj = {
    email: email,
    username: findUser.firstname + " " + findUser.lastname,
    isVendor: findUser.isVendor,
    isCertified: findUser.isCertified,
    lat: findUser.lat,
    lng: findUser.lng,
  };
  if (findUser.password === password) {
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        //remember me
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            secure: true,

            // sameSite: "lax", abhi
            sameSite: "none",

            // sa
          })
          .send({
            success: true,
            msg: "Login Successful",
            user: userObj,
          });
      }
    );
  } else {
    res.send({ success: false, msg: "Incorrect Password" });
  }
});
// console.log(process.env.JWT_SECRET)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log("login route");

  const findUser = await RegisterModel.findOne({ email });
  if (!findUser) {
    res.send({ success: false, msg: "User not found" });
  }
  if (findUser.isVendor) {
    res.send({
      success: false,
      msg: "You are a vendor. Please log in as a vendor ",
    });
  }
  const userObj = {
    email: email,
    username: findUser.firstname + " " + findUser.lastname,
    isVendor: findUser.isVendor,
    lat: findUser.lat,
    lng: findUser.lng,
  };
  if (findUser.password === password) {
    console.log("before jwt");
    jwt.sign(
      userObj,
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            secure: true,
            // sameSite: "lax",abhi
            sameSite: "none",
          })
          .send({
            success: true,
            msg: "Login Successful",
            user: userObj,
          });
      }
    );
  } else {
    res.send({ success: false, msg: "Incorrect Password" });
  }
});

app.get("/profile", (req, res) => {
  console.log("-------");
  console.log("the cookie is ");
  // console.log(req);
  console.log(req.cookies);
  console.log("req is :", req);
  const { token } = req.cookies;
  console.log("the user token is", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          msg: "Failed to authenticate token",
        });
      }
      console.log("the user is", user);
      console.log("successfully completed...");
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.get("/vendors", async (req, res) => {
  const vendorsData = await RegisterModel.find({ isVendor: true });
  res.send(vendorsData);
});

app.post("/contact", async (req, res) => {
  const { email, query, concern } = req.body;
  console.log("in route");

  // Create a transporter object using SMTP with your email host details
  let transporter = nodemailer.createTransport({
    service: "gmail", // You can also use other email services like Outlook, Yahoo, etc.
    auth: {
      user: "milkontheway01@gmail.com", // Your host email
      pass: process.env.EMAIL_PASS, // Host email password (consider using environment variables for security)
    },
  });

  // Email options
  let mailOptions = {
    from: "milkontheway01@gmail.com", // Sender address (your host email)
    to: email, // Receiver's email (user's email from the request)
    subject: "We have received your query", // Subject of the email
    text: `Thank you for contacting us! 
        Query Type: ${query} 
        Concern: ${concern}`, // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, msg: "Error sending email" });
    }
    console.log("Email sent: " + info.response);
    res.status(200).send({ success: true, msg: "Email sent successfully" });
  });
});

app.get("/logout", (req, res) => {
  // res.clearCookie("token", { secure: true,sameSite:"none" } );
  // res.cookie("token", "", {
  //   expires: new Date(Date.now()), // Set expiration to a past date
  //   // httpOnly: true,       // Ensure cookie is HttpOnly (if it was set as HttpOnly)
  //   secure: true, // Use this if the cookie is set as Secure (HTTPS)
  //   path: "/", // Match the path where the cookie was set
  //   sameSite: "Strict", // Match the SameSite attribute if set
  // });

  // cursor
 
  // Clear the cookie and send response
  try {
    // First try clearing with domain
    res.clearCookie('token', {
      secure: true,
      sameSite: "none",
      path: "/",
      domain: process.env.FRONTEND_URL?.includes("localhost") ? "localhost" : ".vercel.app"
    });

    // Then also try clearing without domain as fallback
    res.clearCookie('token', {
      secure: true, 
      sameSite: "none",
      path: "/"
    });

    res.status(200).send({ success: true, msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send({ success: false, msg: "Error during logout" });
  }

  // res.co

  // res.status(200).cookie('token',null,{

  //       expires:new Date(Date.now())

  //   });
  // console.log("calling ----")
  // console.log("ck",Cookies.get());
  // Cookies.remove('token', { path: '/' });
  // console.log("ck",Cookies.get());

  // res.redirect('/');

  // req.clea
  // res.coo
});

// modifying
app.post("/ratings", async (req, res) => {
  const { vendorName, vendorEmail, comments, rating, imageUrl, givenby } =
    req.body;

  // console.log(vendorEmail);
  // console.log(req.body)

  let email = vendorEmail;
  const findUser = await RegisterModel.findOne({ email });
  console.log("findUser", findUser);

  if (!findUser) {
    res.send({ success: false, msg: "Vendor not found" });
    return;
  }
  if (!findUser.isVendor) {
    res.send({
      success: false,
      msg: "You can't give rating to a customer",
    });
    return;
  }

  // res.send({
  //   success: true,
  //   msg: "you can proceed  ahead",
  // });
  try {
    const ratingform = await RatingModal.create({
      vendorName,
      vendorEmail,
      rating,
      comments,
      imageUrl,
      givenby,
      createdAt: new Date(),
    });
    console.log("rating", ratingform);
    res.send({
      success: true,
      msg: "form saved in database",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
});

app.post("/ratingsdata", async (req, res) => {
  const { givenby } = req.body;
  // console.log(givenby)
  const vendorsData = await RatingModal.find({ givenby: givenby });
  // console.log("vd",vendorsData)
  res.send(vendorsData);
});
app.post("/getdiaryproducts", async (req, res) => {
  const { givenby } = req.body;
  let vendorEmail = givenby;
  // console.log(givenby)
  const vendorsData = await manageProductsModal.find({ vendorEmail: givenby });
  // console.log("vd",vendorsData)
  res.send(vendorsData);
});

app.post("/updateVendor", async (req, res) => {
  const {
    _id,
    vendorEmail,
    vendorLocation,
    phone,
    dairyProducts,
    activate,
    host,
  } = req.body;

  let cowMilkPrice = dairyProducts[0].price;
  let cowMilkSells = dairyProducts[0].sells;
  let buffaloMilkPrice = dairyProducts[1].price;
  let buffaloMilkSells = dairyProducts[1].sells;
  let camelMilkPrice = dairyProducts[2].price;
  let camelMilkSells = dairyProducts[2].sells;
  let donkeyMilkPrice = dairyProducts[3].price;
  let donkeyMilkSells = dairyProducts[3].sells;
  let goatMilkPrice = dairyProducts[4].price;
  let goatMilkSells = dairyProducts[4].sells;
  let cowGheePrice = dairyProducts[5].price;
  let cowGheeSells = dairyProducts[5].sells;
  let buffaloGheePrice = dairyProducts[6].price;
  let buffaloGheeSells = dairyProducts[6].sells;
  let cowCurdPrice = dairyProducts[7].price;
  let cowCurdSells = dairyProducts[7].sells;
  let buffaloCurdPrice = dairyProducts[8].price;
  let buffaloCurdSells = dairyProducts[8].sells;

  let milk = false;
  let curd = false;
  let ghee = false;
  if (
    cowMilkSells ||
    buffaloMilkSells ||
    camelMilkSells ||
    donkeyMilkSells ||
    goatMilkSells
  ) {
    milk = true;
  }
  if (cowGheeSells || buffaloGheeSells) {
    ghee = true;
  }
  if (cowCurdSells || buffaloCurdSells) {
    curd = true;
  }
  console.log("host", host);
  // if (activate != undefined && activate == true) {
  try {
    const result = await RegisterModel.updateOne(
      { email: host },
      {
        $set: {
          vendorEmail: vendorEmail,
          address: vendorLocation,
          phone: phone,
          milk: milk,
          curd: curd,
          ghee: ghee,
        },
      }
    );
  } catch (error) {}
  // }

  try {
    // Update logic using your database (e.g., MongoDB)
    const result = await manageProductsModal.findByIdAndUpdate(
      _id,
      {
        vendorEmail,
        vendorLocation,
        phone,
        cowMilkPrice,
        cowMilkSells,
        buffaloMilkPrice,
        buffaloMilkSells,
        camelMilkPrice,
        camelMilkSells,
        donkeyMilkPrice,
        donkeyMilkSells,
        goatMilkPrice,
        goatMilkSells,
        cowGheePrice,
        cowGheeSells,
        buffaloGheePrice,
        buffaloGheeSells,
        cowCurdPrice,
        cowCurdSells,
        buffaloCurdPrice,
        buffaloCurdSells,
      },
      { new: true }
    );
    res.status(200).json({ message: "Vendor updated successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update vendor" });
  }
});

app.get("/vendorProductDetails", async (req, res) => {
  const vendorsData = await manageProductsModal.find();
  res.send(vendorsData);
});

app.post("/applyfilter", async (req, res) => {
  let { rating, isCertified, milk, curd, ghee } = req.body;

  let query = {};

  if (rating !== undefined) {
    query.rating = { $gte: rating };
  }
  if (isCertified !== undefined) {
    query.isCertified = isCertified;
  }
  if (milk !== undefined) {
    query.milk = milk;
  }
  if (curd !== undefined) {
    query.curd = curd;
  }
  if (ghee !== undefined) {
    query.ghee = ghee;
  }

  let vendorsData = await RegisterModel.find(query);

  // console.log("vd", vendorsData.length);
  vendorsData.sort((a, b) => b.rating - a.rating);
  res.send(vendorsData);
});

app.post("/getnormalinfo", async (req, res) => {
  const { givenby } = req.body;
  const vendorData = await RegisterModel.find({ email: givenby });
  res.send(vendorData);
});

// Check if HTTPS is enabled in the environment
// Chatbot API endpoints
import { ChatbotModel } from "./models/chatbotSchema.js";

// Endpoint to get best vendors based on ratings and location
app.post("/api/chatbot/best-vendors", async (req, res) => {
  try {
    const { location, category } = req.body;
    
    // Query to find vendors based on category (milk, ghee, curd)
    let query = { isVendor: true };
    
    if (category === "milk") {
      query.milk = true;
    } else if (category === "ghee") {
      query.ghee = true;
    } else if (category === "curd") {
      query.curd = true;
    }
    
    // Find vendors and sort by rating (highest first)
    const vendors = await RegisterModel.find(query)
      .sort({ rating: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      vendors: vendors.map(vendor => ({
        name: `${vendor.firstname} ${vendor.lastname}`,
        email: vendor.email,
        address: vendor.address,
        rating: vendor.rating,
        isCertified: vendor.isCertified
      }))
    });
  } catch (error) {
    console.error("Error finding best vendors:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint to save chatbot conversation
app.post("/api/chatbot/save-conversation", async (req, res) => {
  try {
    const { userId, sessionId, message } = req.body;
    
    // Find existing conversation or create new one
    let conversation = await ChatbotModel.findOne({ sessionId });
    
    if (!conversation) {
      conversation = new ChatbotModel({
        userId,
        sessionId,
        messages: []
      });
    }
    
    // Add new message to conversation
    conversation.messages.push(message);
    conversation.lastUpdated = new Date();
    
    await conversation.save();
    
    res.status(200).json({ success: true, conversationId: conversation._id });
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint to get account creation steps
app.get("/api/chatbot/account-steps", (req, res) => {
  const steps = [
    {
      step: 1,
      title: "Visit the Registration Page",
      description: "Navigate to the registration page by clicking on 'Register' in the navigation menu."
    },
    {
      step: 2,
      title: "Fill Personal Information",
      description: "Enter your first name, last name, email address, phone number, and address."
    },
    {
      step: 3,
      title: "Create Password",
      description: "Create a strong password and confirm it."
    },
    {
      step: 4,
      title: "Select Account Type",
      description: "Choose whether you're registering as a customer or a vendor."
    },
    {
      step: 5,
      title: "Complete Registration",
      description: "Submit the form to create your account."
    }
  ];
  
  res.status(200).json({ success: true, steps });
});

if (process.env.HTTPS === 'true') {
  // For development, we'll use self-signed certificates
  // In production, you would use proper certificates
  const options = {
    key: fs.readFileSync(path.join(process.cwd(), 'server.key')),
    cert: fs.readFileSync(path.join(process.cwd(), 'server.cert'))
  };

  // Create HTTPS server
  https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server listening on port ${port}`);
  });
} else {
  // Fallback to HTTP if HTTPS is not enabled
  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
}
