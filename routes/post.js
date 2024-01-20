import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router()

const post = {
  title: 'Post Title',
  content: 'Lorem ipsum dolor sit amet',
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  res.render('pages/post', post)
}

router.get('/', wrap(handler))

export default router
