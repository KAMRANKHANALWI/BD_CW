const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 CW - SQL Queries & async/await" });
});

async function filterByYearAndActor(releaseYear, actor) {
  let query = "SELECT * FROM movies WHERE release_year = ? AND actor = ?";
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
}

app.get("/movies/year-actor", async (req, res) => {
  let releaseYear = req.query.releaseYear;
  let actor = req.query.actor;
  try {
    let results = await filterByYearAndActor(releaseYear, actor);

    if (results.movies.length === 0) {
      return res.status(404).json({
        message: "No Movies Found for Year " + releaseYear + " by " + actor,
      });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function filterAwardWinningMovies() {
  let query = "SELECT * FROM MOVIES WHERE rating >= 4.5 ORDER BY rating";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies/award-winning", async (req, res) => {
  try {
    let results = await filterAwardWinningMovies();
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No Award Winning Movies Found." });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchBlockbusterMovies() {
  let query =
    "SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies/blockbuster", async (req, res) => {
  try {
    let results = await fetchBlockbusterMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No blockbuster movies found." });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
