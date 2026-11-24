import express from "express";
import Song from "../Models/Song.js";

const router = express.Router();

router.post("/add", (req, res) => {
    const { song_name, movie_name, stars, artist, collection_name, link } = req.body

    const new_song = new Song({
        song_name, 
        movie_name, 
        stars, 
        artist, 
        collection_name,
        link,
    })

    new_song.save()
        .then((saved_song) => 
            res.status(201).json( {message: "Song Added Successfully 🎶", song: saved_song}))
        .catch((err) => {
            res.status(400).json( {error: err.message})
        })
})

router.put("/update/:id", (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnDocument: "after"})
        .then((updated_song) => {
            if(!updated_song){
                return res.status(404).json( {message: "song Not found."})
            }
            res.status(200).json( {message: "Song Updated Successfully 👀", song: updated_song})
        })
        .catch((err) => {
            res.status(400).json( {error: err.message})
        })
})

router.get("/get", (req,res) => {
    const filter = req.query.collection_name ? { collection_name: req.query.collection_name} : {};

    Song.find(filter)
        .sort( {createdAt: -1} )
        .then((songs) => {
            res.status(200).json(songs)
        })
        .catch((err) => {
            res.status(500).json({error: err.message})
        })
})

router.delete("/delete/:id", (req, res) => {
    Song.findByIdAndDelete(req.params.id)
        .then((deleted_song) => {
            if(!deleted_song){
                return res.status(404).json( {message: "No song Found."})
            }
            res.status(200).json( {message: "Song Deleted Successfully 🗑️", song: deleted_song})
        })
        .catch((err) => {
            res.status(400).json( {error: err.message})
        })
})

export default router;