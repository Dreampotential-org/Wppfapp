import React, { useEffect, useContext } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const { createUser } = useContext(userContext);
  const token = createUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const location = useLocation();

  const removePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        if (location.pathname === `dashbord/${createUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      
    }
  };

  return (
    <div>
      <button className="btn sm danger" onClick={removePost}>
        Delete
      </button>
    </div>
  );
};

export default DeletePost;
