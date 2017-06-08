const express = require('express');
const app = express();
const Twit = require('twit');
const fs = require('fs');
const keys = require('./accessKeys.js');
const T = new Twit(keys);

//function that takes a string, capitalizes every third and fifth letter
function randomCap(word) {
	return word.split('').reduce((all, item, index) => {
		if (index === 0) item = item.toLowerCase();
		if (index % 3 === 0 || index % 7 === 0) item = item.toUpperCase();

		return all += item;
	}, '');
}

lastTweet = {};

//interval GET req to check last tweets. o0nce a min because of twitter's API rate limit
setInterval(() => {
	T.get('statuses/user_timeline', { user_id: 25073877, count: 1 }, (err, data0, response) => {
		if (err) console.log(err);

		//if there's a new tweet ...
		if (data0[0].id !== lastTweet.id) {
			let newText = '@' + data0[0].user.screen_name + ' ' + randomCap(data0[0].text);
			if(newText.length > 140) newText = newText.substr(0,140);

			//upload pic
			let b64content = fs.readFileSync('/Users/jordanb/Desktop/projects/trumpbobmockpants/media/trumpBot.png', { encoding: 'base64' })

			T.post('media/upload', { media_data: b64content }, (err, data, response) => {

				let mediaIdStr = data.media_id_string
				let altText = 'SpongeBob MockPants'
				let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

				T.post('media/metadata/create', meta_params, (err, data, response) => {
					if (!err) {
						let params = { status: newText, in_reply_to_status_id: data0[0].id_str, media_ids: [mediaIdStr] }
						
						T.post('statuses/update', params, (err, data, response) => {
							console.log('replied to new tweet!');
						})
					}
				});
			});
			lastTweet = data0[0];
		}
	})
}, 1000 * 60);

app.listen(8080, () => console.log('connected to server 8080'));
