const { Thought, User } = require('../models');

const commentController = {
    // retrieve all user comment inputs
    getAllComments(req, res) {
        //mongoose find all
        Thought.find({})
            //populate from all collections
            .populate({
                path: "thought",
                select: "-__v",
            })

            .populate({
                path: "reaction",
                select: "-__v",
            })

            //version keys
            .select("-__v")
            .then((userCommentGet) => res.json(userCommentGet))
            .catch((err) => {
                console.log(err);
                res.status(500).json("Something went wrong." + err);
            });
    },

    getCommentById({ params }, res) {
        //mongoose find one
        Thought.findOne({ _id: params.id })

            .then((userCommentGet) => {
                // if no thought is found
                if (!userCommentGet) {
                    res.status(404).json({ message: "No user comments with this id." });
                    return;
                }
                res.json(userCommentGet);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json("Something went wrong." + err);
            });
    },

    //update comments / thoughts by id 
    updateComment({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((userUpdateComment) => {
                if (!userUpdateComment) {
                    res.status(404).json({ message: "No user comments with this id." });
                    return;
                }
                res.json(userUpdateComment);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json("Something went wrong." + err);
            });
    },

    //generating new comment
    createComment({ body }, res) {
        Thought.create(body)
            .then((userCommentCreate) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thought: thought._id } },
                    //becomes newest array
                    { new: true }
                );
            })

            .then((userCommentCreate) => {
                if (!userCommentCreate) {
                    res.status(404).json({ message: "No user comments with this id." });
                    return;
                }
                res.json(userCommentCreate);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json("Something went wrong." + err);
            });
    },
    // delete thoughts
    userThoughtDelete({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((userCommentGet) => {
                if (!userCommentGet) {
                    res.status(404).json({ message: "No user comments with this id." });
                    return;
                }
                res.json(userCommentGet);
            })

            .catch((err) => {
                console.log(err);
                res.status(500).json("Something went wrong." + err);
            });
    },

    //add reaction api's here
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
            .then(({ _id }) => {
                return Reaction.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reaction: _id } },
                    { new: true }
                );
            })

            .then(reactionData => {
                if (!reactionData) {
                    res.status(404).json({ message: 'No thought id found!' });
                    return;
                }
                res.json(reactionData);
            })
            .catch(err => res.json(err));
    },

    // remove 
    removeReaction({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(reactionData => {

                if (!reactionData) {
                    return res.status(404).json({ message: 'No thought id found!' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { comments: params.thoughtId } },
                    { new: true }
                );
            })

            .then(reactionData => {
                if (!reactionData) {
                    res.status(404).json({ message: 'No reaction data found!' });
                    return;
                }
                res.json(reactionData);
            })
            .catch(err => res.json(err));
    }

}





module.exports = commentController;