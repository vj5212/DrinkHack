import React, {useContext} from "react";
import Comment from "../../components/comment";
import CommentInput from "../../components/comment-input";
import { UserContext } from "../../contexts/user";
import { db, storage } from "../../firebase";
import "./style.css"

export default function Post({profileUrl, username, id, photoURL, caption, comments, drink}) {
    const deletePost = () => {
        var imageRef = storage.refFromURL(photoURL);
        imageRef.delete();
        db.collection("posts").doc(id).delete();
    }
    return (<div className="post">
        <div className="post_header">
            <div className="post_headerLeft">
                <img className="post_profilePic" src={profileUrl} />
                <p style={{marginLeft:"8px"}}>{username}</p>
            </div>
            <button onClick={deletePost} className="post_delete">Delete</button>
        </div>

        <div className="post_center">
            <img className="post_photoUrl" src={photoURL} />
        </div>

        <div>
            <p style={{textAlign: "center", fontSize: "18px", padding: "6px"}}>
                <span style={{fontWeight: "500", marginRight: "4px", }}>{username}</span>is enjoying a <span style={{fontWeight: "500", marginRight: "4px", }}><i>{drink}</i></span>
            </p>
        </div> 

        <div>
            <p>
                <span style={{fontWeight: "500", marginRight: "4px"}}>{username}</span>
                {caption}
            </p>
        </div> 

        {comments ? 
        comments.map((comment) => 
        <Comment username={comment.username} caption={comment.comment} />) : <></>}

        <CommentInput comments={comments} id={id} />
        
    </div>);
}
