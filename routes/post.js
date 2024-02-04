import express from 'express'
import { wrap } from '../utils.js'
import { Post, getNextSlug, getPrevSlug } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

// TODO: 404 if the post doesn't exist
// TODO: 500 if there's an error. This should be handled by the error handler middleware.
// TODO: DON'T RENDER A NEW POST FOR EVERY REQUEST!!! Instead, render the post once and cache the result.

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const postSlug = req.params.postSlug
  const post = new Post(postSlug)

  const prevSlug = getPrevSlug(postSlug)
  const nextSlug = getNextSlug(postSlug)

  const prevLink = prevSlug ? `/posts/${prevSlug}` : null
  const nextLink = nextSlug ? `/posts/${nextSlug}` : null

  res.render('pages/post', { post, prevLink, nextLink })
}

router.get('/', wrap(handler))

export default router
