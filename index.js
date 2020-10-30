const playersData = "http://localhost:3000/players"
const playerContainer = document.querySelector(".player-container")

// DELIVERABLE #1

// get player data
fetch(playersData)
    .then(response => response.json())
    .then(data => buildPlayerElements(data))

// build all players
function buildPlayerElements(data) {
    data.forEach(buildPlayer)
}

// build one player
function buildPlayer(player) {
    const div = document.createElement("div")
    div.classList.add("player")
    div.setAttribute("player-id", player.id)
    div.innerHTML = 
        `<h3>${player.name}</h3>
        <img src="${player.photo}">
        <div><strong>Number:</strong> ${player.number}</div>
        <div><strong>Nickname:</strong> ${player.nickname}</div>
        <div class="likes">${player.likes} likes</div>
        <button class="like-button">❤️</button>`
    playerContainer.append(div)
    
    // DELIVERABLE #3
    const likeButton = div.querySelector("button.like-button")
    likeButton.addEventListener("click", addLike)
    function addLike() {
        player.likes++;
        
        let configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ likes: player.likes })
        }
        
        return fetch(`http://localhost:3000/players/${player.id}`, configObject)
            .then(function(response){
                return response.json()
            }).then(function(data){
                div.querySelector("div.likes").textContent = `${player.likes} likes`
            }) .catch(function(error) {
                alert(error.message)
            })
    }
    // END OF DELIVERABLE #3
}
// END OF DELIVERABLE #1

// DELIVERABLE #2
const newPlayerForm = document.querySelector("#new-player-form")
function getNewPlayer() {
    const player = {
        number: newPlayerForm.number.value,
        name: newPlayerForm.name.value,
        nickname: newPlayerForm.nickname.value,
        photo: newPlayerForm.photo.value,
        likes: 0
    }
    return player
}

function submitData(player) {
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(player)
    }

    return fetch("http://localhost:3000/players", configObject)
        .then(function(response){
            return response.json()
        }).then(function(data){
            buildPlayer(data)
        }) .catch(function(error) {
            alert(error.message)
        })
}

newPlayerForm.addEventListener("submit", submitNewPlayer);
function submitNewPlayer(event) {
  event.preventDefault();
  const newPlayer = getNewPlayer();
  submitData(newPlayer)
  newPlayerForm.reset()
}
// END OF DELIVERABLE #2


// DELIVERABLE #3
// see lines 30 - 53