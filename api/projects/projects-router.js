// Write your "projects" router here!
const router = require('express').Router()
const projectsModel = require('./projects-model')
const {validateActions, validateUser, validateUserId, validatePost } = require('./projects-middleware')


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
projectsModel.insert(req.body)
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
// SOMETHING WRONG WITH THIS, IT WORKS IN ACTIONS BUT DOESNT WORK IN PROJECTS
router.put('/:id', validatePost, validateUserId, (req, res)=> {
    projectsModel.update(req.params.id, req.body)
   .then(updateproject=> {
     res.status(200).json(updateproject)
   })
   .catch(err=> {
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
//HAVE NO IDEA WHAT IM DOING HERE JUST THREW THIS TOGETHER NEED HELP!
router.get('/:id/actions', validateUserId, (req, res)=>{
projectsModel.getProjectActions(req.params.id)
.then(actions=>{
    res.json(actions)
})
.catch(err=>{console.log(err)})
})



// router.get('/:id/actions', validateUserId, (req, res)=> {
//     res.json(req.action)
// }
// )
module.exports = router
