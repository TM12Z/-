const Router = require('express')
const userController = require('../controller/user.controller')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', (req,res)=>{
    res.json({message:'working'})
})


// router.put('/user', userController.update)
// router.delete('/user/:id', userController.deleteUser)

module.exports = router