import React, { useState, useContext, useEffect } from 'react';
import { DOMI_POST } from '../data';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../componets/Loader';
import axios from 'axios';
import DeletePost from './Deleatepost';

const Dashbord = () => {
  const [Posts, setPosts] = useState([]);
  const [isLodding, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { createUser } = useContext(userContext);
  const token = createUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [id, token]);

  if (isLodding) {
    return <Loader />;
  }

  return (
    <section className='dashbord'>
      {
        Posts.length ? (
          <div className='container dashbord_contanier'>
            {
              Posts.map(post => {
                return (
                  <article className='dashbord_post' key={post.id}>
                    <div className='dashbor_post-info'>
                      <div className='dashbord_post-thambnail'>
                        <img src={`http://localhost:5000/uploads/${post.thambnail}`} alt="" />
                      </div>
                      <h5>{post.title}</h5>
                    </div>
                    <div className='dashbor_post-action'>
                      <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                      <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                      <DeletePost postId={post._id} />
                    </div>
                  </article>
                );
              })
            }
          </div>
        ) : <h2 className='center'>No dashbord are avaliable</h2>
      }
    </section>
  );
};

export default Dashbord;
