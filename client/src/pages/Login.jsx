import React, { useState, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {userContext} from '../context/userContext';

const Login = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState({
      
        email:'',
        password:'',
       
    })
    const [error,setError]=useState("")
    const changeInputHanddle=(e)=>{
        setUserData(prevState => {
            return {
               ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
    const {setCreateUser}=useContext(userContext)
    const loginSubmit=async (e)=>{
        e.preventDefault();
        setError("")
        try {
            const response=await axios.post('http://localhost:5000/api/users/login',userData)
            const user=response?.data;
            setCreateUser(user)
            navigate('/')
            
        } catch (err) {
            setError(err.response.data.message)
            console.log(err.response.data.message)
            
        }
    }

  return (
    <section className='register'>
        <div className='container'>
            <h2>SignIn</h2>
            <form className='form register_form' onSubmit={loginSubmit}>
                {error && <p className='error_form-message'>{error}</p>}
                
                <input type='email' placeholder='Email' name='email' value={userData.email} onChange={changeInputHanddle} />
                <input type='password' placeholder='Password' name='password' value={userData.password} onChange={changeInputHanddle} />
                <button type='submit' className='btn primary'>Login</button>
            </form>
            <small>Don't have account <Link to="/rigister" className='sm btn'>Register</Link></small>
        </div>
    </section>
  )
}

export default Login
