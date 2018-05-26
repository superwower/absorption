import { Router } from 'express'
import _ from 'lodash'

const router = Router()

// Mock Cards
const cards = [
  { id: '1', order: 1, listId: 'keep', content: '1st keep item', like: ['demo'] },
  { id: '2', order: 2, listId: 'keep', content: '2nd keep item', like: [] },
  { id: '3', order: 3, listId: 'problem', content: '1st problem item', like: ['demo'] },
  { id: '4', order: 2, listId: 'problem', content: '2nd problem item', like: ['demo'] },
  { id: '5', order: 1, listId: 'problem', content: '3rd problem item', like: [] },
  { id: '6', order: 2, listId: 'try', content: '1st try item', like: [] },
  { id: '7', order: 1, listId: 'try', content: '2nd try item', like: [] }
]

/* GET cards listing. */
router.get('/cards', function (req, res, next) {
  res.json(cards)
})

/* POST card.  */
router.post('/cards', function (req, res, next) {
  cards.push(req.body)
  res.sendStatus(200)
})

/* PUT card.  */
router.put('/cards/:id', function (req, res, next) {
  let index = _.findIndex(cards, ['id', req.params.id]);
  cards[index] = req.body;
  res.sendStatus(200)
})

/* DELETE card.  */
router.delete('/cards/:id', function (req, res, next) {
  _.remove(cards, function (card) {
    return card.id === req.params.id
  })
  res.sendStatus(200)
})
export default router
