import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thambnail, setthambnail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { createUser } = useContext(userContext);
  const token = createUser?.token;
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setTitle(response?.data?.title);
      setDescription(response?.data?.description);
      setCategory(response?.data?.category);
      setthambnail(response?.data?.thambnail);
    };
    getPost();
  }, [id]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const POST_CATEGORIES = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather'];

  const editPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', title);
    formData.set('category', category);
    formData.set('description', description);
    formData.set('thambnail', thambnail);

    try {
      const response = await axios.patch(`http://localhost:5000/api/posts/${id}`, formData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post. Please validate the post data.');
    }
  };

  return (
    <section className='create_post'>
      <div className='container'>
        <h3>EDIT POST</h3>
        {error && <p className='error_form-message'>{error}</p>}
        <form className='form create_post-form' onSubmit={editPost}>
          <input
            type='text'
            placeholder='Enter your title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select name='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input
            type='file'
            onChange={setthambnail}
            accept='png, jpeg, jpg'
          />
          <button type='submit' className='btn primary'>
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
