const Router = require('express')
const userController = require('../controller/user.controller')
const fileMiddleware = require("../file")
const authMiddlewaree = require("../middlewaree/authMiddlewaree")

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check', userController.check)
router.patch('/refUser', authMiddlewaree, fileMiddleware.single('image'), userController.refUser)
router.get('/readUser', authMiddlewaree, userController.readUser)


// router.put('/user', userController.update)
// router.delete('/user/:id', userController.deleteUser)

module.exports = router