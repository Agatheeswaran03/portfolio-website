const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolioDB';
const Certificate = require('./models/Certificate');

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");
        const certs = await Certificate.find({});
        console.log(JSON.stringify(certs, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
