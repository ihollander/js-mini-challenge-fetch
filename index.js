// when page loads 
// fetch info from players/1 
// get that player's information and put into the dom

// -------------------- Deliverable 1 -------------------- //

const playerContainer = document.querySelector("div.player")
const goalsList = document.querySelector("ul")

fetch("http://localhost:3000/players/1")
.then(response => response.json())
.then(player => renderPlayer(player))


function renderPlayer(player) {
    
    const image = document.querySelector("img")
    image.src = player.photo
    image.alt = player.name 
    
    const h2 = document.querySelector("div h2")
    h2.textContent = player.name 
    
    const nickName = document.querySelector("div em")
    nickName.textContent = player.nickname
    
    const likeAmount = document.querySelector("p.likes")
    likeAmount.textContent = `${player.likes} Likes`
    
    const div = h2.closest("div")
    div.dataset.id = player.id 
    
    const playerGoals = player.goals 
    
    playerGoals.forEach(goal => {
        renderGoal(goal)
    });
}

function renderGoal(goal) {
    const newGoal = document.createElement("li")
    const link = document.createElement("a")
    const description = document.createElement("p")

    description.textContent = goal.description

    link.href = goal.link 
    link.target = "_blank"
    link.textContent = goal.link

    newGoal.append(link, description)
    goalsList.append(newGoal)
}
/*

const displayPlayer = document.createElement("div")
displayPlayer.innerHTML = 
`<img src="${player.photo}" alt="${player.name}">
<h2>${player.name}</h2>
<em>${player.nickname}</em>
<p class="likes">${player.likes} Likes</p>
<button class="like-button">❤️</button>
<h4>Great Goals</h4>
<ul id="goals">
<li>${player.goals[0].link}</li>
<li>${player.goals[1].link}</li>
</ul>`
*/

// -------------------- Deliverable 2 -------------------- //

// - what event are we listening for (click on the like button)
// - what happens? (patch request with fetch to players/1)
// - increase like count by 1 

const likeButton = document.querySelector("button.like-button")
const likeDisplay = document.querySelector("p.likes")

likeButton.addEventListener("click", () => {
    let likeCount = parseInt(likeDisplay.textContent)
    fetch("http://localhost:3000/players/1", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            likes: likeCount + 1
        })
    })
    .then(response => response.json())
    .then(playerData => {
        console.log(playerData)
        likeDisplay.textContent = `${playerData.likes} Likes`})
    })
    
    
    // -------------------- Deliverable 3 -------------------- //
    
    // - listening for a submit event on a form 
    // - capturing entered data and sending a post request via fetch 
    // - add link & description to DOM
    
    const form = document.querySelector("form")
    
    form.addEventListener("submit", event => {
        event.preventDefault()
        const id = parseInt(document.querySelector("div").dataset.id)

        const newGoal = {
            playerId: id,
            link: form.link.value,
            description: form.description.value
        }

        renderGoal(newGoal)
    
    fetch("http://localhost:3000/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newGoal)
        })
        .then(response => response.json())
        .then(goalsInfo => console.log(goalsInfo))
})





