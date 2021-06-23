const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(postUser);

// /api/users/:userId
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;
