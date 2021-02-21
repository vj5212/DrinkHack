import React, { useContext, useState } from "react";
import SignInBtn from "../../components/signin-btn";
import { UserContext } from "../../contexts/user";
import "./style.css"

export default function Navbar() {
    const [user, setUser] = useContext(UserContext).user;

    return (
        <div className="navbar">
            <p style={{fontSize: "25px", fontWeight: "600"}}>DrinkHack</p>
            {user ? (<img className="navbar_img" src={user.photoURL} />) : (<SignInBtn />)}
        </div>
        );
};
