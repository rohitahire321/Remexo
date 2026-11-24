import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    song_name: { type: String, required: true, trim: true},
    movie_name: { type: String, required: true, trim: true},
    stars: { type: Number, min: 1, max: 5, required: true},
    artist: { type: String, required: true, trim: true},
    collection_name: { type: String, required: true, enum: ["Rohit's_Special", "Party_Songs", "Romantic_Songs", "Sleep_Songs"]},
    link: { type: String, default: "", trim: true},
}, { timestamps: true})

const Song = mongoose.model("Song", songSchema)

export default Song;