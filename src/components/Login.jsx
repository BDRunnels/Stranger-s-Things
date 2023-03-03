import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [loginName, setLoginName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    async function loginToAccount (event) {
        event.preventDefault();

        try {
            console.log(loginName);
            console.log(password);
            // if (newPassword.length < 10 && (!newPassword.includes("!") || !newPassword.includes(".") || !newPassword.includes("?"))) {
            //     alert("Password is a minimum of 10 characters and MUST include one of the following special characters: ! or . or ?")
            //     return;
            // } else if (newUser.length < 5) {
            //     alert("User name must be at least 5 characters.")
            //     return;
            // }

            const response = await fetch(`${baseURL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify({
                    user: {
                        username: loginName,
                        password: password,
                    }
                })
            });

            const translatedData = await response.json();
            console.log(translatedData)
            if (!translatedData.success) {
                alert("Login failed: Bad password / username or account does not exist. Please try again.")
            } else {
                const JWT = translatedData.data.token;

                localStorage.setItem("token", JWT);
                navigate("/profile")
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <h2> Login Here: </h2>
            <form onSubmit={loginToAccount}> 
                <input 
                type="text" 
                value={loginName} 
                placeholder="Username"
                onChange={(event) => setLoginName(event.target.value)}/>
                <input 
                type="text" 
                value={password} 
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}/>
                <button type="submit"> Login to Account </button>
            </form>
        </div>
    )
}

export default Login;