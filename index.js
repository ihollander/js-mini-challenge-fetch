
fetch('http://localhost:3000/players')
.then(resp => resp.json())
.then(data => {
  // const players = data
  console.log(data)

  data.forEach(renderPlayers)
})
.catch(error => {
  alert("Bad things! Ragnarők!")
  console.log(error.message)
})


const playerContainer = document.querySelector('.player-container')


function renderPlayers(player) {
  const playerDiv = document.createElement('div')

  playerDiv.className = 'player'
  playerDiv.dataset.number = player.id

  playerDiv.innerHTML = `
    <h3>${player.name} (<em>${player.nickname}</em>)</h3>

    <img src=${player.photo} alt=${player.name}>

    <p>${player.likes} Likes</p>

    <button class="like-button">❤️</button>
  `

  playerContainer.append(playerDiv)
}

const playerForm = document.querySelector('#new-player-form')

playerForm.addEventListener("submit", event => {
  event.preventDefault()

  const form = event.target

  const playerObj = {
    number: form.number.value,
    name: form.name.value,
    nickname: form.nickname.value,
    photo: form.photo.value,
    likes: 1000
  }

  updateData(playerObj, form)
})

function updateData(playerObj, form) {
  const configObj = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(playerObj)
  }

  console.log(configObj)

  fetch('http://localhost:3000/players', configObj)
  .then (resp => resp.json())
  .then (data => {
    renderPlayers(playerObj)
    form.reset()
    console.log(data)
  })
  .catch(error => {
    alert("Bad things! Ragnarők!")
    console.log(error.message)
  })
}

playerContainer.addEventListener("click", e => {
  if (e.target.matches('.like-button')) {
    const button = e.target
    console.log(button)

    const player = button.parentElement
    console.log(player)

    const playerId = player.dataset.number
    console.log(playerId)

    const likes = player.querySelector('p')

    let likesContent = likes.innerHTML
    console.log(likesContent)

    const currentLikes = parseInt(likesContent)
    console.log(currentLikes)

    const newLikes = currentLikes + 1
    console.log(newLikes)

    updateLikes(playerId, newLikes, likes)
  }
})

function updateLikes(playerId, newLikes, likes){
  const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
  }

  fetch(`http://localhost:3000/players/${playerId}`, configObj)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    likes.innerHTML = `${newLikes} Likes`
  })
}
    


