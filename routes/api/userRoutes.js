const router = require('express').Router();
const {
getUsers,
getSingleUser,
addFriend,
createUser,
updateUser,
deleteUser,
deleteFriend,

} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(createUser)

router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;