const Router = require('express')
const photoController = require('../controller/photo.controller')

const fileMiddleware = require('../file.js')
const authMiddlewaree = require("../middlewaree/authMiddlewaree");

const router = new Router()

router.post('/create', authMiddlewaree, fileMiddleware.single('image'), photoController.create)
router.post('/delete', photoController.delete) // 10.04
router.get('/read', photoController.read) // 12.04
router.get('/check', (req,res)=>{
    res.json({message:'working'})
})

module.exports = router