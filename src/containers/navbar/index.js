import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import SignInBtn from "../../components/signin-btn";
import { UserContext } from "../../contexts/user";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import VirtualBar from "../../virtual-bar";
import "./style.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function Navbar() {
    const [user, setUser] = useContext(UserContext).user;

    return (
        <div className="navbar">
            <div style={{display: "flex", fontSize: "22px"}}>
            {/* <Link to="/virtual-bar">Virtual Bar</Link> */}
                <p style={{paddingRight: "35px"}}>Virtual Bar</p>
                <p>Taste Test</p>
            </div>     
            <p style={{fontSize: "35px", fontWeight: "600", position: "relative", left:"-45px"}}>DrinkHack <LocalBarIcon /></p> 
            {user ? (<img className="navbar_img" src={user.photoURL} />) : (<SignInBtn />)}
            
        </div>
        );
};
