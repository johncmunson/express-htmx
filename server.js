import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { Post } from './lib/md.js'
import indexRouter from './routes/index.js'
// import randomNumberRouter from './routes/randomNumber.js'
import postsRouter from './routes/posts.js'
import postRouter from './routes/post.js'

// __dirname is is a CommonJS feature that is not available in ES modules, so let's replicate it with this workaround
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Instantiate the express app
const app = express()
const port = 3000

// TODO: DON'T RENDER A NEW POST FOR EVERY REQUEST!!!
//       Instead, render the post once and cache the result.

/**
 * Pug doesn't support a dynamic include, so we need to create a custom function to do this
 * and register it with Pug.
 * https://stackoverflow.com/questions/45824697/workaround-to-dynamic-includes-in-pug-jade
 *
 * @param {string} slug
 * @param {import("pug").Options} [options={}] options
 * @returns {string}
 */
app.locals.includeBlogPost = (slug, options = {}) => new Post(slug).html

// Set the view engine to Pug
app.set('view engine', 'pug')

// Only if you're using absolute paths for Pug includes and extends
// app.locals.basedir = process.cwd()

// Configure the views directory
app.set('views', path.join(__dirname, 'views'))

// Makes the public folder accessible. This is where we can put static files like images, CSS, and JavaScript.
app.use(express.static(path.join(__dirname, 'public')))

// Register the routes
app.use('/', indexRouter)
// app.use('/random-number', randomNumberRouter)
app.use('/posts', postsRouter)
app.use('/posts/:postSlug', postRouter)

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
