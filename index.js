
let playerObj = "http://localhost:3000/players/1"

document.addEventListener('DOMContentLoaded', function() {
    fetchPlayer()
})

function fetchPlayer() {
    return fetch(playerObj)
    .then(res => res.json())
    .then(player => renderPlayer(player))
}

function renderPlayer(player) {
    const img = document.querySelector(".player img")
    img.src = player.photo
    img.alt = player.name

    const name = document.querySelector(".player h2")
    name.textContent = player.name

    const nickname = document.querySelector(".player em")
    nickname.textContent = player.nickname

    const likes = document.querySelector(".player .likes")
    likes.textContent = `${player.likes} Likes`

    player.goals.forEach(renderGoal)
}

function fetchLikes() {
    return fetch(playerObj)
    .then(res => res.json())
    .then(player => addLike(player))
}

const heartBtn = document.querySelector(".like-button")

heartBtn.addEventListener("click", addLike)

function addLike(player) {
    player.likes += 1
}


function fetchGoalVideo() {
    return fetch(playerObj)
    .then(res => res.json)
    .then(video => addVideo(video))
}


document.querySelector("#new-goal-form").addEventListener("submit", e => {
  e.preventDefault()

  const newVideo = {
    link: e.target.link.value, 
    description: e.target.description.value
    
  }

  goals.append(newVideo)
})


