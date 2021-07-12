const express = require('express');
const path = require('path');
const logger = require('./middleware/Logger');
const app = express();

//Initialize middleware, which is executed when a request is made
//app.use(logger);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API routes
app.use('/api/members', require('./routes/api/members'));

const port = process.env.post || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
