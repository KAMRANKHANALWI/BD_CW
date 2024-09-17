let express = require("express");
let app = express();

let ages = [25, 30, 18, 22, 27];

let students = [
  { name: "Rahul", rollNo: 101, marks: 85 },
  { name: "Sita", rollNo: 102, marks: 95 },
  { name: "Amit", rollNo: 103, marks: 70 },
];

let cars = [
  { make: "Maruti", model: "Swift", mileage: 15 },
  { make: "Hyundai", model: "120", mileage: 18 },
  { make: "Tata", model: "Nexon", mileage: 20 },
];

function sortAscendingOrder(age1, age2) {
  return age1 - age2;
}

app.get("/ages/sort-ascending", (req, res) => {
  // let agesCopy = ages.slice()  // Create a copy
  let agesCopy = [...ages]; // Create a copy
  agesCopy.sort(sortAscendingOrder);
  res.json(agesCopy);
});

function sortAgesDescending(num1, num2) {
  return num2 - num1;
}

app.get("/ages/sort-descending", (req, res) => {
  let agesCopy = [...ages];
  agesCopy.sort(sortAgesDescending);
  res.json(agesCopy);
});

function sortStudentsByMarksDescending(student1, student2) {
  return student2.marks - student1.marks;
}

app.get("/students/sort-by-marks-descending", (req, res) => {
  let studentsCopy = [...students];
  studentsCopy.sort(sortStudentsByMarksDescending);
  res.json(studentsCopy);
});

function sortCarsByMileageDescending(car1, car2) {
  return car2.mileage - car1.mileage;
}

app.get("/cars/sort-by-mileage-descending", (req, res) => {
  let carsCopy = [...cars];
  carsCopy.sort(sortCarsByMileageDescending);
  res.json(carsCopy);
});

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost: ${PORT}`);
});
