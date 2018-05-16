import { Router } from 'express'

const router = Router()

// Mock Cards
const cards = [
  { listId: 'keep', content: '1st keep item' },
  { listId: 'keep', content: '2nd keep item' },
  { listId: 'problem', content: '1st problem item' },
  { listId: 'problem', content: '2nd problem item' },
  { listId: 'problem', content: '3rd problem item' },
  { listId: 'try', content: '1st try item' },
  { listId: 'try', content: '2nd try item' }
]

/* GET cards listing. */
router.get('/cards', function (req, res, next) {
  res.json(cards)
})

/* GET cards listing. */
router.post('/cards', function (req, res, next) {
  cards.push(req.json)
  res.status(200)
})

export default router
