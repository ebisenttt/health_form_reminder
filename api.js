function getRandomWord() {
	const response = UrlFetchApp.fetch(
		'https://random-words-with-pronunciation.p.rapidapi.com/word',
		{
			method: 'GET',
			headers: {
				// API KEY
				'x-rapidapi-key': API_KEY,
				'x-rapidapi-host': 'random-words-with-pronunciation.p.rapidapi.com',
			},
		}
	);
	return JSON.parse(response)[0];
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getMath() {
	const num = getRandomInt(1000);
	const response = UrlFetchApp.fetch(
		`https://numbersapi.p.rapidapi.com/${num}/math?fragment=true&json=true`,
		{
			method: 'GET',
			headers: {
				// API KEY
				'x-rapidapi-key': API_KEY,
				'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
			},
		}
	);
	const json = JSON.parse(response);
	return json;
}
