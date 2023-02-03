import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Postlist from './components/Postlst.jsx';
import Userlist from './components/Userlist.jsx';
import AddUser from './components/AddUser.jsx';
import PostEditor from './components/PostEditor.jsx';

const App = () => {
  const dispatch = useDispatch()
  
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login dispatch={dispatch}/>,
    },        
    {
      path: '/', 
      element: <Dashboard dispatch={dispatch}/>,
      children: [
        {
          path: 'posts',
          element: <Postlist dispatch={dispatch} />,
        },
        {
          path: 'add-user',
          element: <AddUser dispatch={dispatch} />
        },
        {
          path: 'users',
          element: <Userlist dispatch={dispatch} />
        },
        {
          path: 'add-post',
          element: <PostEditor dispatch={dispatch}/>
        }
      ]
    },
  ]);


  return (
      <RouterProvider router={router} /> 
  )
}

export default App
