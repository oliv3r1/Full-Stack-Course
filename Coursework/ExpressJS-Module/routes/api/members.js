const express = require('express');
const router = express.Router();
const members = require('../../Members');

//gets all members
router.get('/', (req, res) => {
	res.json(members); //no need to stringify json
});

//get single member
router.get('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));
	if (found) {
		//array.filter iterates the whole array, which is not needed as the id should be unique
		res.json(members.filter((member) => member.id === parseInt(req.params.id)));
		//res.json(members.find((member) => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `Member ${req.params.id} not found` });
	}
});

module.exports = router;
