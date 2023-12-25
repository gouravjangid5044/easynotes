import React from 'react'
import { useState } from 'react'
import Alert from './alert'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import Update from './update'

const Newscard = (props) => {
    const {title,description,id,tag}=props
    const{alert,setalert}=useContext(noteContext)
    const {update_note,set_update_note,setalert_fun}=useContext(noteContext)
  return (
    <>
    <style>
        {
            `
            i{
                cursor:pointer
            }
            `
        }
    </style>
    {
      update_note.state &&
      <Update id={update_note.id} title={update_note.title}></Update>
    }
    <Alert message={alert}></Alert>
     <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 new_flex_card mt-5">
          {/* <div style={{height:'200px',width:'100%',marginBottom:'3px'}}>
              <img  src="https://d1le3ohiuslpz1.cloudfront.net/skillcrush/wp-content/uploads/2022/11/What-Is-a-Coder.png" height={100} width={100} style={{borderRadius:'5px',height:'100%',width:'100%'}}></img>
            </div> */}
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{tag}</p>
            <div className="flex align-items-center justify-content-center gap-4">
                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a> */}
                <i className="fa fa-trash-o" onClick={()=>setalert_fun("Deleted","red",id,title)} style={{fontSize:"24px"}}></i>
                <i className="fa fa-edit" onClick={()=>setalert_fun("Updated","green",id,title)} style={{fontSize:"24px",marginTop:'2px'}}></i>
            </div>
          
          </div>
    </>
  )
}

export default Newscard