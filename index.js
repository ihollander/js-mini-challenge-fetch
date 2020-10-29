const players = "http://localhost:3000/players"
const playersDiv = document.querySelector(".player-container")
const likeButtons = playersDiv.querySelectorAll('button')

function playerBuilder(playerObj) {
    const player = document.createElement('div')
    player.id = `${playerObj.id}`
    player.className = "player"
    player.dataset.number = `${playerObj.number}`
    player.innerHTML = `
    <h3>
    ${playerObj.name} (<em>${playerObj.nickname}</em>)
    </h3>
    <img src=${playerObj.photo} alt=${playerObj.name}>`

    const likeButton = document.createElement('button')
    likeButton.innerHTML = `${playerObj.likes} Likes!`
    player.append(likeButton)
    likeButton.addEventListener('click', incrementLikes)
    playersDiv.append(player)
}
function allPlayers(arr) {
    arr.forEach(playerBuilder)
}

const incrementLikes = event => {
    event.target.innerHTML = `${parseInt(event.target.innerHTML) + 1} Likes!`
    const id = event.target.closest('.player').id
    const newLikes = 
    {
        likes: parseInt(event.target.innerHTML)
    }

    configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLikes)
    };

    fetch(`http://localhost:3000/players/${id}`
    , configurationObject)
    .then(response => response.json())
    .then(data => console.log("Success", data))
}


fetch(players)
.then(response => response.json())
.then(data => allPlayers(data))


const playerForm = document.querySelector("#new-player-form")

playerForm.addEventListener("submit", event => {
    // event.preventDefault()
    const number = event.target.number.value
    const name = event.target.name.value
    const nickname = event.target.nickname.value
    const photo = event.target.photo.value
    const newPlayer = 
    {
        number: number,
        name: name,
        nickname: nickname,
        photo: photo,
        likes: 1000
    }

    configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer)
    };
    
    fetch(players, configurationObject)
    .then(response => response.json())
    .then(data => console.log("Success", data))

    event.target.reset()
})



