const playerr = document.querySelector('.player')
const likeBtn = document.querySelector('.like-button')
const playerName = document.querySelector('#player-name')
const nickName = document.querySelector('#nickname')
const likes = document.querySelector('.likes')
const img = document.querySelector('img')
const goals = document.querySelector('#goals')
const goalForm = document.querySelector('#new-goal-form')

function initialRender() {
  return fetch('http://localhost:3000/players/1')
  .then(resp => resp.json())
  .then(player => {
    playerInfo(player)
  })
  .catch(err => err)
}
initialRender()

function playerInfo(player) {
  playerName.textContent = player.name
  nickName.textContent = player.nickname
  likes.textContent = `${player.likes} Likes`
  img.src = player.photo
  img.alt = player.name
  playerr.classList.id = player.id
  player.goals.forEach(playerGoals)
}

function playerGoals(goal) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    // const p = document.createElement('p')
    li.dataset.id = goal.id
    a.href = goal.link
    a.textContent = goal.description
    li.append(a)
    // li.append(p)
    goals.append(li)
}

function updateLikes() {
  const likeCount = parseInt(likes.textContent) + 1
  
  return fetch('http://localhost:3000/players/1', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      likes: likeCount
    })
  })
  .then(resp => resp.json())
  .then(playerUpdate => {
    likes.textContent = `${playerUpdate.likes} Likes`
  })
}

likeBtn.addEventListener('click', updateLikes)

function newGoal (event) {
  event.preventDefault()

  const goalObj = {
    playerId: playerr.classList.id,
    link: event.target.link.value,
    description: event.target.description.value
  }

  playerGoals(goalObj)
  fetch("http://localhost:3000/goals", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(goalObj)
  })
  .then(resp => resp.json())
  .then(theGoal => {
    // debugger
    theGoal
  })
  event.target.reset()
}

goalForm.addEventListener('submit', newGoal)