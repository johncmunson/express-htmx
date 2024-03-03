import express from 'express'
import { wrap } from '../utils.js'
import { getPaginatedPosts } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const page = Number(req.query.page) || 1
  const tag = /** @type {string | undefined} */ (req.query.tag)
  const posts = getPaginatedPosts(page, undefined, tag)

  if (posts.length === 0) {
    return res.status(404).render('pages/404')
  }

  const prevPosts = page > 1 ? getPaginatedPosts(page - 1, undefined, tag) : []
  const prevLink =
    prevPosts.length > 0
      ? `/posts?page=${page - 1}${tag ? `&tag=${tag}` : ''}`
      : null
  const nextPosts = getPaginatedPosts(page + 1, undefined, tag)
  const nextLink =
    nextPosts.length > 0
      ? `/posts?page=${page + 1}${tag ? `&tag=${tag}` : ''}`
      : null

  res.render('pages/posts', { posts, tag, prevLink, nextLink })
}

router.get('/', wrap(handler))

export default router
