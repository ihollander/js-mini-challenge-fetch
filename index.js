const playerImg = document.querySelector(".player img")
const playerName = document.querySelector(".player h2")
const playerNick = document.querySelector(".player em")
const playerLikes = document.querySelector(".likes")
const playerGoalsUl = document.querySelector("#goals")
const likeBtn = document.querySelector(".like-button")
const newGoalForm = document.querySelector("#new-goal-form")

likeBtn.addEventListener("click", () => playerLikeFetchPatch())
// newGoalForm.addEventListener("submit", handleNewGoalFormSubmit)

const handleNewGoalFormSubmit = event => {
	event.preventDefault()
	const link = event.target.link.value
	const description = event.target.description.value
	const newGoal = {
		playerId: playerName.dataset.id,
		link: link,
		description: description
	}
	playerNewGoalFetchPost(newGoal)
	event.target.reset
}

const playerLikeFetchPatch = () => {
	return fetch("http://localhost:3000/players/1", {
		method: 'PATCH',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({likes: parseInt(playerLikes.textContent) + 1})
	})
		.then(response => response.json())
		.then(updatedPlayer => {
			console.log('Success:', updatedPlayer)
			playerLikes.textContent = updatedPlayer.likes
		})
}

const playerNewGoalFetchPost = (newGoal) => {
	return fetch("http://localhost:3000/players/1/goals", {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			playerId: newGoal.playerId,
			link: newGoal.link,
			description: newGoal.description
		})
	})
		.then(response => response.json())
		.then(newGoalData => {
			console.log('Success:', newGoalData)
			renderNewGoal(newGoalData)
		})
}

const playerDataFetchGet = () => {
	return fetch("http://localhost:3000/players/1")
	 .then(response => response.json())
	 .then(playerData => {
		 console.log(playerData)
		 renderPlayer(playerData)
	 })
}

const renderPlayerGoal = playerData => {
	playerData.goals.forEach(goal => {
		renderNewGoal(goal)
	})
}

const renderNewGoal = newGoalData => {
		const goalLi = document.createElement("li")
		const goalA = document.createElement("a")
		const goalP = document.createElement("p")
		goalA.href = newGoalData.link
		goalA.target = "_blank"
		goalA.textContent = newGoalData.link
		goalP.textContent = newGoalData.description
		goalLi.append(goalP, goalA)
		playerGoalsUl.append(goalLi)
}

const renderPlayer = playerData => {
	playerImg.src = playerData.photo
	playerName.textContent = playerData.name
	playerName.dataset.id = playerData.id
	playerNick.textContent = playerData.nickname
	playerLikes.textContent = playerData.likes + " Likes"
	renderPlayerGoal(playerData)
}

function initialize() {
	playerDataFetchGet()
	newGoalForm.addEventListener("submit", handleNewGoalFormSubmit)
}

initialize()