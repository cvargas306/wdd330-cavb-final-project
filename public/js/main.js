document.getElementById("chordBtn").addEventListener("click", async () => {
    const chord = document.getElementById("chordInput").value.trim();
    const chordsDiv = document.getElementById("chords");
    chordsDiv.innerHTML = "";

    if (!chord) {
        chordsDiv.innerHTML = "<p>Please enter a chord name.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/scaleschords/${encodeURIComponent(chord)}`);
        const data = await response.json();

        if (data && data.chordName) {
            chordsDiv.innerHTML = `
        <h3>${data.chordName}</h3>
        <img src="${data.chordImgUrl}" alt="Chord Diagram" />
      `;
        } else {
            chordsDiv.innerHTML = "<p>No chord found.</p>";
        }
    } catch (err) {
        console.error("Chord fetch error:", err);
        chordsDiv.innerHTML = "<p>Error loading chord data.</p>";
    }
});

document.getElementById("lyricsBtn").addEventListener("click", async () => {
    const artist = document.getElementById("artistInput").value.trim();
    const title = document.getElementById("titleInput").value.trim();
    const lyricsDiv = document.getElementById("lyrics");

    lyricsDiv.innerHTML = "";

    if (!artist || !title) {
        lyricsDiv.innerHTML = "<p>Please enter both artist and song title.</p>";
        return;
    }

    try {
        const response = await fetch(`/lyrics/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
        const data = await response.json();

        if (data.lyrics) {
            lyricsDiv.innerHTML = `<h3>Lyrics for "${title}"</h3><pre>${data.lyrics}</pre>`;
        } else {
            lyricsDiv.innerHTML = "<p>Lyrics not found.</p>";
        }
    } catch (err) {
        console.error("Lyrics fetch error:", err);
        lyricsDiv.innerHTML = "<p>Error fetching lyrics.</p>";
    }
});

document.getElementById("searchBtn").addEventListener("click", async () => {
    const artist = document.getElementById("artistInput").value.trim();
    const artistInfoDiv = document.getElementById("artist-info");
    artistInfoDiv.innerHTML = ""; // Clear previous

    if (!artist) {
        artistInfoDiv.innerHTML = "<p>Please enter an artist name.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/lastfm/${encodeURIComponent(artist)}`);
        const data = await response.json();

        if (data.error) {
            artistInfoDiv.innerHTML = `<p>${data.error}</p>`;
        } else {
            artistInfoDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.bio}</p>
      `;
        }
    } catch (error) {
        console.error("Artist fetch error:", error);
        artistInfoDiv.innerHTML = "<p>Error retrieving artist info.</p>";
    }
});

