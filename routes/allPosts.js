import express from 'express'
import { wrap } from '../utils.js'

const router = express.Router({ mergeParams: true })

const allPosts = [
  { title: 'The Art of Web Development', date: '2023-01-01' },
  { title: 'Exploring the World of AI', date: '2023-01-15' },
  { title: 'Gardening Tips for Beginners', date: '2023-02-01' },
  { title: 'The Best Travel Destinations of 2023', date: '2023-02-15' },
  { title: 'Understanding Cryptocurrency', date: '2023-03-01' },
  { title: 'Healthy Eating: Myths and Facts', date: '2023-03-15' },
  { title: 'Getting Started with Yoga', date: '2023-04-01' },
  { title: 'The Future of Renewable Energy', date: '2023-04-15' },
  { title: 'Photography: Capturing the Moment', date: '2023-05-01' },
  { title: 'The Joy of Painting', date: '2023-05-15' },
  { title: 'The Basics of HTML', date: '2023-06-01' },
  { title: 'What is CSS?', date: '2023-06-15' },
  { title: 'JavaScript for Beginners', date: '2023-07-01' },
  { title: 'TypeScript: A Better JavaScript?', date: '2023-07-15' },
  { title: 'The Benefits of React', date: '2023-08-01' },
  { title: 'Angular: The Popular Frontend Framework', date: '2023-08-15' },
  { title: 'Vue: The Progressive JavaScript Framework', date: '2023-09-01' },
  { title: 'Getting Started with Svelte', date: '2023-09-15' },
  { title: 'The History of Java', date: '2023-10-01' },
  { title: 'Python: The Versatile Programming Language', date: '2023-10-15' },
  { title: 'The Benefits of PHP', date: '2023-11-01' },
  { title: "Ruby: A Programmer's Best Friend", date: '2023-11-15' },
  { title: 'The Benefits of C#', date: '2023-12-01' },
  { title: 'Go: The Versatile Programming Language', date: '2023-12-15' },
]

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function handler(req, res) {
  res.render('pages/allPosts', { allPosts })
}

router.get('/', wrap(handler))

export default router
