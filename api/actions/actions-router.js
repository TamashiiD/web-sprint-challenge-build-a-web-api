// Write your "actions" router here!
const router = require('express').Router()
const Action = require('./actions-model')
const { validateUser, validateUserId, validatePost } = require('./actions-middlware')

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

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.action)
    })
    
router.delete('/:id', validateUserId, async (req, res)=> {
try{
const result = await Action.remove(req.params.id)
res.json(result)
}
catch(err){
    res.status(400).json({
        message: 'BIG ERROR',
        err: err.message,
        stack: err.stack,
       })
}
})

router.post('/' , validateUser , (req, res)=> {
   Action.insert(req.body)
.then(newaction => {
    res.status(201).json(newaction)
})
.catch(err=> {
    res.status(400).json({
        message: 'BIG ERROR',
        err: err.message,
        stack: err.stack,
       })
} )
})

module.exports = router 