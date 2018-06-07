import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BoardSchema = new Schema({
  id: String,
  order: Number,
  title: String
})

export default mongoose.model('Board', BoardSchema)
