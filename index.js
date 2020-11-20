//********Objects

const playerImg = document.querySelector('img')
const playerName = document.querySelector('.player h2')
const playerNickName = document.querySelector('.player em')
const playerLikes = document.querySelector('.likes')
const goalsUl = document.querySelector('#goals')
const goalForm = document.querySelector('#new-goal-form')
const likeBtn = document.querySelector('.like-button')


//***********RENDER FUNCTIONS*************/

const renderPlayer = player => {
	playerImg.src = player.photo
	playerName.textContent = player.name
	playerName.id = player.id
	playerNickName.textContent = player.nickname
	playerLikes.textContent = `${player.likes} people have liked this player`
	player.goals.forEach(goal => renderGoal(goal))
}

const renderGoal = goal => {
	const goalLi = document.createElement('li')
	goalLi.textContent = goal.description
	goalsUl.append(goalLi)
}


/***********EVENT LISTENERS *************/

goalForm.addEventListener('submit', logSubmit)
likeBtn.addEventListener('click', addLike)

function logSubmit(event) {
	event.preventDefault()
	const newGoal = {
		playerId: parseInt(event.target.previousElementSibling.querySelector('h2').id),
		link: event.target['goal-link'].value,
		description: event.target['goal-description'].value
	}

	const submitForm = fetch("http://localhost:3000/goals", {
 	 	method: 'POST',
 	 	headers: {
    	'Content-Type': 'application/json',
  	},
  	body: JSON.stringify(newGoal),
	})
	.then(response => response.json())
	.then(data => {
  	console.log('Success:', newGoal);
	})
	.catch((error) => {
  	console.error('Error:', error);
	});
}

function addLike(event) {
	event.preventDefault()
	let currentLikes = parseInt(playerLikes.textContent)
	currentLikes++
	
	const submitLike = fetch("http://localhost:3000/players/1", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(currentLikes)
	})
	.then(response => response.json())
	.then(player => {
		console.log(player)
		playerLikes.textContent = `${player.likes} people have liked this player`
	})

}


//**********FETCH-REQUESTS ************/

fetch("http://localhost:3000/players/1")
	.then(response => response.json())
	.then(player => {
		renderPlayer(player)
	})


	