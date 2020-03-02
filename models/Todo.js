const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    title:{
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('todos', todoSchema);