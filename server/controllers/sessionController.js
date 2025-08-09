const Session = require('../models/sessionModel');

// GET /sessions (public published sessions)
const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};

// GET /my-sessions (user's own sessions)
const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user.id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your sessions' });
  }
};

// GET /my-sessions/:id (single session of logged-in user)
const getSingleUserSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user.id
    });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session' });
  }
};

// POST /my-sessions/save-draft
const saveDraftSession = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  try {
    let session;
    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.user.id },
        { title, tags, json_file_url, status: 'draft' },
        { new: true }
      );
    } else {
      session = new Session({
        title,
        tags,
        json_file_url,
        status: 'draft',
        user_id: req.user.id
      });
      await session.save();
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error saving draft' });
  }
};

// POST /my-sessions/publish
const publishSession = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  try {
    let session;
    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.user.id },
        { title, tags, json_file_url, status: 'published' },
        { new: true }
      );
    } else {
      session = new Session({
        title,
        tags,
        json_file_url,
        status: 'published',
        user_id: req.user.id
      });
      await session.save();
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error publishing session' });
  }
};

module.exports = {
  getPublicSessions,
  getUserSessions,
  getSingleUserSession,
  saveDraftSession,
  publishSession
};
