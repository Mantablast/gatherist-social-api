const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: 'First Name is Required'
    },
    email: {
      type: String,
      unique: true,
      //small email validate
      match: [/.+@.+\..+/, 'There seems to be a problem.  Please enter a valid e-mail address'],
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
      getters: true
    },
    //prevent duplicates
    id: false
  }
);

const User = model('User', UserSchema);

//Create a virtual called friendCount that retrieves the len of the user's friends array field on query.

module.exports = User;
