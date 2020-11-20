const playerURL = "http://localhost:3000/players/1"
const name = document.querySelector("h2")
const nickname = document.querySelector("em")
const photo = document.querySelector("img")
const popularity = document.querySelector(".likes")
const score = document.querySelector("ul")
const form = document.querySelector("#new-goal-form")

function load() {
    return fetch (playerURL)
    .then(response => response.json())
    .then(playerOne => renderPlayer(playerOne))
}
load()

function renderPlayer(playerOne){
    name.textContent = playerOne.name 
    nickname.textContent = playerOne.nickname
    photo.src = playerOne.photo
    popularity.textContent = playerOne.likes 
    renderScore(playerOne.goals)
    //A goal has a link and a description and its within the playerOne 
    // const playerGoals =  Object.keys(playerOne.goals)
    // playerGoals.forEach()
}
// This one will render the score thats within
function renderScore(goals) {
    goals.forEach(goal => {
        createGoal(goal)
    })

}
// Will create the goals using elements 
function createGoal(goal) {
    const li = document.createElement("li")
    const p = document.createElement("p")
    const a = document.createElement("a")
    p.textContent = goal.description
    a.href = goal.link
    a.textContent = goal.link
    li.append(a)
    li.append(p)
    score.append(li)
}
//// Deliverable 2 ///////

popularity.addEventListener("click", playerLikes)

function playerLikes(){
    fetch("http://localhost:3000/players/1", {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            likes: `${parseInt(popularity.textContent)+ 1 }`
        }),
        })
        .then(response => response.json())
        .then(updatedLikes =>{
            // console.log('sucess' updatedLikes)
            popularity.textContent = `${updatedLikes.likes} Likes`
        })
}


///// Deliverable 3 ///// 
form.addEventListener("submit", goalForm)

function goalForm(event){
    event.preventDefault()
    let goalVideo = {}
    const link = event.target.link.value
    const description = event.target.description.value
    goalVideo.link = link
    goalVideo.description = description
    fetch("http://localhost:3000/goals", {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(goalVideo),
    })
    .then(response => response.json())
    .then(updatedGoals => {
        console.log('success', updatedGoals)
    })
     createGoal(goalVideo)
}
