// Write your "actions" router here!
const router = require('express').Router()
const Action = require('./actions-model')
const actionMiddleware = require('./actions-middlware')

router.get( '/' , (req, res)=> {
    Action.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({
            message: 'BIG ERROR',
            err: err.message,
            stack: err.stack,
           })
        })
})




module.exports = router 