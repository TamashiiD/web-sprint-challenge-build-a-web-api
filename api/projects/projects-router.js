// Write your "projects" router here!
const router = require('express').Router()
const projectsModel = require('./projects-model')
const projectsMiddleware = require('./projects-middleware')


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


// router.get('/:id',  async (req, res) => {
// try{
// // solution for mod 3 project how to make middleware and link to the router 
// }
// catch(err){
//         res.status(500).json({
//             message: 'BIG ERROR',
//             err: err.message,
//             stack: err.stack,
//            })
// }
// }



module.exports = router
