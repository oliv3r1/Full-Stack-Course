const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to the database and check the connection
mongoose.connect(config.database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
	console.log(`Connected to the database: ${config.database}`);
});
mongoose.connection.on('error', (err) => {
	console.log(`Database error: ${err}`);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//Middleware
app.use(cors());
app.use(express.json()); //Body-parser is builtin on express v.4.16->
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

//Server start
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
