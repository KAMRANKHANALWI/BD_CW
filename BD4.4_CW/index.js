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
  res.status(200).json({ message: "BD4.4 CW - SQL Queries & async/await" });
});

async function fetchAllMovies() {
  let query = "SELECT id, title, release_year FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
}

app.get("/movies", async (req, res) => {
  try {
    const results = await fetchAllMovies();

    if (results.movies.length === 0) {
      return res.status(400).json({ message: "No Movies Found" });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByActor(actor) {
  let query =
    "SELECT id, title, actor ,release_year FROM movies WHERE actor = ?";
  let response = await db.all(query, [actor]);
  return { movies: response };
}

app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    const results = await fetchMoviesByActor(actor);
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No Movies Found for actor " + actor });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByDirector(director) {
  let query =
    "SELECT id, title, director, release_year FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
}

app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    let results = await fetchMoviesByDirector(director);
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No Movies Found for director " + director });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
