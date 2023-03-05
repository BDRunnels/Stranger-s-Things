import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const [newUser, setNewUser] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    async function createNewAccount (event) {
        event.preventDefault();

        try {
            console.log(newUser);
            console.log(newPassword);
            if (newPassword.length < 10 && (!newPassword.includes("!") || !newPassword.includes(".") || !newPassword.includes("?"))) {
                alert("Password is a minimum of 10 characters and MUST include one of the following special characters: ! or . or ?")
                return;
            } else if (newUser.length < 5) {
                alert("User name must be at least 5 characters.")
                return;
            }

            const response = await fetch(`${baseURL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-type": "application/JSON",
                    
                },
                body: JSON.stringify({
                    user: {
                        username: newUser,
                        password: newPassword,
                    }
                })
            });

            const translatedData = await response.json();
            console.log(translatedData)
            if (!translatedData.success) {
                alert("Account was not created or User already exists. Please try again or Login.")
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
            <h2> Fill in the forms below to create an account: </h2>
            <form onSubmit={createNewAccount}> 
                <input 
                type="text" 
                value={newUser} 
                placeholder="Username"
                onChange={(event) => setNewUser(event.target.value)}/>
                <input 
                type="text" 
                value={newPassword} 
                placeholder="Password"
                onChange={(event) => setNewPassword(event.target.value)}/>
                <button type="submit"> Create New Account</button>
            </form>
        </div>
    )
}

export default CreateAccount;