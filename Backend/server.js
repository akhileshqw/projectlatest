import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { RegisterModel } from "../src/models/registerSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
import nodemailer from "nodemailer";
import "dotenv/config";

const jwtSecret = "lasd4831231#^";

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/milkontheway");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/createaccount", async (req, res) => {
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
    } = req.body;

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
        res.status(200).send({ success: false, msg: "User already exists" });
        return;
    }
    //  code for encryption
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
        });
        const userObj = {
            username: firstname + " " + lastname,
            email: email,
            isVendor: isVendor,
        };
        const token = jwt.sign(userObj, jwtSecret, {
            expiresIn: "2 days",
        });

        console.log(createUser);
        res.cookie("token", token).send({
            success: true,
            msg: "Account Created Successfully",
            user: userObj,
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
    };
    if (findUser.password === password) {
        jwt.sign(
            userObj,
            jwtSecret,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) throw err;
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                }).send({
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
    };
    if (findUser.password === password) {
        jwt.sign(
            userObj,
            jwtSecret,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) throw err;
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                }).send({
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
    console.log("the cookie is ");
    console.log(req.cookies);

    const { token } = req.cookies;
    console.log("the user token is", token);
    if (token) {
        jwt.verify(token, jwtSecret, (err, user) => {
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

    // Create a transporter object using SMTP with your email host details
    let transporter = nodemailer.createTransport({
        service: "gmail", // You can also use other email services like Outlook, Yahoo, etc.
        auth: {
            user: "milkontheway01@gmail.com", // Your host email
            pass: process.env.SMTP_PASS, // Host email password (consider using environment variables for security)
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
    res.clearCookie("token").send("Logged out");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
