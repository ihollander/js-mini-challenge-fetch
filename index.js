const playerContainer = document.querySelector(".player-container")

function renderPlayer(player) {
  const playerDiv = document.createElement("div")
  playerDiv.className = "player"
  playerDiv.setAttribute("player-id", player.id)
  playerDiv.dataset.number = player.number
  playerDiv.innerHTML = `
    <h3>${player.name} (<em>${player.nickname}</em>)</h3>
    <img src="${player.photo}" alt="${player.name}">
    <p>Jersey #${player.number}</p>
    <p class="likes">${player.likes} likes</p>
    <button class="like-button">❤️</button>
    `
  playerContainer.append(playerDiv)

  //******DELIVERABLE #3 ************************
  const likeButton = playerDiv.querySelector("button.like-button")
  const showLikes = playerDiv.querySelector("p.likes")
  likeButton.addEventListener("click", increaseLikes)

  function increaseLikes() {
  player.likes++ ;
    
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
      body: JSON.stringify({ likes: player.likes })
  }
    return fetch("http://localhost:3000/players" + `/${player.id}`, configObject)
      .then(function(response){
        return response.json()
    }).then(function(data){
        showLikes.textContent = `${player.likes} likes.`
    }) .catch(function(error) {
        alert(error.message)
    })
  }
}
//***************************************************

function toggleColor(element) {
  if (element.style.color === "red") {
    element.style.color = "black"
  } else {
    element.style.color = "red"
  }
}

header.addEventListener("click", function() {
  toggleColor(document.querySelector("h1#header"))
})

const newPlayerForm = document.querySelector("#new-player-form")

newPlayerForm.addEventListener("submit", function(event) {
  event.preventDefault()

  const number = event.target.number.value
  const name = event.target.name.value
  const nickname = event.target.nickname.value
  const photo = event.target.photo.value

  const playerObj = {
    number: number,
    name: name,
    nickname: nickname,
    photo: photo,
    likes: 0
  }

  //DELIVERABLE #2 ****************************
  const data = playerObj

  fetch("http://localhost:3000/players", {
  method: "POST", 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(playerObj),
  })
  .then(response => response.json())
  .then(newPlayerObj => {
    renderPlayer(newPlayerObj);
  })

  event.target.reset()
})


//DELIVERABLE #1 *****************

//***new helper method */
function renderAllPlayers(playerData) {
  playerData.forEach(renderPlayer)
}

function initialize () {
  fetch("http://localhost:3000/players")
  .then(response => response.json())
  .then(playerArray => {
    renderAllPlayers(playerArray)
  })
}

initialize ()


