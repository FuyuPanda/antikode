// Initiate Express
const express = require('express')
const app = express()



require('dotenv').config()


// Route Module
const routerv1 = require('./routes/index')


app.use(express.json())
//app.use(form.array());

app.use('/api', routerv1)

const port = 3001



app.listen(port, () => console.log(`This server listening on port ${port}`))