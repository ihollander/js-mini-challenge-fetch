function fetcher() {
    return fetch('http://localhost:3000/players/1')
    .then(result => result.json())
    .then(playerObject => renderPlayerObject(playerObj))
}
fetcher()

const image = document.querySelector('.player img')
const headerName = document.querySelector('.player h2')
const nickname = document.querySelector('.player em')
const likes = document.querySelector('.player p')

function renderPlayerObject(player) {
    image.src = player.photo
    image.alt = player.name
    image.parentElement.dataset.id = player.id
    headerName.textContent = player.name
    nickname.textContent = player.nickname
    likes.textContent = '${player.likes} likes'
    renderGoals(player.goals)
}

function renderGoals(goals) {
    goals.forEach(goal => {
        newGoal(goal)
    })
}

function newGoal(goal) {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const a = document.createElement('a')
    p.textContent = goal.description
    li.dataset.id = goal.id
    li.dataset.playerId = goal.playerId
    a.href = goal.link
    a.textContent = goal.link
    li.append(p, a)
    document.querySelector('#goals').append(li)
}

document.querySelector('.like-button').addEventListener('click', likeAction)

function likeAction() {
    fetch('http://localhost:3000/players/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
        body: JSON.stringify ({
            likes: '${parseInt(likes.textContent) + 1}'
        })
    })
    .then(result => result.json())
    .then(likesNew => {
        likes.textContent = '${likesNew.likes} likes'
    })
}
