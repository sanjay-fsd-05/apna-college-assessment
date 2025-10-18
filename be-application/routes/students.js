const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Topic = require("../models/Topic");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const allTopics = await Topic.find();
    const enrolledTopics = allTopics.map((topic) => ({
      topicId: topic._id,
      status: "Pending",
    }));

    const student = new Student({
      fullName,
      email,
      password: hashedPassword,
      enrolledTopics,
    });
    await student.save();
    res
      .status(201)
      .json({
        message: "Signup successful. All topics assigned.",
        studentId: student._id,
      });
  } catch (e) {
    res.status(401).send({ message: e.mesage });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isStudentExist = await Student.findOne({ email });
  try {
    if (isStudentExist === null) {
      res.status(401).send({ message: "Student not Exists, Kindly Register" });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        isStudentExist.password
      );
      if (isPasswordMatched) {
        const payload = { email };
        let jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
        res
          .status(200)
          .send({
            studentId: isStudentExist._id,
            fullName: isStudentExist.fullName,
            email: isStudentExist.email,
            token: jwtToken,
          });
      } else {
        res.status(401).send({ message: "Incorrect Password" });
      }
    }
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
