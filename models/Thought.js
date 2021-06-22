const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
      unique: true,
      required: 'Text is required',
      min: [1, 'Must be between 1 and 280 characters'],
      max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //reseach what is meant by createdAtVal (created at validation)
        get: createdAtVal => dateFormat(createdAtVal)
      },
    username: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        //prevent duplicates
        id: false
    }
)

const Thought = model('Thought', ThoughtSchema);

//Create a virtual called friendCount that retrieves the len of the user's friends array field on query.

module.exports = Thought;