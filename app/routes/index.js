'use strict';

var path = process.cwd();

module.exports = function (app) {
		app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	
	app.route('/*')
		.get(function (req, res) {
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];

			/*determine if date, if so, create date obj*/
			var date;
			var sent;
			var unix;
			var natural;
			var given = req.path;
			given = given.slice(1, given.length);

			given  = given.replace(/%20/g, " ");

			if(given.match(/^[0-9]+$/)){
				unix = given;
				date = new Date(parseInt(given)*1000);
				natural = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
			}
			else if (new Date(given) !== "Invalid Date" && !isNaN(new Date(given))){
				date = new Date(given);
				unix = date.getTime() / 1000;
				natural = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
			}
			else{
				unix = "null";
				natural = "null";
			}

			sent = "{\"unix\": " + unix + ", \"natural\": " + natural + "}";
			

			
			res.send(sent);
		});




};
