// 🎸 Handle Chord Search
document.getElementById("searchChordBtn").addEventListener("click", () => {
    const chordName = document.getElementById("chordInput").value.trim();
    const chordDisplay = document.getElementById("chordDisplay");

    chordDisplay.innerHTML = ""; // clear old results

    if (!chordName) {
        chordDisplay.innerHTML = "<p>Please enter a chord name.</p>";
        return;
    }

    const chordElement = document.createElement("sc-chord");
    chordElement.setAttribute("name", chordName);
    chordDisplay.appendChild(chordElement);
});

// 🎤 Handle Lyrics Search
document.getElementById("searchLyricsBtn").addEventListener("click", async () => {
    const artist = document.getElementById("artistInput").value.trim();
    const song = document.getElementById("songInput").value.trim();
    const lyricsDiv = document.getElementById("lyrics");
    const artistInfoDiv = document.getElementById("artist-info");

    lyricsDiv.innerHTML = "";
    artistInfoDiv.innerHTML = "";

    if (!artist || !song) {
        lyricsDiv.innerHTML = "<p>Please enter both artist and song name.</p>";
        return;
    }

    try {
        // Get lyrics
        const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`);
        const data = await res.json();

        if (data.lyrics) {
            lyricsDiv.innerHTML = `
        <h3>Lyrics for "${song}" by ${artist}</h3>
        <pre>${data.lyrics}</pre>
      `;
        } else {
            lyricsDiv.innerHTML = "<p>Lyrics not found.</p>";
        }

        // 🎤 Get artist info from your backend
        const artistRes = await fetch(`/lastfm/${encodeURIComponent(artist)}`);
        const artistData = await artistRes.json();

        if (artistData.name) {
            artistInfoDiv.innerHTML = `
    <h3>${artistData.name}</h3>
    <p>${artistData.bio}</p>
  `;
        } else {
            artistInfoDiv.innerHTML = "<p>Artist info not found.</p>";
        }


    } catch (error) {
        console.error("Error:", error);
        lyricsDiv.innerHTML = "<p>Failed to load lyrics. Try again later.</p>";
    }
});
