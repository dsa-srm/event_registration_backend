// Import the JSON data containing user_club and user_event information
const clubData = require("./clubData.json"); // Replace with the actual path to your JSON data

function generateRandomName() {
	// Generate a random name (you can replace this logic with any random string generation method)
	const randomString = Math.random().toString(36).substring(7);
	return randomString;
}

function generateRandomPhoneNumber() {
	const randomNumber = Math.floor(Math.random() * 10000000000); // 10-digit number
	return `1${String(randomNumber).padStart(9, "0")}`; // Ensure it starts with '1'
}

function generateRandomDepartment() {
	const departments = [
		"Computer Science",
		"Engineering",
		"Mathematics",
		"Physics",
		"Biology",
	];
	return departments[Math.floor(Math.random() * departments.length)];
}

function generateRandomYear() {
	return Math.floor(Math.random() * 4) + 1; // Year 1 to 4
}

module.exports = {
	generateRandomBody: function (requestParams, context, ee, next) {
		const name = generateRandomName();
		const phone = generateRandomPhoneNumber();
		const reg = `RA${String(
			Math.floor(Math.random() * 10000000000000)
		).padStart(13, "0")}`;
		const email = `${name.toLowerCase()}@example.com`;
		const department = generateRandomDepartment();
		const year = generateRandomYear();

		// Randomly select a club and an event from the predefined JSON data
		const randomClub = clubData[Math.floor(Math.random() * clubData.length)];
		const randomEvent =
			randomClub.user_events[
				Math.floor(Math.random() * randomClub.user_events.length)
			];

		let data = {
			name: name,
			phone: phone,
			reg: reg,
			email: email,
			department: department,
			year: year,
			user_club: randomClub.club_id,
			user_event: randomEvent,
		};
		context.vars["data"] = data;
		return next();
	},
};
