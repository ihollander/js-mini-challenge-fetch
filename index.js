
// ## Deliverable 1: Fetch Players

    // access the player container div using querySelector() method and set it to a variable
const playerContainer = document.querySelector(".player-container")

    // render one player to the DOM
function renderPlayer(player) {
        // create an element for the outer div
    const playerDiv = document.createElement("div")

        // set attributes on the outer div
    playerDiv.className = "player"
    playerDiv.dataset.id = player.id
    playerDiv.dataset.number = player.number

        // use innerHTML to create any child elements of the div
    playerDiv.innerHTML = `
        <h3>${player.name} (<em>${player.nickname}</em>)</h3>
        <img src="${player.photo}" alt="${player.name}">
        <p class="likes">${player.likes} likes</p>
        <button class="like-button">❤️</button>
    `

         // append the element to the container
    playerContainer.append(playerDiv)
}

function renderAllPlayers(playerData) {
    // for each player in the array, render to the DOM
    playerData.forEach(renderPlayer)
}

    // make a request to the server using fetch GET /players
    // **When the application loads**, all the players should be displayed.
function initialize() {
        // When our (page loads/JS file runs) Event Happens...
        // Do (GET /players) Fetch Request...
    fetch("http://localhost:3000/players")
        .then(response => response.json())
        .then(playerArray => {
                // And slap (all of our players) on the DOM
            console.log(playerArray)
                // Once you have successfully fetched the players from the server, 
                // display them on the page 
            renderAllPlayers(playerArray)
        })
}

initialize()

// ## Deliverable 2: Create Player

    // select the new player form using the querySelector() method
const newPlayerForm = document.querySelector("#new-player-form")
    // When our (player form is submitted) Event Happens...
    // create an event listener for a new player being added to the form
newPlayerForm.addEventListener("submit", event => {
    event.preventDefault()

        // get the user input from the form
    const newPlayer = {
        number: event.target.number.value,
        name: event.target.name.value,
        nickname: event.target.nickname.value,
        photo: event.target.photo.value,
        likes: 0
    }

        // Do (POST /players) Fetch Request...
        // And slap (all of our new players) on the DOM

        // this url is where our backend is hosted
    fetch("http://localhost:3000/players", {
            // this is how we tell the fetch request what HTTP verb we want to use
        method: 'POST',
            // this content type header tells the server how we are sending the data
            // in this case it's in a JSON format
        headers: {
            'Content-Type': 'application/json',
        },
            // the way the JSON data will be sent is in the body of this fetch request
            // we need the JSON.stringify in order to send this object as JSON data
        body: JSON.stringify(newPlayer),
    })
        // the response is being parsed out here
    .then(response => response.json())
        // we are console logging the data that comes back from this request
    .then(newPlayer => {
            // render the new player on the page
        renderPlayer(newPlayer)
        console.log('Success:', newPlayer);
    })
        // clear the input fields by resetting them
    event.target.reset()
});

// ## Deliverable 3: Like Button

    // add an event listener to hear when the like button is clicked
playerContainer.addEventListener("click", event => {
        // select the like button by using .matches
    if (event.target.matches(".like-button")) {
            // selects the player div and saves it to a variable
        const playerDiv = event.target.closest(".player")
            // accesses the player's id number
        const id = playerDiv.dataset.id
            // uses the player div to access the likes 
        const likesPTag = playerDiv.querySelector(".likes")
            // parses the likes data from a string to an integer and increases the integer by 1
        const newLikes = parseInt(likesPTag.textContent) + 1
            // updates the number of likes on the page
        likesPTag.textContent = `${newLikes} likes`

        // Create a PATCH /players/:id 
            // this url is where our backend is hosted
        fetch(`http://localhost:3000/players/${id}`, {
                // this is how we tell the fetch request what HTTP verb we want to use
            method: 'PATCH',
                // this content type header tells the server how we are sending the data
                // in this case it's in a JSON format
            headers: {
                'Content-Type': 'application/json',
            },
                // the way the JSON data will be sent is in the body of this fetch request
                // we need the JSON.stringify in order to send this object as JSON data
            body: JSON.stringify({
                    // updates the likes on the page
                likes: newLikes
            }),
        })
            // the response is being parsed out here
        .then(response => response.json())
            // we are console logging the data that comes back from this request
        .then(updatedPlayer => {
            console.log('Success:', updatedPlayer);
        })
    }
})
