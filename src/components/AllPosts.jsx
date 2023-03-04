import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllPosts = (props) => {
    const [search, setSearch] = useState("");
    const cohortName = "2301-FTB-MT-WEB-FT";
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    let searchPosts = props.allPosts.filter((singlePost) => {
        return singlePost.title.toLowerCase().includes(search.toLowerCase()) /* || singlePost.description.toLowerCase().includes(search.toLowerCase()) */

    })

    async function fetchPosts () {
        try {
            const response = await fetch(`${baseURL}/posts`);

            const translateData = await response.json();

            console.log(translateData.data.posts);

            props.setAllPosts(translateData.data.posts);

            

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return(
        <div>
             <input 
            id="searchBar"
            type="text" 
            placeholder="Search For Post Title"
            onChange={(event) => {
                setSearch(event.target.value)
            }}
            />
            <div className="ok"><h1 style={{float: "left"}}> Listing of all items for sale: </h1></div>
            
            <section>
                {
                    searchPosts.length ? searchPosts.map((singlePost) => {
                        return (
                            <div key={singlePost._id} id="allPostFlex" style={{boxShadow: "5px 3px 3px 2px rgb(" + Math.floor(Math.random() * 255)
                            + "," + Math.floor(Math.random() * 255) + ","
                            + Math.floor(Math.random() * 255) + ")"}}> {/* CSS Style from the web */}
                                <h2> <u>{singlePost.title}</u></h2>
                                <h3><Link to={`/post/${singlePost._id}`}> Click Here for More Details </Link></h3>
                            </div>
                        )
                    }) : <div> No data. </div>
                }
            </section>
           
        </div>
    )
}

export default AllPosts;