const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
})

const placeModel = mongoose.model('place', PlaceSchema)

module.exports = placeModel