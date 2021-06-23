// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }
//enable user and populate the relevant info to display from database
//using populate() to reference docs in other collections
const { populate } = require("../models/User");
const { User } = require("../models");

// /api/users
const userCrud = {
  //retrieve all users
  //get all users
  getAllUsers(req, res) {
    //call to User model
    User.find({})
      //access all collections
      .populate({
        //followed closely to pizza hunt lesson
        path: "Thought",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userGetData) => res.json(userGetData))
      .catch((err) => {
        console.log(err);
        res.status(500).json("Something went wrong." + err);
      });
  },
  //get user by Id , also populate thought and friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      //access all collections
      .populate({
        path: "Thought",
        select: "-__v",
      })
      //version key
      .select("-__v")
      .then((userGetData) => {
        // If user doesn't exist in db
        if (!userGetData) {
          res.status(404).json({ message: "No user found!" });
          return;
        }
        res.json(userGetData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Something went wrong." + err);
      });
  },
  //create a new user
  postUser({ body }, res) {
    User.create(body)
      .then((postUser) => res.json(postUser))
      .catch((err) => {
        console.log(err);
        res.status(500).json("Something went wrong." + err);
      });
  },
  //update a user by Id //PUT
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userUpdate) => {
        if (!userUpdate) {
          res.status(404).json({ message: "No user found." });
          return;
        }
        res.json(userUpdate);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Something went wrong." + err);
      });
  },
  //delete a user by the userId
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userDelete) => res.json(userDelete))
      .catch((err) => {
        console.log(err);
        res.status(500).json("Something went wrong." + err);
      });
  },
};

//export it for use!
module.exports = userCrud;
