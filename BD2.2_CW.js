let express = require("express");
let app = express();

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterEvenNumbers(num) {
  return num % 2 === 0;
}

app.get("/even-numbers", (req, res) => {
  let result = numbers.filter((num) => filterEvenNumbers(num));
  res.json(result);
});

let ages = [10, 20, 30, 15, 17, 25];
function filterAgesGreaterThan18(age) {
  return age > 18;
}

app.get("/adult-ages", (req, res) => {
  let result = ages.filter((age) => filterAgesGreaterThan18(age));
  res.json(result)
});

let words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape']

function filterLongWords(word) {
    return word.length > 5
}

app.get("/long-words", (req, res) => {
    let result = words.filter(word => filterLongWords(word))
    res.json(result)
})

let fileSizes = [50, 200, 75, 120, 30, 90, 150]

function filterSmallFiles(fileSize, filterParam) {
    return fileSize < filterParam
}

app.get("/small-files", (req, res) => {
    let filterParam = parseFloat(req.query.filterParam)
    let result = fileSizes.filter(fileSize => filterSmallFiles(fileSize, filterParam))
    res.json(result)
})



let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost: ${PORT}`);
});
