var config = require('./config');
var emailDir = './emails/';
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.gmail.email,
		pass: config.gmail.password
	}
});

var fs = require('fs');

// sends an html email - using the html stored in the given fileName
function emailCaller (fileName) {
	fs.readFile(fileName, function(error, data) {
		if (error) {
			console.error(error);
			return;
		}

		console.log("sending " + fileName);

		transporter.sendMail({
			from: config.gmail.email,
			to: config.recipientEmail,
			subject: fileName,
			html: data
		});
	});
}

// for every file in the email directory, send an email
fs.readdir(emailDir, function(err, fileNames) {
	if(err) throw err;

	fileNames.forEach(function(file) {
		// don't send files beginning with dot
		if (file.indexOf(".") === 0) {
			return;
		}

		emailCaller(emailDir + file);
	});
});
