const Router = require('express')
const tagController = require('../controller/tag.controller')

const router = new Router()

router.post('/create', tagController.create)
router.get('/read', tagController.read)
router.post('/delete', tagController.delete)
router.post('/update', tagController.update)

module.exports = router