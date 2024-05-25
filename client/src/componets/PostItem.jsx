import React from 'react'
import {Link} from "react-router-dom"
import Postauthor from '../componets/Postauthor'
// import PostDeatils from '../pages/PostDeatils'

const PostItem = ({postId,thambnail,category,title,description,authorId,createdAt}) => {
  const discPost=description.length > 130 ? description.substr(0,130) + '...' : description;
  // const postTile=title.length > 20 ? title.substr(0,20) + '...' : title;
  return (
    <article className='post'>
      <div className='post__thambnail'>
        <img src={`http://localhost:5000/uploads/${thambnail}`} alt={title} />
      </div>
      <div className='post__content'>
      <Link to={`/posts/${postId}`}><h3>{title}</h3></Link>
        <p dangerouslySetInnerHTML={{__html: discPost}}></p>
        <div className='post__footer'>
          <Postauthor authorId={authorId} createdAt={createdAt}/>
          <Link to={`/posts/category/${category}`} className='btn category'>{category}</Link>
        </div>

      </div>

    </article>
  )
}

export default PostItem
