import express from 'express'
import path from 'path'
import indexRouter from './routes/index.js'
import randomNumberRouter from './routes/randomNumber.js'
import { fileURLToPath } from 'url'

// __dirname is is a CommonJS feature that is not available in ES modules, so let's replicate it with this workaround
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Instantiate the express app
const app = express()
const port = 3000

// Set the view engine to Pug and configure the views directory
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Makes the public folder accessible. This is where we can put static files like images, CSS, and JavaScript.
app.use(express.static(path.join(__dirname, 'public')))

// Register the routes
app.use('/', indexRouter)
app.use('/random-number', randomNumberRouter)

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
