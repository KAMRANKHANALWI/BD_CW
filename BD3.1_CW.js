let express = require("express");
let app = express();

let numbers = [1, 2, 3, 4, 5];

let strings = ["hello", "world", "javascript", "node"];

function addToArr(numbers, num) {
  numbers.push(num);
  return numbers;
}

app.get("/numbers/add", (req, res) => {
  let result = addToArr(numbers, 6);
  res.json(result);
});

function addToStrings(strings, str) {
  strings.push(str);
  return strings;
}

app.get("/strings/add", (req, res) => {
  let result = addToStrings(strings, "express");
  res.json(result);
});

function sumOfNumbers(numbersArr) {
  let sum = 0;
  for (let i = 0; i < numbersArr.length; i++) {
    sum += numbersArr[i];
  }
  return sum;
}

app.get("/numbers/sum", (req, res) => {
  let result = sumOfNumbers(numbers);
  res.json({ sum: result });
});

function findMax(numbersArr) {
  let max = numbersArr[0];
  for (let i = 1; i < numbersArr.length; i++) {
    if (numbersArr[i] > max) {
      max = numbersArr[i];
    }
  }
  return max;
}

app.get("/numbers/max", (req, res) => {
  let result = findMax(numbers);
  res.json(result);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost: ${PORT}`);
});
