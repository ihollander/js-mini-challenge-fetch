//necessary page attributes 
const playerName = document.querySelector('h2')
const playerNickname = document.querySelector('em')
const playerLikes = document.querySelector('p')
const playerImg = document.querySelector('img')
const goalUl = document.querySelector('#goals')
const likeBtn = document.querySelector('like-button')
const vid = document.querySelector('#new-goal-form')

    // <button class="like-button">❤️</button>
    // <h4>Great Goals</h4>
    // <ul id="goals"></ul> *
fetch ("http://localhost:3000/players/1") 
.then(resp => resp.json())
.then(playerObj => {
    playerImg.src = playerObj.photo
    playerImg.alt = playerObj.name
    playerName.textContent = playerObj.name
    playerNickname.textContent = playerObj.nickname
    playerLikes.textContent = `${playerObj.likes} Likes`
    playerObj.goals.forEach(goal => {
        renderGoal(goal)
        //getting a TypeError using the forEach and not sure why
    })
})

function renderGoal(goal) {
    const goalLi = document.createElement('li')
    const goalP = document.createElement('p')
    const goalA = document.createElement('a')

    goalLi.dataset.id = goal.id
    goalLi.dataset.playerid = goal.playerId

    goalP.textContent = goal.description
    goalA.href = goal.likeBtn
    goalA.textContent = goal.likeBtn

    goalLi.append(goalP, goalA)
    goalUl.append(goalLi) 
}
