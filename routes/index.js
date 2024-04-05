const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const albumRouter = require('./album.routes')

router.use('/user', userRouter)
router.use('/album', albumRouter)

module.exports = router