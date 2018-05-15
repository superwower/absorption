import { Router } from 'express'

const router = Router()

// Mock Cards
const cards = [
  { type: 'KEEP', content: '1st keep item'},
  { type: 'KEEP', content: '2nd keep item'},
  { type: 'PROBLEM', content: '1st problem item'},
  { type: 'PROBLEM', content: '2nd problem item'},
  { type: 'PROBLEM', content: '3rd problem item'},
  { type: 'TRY', content: '1st try item'},
  { type: 'TRY', content: '2nd try item'},
]

/* GET cards listing. */
router.get('/cards', function (req, res, next) {
  res.json(cards)
})

export default router
