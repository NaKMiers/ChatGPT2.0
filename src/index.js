require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')

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
app.get('/', (req, res) => {
   res.send('<h1>This is server of ChatGPT2.0</h1>')
})

app.post('/', async (req, res) => {
   console.log('post message')
   const { message } = req.body
   console.log('message: ', message)

   try {
      const response = await openai.createCompletion({
         model: 'text-davinci-003',
         prompt: `${message}`,
         max_tokens: 100,
         temperature: 0.5,
      })

      console.log('response: ', response.data)

      res.json({ message: response.data.choices[0].text })
   } catch (err) {
      console.log(err)
      res.send(err).status(400)
   }
})

// app listening
app.listen(process.env.PORT, () => console.log('Server listening on port: ' + process.env.PORT))
