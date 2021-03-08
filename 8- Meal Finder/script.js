const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealEl = document.getElementById('single-meal');

// function to search and fetch meal from API

function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  singleMealEl.innerHTML = '';

  //get search term
  const term = search.value;
  console.log(term);

  //check for empty string
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}' : </h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2> There are no search results for '${term}'. Please try again`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class= "meal">
              <img src= "${meal.strMealThumb}" alt="image of ${meal.strMeal}">
              <div class="meal-info" data-mealid="${meal.idMeal}">
                <h3>${meal.strMeal} </h3>
              </div>
              </div>
            `
            )
            //   data-meadlID is imp for us to know which meal did the user click on. so we have to add EventListeners to all of the meal-info div elements and then fetch the recipe and stuff for that specific mealID that was clicked
            .join('');
        }
      });
    //   clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

//Fetch Meal  by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);
  singleMealEl.innerHTML = `
    <div class= 'single-meal'>
    <h1>${meal.strMeal}</h1>
    <img src= "${meal.strMealThumb}" alt="image of ${meal.strMeal}"/>
    <div class='single-meal-info'>
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>`;
}

// Fetch random meal from API
function getRandomMeal() {
  //Clear meals and headings
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

//Event Listners
mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    let mealID = mealInfo.getAttribute('data-mealid');
    getMealByID(mealID);
  }
});

submit.addEventListener('submit', searchMeal);

random.addEventListener('click', getRandomMeal);
