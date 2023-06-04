// Write your "projects" router here!
const router = require('express').Router()
const projectsModel = require('./projects-model')
const { validateUser, validateUserId, validatePost } = require('./projects-middleware')


router.get( '/' , (req, res)=> {
    projectsModel.get()
    .then(projects => {
        res.status(200).json(projects)
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
res.json(req.project)
})

router.post('/', validateUser, (req, res)=>{
projectsModel.insert({name: req.projects})
.then(newproject => {
    res.status(201).json(newproject)
})
.catch(err=> {
    res.status(400).json({
        message: 'BIG ERROR',
        err: err.message,
        stack: err.stack,
       })
})
})

router.put('./:id' ,validateUser, validateUserId, (req, res)=> {
projectsModel.update(req.projects)
.then( edit => {
      res.status(200).json(edit)
})
.catch(err=>{
    res.status(400).json({
        message: 'BIG ERROR',
        err: err.message,
        stack: err.stack,
       })
})
})

router.delete('/:id', validateUserId, async (req, res) =>{
try{
const result = await projectsModel.remove(req.params.id)
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

module.exports = router
