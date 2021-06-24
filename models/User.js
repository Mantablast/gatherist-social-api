const { Schema, Types, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: 'Username is Required'
    },
    email: {
      type: String,
      unique: true,
      //small email validate
      //regex validation from https://stackoverflow.com/questions/46155
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'There seems to be a problem.  Please enter a valid e-mail address'],
      min: [2, 'Change to email validate with mongo db'],
      //here in place of mongo db email validate, to be added later
      max: 12
    },
    userFriends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //like replies
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    //prevent duplicates
    id: false
  }
);

const User = model('User', UserSchema);

//Create a virtual called friendCount that retrieves the len of the user's friends array field on query.

module.exports = User;
