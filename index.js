// Dom elements
const playerName = document.querySelector("h2")
const playerNickname = document.querySelector("em")
const playerLikes = document.querySelector(".likes")
const likesButton = document.querySelector("button")
const playerGoals = document.querySelector("#goals")
const playerImage = document.querySelector("img")
const parsedLikes = parseInt


// // render player

function createPlayerObject(playerObject) {
    const playerObj = {
        id: playerObject.id,
        number: playerObject.number,
        name: playerObject.name,
        nickname: playerObject.nickname,
        photo: playerObject.photo,
        likes: playerObject.likes
    }}

function renderPlayer(playerObject) {
    playerName.textContent = playerObject.name
    playerNickname.textContent = playerObject.nickname
    playerLikes.textContent = `${playerObject.likes} likes`
    playerImage.src = playerObject.photo
    const playerId = playerObject.id

    renderGoals(playerObject)
    // const goalsArray = playerObject.goals

    // for (const key in goalsArray) {
    //     if goalsArray[0].link.createElement("li").playerGoals.append
    //     const goalLi = document.createElement("li")
    //     goalLi.textContent = `${goalsArray[0]["link"]},  ${goalsArray[0]["description"]}`
    //     playerGoals.append(goalLi)
    // }
    // playerObject.goals {
    //     goalLi.innerText = goals.link
    //     playerGoals.append(goalLi)
    // }
}

const renderGoals = (playerObject) => {
    playerObject.goals.forEach((goal) => {
        const linkLi = document.createElement("li")
        const descriptionLi = document.createElement("li")
        linkLi.textContent = goal.link
        descriptionLi.textContent = goal.description
        playerGoals.append(linkLi)
        playerGoals.append(descriptionLi)
    })
}

function createPlayerObject(playerObject) {
    const playerObj = {
        id: playerObject.id,
        number: playerObject.number,
        name: playerObject.name,
        nickname: playerObject.nickname,
        photo: playerObject.photo,
        likes: playerObject.likes
    }}


likesButton.addEventListener("click", likeButtonClick)


function likeButtonClick(event) {
    if (event.target === likesButton) {
        const newLikes = parseInt(playerLikes.textContent) + 1
        playerLikes.textContent = `${newLikes} likes`
        fetch(" http://localhost:3000/players/1", {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({likes: newLikes}),
    })
        .then(response => response.json())
        .then(playerObject => {
            // renderPlayer(playerObject)
    }   )}
    }




//Fetch request

fetch(" http://localhost:3000/players/1")
.then(response => response.json())
.then(playerObject => {
    renderPlayer(playerObject)
    createPlayerObject(playerObject)

})

// fetch(" http://localhost:3000/players/1", {
//     method: 'PATCH',
//     headers: {
//         'content-type': 'application/json',
//     },
//     body: JSON.stringify(playerLikes)
//     .then(response => response.json())
//     .then(playerObject => {
//         renderPlayer(playerObject)
// })})