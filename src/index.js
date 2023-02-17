require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')
const routes = require('./routes')

// express instance
const app = express()

// apply middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// configuration openai api
const configuration = new Configuration({
   organization: 'org-TLWYK5AbFDC3Y1IXxU3uPHB5',
   apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(configuration)

// routes
routes(app, openai)

// app listening
app.listen(process.env.PORT, () => console.log('Server listening on port: ' + process.env.PORT))
