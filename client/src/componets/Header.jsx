import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineClose} from "react-icons/ai"
import {FaBars} from 'react-icons/fa'
import {userContext} from '../context/userContext';



const Header = () => {
  const [isShowing,setIsshowing]=useState(window.innerWidth > 800 ? true : false)
  const closeNavBar=()=>{
    if(window.innerWidth < 800){
      setIsshowing(false)

    }
    else{
      setIsshowing(true)
    }
  }
  const {createUser}=useContext(userContext)
  return (
    <nav>
        <div className='container nav_container'>
        <Link to={"/"} onClick={closeNavBar}>
            <img src="https://media.licdn.com/dms/image/C560BAQEeoaFjgajEkw/company-logo_200_200/0/1657486769856?e=1724284800&v=beta&t=VobMf7GaTaiOyI9v4Sn36RQZjcTkZVzfUIbEI3BGXI0" width="30px" height="30px" alt='' />

        </Link>
        {createUser?.id && isShowing && <ul className='nav_menu'>
            <li><Link to={`/profile/${createUser?.id}`} onClick={closeNavBar} >{createUser?.name}</Link></li>
            <li><Link to={"/createpost"} onClick={closeNavBar}>createpost</Link></li>
            <li><Link to={"/authors"} onClick={closeNavBar}>Author</Link></li>
            <li><Link to={"/logout"} onClick={closeNavBar}>Logout</Link></li>
            {/* <li><Link to={"/posts/:id/userprofile"} onClick={closeNavBar}>nNAGENDER</Link></li> */}
        </ul>}
        {!createUser?.id && isShowing && <ul className='nav_menu'>
            {/* <li><Link to={"/profile/:id"} onClick={closeNavBar}>Profile</Link></li> */}
            {/* <li><Link to={"/createpost"} onClick={closeNavBar}>createpost</Link></li> */}
            <li><Link to={"/authors"} onClick={closeNavBar}>Author</Link></li>
            <li><Link to={"/login"} onClick={closeNavBar}>login</Link></li>
            {/* <li><Link to={"/posts/:id/userprofile"} onClick={closeNavBar}>nNAGENDER</Link></li> */}
        </ul>}
        <button className='nav_toggle-btn' onClick={()=> setIsshowing(!isShowing)}>
            {isShowing ? <AiOutlineClose /> : <FaBars />}

        </button>

        </div>
    </nav>
  )
}

export default Header
