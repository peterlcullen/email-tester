var emailDir = './emails/',
	prompt = require('prompt'),
	nodemailer = require('nodemailer'),
	fs = require('fs'),
	promptSchema = {
		properties: {
			emailFrom: {
				description: 'Enter your gmail address to use to send the email(s)',
				required: true
			},
			password: {
				description: 'Enter your gmail password',
				hidden: true
			},
			emailTo: {
				description: 'Enter the email address to recieve the email(s)',
				required: true
			}
		}
	},
	config = {},
	transporter = {};

// prompt the user for configuration information
prompt.start();
prompt.get(promptSchema, function (err, result) {
	if(err) throw err;

	config = {
		"gmail": {
			"email": result.emailFrom,
			"password": result.password
		},
		"recipientEmail": result.emailTo
	};

	transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.gmail.email,
			pass: config.gmail.password
		}
	});

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
});

// sends an html email - using the html stored in the given fileName
var emailCaller = function (fileName) {
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
};