import { useParams, Link } from "react-router-dom";
import  { useEffect, useState } from "react";


const SinglePost = (props) => { //WILL BE INDIVIDUAL POST DETAILS OF PICTURE, DESCRIPTION, ETC. 
    const { idNumber } = useParams();

    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    const [sendMessage, setSendMessage] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log(localStorage.getItem("token"))
        } else {
            props.setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    async function postMessage (event) {
        event.preventDefault();
        
        try {
            const response = await fetch(`${baseURL}/posts/${idNumber}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    message: {
                        content: sendMessage,
                    }
                })
            });
            const translatedData = await response.json();
            console.log(translatedData)

            if (translatedData.success) {
                alert("Your message has been sent.")
                setSendMessage(translated.data)
            } else {
                return
            }

        } catch (error) {
            console.log(error)
        }

    }

    const selectedPostArray = props.allPosts.filter((singlePost) => {
        return idNumber == singlePost._id
    })

    const selectedPost = selectedPostArray[0]

    return (
        <div>
            <div className="ok"><h1> Details about this item: </h1></div>
            <Link to="/" style={{border: "2px solid black", backgroundColor: "white"}}> Back to All Posts</Link>
            <div id="singlePostFlex">
                <h2> <u>"{selectedPost.title}"</u></h2>
                <h3> {selectedPost.description}</h3>
                <h3> Price: {selectedPost.price}</h3>
                <h3> Available location: {selectedPost.location}</h3>
                
                    {
                        selectedPost.willDeliver ? <h3> Will Deliver: Yes </h3> : <h3> Will Deliver: No </h3>
                    }
                                    
                <h2> Posted by: <strong>{selectedPost.author.username}</strong></h2>
            </div>
                   { 
                    props.isLoggedIn ? <form className="messageSender" onSubmit={postMessage}>
                        <textarea
                        type="text" 
                        placeholder="Message Seller about this Item"
                        rows="3"
                        cols="100"
                        onChange={(event) => setSendMessage(event.target.value)}/>
                        <button type="submit"> Send Message  </button>
                    </form> : <div className="messageSender"> You do not have access to send a message. Please login or create account. </div>
                    }
        </div>
    )
}

export default SinglePost;