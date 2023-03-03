import { useState } from "react";
import { Link } from "react-router-dom";

const AllPosts = (props) => {

    return(
        <div>
            <div className="ok"><h1 style={{float: "left"}}> Listing of all items for sale: </h1></div>
            
            <section>
                {
                    props.allPosts.length ? props.allPosts.map((singlePost) => {
                        return (
                            <div key={singlePost._id} id="allPostFlex">
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