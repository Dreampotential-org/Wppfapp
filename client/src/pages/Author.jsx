import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import Loader from '../componets/Loader';


const Author = () => {
  const [authors,setAuthors]=useState([])
  const [isLoader,setIsLoader]=useState(false);
  useEffect(()=>{
    
    const getAauthor= async ()=>{
      setIsLoader(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/users`)
        setAuthors(response?.data)
        
      } catch (err) {
        setAuthors(err)
        
      }
      setIsLoader(false)
    }
    getAauthor()

  },[])
  if(isLoader){
    <Loader />
  }
  return (
    <section className='authors1'>
      {authors.length > 0 ?<div className='container author_container1'>
        {
          authors.map(({_id: id,avatar,name,posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author1'>
              <div className='author__avatar'>
                <img src={`http://localhost:5000/uploads/${avatar}`} alt={`Images of ${name}`} />
              </div>
              <div className='author_info'>
                <h3 className='author__name'>{name}</h3>
                <p className='author__posts'>{posts} posts</p>
              </div>
            </Link>
          })
        }


      </div> : <h2 className='center'>No user or authors are found</h2>}

    </section>
  )
}

export default Author
