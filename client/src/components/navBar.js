import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const NavBar = ()=>{
    const [cookies,setCookies] = useCookies(['access_token'])
    const navigate = useNavigate()
    const logOut = () =>{
        setCookies('access_token','')
        window.localStorage.removeItem("userID")
        navigate('/auth')
    }

    return<div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to='/create-recipe'>CreateRecipe</Link>
        {!cookies.access_token ?(
        <Link to='/auth'>Login / Register</Link>
        ):(
        <>
        <Link to='/save-recipe'>Saved Recipes</Link>
        <button className="logOutBtn" onClick={logOut}>Log Out</button>
        </>
        )}
        
    </div>
}

export default NavBar