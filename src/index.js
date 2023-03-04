import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AllPosts, SinglePost, Header, CreateAccount, Profile, Login, Logout, MakePost } from "./components";

const Main = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true)
            console.log(localStorage.getItem("token"))
        } else {
            setIsLoggedIn(false)
            console.log("No Token!")
        }
    }, [])

    async function fetchPosts () {
        try {
            const response = await fetch(`${baseURL}/posts`);

            const translateData = await response.json();

            console.log(translateData.data.posts);

            setAllPosts(translateData.data.posts);

            

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    
    return(
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} allPosts={allPosts} />

            <Routes>
                {/* <Route path="/create" element={CreateAccount}/> */}
                <Route path="/" element={<AllPosts allPosts={allPosts} setAllPosts={setAllPosts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path="/post/:idNumber" element={<SinglePost allPosts={allPosts} setAllPosts={setAllPosts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/create" element={<CreateAccount/>}/>
                <Route path="/profile" element={<Profile allPosts={allPosts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/newpost" element={<MakePost allPosts={allPosts} setAllPosts={setAllPosts}/>}/>
            </Routes>
            
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(<Main />)