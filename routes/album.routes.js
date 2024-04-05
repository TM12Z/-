const Router = require('express')
const albumController = require('../controller/album.controller')

const router = new Router()

router.post('/create', albumController.create)
router.post('/delete', albumController.delete)
router.post('/update', albumController.update)

module.exports = router