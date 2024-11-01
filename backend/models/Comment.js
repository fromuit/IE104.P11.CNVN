const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  novel: {type: Schema.Types.ObjectId, ref: 'Novel'},
  chapter: {type: Schema.Types.ObjectId, ref: 'Chapter'},
  content: String,
  replies: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});