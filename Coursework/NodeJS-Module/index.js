const http = require('http');
const path = require('path');
const fs = require('fs');

// const server = http.createServer((req, res) => {
// 	//Homepage
// 	if (req.url == '/') {
// 		//Read html file from public folder
// 		fs.readFile(
// 			path.join(__dirname, 'public', 'index.html'),
// 			(err, content) => {
// 				if (err) throw err;

// 				//Status 200, content type html
// 				res.statusCode = 200;
// 				res.setHeader('Content-Type', 'text/html');

// 				//res.writeHeader(200, { 'Content-Type': 'text/hmtl' }); NOT WORKING
// 				res.end(content);
// 			}
// 		);
// 	}

// 	if (req.url == '/api/users') {
// 		const users = [
// 			{ name: 'Seppo Taala', age: 20 },
// 			{ name: 'John Doe', age: 50 },
// 		];
// 		//Status 200, content type html
// 		res.statusCode = 200;
// 		res.setHeader('Content-Type', 'application/json');
// 		res.end(JSON.stringify(users));
// 	}
// });

const server = http.createServer((req, res) => {
	//Build file path according to the requested url
	let filePath = path.join(
		__dirname,
		'public',
		req.url == '/' ? 'index.html' : req.url
	);

	//get the file extension
	let extname = path.extname(filePath);

	//Initial content type
	let contentType = 'text/html';

	//Check extension and set content type accordingly
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}

	//Read the file
	fs.readFile(filePath, (err, content) => {
		if (err) {
			//Error
			if (err.code == 'ENOENT') {
				//Page not found error, loads 404.html file
				fs.readFile(
					path.join(__dirname, 'public', '404.html'),
					(err, content) => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'text/html');
						res.end(content);
					}
				);
			} else {
				//Some other error
				res.statusCode = 500;
				res.end(`Error loading page: ${err.code}`);
			}
		} else {
			//Success, set status 200 and content type
			res.statusCode = 200;
			res.setHeader('Content-Type', contentType);
			res.end(content, 'utf-8');
		}
	});
});

//Looks for environment variable, if not found starts the server on port 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
