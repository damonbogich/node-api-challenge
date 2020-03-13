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

//get actions by projectid

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

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body;

    actionHubs.update(id, action)
    .then(edited => {
        if(!action) {
            res.status(400).json({err: "please enter action"})
        } else if(!action.project_id || !action.description || !action.notes){
            res.status(400).json({err: "please add all required fields"})
        } else {
            res.status(201).json(action);
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "server error"})
    })
})

//delete an action:

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    actionHubs.remove(id)
    .then(deleted => {
        if(!deleted) {
            res.status(400).json({err: "action with that id does not exist"})
        } else {
            res.status(200).json(deleted)
        }
    })
    .catch(err => {
        res.status(500).json({err: "server error"})
    })
})




module.exports = router;