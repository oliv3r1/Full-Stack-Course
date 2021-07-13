const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');

//gets all members (get request)
router.get('/', (req, res) => {
	res.json(members); //no need to stringify json
});

//get single member (get request)
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

//create a member (post request)
router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active',
	};

	//bad request if name/email is missing
	if (!newMember.name || !newMember.email) {
		res.status(400).json({ msg: 'Please enter name and email' });
	} else {
		members.push(newMember);
		res.json(members);
		//res.redirect('/');
	}
});

//update a member (put request)
router.put('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		const updateMember = req.body;
		members.forEach((member) => {
			if (member.id === parseInt(req.params.id)) {
				member.name = updateMember.name ? updateMember.name : member.name;
				member.email = updateMember.email ? updateMember.email : member.email;

				res.json({ msg: `Member ${req.params.id} updated`, member });
			}
		});
	} else {
		res.status(400).json({ msg: `Member ${req.params.id} not found` });
	}
});

//delete a member (delete request)
router.delete('/:id', (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));
	if (found) {
		res.json({
			msg: `Member ${req.params.id} deleted`,
			members: members.filter(
				(member) => member.id !== parseInt(req.params.id)
			),
		});
	} else {
		res.status(400).json({ msg: `Member ${req.params.id} not found` });
	}
});

module.exports = router;
