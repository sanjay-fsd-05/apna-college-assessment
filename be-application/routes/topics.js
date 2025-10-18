const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");
const Student = require("../models/Student");
const { authorization } = require("../authorization/auth");

router.post("/addTopic", async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.status(201).json(topic);
  } catch (e) {
    res.status(401).send({ message: e.mesage });
  }
});

router.get("/:studentId", authorization, async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate(
      "enrolledTopics.topicId"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student.enrolledTopics);
  } catch (e) {
    res.status(401).send({ message: e.mesage });
  }
});

router.put("/:studentId/:topicId", authorization, async (req, res) => {
  try {
    const { studentId, topicId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    const topicEntry = student.enrolledTopics.find(
      t => t.topicId.toString() === topicId
    );
    if (!topicEntry) return res.status(404).json({ message: "Topic not found" });
    topicEntry.status = topicEntry.status === "Pending" ? "Done" : "Pending"
    await student.save()
    res.send(topicEntry)
  } catch (e) {
    res.status(401).send({ message: e.mesage });
  }
});

router.get('/progress/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const topics = await Student.findById(studentId).populate(
      "enrolledTopics.topicId"
    );

    if (!topics.enrolledTopics.length) return res.json({ message: "No topics found" });

    const levelCounts = { Easy: 0, Medium: 0, Hard: 0 };
    const levelDone = { Easy: 0, Medium: 0, Hard: 0 };

    topics.enrolledTopics.forEach(t => {
      const level = t.topicId.level;
      if (levelCounts[level] !== undefined) {
        levelCounts[level]++;
        if (t.status === 'Done') levelDone[level]++;
      }
    });

    const result = {};
    for (let level in levelCounts) {
      const percent = levelCounts[level] === 0 ? 0 : (levelDone[level] / levelCounts[level]) * 100;
      result[level] = `${percent.toFixed(0)}%`;
    }

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
