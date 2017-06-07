const express = require('express');
const app = express();
const Twit = require('twit');
const fs = require('fs');

const T = new Twit({
	consumer_key: 'efDOtt2mIZUczcJczyjBXG6Z2',
	consumer_secret: 'ZnDXuCEh1s9FMkbeiAFmDA2lRAifh4VpuNs5T1DvFw7sIiNdRz',
	access_token: '855904078408204288-cFGwxtMCwE2Snv7GM0nKzQnjNJPEWJG',
	access_token_secret: 'Wuilg0wUzSBxOiTorxqNpAYsdA0BuhroB6vGwwwztEtPN',
})

function randomCap(word) {
	return word.split('').reduce((all, item, index) => {
		if (index === 0) item = item.toLowerCase();
		if (index % 3 === 0 || index % 5 === 0) item = item.toUpperCase();

		return all += item;
	}, '');
}

lastTweet = {};
//DT ID: 25073877
//Jordan ID: 1000761270

setInterval(() => {
	T.get('statuses/user_timeline', { user_id: 25073877, count: 1 }, (err, data0, response) => {
		if (err) console.log(err);

		if (data0[0].id !== lastTweet.id) {
			let newText = '@' + data0[0].user.screen_name + ' ' + randomCap(data0[0].text);
			let b64content = fs.readFileSync('/Users/jordanb/Desktop/projects/trumpbobmockpants/media/trumpBot.png', { encoding: 'base64' })

			T.post('media/upload', { media_data: b64content }, function (err, data, response) {

				let mediaIdStr = data.media_id_string
				let altText = 'SpongeBob MockPants'
				let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

				T.post('media/metadata/create', meta_params, function (err, data, response) {
					if (!err) {
						let params = { status: newText, in_reply_to_status_id: data0[0].id_str, media_ids: [mediaIdStr] }

						T.post('statuses/update', params, function (err, data, response) {
							console.log('replied to Text: ', data);
						})
					}
				})
			})

			lastTweet = data0[0];
		}
	})
}, 1000 * 10);


app.listen(3000, () => console.log('connected to server 3000'));
