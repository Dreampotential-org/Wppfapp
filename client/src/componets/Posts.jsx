import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PostItem from '../componets/PostItem';

import { DOMI_POST } from '../data';
import Loader from './Loader';







const Posts = () => {
    const [Posts, setPost]=useState([]);
    const [isLoader,setIsLoader]=useState('')
    useEffect(()=>{
      const fetechData=async ()=>{
        try {
          const response=await axios.get('http://localhost:5000/api/posts/');
          
          setPost(response?.data);
          
        } catch (err) {
          console.log(err)

          
        }
        setIsLoader(false);
      }
      fetechData();

    },[])
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

export default Posts
