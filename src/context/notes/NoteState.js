import react, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    const host="http://localhost:5000"
    const s1={
        "name":"gourav",
        "class":"12"
    }
    const [state,setState]=useState(s1)
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"gourav jangid",
                "class":"10"
            })
        },1000)
    }
    const[alert,setalert]=useState(null)

    const setalert_fun=(msg,color,id=0,title="temp")=>{
        if(msg==="Updated")
        set_update_note({state:true,id:id,title:title})
        else
        {
          setalert({
            message:msg,
            color:color
          })
          setTimeout(()=>{
            setalert(null)
          },2000)
          if(id!=0)
          deleteNote(id)
        }        
        //  if(color==="red")
      }

    const initialnotes=[]

 

    const[notes,setnotes]=useState(initialnotes)
    const[token,settoken]=useState(null)
    const[update_note,set_update_note]=useState({state:false,id:null,title:null})

    const getNotes=async()=>{
        const response=await fetch(`${host}/api/note/fetchnotes`,{
            method:'GET',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const json=await response.json()
        setnotes(json)
    }
    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/note/addnote`,{
            method:'POST',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({title,description,tag})
        })
        const json=await response.json()
        setnotes([...notes,json])
        // return json
    }
    const deleteNote =async(id)=>{
        const response=await fetch(`${host}/api/note/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const json=await response.json()
        getNotes()
    }

    const login=async(email,password)=>{
        const response = await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
        const json = await response.json()
        if(response.status==400)
            setalert_fun(json.error,"red")
        else
            settoken(json.auth_token)
    }

    const editNote = async(id,title,description,tag)=>{
        const response=await fetch(`${host}/api/note/update/${id}`,{
            method:'PUT',
            headers:{
                'content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({title,description,tag})
        })
        const json=await response.json()
        getNotes()
    }

    const create_user = async(name,email,password)=>{
        const response=await fetch(`${host}/api/auth/createuser`,{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        })
        const json=await response.json()
        if(response.status==400)
           setalert_fun(json.error,"red")
        else 
           settoken(json.auth_token)
    }
   return (
    <NoteContext.Provider value={{notes,token,setState,update,addNote,deleteNote,editNote,getNotes,login,settoken,update_note,set_update_note,alert,setalert,setalert_fun,create_user}}>
        {props.children}
    </NoteContext.Provider>
   )
}

export default NoteState;