import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MakePost = (props) => {

    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [location, setLocation] = useState("");
    const [deliver, setDeliver ] = useState(false);

    async function makeNewPost (event) {
        event.preventDefault();
        try {
            const response = await fetch(`${baseURL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    post: {
                        title: postTitle,
                        description: itemDescription,
                        price: itemPrice,
                        location: location,
                        willDeliver: deliver

                    }
                })

            });
            const translatedData = await response.json();
            console.log(translatedData)

        

            if(translatedData.success) {
                props.setAllPosts([...props.allPosts, translatedData.data.post])
                navigate("/")

            } else {
                alert("New Post Failed.")
            }

            

            
            

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1> Make a New Post</h1>
            <form id="makePostFlex" onSubmit={makeNewPost}>
                <input 
                type="text" 
                placeholder="Post Title"
                value={postTitle}
                className="makePostInput"
                onChange={(event) => setPostTitle(event.target.value)}
                />
                <textarea
                type="text" 
                placeholder="Item Description"
                rows="3"
                cols="75"
                value={itemDescription}
                className="makePostInput"
                onChange={(event) => setItemDescription(event.target.value)}
                />
                <input 
                type="text" 
                placeholder="Item Price"
                value={itemPrice}
                className="makePostInput"
                onChange={(event) => setItemPrice(event.target.value)}
                />
                <input
                type="text"
                placeholder="Item Location"
                value={location}
                className="makePostInput"
                onChange={(event) => setLocation(event.target.value)}
                />
                <div><input 
                type="checkbox" 
                placeholder="Will Deliver"
                value={deliver}
                onChange={() => setDeliver(!deliver)}
                className="makePostInput"/> <h3 style={{marginTop: 0}}> Will you deliver this item? </h3> </div>

                <button type="submit"> Submit New Post </button>
                
            </form>
        </div>
    )
}

export default MakePost;