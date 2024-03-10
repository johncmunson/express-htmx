import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router({ mergeParams: true })

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  res.render('pages/contact')
}

router.get('/', wrap(handler))

export default router
