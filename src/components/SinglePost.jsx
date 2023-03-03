import { useParams, Link } from "react-router-dom";
import  { useEffect } from "react";


const SinglePost = (props) => { //WILL BE INDIVIDUAL POST DETAILS OF PICTURE, DESCRIPTION, ETC. 
    const { idNumber } = useParams();

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
        </div>
    )
}

export default SinglePost;