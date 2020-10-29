const playerContainer = document.querySelector(".player-container");
const playerForm = document.getElementById("new-player-form");
const url = "http://localhost:3000/players";

function init() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((player) => {
        renderPlayer(player);
      });
    });
}
function renderPlayer(playerObj) {
  const player = createNode(
    "h3",
    `${playerObj.name} (<em>${playerObj.nickname} 
        - Number: ${playerObj.number}</em>) 
        Likes: ${playerObj.likes} `
  );
  player.className = "playerObj";
  player.style.listStyle = "none";
  const likeBtn = createNode("button", "❤️");
  player.append(addLikeEvent(likeBtn, playerObj));

  playerContainer.append(player, createImg(playerObj));
}

function createNode(elmType, stringContent) {
  let node = document.createElement(elmType);
  node.innerHTML = stringContent;
  return node;
}

function createImg(player) {
  let node = document.createElement("img");
  node.src = player.photo;
  node.alt = player.name;
  node.width = "500";
  node.height = "600";
  return node;
}

function addLikeEvent(likeBtn, playerObj) {
  var likeAmount = 0;
  likeBtn.addEventListener("click", () => {
    likeAmount += 1;
    patch(playerObj, likeAmount);
  });
  return likeBtn;
}

function patch(playerObj, playerLikes) {
  fetch(`${url}/${playerObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes: playerObj.likes + playerLikes }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function post(data) {
  fetch(url, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json ",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function inputValue(str) {
  return document.getElementsByName(str)[0].value;
}

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    number: inputValue("number"),
    name: inputValue("name"),
    nickname: inputValue("nickname"),
    photo: inputValue("photo"),
    likes: 0,
  };

  post(data);
});

init();
