// DOM ELEMENTS
const likeButton = document.querySelector(".like-button")
const likes = document.querySelector(".likes")
const form = document.querySelector("#new-goal-form")
// console.log(form)

// EVENT HANDLERS
// made helper method for likes event listener. have to put fetch inside this method so it recognizes my newLikes variable. I'm learning!!
const addLikes = () => {
  let newLikes = parseInt(likes.textContent) + 1
  likes.textContent = `${newLikes} Likes`

  fetch("http://localhost:3000/players/1", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
// i would prefer to update my DOM from within the .then but I'm not confident in it. I tend to break things in new and creative ways!
}


// similarly, made helper method for form event listener. have to put fetch inside this method so it recognizes my newGoal variable.
const submitGoal = (event) => {
  event.preventDefault()

  const newGoal = {
    playerId: 1,
    link: event.target["goal-link"].value,
    description: event.target["goal-description"].value
  }

  fetch("http://localhost:3000/goals", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(newGoal)
  })
    .then(response => response.json())
    .then(data => renderGoals(newGoal))

    event.target.reset()
}



// EVENT LISTENERS
likeButton.addEventListener("click", addLikes)
form.addEventListener("submit", submitGoal)


// RENDER FUNCTIONS

const renderPlayer = (playerObj) => {
  const playerName = document.querySelector("h2")
  playerName.textContent = playerObj.name
  playerName.dataset.id = playerObj.id
  const playerPhoto = document.querySelector("img")
  playerPhoto.src = playerObj.photo
  playerPhoto.alt = playerObj.name
  const playerNickname = document.querySelector("em")
  playerNickname.textContent = playerObj.nickname
  const playerLikes = document.querySelector(".likes")
  playerLikes.textContent = `${playerObj.likes} Likes`
}

// I added player id & goals/player id because why not?! I need the practice.

const renderGoals = (playerObj) => {
  // console.log(playerObj.goals[0].description)
  const ul = document.querySelector("#goals")
  playerObj.goals.forEach((goal) => {
    const li = document.createElement("li")
    const p = document.createElement("p")
    li.textContent = goal.description
    li.dataset.id = goal.id
    li.dataset.playerId = goal.playerId
    const a = document.createElement("a")
    a.href = goal.link
    a.target = "_blank"
    a.textContent = goal.link
    // console.log(goal.description)
    // console.log(goal.link)
    ul.append(p)
    p.append(li, a)
  })

}

// i know that I need to break out renderOneGoal from my forEach but when i do i break it into a million pieces. (PlayerObj isn't accessible from a separate function, the way I was doing it) so for now, just leaving as is! My new goals do persist even tho submission cause an error. Will be glad to know how to resolve this because my brain hurts too much right now to figure it out. thank you in advance ;)




// INITIALIZE
const initialize = () => {
  fetch("http://localhost:3000/players/1")
    .then(response => response.json())
    .then(playerObj => {
      renderPlayer(playerObj)
      renderGoals(playerObj)
      // console.log(playerObj)
    })
}

initialize()
