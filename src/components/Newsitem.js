import React, { useEffect } from 'react'
import Newscard from './newscard'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const Newsitems = () => {
  const {notes,getNotes,login}=useContext(noteContext)
  const {token,settoken,editNote}=useContext(noteContext)
  useEffect(()=>{
    getNotes()
  },[token])
  // console.log(notes)
  return (
   <>
   <style>
   {`
        .dummy{
          background-color:white // this is applied only if use client is written on the top
        }
        .new_flex_card{
          display:flex;
          flex-direction:column;
          gap:3px;
        }
       `}
   </style>
   <div style={{ backgroundColor: 'white', height: '100vh', width: '100%',display:'grid',gridGap:'10px',gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridTemplateRows:'1fr 1fr 1fr', padding:'3%',overflowY:"auto"}}>
        {
          notes.lenght!=0?
          notes.map((note,index)=>{
              return <Newscard key={index} title={note.title} description={note.description} id={note._id} tag={note.tag}></Newscard>
          })
          :
          <div><span style={{margin:"auto"}}>No Notes Present</span></div>
        }
      </div>
   </>
  )
}

export default Newsitems