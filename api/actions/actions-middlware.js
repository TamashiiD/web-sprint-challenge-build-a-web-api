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
    // req.body = {"notes" : notes , "description": description, "completed": completed, "project_id": project_id}

    next()
  }
  
  function validatePost(req, res, next) {
    // DO YOUR MAGIC 
    
    next()
  }
  
  // do not forget to expose these functions to other modules
  module.exports = {
    logger, validateUserId, validateUser, validatePost
  }
  
  