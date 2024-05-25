import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"

TimeAgo.addDefaultLocale(en)
TimeAgo.addDefaultLocale(ru)

const Postauthor = ({authorId,createdAt}) => {
  const [author,setAuthor]=useState({})

  useEffect(()=>{
    const fetch = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${authorId}`)
        setAuthor(res?.data)
        
      } catch (err) {
        console.log(err)
        
      }

    }
    fetch()
  },[])
   
  return (
    <Link to={`/posts/users/${authorId}`} className='post__author'> 
        <div className='post__author-avtar'>
            <img src={`http://localhost:5000/uploads/${author?.avatar}`} alt='avatar' />
            
        </div>
      
        <div className='posts_author-deatils'>
            <h5>By: {author?.name}</h5>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>

        </div>
        </Link>
    
  )
}

export default Postauthor
