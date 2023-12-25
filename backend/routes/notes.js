const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const {body , validationResult}=require('express-validator')
router.get('/fetchnotes',fetchuser,async(req,res)=>{
   try{
      
      const notes = await Notes.find({user:req.user.id})
      res.json(notes)
   }
   catch (error) {
      res.status(500).send({error : error.message})
  }
})
router.post('/addnote',fetchuser,[
   body('title','Enter valid title').isLength({min:3}),
   body('description','Enter valid description').isLength({min:5}),
],async (req,res)=>{

   try{

      const {title,description,tag}=req.body
      const error=validationResult(req)
      if(!error.isEmpty())
      res.status(400).json({error : error.array()})
      // const note = new Notes({
      //     title, description, tag, user : req.user.id
      // })

      const note = await Notes.create({
         title,
         description,
         tag,
         user: req.user.id
     });
    //  const savedNote=await note.save()
   
      res.json(note)
   }
   catch (error) {
      res.status(500).send({error : error.message})
  }
})

router.put('/update/:id',fetchuser,async(req,res)=>{
   try {
      const {title,description,tag}=req.body
      const newNote={}
      if(title)
      newNote.title=title
      if(description)
      newNote.description=description
      if(tag)
      newNote.tag=tag
   
      let note=await Notes.findById(req.params.id)
      if(!note)
      return res.status(404).json({result:"Not Found"})
   
      if(note.user.toString()!==req.user.id)
      return res.status(401).json({Status:"Unauthorized"})
   
      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({note})
      
   } catch (error) {
      res.json({error:error.message})
   }
})

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
   try {
      let note=await Notes.findById(req.params.id)
      if(!note)
      return res.status(404).json({result:"Not Found"})
   
      if(note.user.toString()!==req.user.id)
      return res.status(401).json({Status:"Unauthorized"})
   
      note=await Notes.findByIdAndDelete(req.params.id)
      res.json({note})
      
   } catch (error) {
      res.json({error:error.message})
   }
})
module.exports=router