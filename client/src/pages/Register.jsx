import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
// import dotenv from 'dotenv'




const Register = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    })
    const [error,setError]=useState('');
    const registerSubmit=async(e)=>{
        e.preventDefault();
        setError('')
        try {
            const response=await axios.post('http://localhost:5000/api/users/register',userData)
            const newData= response.data;
            console.log(newData);
            if(!newData){
                setError("colud not't connect to the registet,please try again")
            }
            navigate('/login')
            
        } catch (err) {
            setError(err.response.data.message)
            
        }
    }


    const changeInputHanddle=(e)=>{
        setUserData(prevState => {
            return {
               ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
  return (
    <section className='register'>
        <div className='container'>
            <h2>SignUp</h2>
            <form className='form register_form' onSubmit={registerSubmit}>
                {error && <p className='error_form-message'>{error}</p>}
                <input type='text' placeholder='Full name' name='name' value={userData.name} onChange={changeInputHanddle} />
                <input type='email' placeholder='Email' name='email' value={userData.email} onChange={changeInputHanddle} />
                <input type='password' placeholder='Password' name='password' value={userData.password} onChange={changeInputHanddle} />
                <input type='password' placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInputHanddle} />
                <button type='submit' className='btn primary'>Register</button>
            </form>
            <small>Aleredy Have an account <Link to="/login" className='sm btn'>Login</Link></small>
        </div>
    </section>
  )
}

export default Register
