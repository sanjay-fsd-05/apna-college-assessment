const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  mainTopic: {
    type: String,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
  },
  leetcodeLink: {
    type: String,
    required: false,
  },
  youtubeLink: {
    type: String,
    required: false,
  },
  articleLink: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
