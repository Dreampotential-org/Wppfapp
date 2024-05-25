import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layouts from './componets/Layouts';
import Errorpage from './pages/Errorpage';
import Home from './pages/Home';
import PostDeatils from './pages/PostDeatils';
import CreatePost from './pages/CreatePost';
import AuthorPost from './pages/AuthorPost';
import CategioryPost from './pages/CategioryPost';
import Dashbord from './pages/Dashbord';
import Deleatepost from './pages/Deleatepost';
import EditPost from './pages/EditPost';
import Userprofile from './pages/Userprofile';
import Author from './pages/Author';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProvider from './context/userContext';




const router=createBrowserRouter([
  
    {path:"/",
    element: <UserProvider> <Layouts /></UserProvider>,
    errorElement: <Errorpage />,
    children: [
      {index: true, element: <Home />},
      {path: "posts/:id", element: <PostDeatils />},
      {path: "/createpost", element: <CreatePost />},
      {path: "rigister", element: <Register />},
      {path: "login", element: <Login />},
      {path: "logout", element: <Logout />},

      {path: "/posts/users/:authorId", element: <AuthorPost />},
      {path: "posts/category/:category", element: <CategioryPost />},
      {path: "dashbord/:id", element: <Dashbord />},
      {path: "posts/:id/delete", element: <Deleatepost />},
      {path: "posts/:id/edit", element: <EditPost />},
      {path: "profile/:id", element: <Userprofile />},
      {path: "authors", element: <Author />},
      

    ]
      }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


