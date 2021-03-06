const router = require('express').Router();
const {
    getAllComments,
    getCommentById,
    updateComment,
    createComment,
    userThoughtDelete,
    addReaction,
    removeReaction

    //figure out reaction apis and functions
  } = require('../../controllers/comment-controller');
  
  // /api/comments
  router
    .route('/')
    .get(getAllComments)
    .post(createComment);
  
  // /api/users/:userId
  router
    .route('/:id')
    .get(getCommentById)
    .put(updateComment)
    .delete(userThoughtDelete)
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
