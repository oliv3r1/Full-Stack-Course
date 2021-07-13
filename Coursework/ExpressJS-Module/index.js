const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/Logger');
const members = require('./Members');
const app = express();

//Initialize middleware, which is executed when a request is made
//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/', (req, res) =>
	res.render('index', {
		title: 'members app',
		members,
	})
);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API routes
app.use('/api/members', require('./routes/api/members'));

const port = process.env.post || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
