
import Avatar2 from '../Avatars/Avatar2.jpg';
import { FaEdit,FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import React, { useState,useContext, useEffect } from 'react'
import {userContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Userprofile = () => {
  const [avatar,setAvatar]=useState('')
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [currentPassword,setCurrentPassword]=useState('');
  const [newPassword,setNewPassword]=useState('')
  const [confirmNewPassword,setConfirmNewPassword]=useState('')
  const navigate=useNavigate();
  const {createUser}=useContext(userContext)
  const [error,setError]=useState('')
  const [isAvatarTouched,setIsAvatarTouched]=useState(false)
  const token=createUser?.token;
  useEffect(()=>{
    if(!token){
      navigate('/login')
  
    }

  },[])
  useEffect(()=>{
    const getUser=async ()=>{
      const response=await axios.get(`http://localhost:5000/api/users/${createUser?.id}`,{
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}`}
      })
      const {name,email,avatar}=response.data;
      setName(response?.data?.name)
      setEmail(response?.data?.email)
      setAvatar(response?.data?.avatar)
    }
    getUser()
  },[])
  const changeAvatar=async()=>{
    const changePost=new FormData();
    changePost.set('avatar',avatar)
    const response=await axios.post(`http://localhost:5000/api/users/change-avater`,changePost,{
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`}
    })
    setAvatar(response?.data)
  }
  const updateProfile=async(e)=>{
    e.preventDefault();
    if(newPassword!==confirmNewPassword){
      return setError('Passwords do not match')
    }
    const updateUser=new FormData();
    updateUser.set('name',name)
    updateUser.set('email',email)
    updateUser.set('currentPassword',currentPassword)
    updateUser.set('newPassword',newPassword)
    updateUser.set('confirmNewPassword',confirmNewPassword)
    const response=await axios.patch(`http://localhost:5000/api/users/edit-user`,updateUser,{
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`}
    })
    if(response.status===200){
      setError('')
      navigate('/login')
    }
  }
  return (
   <section className='profile'>
    <div className='container profile_container'>
      <Link to={`/dashbord/${createUser?.id}`} className='btn'>My Posts</Link>
      <div className='profile_deatiles'>
      <div className='profile_wrapper'>
        <div className='avatar_profile'>
          <img src={`http://localhost:5000/uploads/${avatar}`} alt='avatar photo' />
        </div>
        <form className='avatar_form'>
          <input type='file' name='avatar' id='avatar' onChange={(e)=> setAvatar(e.target.files[0])} accept='png,jpg,jpeg'/>
          <label htmlFor='avatar'>
           <FaEdit onClick={()=> setIsAvatarTouched(true)} />
          </label>
        </form>
        {isAvatarTouched && <button className='profile_avatar-btn' onClick={changeAvatar}><FaCheck /></button>}
      </div>
      <h1>{createUser?.name}</h1>
      <form className="form profile_form" onSubmit={updateProfile}>
        {error && <p className='error_form-message'>There is error</p>}
        <input type="text" placeholder='Full name' value={name} onChange={(e)=> setName(e.target.value)} />
        <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input type="password" placeholder='Current Password' value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} />
        <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
        <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)} />
        <button type="submit" className='btn primary'>Update deatils</button>
      </form>
    </div>
    </div>
   </section>
  )
}

export default Userprofile
