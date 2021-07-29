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
		creator: req.body.creator,
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

//Get user notes
router.get('/fetch', (req, res, next) => {
	const creator = req.body.creator;

	Note.getNotesByUsername(creator, (err, note) => {
		if (err) throw err;
		if (!note) {
			return res.json({ success: false, msg: `Notes not found:${err}` });
		} else {
			return res.json({ succes: true, msg: `Notes: ${note}` });
		}
	});
});

module.exports = router;
