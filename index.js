//DOM ELEMENTS
const playerImg = document.querySelector(".player img")
const h2Name = document.querySelector(".player h2")
const emNickname = document.querySelector(".player em")
const pLikes = document.querySelector(".player p")
const goalsUl = document.querySelector("#goals")
const likeButton = document.querySelector(".like-button")
const goalForm = document.querySelector("#new-goal-form")


//FETCH DATA
function getData() {
    return fetch("http://localhost:3000/players/1")
        .then(resp => resp.json())
        .then(playerObj => renderPlayer(playerObj))
}
getData()

//Event Listeners

likeButton.addEventListener("click", getLikes)
goalForm.addEventListener("submit", newGoal)

//Event Callbacks

function newGoal(event) {
    event.preventDefault()
    const newGoalObj = {
        // id: 5,
        playerId: parseInt(event.target.previousElementSibling.dataset.id),
        link: event.target['goal-link'].value,
        description: event.target['goal-description'].value
    }
    // debugger
    fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGoalObj)
    })
    .then(resp => resp.json())
    .then(updatedGoals => {
        console.log('success', updatedGoals)
    })
    createGoal(newGoalObj)
}

function getLikes() {
    // pLikes.textContent = `${parseInt(pLikes.textContent) + 1} Likes`
    fetch("http://localhost:3000/players/1", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: `${parseInt(pLikes.textContent) + 1}`
        })
    })
    .then(resp => resp.json())
    .then(updatedLikes => {
        // console.log('success', updatedLikes)
        pLikes.textContent = `${updatedLikes.likes} Likes` 
    })
}

//Rendering functions
function renderPlayer(data) {
    playerImg.src = data.photo
    playerImg.alt = data.name 
    h2Name.textContent = data.name 
    emNickname.textContent = data.nickname
    playerImg.parentElement.dataset.id = data.id 
    pLikes.textContent = `${data.likes} Likes`

    renderGoals(data.goals)
}

function renderGoals(goals) {
    goals.forEach(goal => {
        createGoal(goal)
    })

}

function createGoal(goal) {
    const li = document.createElement("li")
    const goalP = document.createElement("p")
    const goalA = document.createElement("a")
    goalP.textContent = goal.description
    li.dataset.id = goal.id 
    li.dataset.playerid = goal.playerId
    goalA.href = goal.link 
    goalA.textContent = goal.link 

    li.append(goalP, goalA)
    goalsUl.append(li)
}