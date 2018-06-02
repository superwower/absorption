import { Router } from 'express'
import _ from 'lodash'

const router = Router()

// Mock Boards
const boards = [
  { id: '1', order: 1, title: 'sapmle' },
  { id: '2', order: 2, title: 'test' },
  { id: '3', order: 3, title: 'hogehoge' }
]

/* GET boards listing. */
router.get('/boards', function (req, res, next) {
  res.json(boards)
})

/* POST board.  */
router.post('/boards', function (req, res, next) {
  boards.push(req.body)
  res.sendStatus(200)
})

/* PUT board.  */
router.put('/boards/:id', function (req, res, next) {
  let index = _.findIndex(boards, ['id', req.params.id])
  boards[index] = req.body
  res.sendStatus(200)
})

/* DELETE board.  */
router.delete('/boards/:id', function (req, res, next) {
  _.remove(boards, function (board) {
    return board.id === req.params.id
  })
  res.sendStatus(200)
})
export default router
