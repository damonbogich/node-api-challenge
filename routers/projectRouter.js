const express = require('express');

const actionHubs = require('../data/helpers/actionModel');
const projectHubs = require('../data/helpers/projectModel');

const router = express.Router();

//1. post project
router.post("/", (req, res) => {
    const newProject = req.body;
    projectHubs.insert(newProject)
    .then(project => {
        if(!project) {
            res.status(400).json({message: "please provide new project"})
        } else if (!project.name || !project.description){
            res.status(400).json({message: "please provide both project name and description"})
        } 
        else {
            res.status(201).json(project)
        }
    })
})

//2. get projects
router.get('/', (req, res) => {
    projectHubs.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({err: "server error getting projects"})
    })
})

//3. get projects by id: 
router.get('/:id', (req, res) => {
    const {id} = req.params;

    projectHubs.get(id)
    .then(proj => {
        if (proj.id != id) {
            res.status(400).json({message: "project with given id does not exist"})
        } else {
            res.status(200).json(proj)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "server error getting project"})
    })
})

//4. edit project

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const proj = req.body;

    projectHubs.update(id, proj)
    .then(updated => {
        if(!updated) {
            res.status(400).json({message: "please add info to your request"})
        } else if (!proj.name || !proj.description) {
            res.status(400).json({message: "please add name and description"})
        } else {
            res.status(200).json(proj)
        }
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "server error"})
    })


})

// delete project by id
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    projectHubs.remove(id)
    .then(deleted => {
        if(deleted.id === !id){
            res.status(400).json({err: "project with that id doesnn't exist"})
        } else {
            res.status(200).json(deleted)
        }
    })
    .catch(err => {
        res.status(500).json({err: "server err"})
    })
})

//get project actions:
router.get('/:id/actions', (req, res) => {
    const {id} = req.params;

    projectHubs.getProjectActions(id)
    .then(actions => {
        if(Object.keys(actions).length === 0) {
            res.status(400).json({message: "no actions there"})
        } else {
            res.status(200).json(actions)
        }
    })
    .catch(err => {
        res.status(500).json({err: "server error"})
    })
})




module.exports = router;