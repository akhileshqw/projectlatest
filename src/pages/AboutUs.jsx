import React from "react";
import "../styles/about.css"

const AboutUs = () => {
    return (
        <>
            <div className="z">
                <span className="my-span">Our Story</span>
                <img src="./background.jpg" alt="" height="360px" className="title"/>
            </div>
            <h1 className="zxc">Welcome to Milk on the Way</h1>
            <div className="container mt-4 zxc">
                <p>
                    Dodla Dairy Limited is a public limited company having its
                    registered and corporate office at Hyderabad City of
                    Telangana State in India. The company was incorporated in
                    the year 1995 and production commenced in 1998. Currently,
                    our procurement spans 5 states and we delight our customers
                    through our products in 11 states. We operate around 150
                    milk chilling centres and 14 processing plants. Of these
                    plants, nine are ISO 22000:2018 certified, five are FSSC
                    22000 v5.1 certified and hold ISO 50001:2011 (EnMS)
                    certification. Our distribution and marketing operations
                    include distributing our products through more than 75 sales
                    offices, around 2500 agents and approximately 2000
                    distributors across 11 states in India. Additionally, as of
                    March 31st, 2024, our milk and dairy based VAPs are also
                    available through more than 600 “Dodla Retail Parlours”
                    which commenced operations in 2016 and are spread across the
                    states of Andhra Pradesh, Telangana, Tamil Nadu, and
                    Karnataka. Our product portfolio consists of Milk, UHT Milk,
                    Curd, Ice cream, Ghee, Paneer, Buttermilk, Lassi, Flavoured
                    Milk, Sweets and Cooking butter. These products are
                    conveniently packed to suit various needs of its consumers.
                </p>
            </div>
            <h1 className="zxc">Our Vision and Mission</h1>
            <div className="container zxc jkl">
                <img src="/vision.jpg" alt="" />
                <img src="/mission.jpg" alt="" />
                <img src="/abc.jpg" alt="" />
            </div>
        </>
    );
};

export default AboutUs;
