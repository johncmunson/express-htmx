import express from 'express'
import { wrap } from '../utils.js'
import { getFirstThreePosts } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const firstThreePosts = getFirstThreePosts()
  res.render('pages/index', { firstThreePosts })
}

router.get('/', wrap(handler))

export default router
