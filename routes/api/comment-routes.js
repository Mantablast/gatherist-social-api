const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:userId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

// /api/users

// /api/users/:userId/friends/:friendId

// /api/thoughts

// /api/thoughts/:thoughtId/reactions
module.exports = router;
