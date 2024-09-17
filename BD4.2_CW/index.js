const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 CW - SQL Queries & async/await" });
});

async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);

  return { movies: response };
}

app.get("/movies", async (req, res) => {
  try {
    let results = await fetchAllMovies();

    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No Movies Found" });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByGenre(genre) {
  let query = "SELECT * FROM movies WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get("/movies/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let results = await fetchMoviesByGenre(genre);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No Movies of this genre Found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesById(id) {
  let query = "SELECT * FROM movies WHERE id = ?";
  let response = await db.get(query, [id]);

  return { movie: response };
}

app.get("/movies/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let results = await fetchMoviesById(id);
    if (results.movie === undefined) {
      return res.status(404).json({ message: "No Movies Found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMovieByReleaseYear(release_year) {
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let response = await db.all(query, [release_year]);
  return { movies: response };
}

app.get("/movies/release-year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let results = await fetchMovieByReleaseYear(year);
    if (results.movies.length === 0) {
      return res.status(404).json({ message: "No Movies Found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
