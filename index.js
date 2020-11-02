

/**********DOM Elements**********/
const playerContainer = document.querySelector(".player-container")

const addPlayer = document.querySelector("#new-player-form")



/**********Event Handlers**********/ 

// add new player 
const createPlayer = (event) => {
	console.log(event)
	event.preventDefault()

	const newPlayer = {
		"name": event.target.name.value,
		"nickname": event.target.nickname.value,
		"photo": event.target.photo.value,
		"likes": 0

		}

		event.target.reset()

		// sending newPlayer via fetch function. Have to render player within the createPlayer function or i can't access newPlayer variable

	fetch('http://localhost:3000/players', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newPlayer),
	})
	.then(response => response.json())
	.then(newPlayer => renderPlayer(newPlayer))
}

const likePlayer = (event) => {
	if (event.target.matches(".like-button")) {
		const likeBtn = event.target
		const playerDiv = likeBtn.closest("div")
		const likes = playerDiv.querySelector(".likes")
		const newLikes = parseInt(likes.textContent) + 1
		likes.textContent = newLikes
		const id = playerDiv.dataset.id

	fetch(`http://localhost:3000/players/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({likes: newLikes}),
	})
	.then(response => response.json())
	.then(console.log()) 
	}}

/**********Event Listeners**********/
addPlayer.addEventListener("submit", createPlayer)

playerContainer.addEventListener("click", likePlayer)


/*********Render Functions***********/

const renderPlayer = player => {

	// create an element for the outer div
	const playerDiv = document.createElement("div")

	// set attributes on the outer div
	playerDiv.className = "player"

	playerDiv.dataset.number = player.number
	playerDiv.dataset.id = player.id

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

// iterate thru all players and render each player
const renderAllPlayers = (players) => {
	players.forEach(renderPlayer)
	}
	


/*********Initial Render***********/

const initialize = () => {

	fetch('http://localhost:3000/players')
		.then(response => response.json())
		.then(renderAllPlayers);
	
	}
	
	initialize()


