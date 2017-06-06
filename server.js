const express = require('express');
const app = express();
const Twit = require('twit');

const T = new Twit({
    consumer_key: 'efDOtt2mIZUczcJczyjBXG6Z2',
    consumer_secret: '	ZnDXuCEh1s9FMkbeiAFmDA2lRAifh4VpuNs5T1DvFw7sIiNdRz',
    access_token: '855904078408204288-cFGwxtMCwE2Snv7GM0nKzQnjNJPEWJG',
    access_token_secret: 'Wuilg0wUzSBxOiTorxqNpAYsdA0BuhroB6vGwwwztEtPN',
})

app.listen(3000, () => console.log('connected to server 3000'));
