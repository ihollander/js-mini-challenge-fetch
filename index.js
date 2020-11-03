const url = "http://localhost:3000/players"
const playerContainer = document.querySelector('div.player-container')
const playerForm = document.querySelector('#new-player-form')

document.addEventListener('DOMContentLoaded', () => {

// Deliverable 1: Fetch Players
   fetch(url)
  .then(response => response.json())
  .then(playersArray => {
    //   console.log(playersArray)
      allPlayer(playersArray)
    })

      function allPlayer(playersArray)  {
      playersArray.forEach(onePlayer)}

    //   allPlayer(playersArray) 

    function onePlayer(player) {
      let playerDiv = document.createElement('div')
      playerDiv.classList.add("player")
      playerDiv.dataset.id = player.id 
      playerDiv.innerHTML= `
      <h3>${player.name} (<em>${player.nickname}</em>)</h3>
      <img src="${player.photo}" alt="${player.name}">
      <p class="likes">${player.likes} likes</p>
      <button class="like-button">❤️</button>
      `
      playerContainer.append(playerDiv)}

    //  Deliverable 2: Create Player **When a user submits the form**, the new player should be persisted in the database
    // In order to save the player to the database, you will need to make a request using `fetch`:

        playerForm.addEventListener('submit', (event) =>{
            event.preventDefault()

            playerObj = {
                name: event.target.name.value,
                number: event.target.number.value,
                nickname: event.target.nickname.value,
                photo: event.target.photo.value,
                likes: 0,
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerObj),
                })
                .then(response => response.json())
                .then(newPlayerObj => {
                    onePlayer(newPlayerObj)
                    event.target.reset()
                })
        })

        // Deliverable 3: Like Button
        // When a user clicks the like button for a player, that player's likes should increase by 1. The player's updated likes should persist on the server, and also be displayed on the page.
        // To persist the likes, you will need to make a request using fetch. Make sure you can access to the player's id, since you will need that information to put together the URL for the fetch request.

        playerContainer.addEventListener('click',(event) => {
           
            if (event.target.matches(".like-button")) {
                const button = event.target
                const playerCard = button.closest(".player") 
                const id = playerCard.dataset.id 
                const playerLikes = playerCard.querySelector(".likes")
                const likeNums = parseInt(playerLikes.innerText) + 1

                // console.log(likeNums)

                fetch(`http://localhost:3000/players/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({likes: likeNums}),
                    })
                    .then(response => response.json())
                    .then(newPlayerdata => {
                        playerLikes.innerHTML = `${newPlayerdata.likes} likes` 
                    })
            }
            })


        })
   



