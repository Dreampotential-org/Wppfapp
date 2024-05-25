import React, { useState, useContext, useEffect } from 'react';
import Postauthor from '../componets/Postauthor';
import { Link, useParams } from 'react-router-dom';
import thambnail from "../images/one.png";
import Loader from '../componets/Loader';
import Deleatepost from "./Deleatepost";
import { userContext } from '../context/userContext';
import axios from 'axios';

const PostDeatils = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createUser } = useContext(userContext);

  useEffect(() => {
    const getPostDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response?.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getPostDetail();
  }, [id]);
  if(setLoading){
    <Loader />
  }

  return (
    <section className='post-detials'>
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {post && (
        
        <div className='container post-detials_container'>
          <div className='post-detials_header'>
          <Postauthor authorId={post.creator} createdAt={post.createdAt}/>
            {createUser?.id === post?.creator && (
              <div className='post-detials_button'>
                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                <Deleatepost postId={id}/>
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className='post-detials_thumbnile'>
            <img src={`http://localhost:5000/uploads/${post.thambnail}`} height="400px" width="600px" alt='' />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
    </section>
  );
};

export default PostDeatils;
