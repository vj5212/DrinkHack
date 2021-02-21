import { useContext, useState } from "react";
import SignInBtn from "../../components/signin-btn"
import { UserContext } from "../../contexts/user";
import "./style.css"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeid from "../../helper/functions";
import { db, storage } from "../../firebase";
import firebase from "firebase";

export default function CreatePost() {
    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [drink, setDrink] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            var imagePreview = document.getElementById("image-preview");
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };

    const handleUpload = () => {
        if(image) {
            var imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            }, (error) => {
                console.log()
            }, () => {
                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl) => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        drink: drink,
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com", ""),
                        profileUrl: user.photoURL
                    });
                });
                setDrink("");
                setCaption("");
                setProgress(0);
                setImage(null);
                document.getElementById("image-preview").style.display = "none";
            }); 
        }
    };

    return (
    <div className="createPost">
        {user ? (
            <div className="createPost_loggedIn">
                <p>Create Post</p>
                <div className="createPost_loggedInCenter">
                <textarea className="createPost_textarea" 
                    rows="1"
                    style={{paddingBottom: "10px"}}
                    value={drink}
                    placeholder="What are you drinking?"
                    onChange={(e) => setDrink(e.target.value)}
                    ></textarea>

                    <textarea className="createPost_textarea" 
                    rows="3"
                    value={caption}
                    placeholder="Enter caption here..."
                    onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                    <div className="createPost_ImagePreview">
                        <img id="image-preview" alt="" />
                    </div>
                </div>
                <div className="createPost_loggedInBottom">
                    <div className="createPost_imageUpload">
                        <label htmlFor="fileInput">
                            <AddAPhotoIcon style={{cursor:"pointer", fontSize:"20px"}} />
                        </label>
                        <input id="fileInput" type="file" accept="image/*" onChange={handleChange} />
                    </div>
                    <button className="createPost_uploadBtn" onClick={handleUpload}
                    style={{color: caption ? "#000" : "lightgrey"}}>
                        {`Upload ${progress != 0 ? progress : ""}`}
                    </button>
                </div>
            </div>
        ) :
        (
            <div>
            <SignInBtn />
            <p style={{marginLeft: "16px"}}>to Post & Comment</p>
            </div>
        )}
        
    </div>
    );
};