const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

//create a new task
router.post('/', async (req, res) => {
    try {
        const {title, description, dueDate, completed} = req.body;

        if( !title || !description || !dueDate ) {
            return res.status(400).json({ message: "Title, description, and due date are required" })
        }

        const task = new Task({title, description, dueDate, completed});
        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        console.error("Error creating task", error);
        res.status(500).json({ message: "Error creating task", error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(201).json({ message: "Task received successfully", tasks });
    }
    catch (error) {
        res.status(500).json({ message: "Error receiving the task ", error: error.message})
    }
})

module.exports = router;