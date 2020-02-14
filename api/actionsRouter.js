const express = require('express')
const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

//get all actions
router.get('/', (req, res)=>{
    Actions.get()
        .then(actions => res.status(200).json(actions))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

//get action by it's own id
router.get('/:id', validateActionId, (req, res)=>{
    Actions.get(req.params.id)
        .then(actions => res.status(200).json(actions))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

//get all actions for a specific project
router.get('/all/:id', validateProjectId, (req,res)=>{
    Projects.getProjectActions(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})


//post an action to a specific project
router.post('/:id', validateProjectId, validateAction, (req, res)=>{
    const body = req.body;
    body.project_id = req.params.id;
    Actions.insert(body)
        .then(action=>res.status(200).json(action))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})


//edit a specific action, inputting the action id
router.put('/:id', validateActionId, validateAction, (req, res) => {
    const body = req.body;
    console.log('where is the body', body);
    Actions.update(req.params.id, body)
        .then(project=> res.status(200).json(project))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

//deletes action with a specific id
router.delete('/:id', validateActionId, (req, res)=>{
    Actions.remove(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
})





//does a project with that id exist?
function validateProjectId (req, res, next){
    Projects.get(req.params.id)
        .then(project => {
            project ? next() : res.status(404).json({message: 'project with that id does not exist'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'there was an error validating the project id'})
        })
}

//does an action with that id exist?
function validateActionId (req, res, next){
    Actions.get(req.params.id)
        .then(action => {
            action ? next() : res.status(404).json({message: 'action with that id does not exist'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'there was an error validating the action id'})
        })
}

//action must have a project_id, description (up to 128 characters long), and notes
function validateAction (req, res, next) {
    const keys = Object.keys(req.body);
    if(keys.length === 0){
        res.status(400).json({message: 'need to have an action'})
    }
    if (!req.body.notes || !req.body.description){
        res.status(400).json({message: 'action must include notes and a description'})
    }
    if (req.body.description.length > 128){
        console.log('too long');
        res.status(400).json({message: 'description must be less than 128 characters'})
    }
    next();
}




module.exports = router;