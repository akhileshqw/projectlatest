import React from "react";
import { useState } from "react";

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name: name, email: email, phone: phone, course: course };
        const response = await fetch("http://localhost:3000/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        setName("");
        setEmail("");
        setPhone("");
        setCourse("");
        alert("Registration Successful!");
    };
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">
                Registration Form
            </h1>

            <form onSubmit={handleSubmit} className=" handleForm">
                <label className="">
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-2 border-black my-1"
                        pattern="^[a-zA-Z][a-zA-Z]{2,15}$"
                    />
                </label>
                <label className="">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-2 border-black my-1"
                    />
                </label>
                <label className="">
                    Phone:
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="border-2 border-black my-1"
                        pattern="^\d{10}$"
                    />
                </label>
                <label className="">
                    Course of Interest:
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="Computer Science">
                            Computer Science
                        </option>
                        <option value="Mechanical Engineering">
                            Mechanical Engineering
                        </option>
                        <option value="Civil Engineering">
                            Civil Engineering
                        </option>
                        <option value="Electrical Engineering">
                            Electrical Engineering
                        </option>
                    </select>
                </label>
                <div className="formOnly">
                    <input
                        type="reset"
                        value="Reset"
                        className="bg-white py-2 px-5 text-black my-2 border-2 border-slate-500"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="bg-black py-2 px-5 text-white my-2"
                    />
                </div>
            </form>
        </div>
    );
};

export default Form;
