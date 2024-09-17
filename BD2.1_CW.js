let express = require("express");
let app = express();

let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
};

app.get("/person", (req, res) => {
  res.json(person);
});

function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json(firstNameAndGender);
});

function incrementAge(person) {
  person.age = person.age + 1;
  return person;
}

app.get("/person/increment-age", (req, res) => {
  let updatedPerson = incrementAge(person);
  res.json(updatedPerson);
});

function getFullNameMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameMembership = getFullNameMembership(person);
  res.json(fullNameMembership);
});

function getFinalPrice(cartTotal, isMember) {
  let finalPrice;
  if (isMember === true) {
    finalPrice = cartTotal - cartTotal * 0.1;
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
}

app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json({finalPrice: finalPrice});
});

function getShippingCost(cartTotal, isMember) {
    let shippingCost;
    if(isMember === true && cartTotal > 500) {
        shippingCost = 0
    } else {
        shippingCost = 99
    }
    return shippingCost
}

app.get("/person/shipping-cost", (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal)
    let shippingCost = getShippingCost(cartTotal, person.isMember)
    res.json({shippingCost: shippingCost.toFixed(2)})
})

PORT = 3000;

app.listen(PORT, () => {
  console.log("server is listening on http://localhost:", PORT);
});
