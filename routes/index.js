import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router()

router.get(
  '/',
  wrap(async (req, res) => {
    res.render('index', { title: 'Hello World' })
  })
)

export default router
