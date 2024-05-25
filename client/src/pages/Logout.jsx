import React, { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import {userContext} from '../context/userContext';
const Logout = () => {
  const navigate=useNavigate();
  const {setCreateUser}=useContext(userContext)
  setCreateUser(null);
  navigate('/login')
  return (
    <div>
        
      
    </div>
  )
}

export default Logout
