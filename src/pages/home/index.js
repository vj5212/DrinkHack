import React from "react";
import SignInBtn from "../../components/signin-btn";
import CreatePost from "../../containers/create-post";
import Feed from "../../containers/feed";
import Navbar from "../../containers/navbar";
import "./style.css"

export default function Home() {
    return (
    <div className="home">
        <Navbar />
        <CreatePost />
        <Feed />
    </div>
    );
};