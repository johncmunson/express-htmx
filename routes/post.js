import express from 'express'
import { wrap } from '../utils.js'
import { getNextSlug, getPrevSlug } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const postSlug = req.params.postSlug
  const prevSlug = getPrevSlug(postSlug)
  const nextSlug = getNextSlug(postSlug)

  const prevLink = prevSlug ? `/posts/${prevSlug}` : null
  const nextLink = nextSlug ? `/posts/${nextSlug}` : null

  res.render('pages/post', { postSlug, prevLink, nextLink })
}

router.get('/', wrap(handler))

export default router
