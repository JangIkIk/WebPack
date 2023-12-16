import {Link} from "react-router-dom"

function Navbar(){
    return(
        <div>
            <Link to={"/"}>home</Link><br/>
            <Link to={"/about"}>about</Link>
        </div>
    );
}

export default Navbar;