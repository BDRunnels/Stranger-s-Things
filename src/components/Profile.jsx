import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
    
    const [userData, setUserData] = useState({});
    
    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log(localStorage.getItem("token"))
            fetchData();
        } else {
            props.setIsLoggedIn(false)
            console.log("No Token!")
        }
    

        async function fetchData () {
            try {
                const response = await fetch(`${baseURL}/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        
                    }
                });

                const translatedData = await response.json();
                console.log("Below is our data:")
                console.log(translatedData)
                setUserData(translatedData.data);
            } catch (e) {
                console.log(e)
            }
        }
    }, [])
   
    
    console.log(userData)

    
    return (
        <div>
            
            {
                props.isLoggedIn ? 
                <section>
                    <h1 style={{marginLeft: "2%", marginBottom: "1%"}}>Welcome {userData.username} </h1>
                    <Link to="/" style={{border: "2px solid black", backgroundColor: "white", marginTop: "2%"}}> Back to All Posts</Link>
                    <Link to="/newpost" style={{border: "2px solid black", backgroundColor: "white", marginTop: "2%"}}> Make a New Post </Link>
                    <div id="profilePostFlex"> 
                    
                        <h2> Posts by: {userData.username}</h2>
                        {
                            
                            userData.posts ? 
                            userData.posts.map((mySinglePost) => {
                            return (
                                <div key={mySinglePost._id} id="indPostFlex">
                                    
                                    <h2> <u>"{mySinglePost.title}"</u></h2>
                                    <h3> {mySinglePost.description}</h3>
                                    <h3> Price: ${mySinglePost.price}</h3>
                                    <h3 style={{borderBottom: "2px solid black", paddingBottom: "2%"}}> Available location: {mySinglePost.location}</h3>
                                    {/* <h3> Messages about the post: {mySinglePost.messages}</h3> */}
                                    {
                                        mySinglePost.messages ?
                                        <button><Link to={`/profile/${mySinglePost._id}`}> Messages About This Post Here </Link> </button> : <h3> No data</h3>
                                        // mySinglePost.messages.map((singleMessage, index) => {
                                        //     return (
                                        //         <div key={index}>
                                        //             <h4> Message from user: {singleMessage.fromUser.username}</h4>
                                        //             <h4> Content: {singleMessage.content}</h4>
                                        //         </div>
                                        //     )
                                        // }) : <h3> No data</h3>
                                    } 

                                </div>
                                )
                         }) : <p> no data </p>

                        }
                        

                    </div>
                </section>
                    
                     : <div> You are not authorized to view this page. Please login or create an account. </div>
            }
            
            
            
        </div>
    )
}
export default Profile;