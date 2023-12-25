import React from 'react'
import{
    BrowserRouter,
    Route,
    Routes
  }
from "react-router-dom"
import { useContext,useState,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Navbar from './Navbar'
import Addnote from './addnote'
import Newscard from './Newsitem'
import About from './about'
import Alert from './alert'
import Login from './login'

const Home = () => {
  const {token,settoken,alert}=useContext(noteContext)
  return (
    <>
    {
        token==null?(<><Navbar page={"Home"}></Navbar><Login></Login></>):(<><Navbar page={"Home"}></Navbar><Addnote></Addnote><Newscard></Newscard></>)
    }
    </>
  )
}

export default Home