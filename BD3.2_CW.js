let express = require("express");
let app = express();

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ["Rahul", "Sita", "Amit", "Vikram", "Priya"];
let employees = [
  { employeeId: 1, name: "Rahul" },
  { employeeId: 2, name: "Sita" },
  { employeeId: 3, name: "Amit" },
];
let contacts = [
    { phoneNumber: '1234567890', name: 'Rahul', address: '123 Street, City' },
    { phoneNumber: '0987654321', name: 'Sita', address: '456 Avenue, City' },
    { phoneNumber: '1112223334', name: 'Amit', address: '789 Boulevard, City' }
  ];

function findNumber(ele, number) {
  return ele === number;
}

app.get("/numbers/find/:number", (req, res) => {
  let number = parseInt(req.params.number);
  let result = numbers.find((ele) => findNumber(ele, number));
  console.log(result);
  res.json(result);
});

function findName(ele, name) {
  return ele === name;
}

app.get("/names/find/:name", (req, res) => {
  let name = req.params.name;
  let result = names.find((ele) => findName(ele, name));
  console.log(result);
  res.json(result);
});

function findEmployee(ele, employeeId) {
  return ele.employeeId === employeeId;
}

app.get("/employees/find/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = employees.find((ele) => findEmployee(ele, id));
  res.json(result);
});

function findContact(ele, phoneNumber) {
    return ele.phoneNumber === phoneNumber
}

app.get("/contacts/find/:phoneNumber", (req, res) => {
    let phoneNumber = req.params.phoneNumber
    let result = contacts.find(ele => findContact(ele, phoneNumber))
    console.log(result)
    res.json(result)
})

let PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost: ${PORT}`);
});
