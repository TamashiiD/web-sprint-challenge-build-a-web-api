// add middlewares here related to actions
const Actions = require('./actions-model')

function logger(req, res, next) {
    // DO YOUR MAGIC 

    next()
  }
  
  async function validateUserId(req, res, next) {
try{
    const action = await Actions.get(req.params.id)
    if(!action){
        res.status(404).json({message: "no such project"})
    }
    else{
        req.action = action 
        next()
    }
}
catch(err){
    res.status(500).json({message:'no such project'})
}
  }
  
  function validateUser(req, res, next) {
    // DO YOUR MAGIC 
    const {notes, description, completed, project_id} = req.body 

    if (!notes) {
        res.status(400).json({ message: 'must include project notes' })
    }
    else {
        req.body = {"completed": completed, "description": description, "notes" : notes, "project_id": project_id}
        next()
    }
    
  }
  
  function validatePost(req, res, next) {
    // DO YOUR MAGIC 
    const {notes, description, completed, project_id} = req.body 

    if (!notes || !description || !completed || !project_id) {
        res.status(400).json({ message: 'the request body is missing name, description or completed' })
    }
    else {
        req.body = {"completed": completed, "description": description, "notes" : notes, "project_id": project_id}
        next()
    }
  
  }
  
  // do not forget to expose these functions to other modules
  module.exports = {
    logger, validateUserId, validateUser, validatePost
  }
  
  