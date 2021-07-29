const mongoose = require('mongoose');
const config = require('../config/database');

//note schema
const NoteSchema = mongoose.Schema({
	//creator equals username
	creator: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
		required: true,
	},
	note: {
		type: String,
		required: true,
	},
});

const Note = (module.exports = mongoose.model('Note', NoteSchema));

//Query notes made by the user
module.exports.getNotesByUsername = function (creator, callback) {
	const query = { creator: creator };
	Note.find(query, callback);
};

//Add a new note
module.exports.addNote = function (newNote, callback) {
	newNote.save(callback);
};
