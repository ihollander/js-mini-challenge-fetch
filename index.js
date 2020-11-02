fetch("http://localhost:3000/players")
.then(response => response.json())
.then(playerArray =>{
    playerArray.forEach(player =>{
        renderPlayer(player)
    })
})



/***** Beginning of Starter Code ****/

const playerContainer = document.querySelector(".player-container")

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

// for each player in the array, render to the DOM
// PLAYERS.forEach(renderPlayer)

/***** End of Starter Code ****/




/***** Deliverable 1 *****/
function toggleColor(element) {
  if (element.style.color === "red") {
    element.style.color = "black"
  } else {
    element.style.color = "red"
  }
}

//find dom object
const header = document.querySelector('#header')
//add listener to object
header.addEventListener('click', function(){
  toggleColor(header)
  // click
  // work
})

/***** Deliverable 2 *****/
//find form object
const form = document.querySelector('#new-player-form')
const submitBtn = form.querySelector('[type=submit]')

form.addEventListener('submit', function(e){
    e.preventDefault()
    const formInfo = e.target
    const playerObj = {
        number: formInfo.number.value,
        name: formInfo.name.value,
        nickname: formInfo.nickname.value,
        photo: formInfo.photo.value,
        likes: 0
    }

    formInfo.reset()

    const playerObjConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(playerObj)
    }

    fetch("http://localhost:3000/players", playerObjConfig)
    .then(response => response.json())
    .then(renderPlayer)
})
//prevent default event on the form so it don't make a request
  //submit event
//use renderPlayer function to add a player to bottom of page
  // need players in the same format


/***** Deliverable 3 *****/
const playerParentCont = document.querySelector('.player-container')

playerParentCont.addEventListener('click', function(e){

  if (e.target.matches('.like-button')) {



    const playerParent = e.target.parentNode
    let likesNode = playerParent.querySelector('.likes')
    let addLikes = parseInt(likesNode.textContent)
    likesNode.textContent = `${addLikes + 1} likes`

    // debugger

    playerLikes = {
        likes: addLikes + 1
    }

    const playerObjConfig = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(playerLikes)
    }

    fetch(`http://localhost:3000/players/${playerParent.dataset.id}`, playerObjConfig)
    .then(response => response.json())
    .then(data => {})
    .catch(console.log)

  }
})