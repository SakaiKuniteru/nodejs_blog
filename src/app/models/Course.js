const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true } // unique để slug không bị trình lặp
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course)