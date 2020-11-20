// when page loads 
// fetch info from players/1 
// get that player's information and put into the dom

// -------------- Deliverable 1 -------------- //

const playerContainer = document.querySelector("div.player")

fetch("http://localhost:3000/players/1")
.then(response => response.json())
.then(player => renderPlayer(player))


function renderPlayer(player) {
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
    playerContainer.append(displayPlayer)
}

// -------------- Deliverable 2 -------------- //

// what event are we listening for (click on the like button)
// what happens? (patch request with fetch to players/1)
// increase like count by 1 

const likeButton = document.querySelector("button.like-button")
const likeDisplay = document.querySelector("p.likes")

likeButton.addEventListener("click", () => {
    console.log("working")
    const likeCount = parseInt(likeDisplay)
    likeDisplay.textContent = `${likeCount + 1} Likes`
})

