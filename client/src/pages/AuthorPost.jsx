import React, { useEffect, useState } from 'react'
import PostItem from '../componets/PostItem';

import { DOMI_POST } from '../data';
import Loader from '../componets/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const AuthorPost = () => {
  const [Posts, setPost]=useState([]);
    const [isLoader,setIsLoader]=useState('')
    const {authorId}=useParams();
    useEffect(()=>{
      const fetechData=async ()=>{
        try {
          const response=await axios.get(`http://localhost:5000/api/posts/users/${authorId}`);
          
          setPost(response?.data);
          
        } catch (err) {
          console.log(err)

          
        }
        setIsLoader(false);
      }
      fetechData();

    },[authorId])
    if(isLoader){
      <Loader />
    }
  return (
    <section className='posts'>
        {Posts?.length > 0 ? <div className='container post__container'>
        {
            Posts.map(({_id: id,thambnail,category,title,description,creator,createdAt})=> <PostItem key={id} postId={id} thambnail={thambnail} category={category} title={title} description={description} authorId={creator} createdAt={createdAt} />)
        }
        </div> : <h2 className='center'>NO post are found</h2>}

    </section>
  )
}

export default AuthorPost
