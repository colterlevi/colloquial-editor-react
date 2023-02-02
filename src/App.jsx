import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  redirect
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const request = async () => {
      let req = await fetch('http://127.0.0.1:3000/who_am_i', {
        method: 'GET',
        headers: { Authentication: `Bearer ${localStorage.token}` }
      }
      )
      let res = req.json()
      if (req.ok) {
        dispatch(login(res))
        redirect('/dashboard')
      } else {console.log("No user logged in")}
    }
    

  }, [])
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login dispatch={dispatch}/>,
    },        
    {
    path: '/dashboard', 
    element: <Dashboard />,
    },
  ]);


  return (
      <RouterProvider router={router} /> 
  )
}

export default App
