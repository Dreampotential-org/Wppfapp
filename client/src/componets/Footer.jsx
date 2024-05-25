import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
         <footer>
          <ul className='footer_categery'>
            <li><Link to="/posts/category/agriculture">Agriculture</Link></li>
            <li><Link to="/posts/category/Bussienes">Bussienes</Link></li>
            <li><Link to="/posts/category/Educatio">Educatio </Link></li>
            <li><Link to="/posts/category/Entertiament">Entertiament</Link></li>
            <li><Link to="/posts/category/Art">Art</Link></li>
            <li><Link to="/posts/category/Investment">Investment</Link></li>
            <li><Link to="/posts/category/Uncaterised">Uncaterised</Link></li>
            <li><Link to="/posts/category/Whether">Whether</Link></li>
         


          </ul>
          <div className='footer_copyright'>
            <small>All Rights are Reserved $copy; Nagender soluction </small>
          </div>
         </footer>

    </div>
  )
}

export default Footer
