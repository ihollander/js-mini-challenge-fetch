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
