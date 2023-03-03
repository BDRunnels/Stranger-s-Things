import { useEffect, useState } from "react";

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
                        Authorization: `Bearer ${localStorage.getItem("token")}`
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

    
    return (
        <div>
            {
                props.isLoggedIn ? 
                <section>
                    <h1 style={{marginLeft: "2%"}}>Welcome {userData.username} </h1>
                    <div id="profilePostFlex"> 
                    
                        <h3> Your posts:</h3>
                    </div>
                </section>
                    
                     : <div> You are not authorized to view this page. Please login or create an account. </div>
            }
            
            
        </div>
    )
}
export default Profile;