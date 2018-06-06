import { Router } from 'express'
import _ from 'lodash'

const router = Router()

// Mock Lists
const lists = [
  { id: '1', order: 1, boardId: '1', title: 'keep' },
  { id: '2', order: 2, boardId: '1', title: 'problem' },
  { id: '3', order: 3, boardId: '1', title: 'try' }
]

/* GET lists listing. */
router.get('/lists', function (req, res, next) {
  let result = lists
  if (req.query.boardId) {
    result = _.filter(lists, { 'boardId': req.query.boardId })
  }
  res.json(result)
})

/* POST list.  */
router.post('/lists', function (req, res, next) {
  lists.push(req.body)
  res.sendStatus(200)
})

/* PUT list.  */
router.put('/lists/:id', function (req, res, next) {
  let index = _.findIndex(lists, ['id', req.params.id]);
  lists[index] = req.body;
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
