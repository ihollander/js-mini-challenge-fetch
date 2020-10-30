//variables for targeting html
const playerContainer = document.querySelector(".player-container")
const newPlayerForm = document.querySelector("#new-player-form")

//functions for handling events and such
function renderPlayer(player) {
    const playerDiv = document.createElement("div")
    playerDiv.className = "player"
    playerDiv.dataset.id = player.id
    playerDiv.dataset.number = player.number
    playerDiv.innerHTML = `
    <h3>${player.name} (<em>${player.nickname}</em>)</h3>
    <img src="${player.photo}" alt="${player.name}">
    <p class="likes">${player.likes} likes</p>
    <button class="like-button">❤️</button>
    `
    playerContainer.append(playerDiv)
} 

function renderEachPlayer(array) {
    array.forEach(renderPlayer)
}

function renderCurrentPlayers() {
    fetch("http://localhost:3000/players")
    .then(response => response.json())
    .then(data => renderEachPlayer(data))
}

//event listeners
newPlayerForm.addEventListener('submit', function (e) {
    e.preventDefault()
    
    const playerObj = {
        number: e.target.number.value,
        name: e.target.name.value,
        nickname: e.target.nickname.value,
        photo: e.target.photo.value,
        likes: 999
      }

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playerObj)
    };
    
    fetch("http://localhost:3000/players", configObj)
    .then(response => response.json())
    .then(newPlayer => {
        renderPlayer(newPlayer)
        console.log("Success", newPlayer)
    })

    e.target.reset()
})

playerContainer.addEventListener('click', function (e) {
    if (e.target.matches(".like-button")) {
        const likeButton = e.target
        const playerDiv = likeButton.closest(".player")
        const likesPtag = playerDiv.querySelector(".likes")
        const likesCount = parseInt(likesPtag.textContent)
        likesPtag.textContent = likesCount + 1 + ' likes'
        const updatedLikes = { likes: parseInt(likesPtag.textContent) }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedLikes)
        };
        
        fetch(`http://localhost:3000/players/${playerDiv.dataset.id}`, configObj)
        .then(response => response.json())
        .then(data => console.log("Success", data))
    }
})

//invoke initial render upon page load
renderCurrentPlayers()