import express from 'express'
import { wrap } from '../utils.js'
import { getTags } from '../lib/md.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const tags = getTags()

  res.render('pages/tags', { tags })
}

router.get('/', wrap(handler))

export default router
