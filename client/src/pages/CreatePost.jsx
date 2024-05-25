import React, { useState,useContext, useEffect } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import {userContext} from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thambnail, setThambnail] = useState('');
  const navigate=useNavigate();
  const {createUser}=useContext(userContext)
  const token=createUser?.token;
  useEffect(()=>{
    if(!token){
      navigate('/login')
  
    }

  },[])

const [error,setError]=useState('')
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ["Agriculture", "Bussienes", "Educatio", "Entertiament", "Art", "Investment", "Uncategorized", "Whether"];
const createSubmit=async (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.set('title',title)
  formData.set('category',category)
  formData.set('description',description)
  formData.set('thambnail',thambnail)

  try {
    const response=await axios.post('http://localhost:5000/api/posts',formData,{
      withCredentials: true, headers: {Authorization: ` Bearer ${token}`}

    });
    
    navigate('/')


    
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to create post. Please validate the post data.');
  }
    
    
  

}
  return (
    <section className='creat_post'>
      <div className='container'>
        <h3>CREATE POST</h3>
        {error && <p className='error_form-message'>{error}</p>}
        <form className='form create_post-form' onSubmit={createSubmit}>
          <input 
            type='text' 
            placeholder='enter your title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            autoFocus 
          />
          <select 
            name="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill 
            modules={modules} 
            formats={formats} 
            value={description} 
            onChange={setDescription} 
          />
          <input 
            type="file" 
            onChange={(e) => setThambnail(e.target.files[0])} 
            accept='image/png, image/jpeg' 
          />
          <button type='submit' className='btn primary'>CREATE</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
