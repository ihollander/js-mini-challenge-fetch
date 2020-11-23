//necessary page attributes 
const playerName = document.querySelector('h2')
const playerNickname = document.querySelector('em')
const playerLikes = document.querySelector('p')
const playerImg = document.querySelector('img')
const goalUl = document.querySelector('#goals')
const likeBtn = document.querySelector(".like-button")
const vid = document.querySelector('#new-goal-form')
let currentId = ""

  
fetch ("http://localhost:3000/players/1") 
.then(resp => resp.json())
.then(playerObj => {
    playerImg.src = playerObj.photo
    playerImg.alt = playerObj.name
    playerName.textContent = playerObj.name
    playerNickname.textContent = playerObj.nickname
    playerLikes.textContent = `${playerObj.likes} Likes`
    currentId = playerObj.id

})

fetch ("http://localhost:3000/goals")
.then(resp => resp.json())
.then(goalsObj => {
    goalsObj.forEach(goal => {
        renderGoal(goal)
    })
})

function renderGoal(goal) {
    const goalLi = document.createElement('li')
    const goalP = document.createElement('p')
    const goalA = document.createElement('a')

    
    goalLi.dataset.id = goal.id
    goalLi.dataset.playerid = goal.playerId

    goalP.textContent = goal.description
    goalA.href = goal.link
    goalA.textContent = goal.link

    goalLi.append(goalP, goalA)
    goalUl.append(goalLi) 
}


likeBtn.addEventListener("click", function () {
    fetch("http://localhost:3000/players/1", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: `${parseInt(playerLikes.textContent) + 1}`
        })
    })
    .then(response => response.json())
    .then(updatedLikes => {
        playerLikes.textContent = `${updatedLikes.likes} Likes` 
    })
  })

  vid.addEventListener("submit", function() {
    
    fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            playerId: parseInt(currentId),
            link: vid.link.value,
            description: vid.description.value
        })
    })
    .then(response => response.json())
    .then(json => {
        renderGoal(json)
    })
    })
