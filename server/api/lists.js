import { Router } from 'express'
import _ from 'lodash'

const router = Router()

// Mock Lists
const lists = [
  { id: 'keep', order: 1, title: 'keep' },
  { id: 'problem', order: 2, title: 'problem' },
  { id: 'try', order: 3, title: 'try' }
]

/* GET lists listing. */
router.get('/lists', function (req, res, next) {
  res.json(lists)
})

/* POST list.  */
router.post('/lists', function (req, res, next) {
  lists.push(req.body)
  res.sendStatus(200)
})

/* DELETE list.  */
router.delete('/lists/:id', function (req, res, next) {
  _.remove(lists, function (list) {
    return list.id === req.params.id
  })
  res.sendStatus(200)
})
export default router
