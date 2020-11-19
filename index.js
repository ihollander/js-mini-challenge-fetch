//find elements on DOM

const nameH2 = document.querySelector("h2")
const nickname = document.querySelector("em")
const likes = document.querySelector(".likes")
const heart = document.querySelector(".like-button")
const photo = document.querySelector("img")
const goalsUl = document.querySelector("ul")
const form = document.querySelector("#new-goal-form")

//render player

function loadPlayer(playerObj){
    nameH2.textContent = playerObj.name
    nickname.textContent = playerObj.nickname
    likes.textContent = `${playerObj.likes} Likes`
    photo.src = playerObj.photo
    // const goalsLi = document.createElement("li")
    const goalsArray = playerObj.goals
    goalsArray.forEach(createGoalLi)
}

function createGoalLi(goal){
    const li = document.createElement("li")
    const p = document.createElement("p")
    p.textContent = goal.description
    const a = document.createElement("a")
    a.href = goal.link
    a.textContent = goal.link
    li.append(a)
    li.append(p)
    goalsUl.append(li)
}

//event listeners

heart.addEventListener("click", handleLikes)

form.addEventListener("submit", handleForm)

//event handlers 

function handleLikes(){
    likesCount = parseInt(likes.textContent)
    likesCount = likesCount + 1
    // likes.textContent = `${likesCount} Likes`
    fetch("http://localhost:3000/players/1", {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            likes: likesCount
        }),
        })
        .then(response => response.json())
        .then(updatedPlayer =>{
            console.log(updatedPlayer)
            likes.textContent = `${updatedPlayer.likes} Likes`
        })
}

function handleForm(event) {
    event.preventDefault()
    let newGoal = {}
    const linkInput = event.target.link.value
    const descInput = event.target.description.value
    newGoal.link = linkInput
    newGoal.description = descInput
    // newGoal.playerId = 1

    fetch("http://localhost:3000/goals", {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGoal),
    })
    .then(response => response.json())
    .then(returnedGoalObj => {
        console.log(returnedGoalObj)
       return createGoalLi(returnedGoalObj)
    })
    newGoal.target.reset
}


//initialize

function initialize() {
    fetch("http://localhost:3000/players/1")
    .then (response => response.json())
    .then (playerObj => loadPlayer(playerObj))
 }

initialize()