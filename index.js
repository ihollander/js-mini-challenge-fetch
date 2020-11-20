
//player attributes
const playerName = document.querySelector("h2")
const playerImage = document.querySelector(".player img")
const playerLikes = document.querySelector(".player p")
const playerNickname = document.querySelector("em")
//added player number to html
const playerNumber = document.querySelector("#player-number")

//page attributes
const ul = document.querySelector("#goals")
const liker = document.querySelector(".like-button")
const videoForm = document.querySelector("#new-goal-form")


//make network request to API
fetch("http://localhost:3000/players/1")
  //promise 1
  .then(response => response.json())
  //promise 2
  .then(playerObj => {
    //use data response from API
    playerImage.src = playerObj.photo
    playerImage.alt = playerObj.name 
    playerName.textContent = playerObj.name 
    playerNickname.textContent = playerObj.nickname
    playerNumber.textContent = `Player Number: ${playerObj.number}`
    playerImage.parentNode.dataset.id = playerObj.id 
    playerLikes.textContent = `${playerObj.likes} Likes`
    playerObj.goals.forEach(goal => {
          renderGoal(goal)
    })
  })

//Goal Video Submit 
videoForm.addEventListener("submit", function(event) {
  event.preventDefault()
  const newGoal = {
      //got stuck here - keep getting "null" for player-id :(
        //never mind figured out that player is a sibling element NOT a parent!!!
      playerId: event.target.previousElementSibling.getAttribute("data-id"),
      link: event.target['goal-link'].value,
      description: event.target['goal-description'].value
      
  }
  
  //make POST request to API
  fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      //turn object into string
      body: JSON.stringify(newGoal)
  })
  .then(response => response.json())
  .then(newGoal => {
    //use response to render new goal
    renderGoal(newGoal)
  })
  
})

//render goal func
function renderGoal(goal) {
  const li = document.createElement("li")
  const pTag = document.createElement("p")
  const aTag = document.createElement("a")
  
  li.dataset.id = goal.id 
  li.dataset.playerid = goal.playerId

  pTag.textContent = goal.description
  aTag.href = goal.link 
  aTag.textContent = goal.link 

  li.append(pTag, aTag)
  ul.append(li)
}


liker.addEventListener("click", function () {
  //PATCH request..currently hardcoded to only update player 1
  fetch("http://localhost:3000/players/1", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          likes: `${parseInt(playerLikes.textContent) + 1}`
      })
  })
  .then(response => response.json())
  //bug: my likes only show after I refresh the page :(
    //fixed ! for some reason the above bug ocurred when using bracket notation ${updatedLikes[likes]}
  .then(updatedLikes => {
      playerLikes.textContent = `${updatedLikes.likes} Likes` 
  })
})

















