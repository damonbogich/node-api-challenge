const express = require('express');

const actionHubs = require('../data/helpers/actionModel');
const projectHubs = require('../data/helpers/projectModel');

const router = express.Router();

router.post('/', (req, res) => {
    const action = req.body;

    actionHubs.insert(action)
    .then(act => {
        if(!action.project_id || !action.description || !action.notes){
            res.status(400).json({err: "please add all required fields"})
        } else if(!action) {
            res.status(400).json({err: "please put action"})
        } else {
            res.status(201).json(action)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "server error"})
    })
})

//get actions by id

router.get('/:id', (req, res) => {
    const {id} = req.params;

    actionHubs.get(id)
    .then(act => {
        if(!act) {
            res.status(400).json({message: "no actions for given project"})
        } else {
            res.status(200).json(act)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "server error"})
    })
})

//edit action by id:

router.put("/:id", (req, res) => {
    const change = req.body
    const {id} = req.params

    actionHubs.get(id)
    .then(action => {
        if(!action){
            res.status(400).json({message: "action with that id does not exist"})
        } else if(!change){
            res.status(400).json({message: "please enter in the changes you'd like to make"})
        } else if(!action.project_id || !action.description || !action.notes){
            res.status(400).json({message: "please enter all required action fields"})
        }
        else {
            actionHubs.update(id, change)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "error updating"})
            })
        }
})
.catch(err => {
    console.log(err)
    res.status(500).json({message: "server error"})
})
})

//delete an action:

router.delete("/:id", (req, res) => {
    const {id} = req.params

    actionHubs.get(id)
    .then(action => {
        if(!action){
            res.status(400).json({message: "action with that id does not exist"})
        } 
        else {
            actionHubs.remove(id)
            .then(deletedAction => {
                res.status(200).json(deletedAction)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "server error deleting action"})
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "server error finding the action you want to delete"})
    })
})




module.exports = router;