let express = require("express");
let app = express();

app.get("/shout", (req, res) => {
  let name = req.query.name;
  let upperCase = name.toUpperCase();
  res.send(upperCase);
});

app.get("/fullname", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let fullName = firstName + " " + lastName;
  res.send(fullName);
});

app.get("/date", (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + ", " + year;
  res.send(formattedDate);
});

app.get("/greet", (req, res) => {
  let name = req.query.name;
  let greetingMessage = "Namaste, " + name + "!";
  res.send(greetingMessage);
});

app.get("/address", (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let formattedAddress = street + ", " + city + ", " + state;
  res.send(formattedAddress);
});

app.get("/email", (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let address = username + "@" + domain;
  res.send(address);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log("server is listening on http://localhost:", PORT);
});
