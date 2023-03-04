import { useEffect } from "react";

const Logout = (props) => {
    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            console.log(localStorage.getItem("token"))
            // fetchData();
        } else {
            props.setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    return (
        <div>
            <h1 id="logoutH1"> You have succesfully logged out. Thank you for visiting. </h1>
            <h2 id="logoutH2"> Please visit 'Home' to see all posts or 'Account' to login again.</h2>
        </div>
    )
}

export default Logout;