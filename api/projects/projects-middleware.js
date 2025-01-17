// add middlewares here related to projects
const Projects = require('./projects-model')
// validate project id making sure the project id exist (use params to get the id from the url)
function logger(req, res, next) {
    // DO YOUR MAGIC 
    next()
}

async function validateUserId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: "no such project" })
        }
        else {
            req.project = project
            console.log('VALIDATED')
            next()
        }
    }
    catch (err) {
        res.status(500).json({ message: 'no such project' })
    }
}

function validateUser(req, res, next) {
    // DO YOUR MAGIC 
    const { name, description, completed } = req.body
    if (!name || !description || completed=== undefined) {
        res.status(400).json({ message: 'MISSING SOMETHING' })
    }
    else {
        req.body = { "name": name, "description": description, "completed": completed }
        next()
    }

}

function validatePost(req, res, next) {
    const { name, description, completed } = req.body

    if (completed === undefined || !description || !name) {
        
        res.status(400).json({ message: "missing Something" })

        // "completed": false,
        // "description": "Lady Gaga",
        // "name": "a"
    }
    else { 
        req.body = {
            "completed": completed,
            "description": description,
            "name": name,
        }
       next()
    } 

}

function validateActions (req, res, next){
    // i need to validate the id for the user , then check if there is an actions array. if not return empty array. if there is, return the actions array. 
console.log("ACTIONS ---> " , req.body.actions)
  const {actions} = req.body
  if(actions === [] ){
    actions = []
    next()
  }
  else{
   actions = [actions]
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
    logger, validateUserId, validateUser, validatePost, validateActions
}

