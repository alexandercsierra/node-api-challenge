const express = require('express')
const router = express.Router();

const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res)=>{
    Projects.get()
        .then(projects => res.status(200).json(projects))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.get('/:id', validateProjectId, (req,res)=>{
    Projects.get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.post('/', validateProject, (req, res)=>{
    Projects.insert(req.body)
        .then(project=>res.status(200).json(project))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project=> res.status(200).json(project))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'})
        })
})

router.delete('/:id', validateProjectId, (req, res)=>{
    Projects.remove(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
})



//project must have a name and description


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

function validateProject (req, res, next) {
    const keys = Object.keys(req.body);
    if(keys.length === 0){
        res.status(400).json({message: 'need to have a project'})
    }
    if (!req.body.name || !req.body.description){
        res.status(400).json({message: 'project must include a name and description'})
    }
    next();
}




module.exports = router;