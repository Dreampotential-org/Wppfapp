import React, { useEffect, useState } from 'react'
import PostItem from '../componets/PostItem';

import Loader from '../componets/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategioryPost = () => {
  const [Posts, setPost]=useState([]);
    const [isLoader,setIsLoader]=useState('')
    const {category}=useParams();
    useEffect(()=>{
      const fetechData=async ()=>{
        try {
          const response=await axios.get(`http://localhost:5000/api/posts/category/${category}`);
          
          setPost(response?.data);
          
        } catch (err) {
          console.log(err)

          
        }
        setIsLoader(false);
      }
      fetechData();

    },[category])
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

export default CategioryPost
