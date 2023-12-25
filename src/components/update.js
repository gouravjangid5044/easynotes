import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Update = (props) => {
    const {id,title}=props
    const {set_update_note,alert,setalert,editNote}=useContext(noteContext)
    const [new_title,set_new_title]=useState("")
    const [new_description,set_new_description]=useState("")
    const [new_tag,set_new_tag]=useState("")
    const handle_update=async(e)=>{
        e.preventDefault()
        await editNote(id,new_title,new_description,new_tag)
        set_new_title("")
        set_new_description("")
        set_new_tag("")
        setalert({message:"Updated",color:"green"})
        setTimeout(()=>{setalert(null)},2000)
    }
  return (
   <>
   <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full " style={{top:"20%",left:"35%"}}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{border:"1px solid black",borderRadius:"5px"}}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Updating note of title {title}
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={()=>set_update_note({state:false,id:null,title:null})}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handle_update}>
                    <div>
                        <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Title</label>
                        <input type="text" value={new_title} onChange={(e)=>set_new_title(e.target.value)} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Title" required/>
                    </div>
                    <div>
                        <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Description</label>
                        <input type="text" value={new_description} onChange={(e)=>set_new_description(e.target.value)} name="Description" id="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description" required/>
                    </div>
                    <div>
                        <label for="Tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Tag</label>
                        <input type="text" value={new_tag} onChange={(e)=>set_new_tag(e.target.value)} name="Tag" id="Tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Tag" required/>
                    </div>
                    {/* <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                            </div>
                            <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> */}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                    {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div> */}
                </form>
            </div>
        </div>
    </div>
</div> 

   </>
  )
}

export default Update