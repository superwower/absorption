import { Router } from 'express'

import users from './users'
import cards from './cards'
import lists from './lists'
import boards from './boards'
import auth from './auth'

const router = Router()

// Add Routes
router.use(users)
router.use(cards)
router.use(lists)
router.use(boards)
router.use(auth)

export default router
