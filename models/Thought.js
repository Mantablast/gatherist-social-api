//enable mongoose virtuals
const { Schema, Types, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
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
//reaction schema placed in though js file as asked
//subdocument schema
const reactionSchema = new Schema({
    reactionId: {
        //mongoose object id
        type: Schema.Types.ObjectId,
        //Default value is set to a new ObjectId
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
        //no min specified
    },
    username: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //just using for now until I determine a library to replace what was done in pizza hunt lesson
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
    {
        toJSON: {
            virtuals: false,
            getters: true
        },
        //prevent duplicates
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

//Create a virtual called friendCount that retrieves the len of the user's friends array field on query.
module.exports = Thought;