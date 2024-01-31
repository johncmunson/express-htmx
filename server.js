import express from 'express'
import pug from 'pug'
import path from 'path'
import fs from 'fs'
import indexRouter from './routes/index.js'
// import randomNumberRouter from './routes/randomNumber.js'
import allPostsRouter from './routes/allPosts.js'
import postRouter from './routes/post.js'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import matter from 'gray-matter'

// __dirname is is a CommonJS feature that is not available in ES modules, so let's replicate it with this workaround
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Instantiate the express app
const app = express()
const port = 3000

/**
 * Get a blog post by its slug
 *
 * @param {string} slug - The slug of the blog post
 */
const getBlogPost = (slug) => {
  const publishDate = slug.slice(0, 10)

  const content = fs.readFileSync('./content/' + slug + '.md', 'utf8')

  const { data: frontmatter, content: markdown } = matter(content)

  return {
    html: unified()
      .use(parse)
      .use(remark2rehype)
      .use(stringify)
      .processSync(markdown)
      .toString(),
    frontmatter,
    publishDate,
    slug,
  }
}

/**
 * Pug doesn't support a dynamic include, so we need to create a custom function to do this
 * and register it with Pug.
 * https://stackoverflow.com/questions/45824697/workaround-to-dynamic-includes-in-pug-jade
 *
 * @param {string} slug
 * @param {import("pug").Options} [options={}] options
 * @returns {string}
 */
app.locals.includeBlogPost = (slug, options = {}) => getBlogPost(slug).html

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
app.use('/posts', allPostsRouter)
app.use('/posts/:postSlug', postRouter)

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
