const express = require('express');
const router = express.Router();
const { Runner, runnerValidationSchema } = require('../models/Runner');


router.post('/runner/save', async (req, res) => {
  try {
    const runnerCount = await Runner.countDocuments();
    const { error } = runnerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newRunner = new Runner({
      runnerId: runnerCount + 1,
      ...req.body
    });
    await newRunner.save();
    return res.status(200).json({
      success: "Runner Saved Successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
router.get('/runner/all', async (req, res) => {
  try {
    const runners = await Runner.find();
    return res.status(200).json(runners);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

router.get('/runners/search', async (req, res) => {
  try {
    const searchQuery = {};
    const queryParameters = [
      'runnerName',
      'radius',
      'speed',
      'runnerId',
      'startTime',
      'duration',
      'endTime',
      'numberOfLaps'
    ];
  
    queryParameters.forEach(param => {
      if (req.query[param]) {
        searchQuery[param] = req.query[param];
      }
    });
  
    const runners = await Runner.find(searchQuery);
  
    res.json(runners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  
});

router.delete('/runner/:runnerId', async (req, res) => {
  try {
    const deletedRunner = await Runner.deleteOne({ runnerId: req.params.runnerId });
    if (deletedRunner.deletedCount === 0) {
      return res.status(404).json({ error: "Runner not found" });
    }
    return res.status(200).json({ success: "Runner deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
router.put('/runner/:runnerId', async (req, res) => {
  console.log(req)
  try {
    const { error } = runnerValidationSchema.validate(req.body);
    console.log("er" + error)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const runner = await Runner.findOne({ runnerId: req.params.runnerId });
    if (!runner) {
      return res.status(404).json({ error: "Runner not found" });
    }
    runner.set(req.body);
    await runner.save();
    return res.status(200).json({
      success: "Runner updated successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
module.exports = router;