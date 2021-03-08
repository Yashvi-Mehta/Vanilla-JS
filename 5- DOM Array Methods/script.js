const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user and add money- 2 ways

// function getRandomUser2() {
//   fetch("https://randomuser.me/api")
//     .then((res) => res.json())
//     .then((data) => {
//       const user = data.results[0];
//       const newUser = {
//         name: `${user.name.first} ${user.name.last}`,
//         money: Math.floor(Math.random() * 1000000),
//       };
//       console.log(newUser);
//     });
// }

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  //   console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//function to Add data to HTML
function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  //clear div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(value) {
  return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  //   data = data.sort((a, b) => (a.money < b.money ? 1 : -1));
  data.sort((a, b) => b.money - a.money);
  updateDOM(data);
}

function filterMillionaire() {
  let millionaireArray = data.filter((data) => data.money > 1000000);
  updateDOM(millionaireArray);
}

function totalWealth() {
  let total = formatMoney(data.reduce((acc, num) => (acc += num.money), 0));
  const totalUI = document.createElement("h3");
  totalUI.innerHTML = `Total Wealth is <strong>${total}</strong>`;
  main.appendChild(totalUI);
  console.log(total);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterMillionaire);
calculateWealthBtn.addEventListener("click", totalWealth);
getRandomUser();
getRandomUser();
getRandomUser();
