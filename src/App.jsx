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
import Postlist, { postLoader } from './components/Postlst.jsx';
import Userlist from './components/Userlist.jsx';
import AddUser from './components/AddUser.jsx';
import PostCreator from './components/PostCreator.jsx';
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
          loader: postLoader,
          element: <Postlist />,
          children:[
            {
              path: 'edit/:id',
              element: <PostEditor />
            }
          ]
        },
        {
          path: 'add-user',
          element: <AddUser />
        },
        {
          path: 'users',
          element: <Userlist />
        },
        {
          path: 'add-post',
          element: <PostCreator />
        },
      ]
    },
  ]);


  return (
      <RouterProvider router={router} /> 
  )
}

export default App
