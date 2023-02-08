import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  useRouteError
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Postlist, { postLoader } from './components/Postlst.jsx';
import Userlist, { requestUsers } from './components/Userlist.jsx';
import AddUser from './components/AddUser.jsx';
import PostCreator from './components/PostCreator.jsx';
import PostEditor from './components/PostEditor.jsx';
import UserModal from './components/UserModal.jsx';

const App = () => {
  const dispatch = useDispatch()
  
  const ErrorBoundary = () => {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div className='flex w-screen h-screen justify-center items-center text-4xl font-bold text-tamarillo bg-slate'>Dang! It's a 404...</div>;
  }
  
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
          path: '/',
          loader: postLoader,
          element: <Postlist />,
          children:[
            {
              path: 'edit/:id',
              loader: async ({ params }) => {
                let req = await fetch(`http://127.0.0.1:3000/articles/${params.id}`)
                let res = await req.json()
                return res},
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
          loader: requestUsers,
          element: <Userlist />,
          children: [
            {
              path: ':id',
              loader: async ({ params }) => {
                let req = await fetch(`http://127.0.0.1:3000/authors/${params.id}`)
                let res = await req.json()
                return res},
              element: <UserModal />
            }
          ]
        },
        {
          path: 'add-post',
          element: <PostCreator />
        },
      ],
      errorElement: <ErrorBoundary />
    },
  ]);


  return (
      <RouterProvider router={router} /> 
  )
}

export default App
