const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const albumRouter = require('./album.routes')
const photoRouter = require('./photo.routes')
const tagRouter = require('./tag.routes')

router.use('/user', userRouter)
router.use('/album', albumRouter)
router.use('/photo', photoRouter)
router.use('/tag', tagRouter)

module.exports = router