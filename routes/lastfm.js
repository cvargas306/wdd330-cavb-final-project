const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:artist', async (req, res) => {
    const { artist } = req.params;
    const apiKey = process.env.LASTFM_API_KEY;

    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${apiKey}&format=json`;

    console.log("Requesting Last.fm URL:", url); // 🧪 Debug log

    try {
        const response = await axios.get(url);
        const artistData = response.data.artist;

        res.json({
            name: artistData.name,
            bio: artistData.bio?.summary || 'No bio available.',
        });

    } catch (error) {
        console.error("Last.fm error:", error.response?.data || error.message); // ⛔ Show full response
        res.status(500).json({ error: 'Failed to fetch artist info.' });
    }
});

module.exports = router;
