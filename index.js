/// DOM Elements ///
const playerDiv = document.querySelector('div.player')
const playerImg = document.querySelector('img')
const playerName = document.querySelector('h2')
const playerNickName = document.querySelector('em')
const playerLikes = document.querySelector('p.likes')
const playerGoals = document.querySelector('ul#goals')

const playerGoalForm = document.querySelector('#new-goal-form')


const likeBtn = document.querySelector('.like-button')

// console.log(likeBtn)
/////////////////////// Deliverable 1 /////////////////////////////
function intialize() {
    fetch('http://localhost:3000/players/1')
    .then(response => response.json())
    .then(playerData => {
        playerImg.src = playerData.photo,
        playerName.textContent = playerData.name,
        playerNickName.textContent = playerData.nickname,
        playerLikes.textContent = `${playerData.likes} Likes`,
        playerData.goals.forEach(goal => renderGoals(goal))
    })
}
intialize()

function renderGoals(goal) {
    const li = document.createElement('li')
    const pElement = document.createElement('p')
    const aElement = document.createElement('a')
    pElement.textContent = goal.description
    aElement.href = goal.link
    aElement.textContent = goal.link
    li.append(pElement, aElement)
    playerGoals.append(li)
}
//////////////////////////////////////////////////////////////////

///////////////////////// Deliverable 2 /////////////////////////

function updateLikes() {
    fetch('http://localhost:3000/players/1', {
        method: 'PATCH',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            likes: parseInt(playerLikes.textContent) + 1
        }),
    })
    .then(response => response.json())
    .then(playerData => playerLikes.textContent = `${playerData.likes} Likes`)
}

likeBtn.addEventListener("click", updateLikes)

//////////////////////////////////////////////////////////////////

///////////////////////// Deliverable 3 /////////////////////////

playerGoalForm.addEventListener("submit", submitGoal)

function submitGoal(event) {
    event.preventDefault()

    const oneGoal = {
        // Not sure how to assign this :( 
        // playerId: event.target.playerID.dataset.id,
        link: event.target.link.value,
        description: event.target.description.value
    }
    fetch("http://localhost:3000/goals", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(oneGoal),
    })
    .then(response => response.json())
    .then(oneGoal => {
        renderGoals(oneGoal)
    })

    event.target.reset()
}


//////////////////////////////////////////////////////////////////
