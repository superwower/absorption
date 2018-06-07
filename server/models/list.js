import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ListSchema = new Schema({
  id: String,
  order: Number,
  boardId: String,
  title: String
})

export default mongoose.model('List', ListSchema)
