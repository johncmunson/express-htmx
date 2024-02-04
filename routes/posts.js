import express from 'express'
import { wrap } from '../utils.js'
import { getPaginatedPosts } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

// TODO: return 404 if page is out of range
// TODO: render previous and next links

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const page = Number(req.query.page) || 1
  const posts = getPaginatedPosts(page)

  res.render('pages/posts', { posts })
}

router.get('/', wrap(handler))

export default router
