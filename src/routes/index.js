const path = require('path')

function routes(app, openai) {
   app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../', 'view/HomePage.html'))
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
}

module.exports = routes
