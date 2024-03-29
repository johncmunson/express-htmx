import express from 'express'
import { wrap } from '../utils.js'
import { getThisManyPosts } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const firstThreePosts = getThisManyPosts(3)
  res.render('pages/index', { firstThreePosts })
}

router.get('/', wrap(handler))

export default router
