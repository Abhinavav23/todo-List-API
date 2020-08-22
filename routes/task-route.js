const express = require("express");
const Task = require("../model/task");
const router = new express.Router();
const auth = require("../authorization/auth");

router.post("/task", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    taskOwner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

router.get("/task", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ taskOwner: req.user._id });
    if (!tasks) {
      res.status(404).send();
    }
    res.status(200).send(tasks);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      taskOwner: req.user.id,
    });
    if (!task) {
      throw new Error('Invalid: Task not found')
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.patch('/task/:id', auth, async (req, res) => {
  try {
    let task = await Task.findOneAndUpdate({
      _id: req.params.id,
      taskOwner: req.user._id,
    }, {...req.body});
    
    await task.save();
    res.status(201).send("Update Successful");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete('/task/:id', auth, async(req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, taskOwner: req.user._id})
        res.status(200).send(task)
    } catch(e) {
        res.status(404).send(e.message)
    }
})
module.exports = router;
