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
  const popular = /** @type {Boolean | undefined} */ (
    Boolean(req.query.popular)
  )

  const posts = getPaginatedPosts(page, undefined, tag, popular)

  if (posts.length === 0) {
    return res.status(404).render('pages/404')
  }

  const prevPosts =
    page > 1 ? getPaginatedPosts(page - 1, undefined, tag, popular) : []
  const prevLink =
    prevPosts.length > 0
      ? `/posts?page=${page - 1}${tag ? `&tag=${tag}` : ''}${
          popular ? `&popular=true` : ''
        }`
      : null
  const nextPosts = getPaginatedPosts(page + 1, undefined, tag, popular)
  const nextLink =
    nextPosts.length > 0
      ? `/posts?page=${page + 1}${tag ? `&tag=${tag}` : ''}${
          popular ? `&popular=true` : ''
        }`
      : null

  res.render('pages/posts', { posts, tag, popular, prevLink, nextLink })
}

router.get('/', wrap(handler))

export default router
