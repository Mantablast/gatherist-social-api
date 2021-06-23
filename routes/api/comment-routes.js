const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// // /api/comments/<userId>
// router.route('/:userId').post(addComment);

// // /api/comments/<userId>/<commentId>
// router.route('/:userId/:commentId').delete(removeComment);

// /api/users

// /api/users/:userId/friends/:friendId

// /api/thoughts

// /api/thoughts/:thoughtId/reactions
module.exports = router;
