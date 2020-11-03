# JS Mini Challenge: Fetch

## Instructions

Fork this repo, then run `git clone` to download it locally. Then `cd` into the downloaded directory and open it in your text editor with `code .`.

## Submitting

When you’re finished, run the following commands in your terminal to submit:

```
git add .
git commit -m 'Done'
git push
```

To get feedback on your code, make a [pull request from your forked repo](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). If you worked with a partner, you can tag your partner on the pull request.

## Assignment

We're going to build off the code we worked on in the Events Mini Challenge, and add persistence to our application. That means when we...

- add a new player, or
- 'like' a player 

...those changes should be persisted to our server by making a `fetch` request. We'll also need to make a `fetch` request to get our player data from the server for our initial render of the players.

There's a section in this Readme file for your notes on each deliverable. As you go through the deliverables, write down some notes in this file on how you solved each problem. It'll help reinforce what you learned and give you a head start next time you see a similar problem.

## Setup

This Mini Challenge uses `json-server` to create a RESTful server using a `.json` file. 

First, you'll need to install `json-server` (if you haven't already done so for another assignment). From your terminal, run:

```sh
$ npm install -g json-server
```

Then, we'll need to start `json-server` and have it use the `db.json` file in this directory as its database:

```sh
$ json-server --watch db.json
```

To check if your server is running, open [http://localhost:3000/players](http://localhost:3000/players) in your browser. You should see an array of all the players from the `db.json` file.

## Deliverable 1: Fetch Players

**When the application loads**, all the players should be displayed.

You will need to make a request to the server using `fetch`: 

```
Request:
GET /players

Example Response:
[
  {
    id: 1,
    number: 11,
    name: "Mo Salah",
    nickname: "The Egyptian King",
    photo: "https://cdn.cnn.com/cnnnext/dam/assets/190501145802-mo-salah-exlarge-169.jpg",
    likes: 1000
  },
  {
    id: 2,
    number: 9,
    name: "Roberto Firmino",
    nickname: "Bobby Chompers",
    photo: "https://vignette.wikia.nocookie.net/liverpoolfc/images/f/f3/RFirmino2019.jpeg/revision/latest/scale-to-width-down/340?cb=20190807042207",
    likes: 1000
  },
  ...
]
```

Once you have successfully fetched the players from the server, display them on the page (you can re-use the code from the previous Mini Challenge to display the players).

**YOUR NOTES**
```
- when DOM is loaded (team defer)
- execute fetch request 
- function to render data into DOM 

```

## Deliverable 2: Create Player

**When a user submits the form**, the new player should be persisted in the database.

In order to save the player to the database, you will need to make a request using `fetch`:

```
Request:
POST /players

Headers: 
{ 
  "Content-Type": "application/json"
}

Required Keys in Body:
{ 
  number: number,
  name: "string",
  nickname: "string",
  photo: "string",
  likes: 1000
}

Example Response:
{
  id: 4,
  number: 14,
  name: "Jordan Henderson",
  nickname: "Hendo",
  photo: "https://icdn.empireofthekop.com/wp-content/uploads/2020/03/Jordan-Henderson-640x426.jpg",
  likes: 1000
}
```

*After the player has been persisted*, the new player should be displayed on the bottom of the page (you can reuse your code from the previous Mini Challenge to help with this). 

To check if your fetch request is working, you can look at the `db.json` file to see if your player has been added. You can also try refreshing the page to see if the new player still shows up.

**YOUR NOTES**
```

```

## Deliverable 3: Like Button

**When a user clicks the like button for a player**, that player's likes should increase by 1. The player's updated likes should persist on the server, and also be displayed on the page.

To persist the likes, you will need to make a request using `fetch`. Make sure you can access to the player's *id*, since you will need that information to put together the URL for the `fetch` request.

```
Request:
PATCH /players/:id

Headers: 
{ 
  "Content-Type": "application/json"
}

Required Keys in Body:
{ 
  likes: number
}

Example Response:
{
  id: 4,
  number: 14,
  name: "Jordan Henderson",
  nickname: "Hendo",
  photo: "https://icdn.empireofthekop.com/wp-content/uploads/2020/03/Jordan-Henderson-640x426.jpg",
  likes: 1001
}
```

It's up to you if you'd like to handle this *optimistically* or *pessimistically*.

To check if your fetch request is working, you can look at the `db.json` file to see if the likes for your player has been updated. You can also try refreshing the page to see if the player's likes still show the updated number.

**YOUR NOTES**
```

```
