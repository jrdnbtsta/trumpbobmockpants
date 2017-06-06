const express = require('express');
const app = express();
const Twit = require('twit');

const T = new Twit({
	consumer_key: 'efDOtt2mIZUczcJczyjBXG6Z2',
	consumer_secret: 'ZnDXuCEh1s9FMkbeiAFmDA2lRAifh4VpuNs5T1DvFw7sIiNdRz',
	access_token: '855904078408204288-cFGwxtMCwE2Snv7GM0nKzQnjNJPEWJG',
	access_token_secret: 'Wuilg0wUzSBxOiTorxqNpAYsdA0BuhroB6vGwwwztEtPN',
})

lastTweet = {};

function randomCap(word) {
	return word.split('').reduce((all, item, index) => {

	});
}
T.get('statuses/user_timeline', { user_id: 25073877, count: 1 }, (err, data, response) => {
	if (err) console.log(err);

	if (data[0].id !== lastTweet.id) {

		T.post('statuses/update', { status: '' }, (err, data, response) => {
			console.log('posted tweet');
		})

		lastTweet = data[0];
	}

	// console.log('DATA: ', data);
})

app.listen(3000, () => console.log('connected to server 3000'));
