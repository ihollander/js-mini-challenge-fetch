const playerContainer = document.querySelector(".player-container")
const header = (document.querySelector("h1#header"))
const newPlayerForm = (document.querySelector("#new-player-form"))

// render one player to the DOM
function renderPlayer(player) {
  // create an element for the outer div
  const playerDiv = document.createElement("div")

  // set attributes on the outer div
  playerDiv.className = "player"
  playerDiv.dataset.number = player.number
  playerDiv.dataset.id = player.id

  // use innerHTML to create any child elements of the div
  playerDiv.innerHTML = `
    <h3>${player.name} (<em>${player.nickname}</em>)</h3>
    <img src="${player.photo}" alt="${player.name}">
    <p class="likes">${player.likes} likes</p>
    <button class="like-button">❤️</button>
  `

  // append the element to the container
  playerContainer.append(playerDiv)
}


//Code From Events Challenge

function toggleColor(element) {
    if (element.style.color === "red") {
        element.style.color = "black"
    } else {
        element.style.color = "red"
    }
}

//Event Listeners

document.addEventListener('click', event => {
    if (event.target === header) {
        toggleColor(header)
    }
    else if (event.target.className === 'like-button') {
        addLikes(event)
        
    }
})

newPlayerForm.addEventListener('submit', event => {
    event.preventDefault()
    let player = {}
    player.number = event.target.number.value
    player.name = event.target.name.value
    player.nickname = event.target.nickname.value
    player.photo = event.target.photo.value
    player.likes = 0
    submitForm(player)  
})

// Deliverale 1

fetch('http://localhost:3000/players')
  .then(response => response.json())
  .then(data => data.forEach(renderPlayer))

  // Deliverable 2

function submitForm(player) {
    fetch('http://localhost:3000/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    })
    .then(response => response.json())
    .then(renderPlayer)
}

// Devliverable 3

function addLikes(event) {
    const playerDiv = event.target.parentNode
    const likeTag = playerDiv.querySelector('p')
    const likes = parseInt(likeTag.innerText, 10)
    const id = playerDiv.dataset.id

    fetch(`http://localhost:3000/players/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({likes: likes + 1}),
    })
    .then(response => response.json())
    .then(likeTag.innerText = `${likes + 1} likes`)
}