
import { createContext, useEffect, useState } from "react";
import React from "react";
export const userContext = createContext();

export function UserContextProvider({ children }) {
    const [LoginUser, setLoginUser] = useState(null);
    const [ready, setReady] = useState(false);

 
    const fetchUser = async () => {
        const data = await fetch("http://localhost:3000/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const user = await data.json();
        console.log("hello");
        console.log("the final user is", user);
        setLoginUser(user);
        setReady(true);
    }


    useEffect(() => {
        if (!LoginUser) {
           
            fetchUser();
            
        }
    }, []);

    return (
        <userContext.Provider value={{ LoginUser, setLoginUser,ready }}>
            <div>{children}</div>
        </userContext.Provider>
    );
}
