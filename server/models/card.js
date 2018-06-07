import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CardSchema = new Schema({
  id: String,
  order: Number,
  boardId: String,
  listId: String,
  content: String,
  like: [String],
  author: String
})

export default mongoose.model('Card', CardSchema)
