const playerForm = document.querySelector("#new-player-form")
const playerContainer = document.querySelector(".player-container")
playerContainer.addEventListener("click", handlePlayerContainerClick)
playerForm.addEventListener("submit", playerFormSubmit)

function handlePlayerContainerClick(event) {
    if (event.target.matches(".like-button")) {
      
     
      const button = event.target
    
      const player = button.closest(".player")
      const id = player.dataset.id
 
      const likeCountSpan = player.querySelector(".likes")
    
      const likeCount = parseInt(likeCountSpan.textContent) + 1
      updateLikes(id, likeCount)
        .then(updatedPlayer => {
          console.log('Success:', updatedPlayer);
  
          likeCountSpan.textContent = updatedPlayer.likes
        })
        .catch(error => {
          alert(error)
        })
    }
  }

function createPlayer(playerObj) {
    return fetch('http://localhost:3000/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    })
      .then(response => response.json())
  }

  function updateLikes(id, likeCount) {
    return fetch(`http://localhost:3000/players/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          likes: `${likeCount} likes`
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error("Uh oh! something is wrong")
          }
        })
  }

function playerFormSubmit(event) {
    event.preventDefault()
    
    const playerObj = {
        number: event.target.number.value,
        nickname: event.target.nickname.value,
        name: event.target.name.value,
        photo: event.target.photo.value,
        likes: 0
    }
  
   
    createPlayer(playerObj)
      .then(newplayerObj => {
        
        renderPlayer(newplayerObj)
        console.log('Success:', newplayerObj);
      })
  

    event.target.reset()
  }
  

function renderPlayer(player) {
    // create an element for the outer div
    const playerDiv = document.createElement("div")
    
    // set attributes on the outer div
    playerDiv.className = "player"
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
fetch("http://localhost:3000/players")
.then(function(response) {
    return response.json();
  })
  .then(function(object) {
      object.forEach(renderPlayer)
  })

  