//variables
const playerContainer = document.querySelector(".player-container")
const header = document.querySelector("h1#header")
const newPlayerForm = document.querySelector("#new-player-form")

//functions + handlers
function renderPlayer(player) {
    const playerDiv = document.createElement("div")
    playerDiv.className = "player"
    playerDiv.id = player.id
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

fetch("http://localhost:3000/players")
.then(response => response.json())
.then(data => renderEachPlayer(data))    


function toggleColor(element) {
    if (element.style.color === "red") {
        element.style.color = "black"
    } else {
        element.style.color = "red"
    }
}

function handleToggleColor(e) {
    toggleColor(e.target)
}

//event listeners
newPlayerForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const number = e.target.number.value
    const name = e.target.name.value
    const nickname = e.target.nickname.value
    const photo = e.target.photo.value
    
    const playerObj = {
        number: number,
        name: name,
        nickname: nickname,
        photo: photo,
        likes: 1000
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

header.addEventListener('click', handleToggleColor)

playerContainer.addEventListener('click', function (e) {
    if (e.target.matches(".like-button")) {
        const likeButton = e.target
        const playerDiv = likeButton.closest(".player")
        const likesPtag = playerDiv.querySelector(".likes")
        const likesCount = parseInt(likesPtag.textContent.replace(' likes',''))
        likesPtag.textContent = likesCount + 1 + ' likes'
        const playerId = playerDiv.id
        const updatedLikes = { likes: parseInt(likesPtag.textContent) }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedLikes)
        };
        
        fetch(`http://localhost:3000/players/${playerId}`, configObj)
        .then(response => response.json())
        .then(data => console.log("Success", data))
    }
})


