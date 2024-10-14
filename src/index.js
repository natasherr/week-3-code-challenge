document.addEventListener("DOMContentLoaded", (event) => {
 event.preventDefault()
 // Deliverable 1
//  Displaying the first movie details when the page loads
      fetch("http://localhost:3000/films/1", {method:"GET",})
       .then((res) => res.json())
       .then((data) => {
        // remainingTickets shows the number of available tickets 
        const remainingTickets = (data.capacity - data.tickets_sold)
    
        document.getElementById("title").innerText = data.title
        document.getElementById("runtime").innerText =` ${data.runtime} minutes`
        document.getElementById("showtime").innerText = data.showtime
        document.getElementById("ticket-num").innerText = remainingTickets
        document.getElementById("poster").src = data.poster
      })

 // Deliverable 2
//  Displaying  a menu of all movie on the left side of the page
  fetch("http://localhost:3000/films", {method:"GET",})
  .then((res) => res.json())
  .then((data) => {
   const moviesList = document.getElementById("films")

    for(movie of data) {
      const listItem = document.createElement("li")
        listItem.innerHTML += `${movie.title}  <button onclick = "delete_movie(${movie.id})" class = "button">Delete</button>`
      // Adding/appending a new child element which is(listItem) to the parent element which is (moviesList)
        moviesList.appendChild(listItem) 
      }
    })
// Deliverable 4
// Adding a delete button to the list of movies that deletes the movie from the server.
  function delete_movie(id){
    fetch(`http://localhost:3000/films/${id}`, {method: "DELETE"})
      .then(res => res.json())
      .then(res => alert("Successful deletion!"))
  }

// Deliverable 3
// Being able to see the number of available tickets reduce once you press the Buy Ticket button.
  const ticketButton = document.getElementById("buy-ticket")

  //  Adding an event listener to the ticketButton
  ticketButton.addEventListener("click" , () => {
    const availableTickets = document.getElementById("ticket-num")
  
    // START OF IF
    if(availableTickets > 0){
      // the configObj below reps. the second argument for the fetch.
      const configObj = {
        method : "PATCH",
        headers : {
          "Content-Type": "application/json",
          "Accept" : "application/json"},
        body: JSON.stringify({
          "tickets_sold" : newSoldTickets
        })}
      // the fetch request that includes configObj
      const theFetching = fetch("http://localhost:3000/films/1", configObj)
       .then((res) => res.json())
       .then((film) => {return availableTickets + 1})
      
     return theFetching
    }
    // END OF IF

  })

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
})


