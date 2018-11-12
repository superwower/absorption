import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'

import { boards, cards, lists } from './mock_data'
import Board from '../models/board'
import Card from '../models/card'
import List from '../models/list'

export async function init_db(isDev = true) {
  if (isDev) {
    const mockgoose = new Mockgoose(mongoose)
    const proxy = process.env.http_proxy
    if (proxy) {
      mockgoose.helper.setProxy(proxy)
    }
    await mockgoose.prepareStorage()
  }
  await mongoose.connect(
    'mongodb://foobar/baz',
    { useNewUrlParser: true }
  )
  if (isDev) {
    await Board.create(boards)
    await Card.create(cards)
    await List.create(lists)
  }
}
