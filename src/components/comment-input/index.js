import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import "./style.css"

export default function CommentInput({comments, id}) {
    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState(comments ? comments : []);

    const addComment = () => {
        commentArray.push({
            comment: comment,
            username: user.email.replace("@gmail.com", "").toLowerCase()
        });

        db.collection("posts").doc(id).update({
            comments: commentArray
        }).then(function (){
            setComment("");
        }).catch(function (error) {
            console.log(`Error ${error}`);
        });

        setComment("");
    };

    return (
        <div className="commentInput">
            <textarea className="commentInput_textarea"
            rows="1"
            placeholder="write a comment..."
            onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <button className="commentInput_btn" onClick={addComment}>
                Post
            </button>
        </div>
    );
};
