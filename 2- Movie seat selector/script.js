const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// console.log(seats);
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value);

//call this function to get data from local storage when user has refreshed the page
populateUI();
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //JSON.parse does the opp of JSON.stringigy

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
      const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
      }
      updateSelectedCount();
    });
  }
}
//count selected seats and price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //ensure no space between seat.selected
  //For storing in local storage
  // #1 get the index of each selected seat so make an arr of selectedSeats

  const selectedIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));

  count.innerHTML = selectedSeats.length;
  total.innerHTML = selectedSeats.length * ticketPrice;
}

//seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(movieSelect.value);
  // or u can use e.target.value
  updateSelectedCount();
  // call another function to store movie data in local storage
  setMovieData(e.target.selectedIndex, e.target.value);
});

//set movieData in localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
