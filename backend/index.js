const express = require('express')
require('dotenv').config()
let cors = require('cors')
console.log(process.env.SECRET_KEY)  
const connectToMongo=require('./db')
connectToMongo()  



const app = express()  
const port = 5000
app.use(cors())
 
app.use(express.json())  

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Gourav!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})