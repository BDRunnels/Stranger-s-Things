import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div>
            <header id="headerFlex">
                <nav id="navFlex">
                    <Link to="/" id="home"> Home </Link>
                    <ul>
                        <li>
                            <a> Account </a>
                            <ul>
                                {
                                props.isLoggedIn ? <li><Link to="/profile"> Profile </Link></li> :<li><Link to="/create"> Create Account </Link></li>
                                }
                                {
                                props.isLoggedIn ?<li><Link to="/logout" 
                                onClick={(() =>
                                    localStorage.removeItem("token")
                                    )}
                                > Logout </Link></li> : <li><Link to="/login"> Login </Link></li>
                                }
                                
                              
                            </ul>
                        </li>
                    </ul>
                    

                </nav>
                <h1> Stranger's Things & Stuff </h1>
            </header>
            <input type="text" placeholder="Search For Posts"/>
        </div>
    )
}

export default Header;