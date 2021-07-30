const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Note = require('../models/note');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Create a note
router.post('/post', (req, res, next) => {
	let newNote = new Note({
		username: req.body.username,
		date: req.body.date,
		note: req.body.note,
	});

	Note.addNote(newNote, (err) => {
		if (err) {
			res.json({ success: false, msg: `Failed to add a note:${err}` });
		} else {
			res.json({ success: true, msg: 'Note added.' });
		}
	});
});

//Get an array of user notes
router.post('/fetch', (req, res, next) => {
	const username = req.body.username;
	Note.getNotesByUsername(username, (err, note) => {
		if (err) throw err;
		if (!note) {
			return res.json({ success: false, msg: `Notes not found:${err}` });
		} else {
			return res.json({ succes: true, notes: note });
		}
	});
});

module.exports = router;
