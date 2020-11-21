//DELIVERABLE 1
//When page loads:
//Diaplay player1 info- name, nickname, photo, likes, goals
//Fetch player info 



fetch('http://localhost:3000/players')
    .then(resp => resp.json())
    .then(player => renderPlayer(player[0]))

//grab player id
// const playerId = 

function renderPlayer(player){
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

const goalUl = document.querySelector("#goals")

function renderGoal(goal){
    const li = document.createElement("li")
    li.dataset.id = goal.id

    const pTag = document.createElement("p")
    pTag.textContent = goal.description

    const aTag = document.createElement("a")
    aTag.href = goal.link
    aTag.textContent = goal.link
    aTag.target = "_blank"

    li.append(p, a)
    goalUl.append(li)
}


// DELIVERABLE 2
// When like button is clicked,
// increment player's likes by 1 

const likeButton = document.querySelector(".like-button")
const likesClass = document.querySelector(".likes")

const increaseLikes = likeButton.addEventListener("click", function(event){
    if(event.target.className === "like-button"){
        const likes = parseInt(likesClass.textContent) 
        likesClass.textContent = likes + 1 + "Likes"
        const id = likesClass.dataset.id

// Persist Likes data using fetch
// include player id in url request
// When like button is clicked -> POST /players/:id

    fetch(`http://localhost:3000/players/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
        body: JSON.stringify({
            "likes": likes
            })
    })
    .then(resp => resp.json())
    .then(data => {
        console.log('Success:', data)
    })
    }

})

// DELIVERABLE 3
// When user submits form, 
// New goal video should be displayed
// Persist video

const goalForm = document.querySelector("#new-goal-form")

goalForm.addEventListener("submit", function(event){
    event.preventDefault()
    const link = event.target.link.value
    const description = event.target.link.value

    const lastGoalId = document.querySelector('#goals').lastChild.dataset.id
    const newGoalId = parseInt(lastGoalId) + 1

    const newGoal = {
        id: newGoalId,
        link: link,
        description: description
    }

    fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
        body: JSON.stringify(newGoal) 
        })
        .then(response => response.json())
        .then(data => {
            renderGoal(newGoal)
        })

    event.target.reset()
})
