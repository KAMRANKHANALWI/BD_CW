let express = require("express");
let app = express();

app.get("/check-number", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if (number >= 0) {
    result = "Positive Number";
  } else {
    result = "Negative Number";
  }
  res.send(result);
});

app.get("/check-even-odd", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if (number % 2 === 0) {
    result = "Number is Even";
  } else {
    result = "Number is Odd";
  }
  res.send(result);
});

app.get("/check-login", (req, res) => {
  let isLoggedIn = req.query.isLoggedIn;
  let result = "";
  if (isLoggedIn === "true") {
    result = "User is Logged in";
  } else {
    result = "User is not Logged in";
  }
  res.send(result);
});

app.get("/check-discount", (req, res) => {
  let age = req.query.age;
  let result = "";
  if (age > 65) {
    result = "User is eligible for a discount";
  } else {
    result = "User is not eligible for a discount";
  }
  res.send(result);
});

app.get("/check-number-type", (req, res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if (number > 0) {
    result = "Number is Positive";
  } else if (number === 0) {
    result = "Number is Zero";
  } else {
    result = "Number is Negative";
  }
  res.send(result);
});

app.get("/check-temperature", (req, res) => {
  let temperature = parseFloat(req.query.temperature);
  let result = "";
  if (temperature < 15) {
    result = "Temperature is cold";
  } else if (temperature >= 15 && temperature <= 25) {
    result = "Temperature is warm";
  } else {
    result = "Temperature is hot";
  }
  res.send(result);
});

app.get("/check-activity-level", (req, res) => {
  let steps = parseFloat(req.query.steps);
  let result = "";
  if (steps < 5000) {
    result = "Activity level is low";
  } else if (steps < 10000) {
    result = "Activity level is moderate";
  } else {
    result = "Activity level is high";
  }
  res.send(result);
});

app.get("/check-engagement", (req, res) => {
    let likes = parseFloat(req.query.likes);
    let result = "";
    if (likes < 100) {
      result = "Engagement level is low";
    } else if (likes < 500) {
      result = "Engagement level is moderate";
    } else {
      result = "Engagement level is high";
    }
    res.send(result);
  });

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
