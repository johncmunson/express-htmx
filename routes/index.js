import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router()

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  res.render('pages/index', { pageTitle: 'Hello World!' })
}

router.get('/', wrap(handler))

export default router
