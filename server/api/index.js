import { Router } from 'express'

import users from './users'
import cards from './cards'
import lists from './lists'

const router = Router()

// Add Routes
router.use(users)
router.use(cards)
router.use(lists)

export default router
