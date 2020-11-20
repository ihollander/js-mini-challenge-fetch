/******* Deliverable 1 *******/
// When the application loads, display all the information about the first player on the page, including name, nickname, photo, likes and goals.

/*********** DOM Elements *********/
const playerContainer = document.querySelector('.player')

/*********** FETCH *********/
// fetch("http://localhost:3000/players/1")
// .then(response => response.json())
// .then(data => renderPlayer(data))


/********** Initial Render ********/
const playerLikes = document.querySelector(".likes")
const playerGoals = document.querySelector("#goals")
const likesButton = document.querySelector('.like-button')
const goalForm = document.querySelector('#new-goal-form')
const goalList = document.querySelector("#goals")
const formBtn = document.querySelector("#formButton")




function renderPlayer(playerObj) {
    const playerh2 = document.querySelector(".player h2")
    const playerem = document.querySelector(".player em")
    const playerImage = document.querySelector(".player img")
     
    
    playerh2.textContent = playerObj.name
    playerem.textContent = playerObj.nickname
    playerImage.src = playerObj.photo
    playerLikes.textContent = playerObj.likes 
    
    playerObj.goals.forEach(function(goal) {
        const li = document.createElement('li')
        const iframe = document.createElement('iframe')

        iframe.src = goal.link
        iframe.width = "420" 
        iframe.height = "315"
        li.textContent = goal.description
        
        playerGoals.append(iframe)
        playerGoals.append(li)
        
    })



}

/******* Deliverable 2 *******/
// When a user clicks the like button for a player, that player's likes should increase by 1. The player's updated likes should persist on the server, and also be displayed on the page.

/*********** DOM Elements *********/

/*********** Event Listener *********/
likesButton.addEventListener("click", updateLikes)
/*********** FETCH *********/
function updateLikes(){

fetch("http://localhost:3000/players/1", {
method: 'PATCH',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    likes: parseInt(playerLikes.textContent) + 1
    
}),
})
.then(response => response.json())
.then(data => {
    console.log(data)
    playerLikes.textContent = data.likes  
      
})
}

/********** Event Handler ********/
// function incrementLike(data){
//     const likes = parseInt(data) + 1
//     data  = likes
// }


/********** Initial Render ********/
document.addEventListener("DOMContentLoaded",function(){
    fetch("http://localhost:3000/players/1")
.then(response => response.json())
.then(data => renderPlayer(data))
})

/********** Deliverable 3 ********/
/*When a user submits the form**, a new goal video should be displayed for the player. The new goal video should also persist in the backend, so when you refresh the page, you can still see the new goal video.*/
//goalForm
//goalList
// function addGoals (event) {
// event.preventDefault()

// const goalObj = {
//    playerId: 1,
//    link: event.target.value
// }


// const postForm = function(event) {
//     fetch("http://localhost:3000/goals", {
// method: 'POST',
// headers: {
// 'Content-Type': "application/json",
// },
// body: JSON.stringify({
//         playerId: 1,
//         link: event.target.link.value,
//         description: event.target.description.value

// }),
// })


//     .then(response => response.json())
//     .then(data => {console.log("Success", data)})
// }

/********** Event Listener ********/
goalForm.addEventListener("submit", handleGoalFormSubmit)

/********** Render Form ********/

function renderGoals (goalObj) {
    const iframe = document.createElement('iframe')
    const li = document.createElement('li')

    iframe.src = goalObj.link
    li.textContent = goalObj.description

    goalList.append(iframe)
    goalList.append(li)
}

function handleGoalFormSubmit (event) {
    event.preventDefault()

    const goalObj = {
    link: event.target.link.value,
    description: event.target.description.value
}
fetch("http://localhost:3000/goals", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goalObj),
  })
    .then(response => response.json())
    .then(newGoalObj => {
        renderGoals(newGoalObj)
    })
}


