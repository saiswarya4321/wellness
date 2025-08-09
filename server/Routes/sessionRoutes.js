const express = require('express');
const session_router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getPublicSessions,
  getUserSessions,
  getSingleUserSession,
  saveDraftSession,
  publishSession
} = require('../controllers/sessionController');

// Public sessions
session_router.get('/sessions', getPublicSessions);

// User's sessions (draft + published)
session_router.get('/my-sessions', authenticateToken, getUserSessions);

// View single session
session_router.get('/my-sessions/:id', authenticateToken, getSingleUserSession);

// Save or update draft
session_router.post('/my-sessions/save-draft', authenticateToken, saveDraftSession);

// Publish session
session_router.post('/my-sessions/publish', authenticateToken, publishSession);

module.exports = session_router;
