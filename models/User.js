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
      match: [/.+@.+\..+/, 'There seems to be a problem.  Please enter a valid e-mail address'],
      min: [2, 'Change to email validate with mongo db'],
      //here in place of mongo db email validate
      max: 12
    },
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

// //if the email will be a part of the username
// UserSchema.virtual('username').get(function() {
//   return this.email.slice(0, this.email.indexOf('@'));
// });

const User = model('User', UserSchema);

//Create a virtual called friendCount that retrieves the len of the user's friends array field on query.

module.exports = User;
