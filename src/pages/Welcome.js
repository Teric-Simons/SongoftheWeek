import { useMemo, useState } from "react";
import "./Welcome.css";

// OPTION A: TEMP TOKEN (expires). Replace this string.
const SPOTIFY_TOKEN = "PASTE_YOUR_SPOTIFY_ACCESS_TOKEN_HERE";

function WelcomePage({ name, onBack }) {
  const [songSelected, setSongSelected] = useState("");

  // Search UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [suggestions, setSuggestions] = useState([]); // list of track names

  // Local "dictionary"
  const userInfo = useMemo(() => {
    return {
      name,
      songSelected,
    };
  }, [name, songSelected]);

  async function handleSearch() {
    const q = songSelected.trim();

    if (!q) {
      setErrorMsg("No song selected");
      setSuggestions([]);
      return;
    }

    if (!SPOTIFY_TOKEN || SPOTIFY_TOKEN.includes("PASTE_")) {
      setErrorMsg("Missing Spotify token. Paste it into SPOTIFY_TOKEN.");
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const url =
        "https://api.spotify.com/v1/search?" +
        new URLSearchParams({
          q,
          type: "track",
          limit: "10",
        });

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        },
      });

      if (!res.ok) {
        // Common: 401 when token expires
        throw new Error(
          res.status === 401
            ? "Spotify token expired (401). Get a new token and paste it in."
            : `Spotify search failed (${res.status})`
        );
      }

      const data = await res.json();
      const tracks = data?.tracks?.items ?? [];

      const names = tracks.map((t) => t.name);

      setSuggestions(names);

      if (names.length === 0) {
        setErrorMsg("No matches found.");
      }
    } catch (err) {
      setSuggestions([]);
      setErrorMsg(err.message || "Something went wrong searching Spotify.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="welcome-page">
      <div className="welcomeback">
        <h1>Welcome back {userInfo.name} 👋</h1>
      </div>

      {/* Status / Error */}
      {errorMsg && <p className="song-status">{errorMsg}</p>}

      <main>
        <input
          className="song-input"
          value={songSelected}
          onChange={(e) => setSongSelected(e.target.value)}
          placeholder="Enter your song of the week!"
        />

        <button className="confirm" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <div className="suggestions">
            <p className="suggestions-title">Suggestions:</p>
            {suggestions.map((songName, i) => (
              <button
                key={`${songName}-${i}`}
                className="suggestion-btn"
                onClick={() => {
                  setSongSelected(songName);     // fill input with chosen name
                  setErrorMsg("");               // clear message
                }}
              >
                {songName}
              </button>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default WelcomePage;
