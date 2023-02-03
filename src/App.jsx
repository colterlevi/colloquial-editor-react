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
import { login } from "./features/user"

const App = () => {
  const dispatch = useDispatch()
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login dispatch={dispatch}/>,
    },        
    {
    path: '/dashboard', 
      element: <Dashboard dispatch={dispatch}/>,
    },
  ]);


  return (
      <RouterProvider router={router} /> 
  )
}

export default App
