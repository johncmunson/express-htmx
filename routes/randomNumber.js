import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router()

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  const randomNumber = Math.floor(Math.random() * 100)
  res.send(randomNumber.toString())
}

router.get('/', wrap(handler))

export default router
