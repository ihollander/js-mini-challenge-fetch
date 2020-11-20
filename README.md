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

- 'like' a player 
- add a new goal

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
$ json-server --watch db.json --routes routes.json
```

To check if your server is running, open [http://localhost:3000/players/1](http://localhost:3000/players/1) in your browser. You should see a `player` object with an array of goals, just like we had hard-coded into our application before.

## Deliverable 1: Initial Render

**When the application loads**, display all the information about the first player on the page, including *name*, *nickname*, *photo*, *likes* and *goals*.

You will need to make a request to the server using `fetch`: 

```
Request:
GET /players/1

Example Response:
{
  id: 1,
  number: 11,
  name: "Mo Salah",
  nickname: "The Egyptian King",
  photo: "https://cdn.cnn.com/cnnnext/dam/assets/190501145802-mo-salah-exlarge-169.jpg",
  likes: 1000,
  goals: [
    {
      id: 1,
      playerId: 1,
      link: "https://youtu.be/mKY-kheEhBo",
      description: "A beautiful long-range goal, straight into the corner. Keeper had no chance!"
    },
    {
      id: 2,
      playerId: 1,
      link: "https://youtu.be/mJ8XGUgvoAM",
      description: "Fantastic strength to hold off a pair of defenders and place it beyond Pickford's reach"
    }
  ]
}
```

Once you've fetched the player, display the player in the DOM. You can re-use code from your previous Mini Challenges if you'd like, but you're encouraged to write the DOM Manipulation code from scratch for practice.

**YOUR NOTES**
```


I first rendered the player to the page using innerHTML but then was unable to isolate the button / likes elements on the page (they were returning null) so had to redo creating the individual attributes. Is there a way to do it with innerHTML?
```

## Deliverable 2: Like Button

**When a user clicks the like button for a player**, that player's likes should increase by 1. The player's updated likes should persist on the server, and also be displayed on the page.

Feel free to reuse your event handling code from the previous mini challenge, but you're encouraged to write it from scratch for practice.

To persist the likes, you will need to make a request using `fetch`. Make sure you include the player's *id* in the URL for the request.

```
Request:
PATCH /players/1

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
  id: 1,
  number: 11,
  name: "Mo Salah",
  nickname: "The Egyptian King",
  photo: "https://cdn.cnn.com/cnnnext/dam/assets/190501145802-mo-salah-exlarge-169.jpg",
  likes: 1001,
}
```

It's up to you if you'd like to handle this *optimistically* or *pessimistically*.

To check if your fetch request is working, you can look at the `db.json` file to see if the likes for your player has been updated. You can also try refreshing the page to see if the player's likes still show the updated number.

**YOUR NOTES**
```
I originally had newConst outside of the event listener, but it kept returning NaN and causing the db to persist a null value for the likes. Once I moved it inside, it worked correctly. I couldn't figure out why :(
```

## Deliverable 3: Add Goal Video

**When a user submits the form**, a new goal video should be displayed for the player. The new goal video should also persist in the backend, so when you refresh the page, you can still see the new goal video.

Here's a nice goal video you can use, if you don't have one bookmarked already: 

- Link: https://youtu.be/6rmUwoM-KQs?t=131
- Description: What a hat trick! Amazing pace and dribbling for Salah's third goal of the game.

Feel free to reuse your event handling code from the previous mini challenge, but you're encouraged to write it from scratch for practice.

In order to save the goal video to the database, you will need to make a request using `fetch`:

```
Request:
POST /goals

Headers: 
{ 
  "Content-Type": "application/json"
}

Required Keys in Body:
{ 
  playerId: integer,
  link: string,
  description: string
}

Example Response:
{
  id: 3,
  playerId: 1,
  link: "https://youtu.be/6rmUwoM-KQs?t=131",
  description: "What a hat trick! Amazing pace and dribbling for Salah's third goal of the game."
}
```

To check if your fetch request is working, you can look at the `db.json` file to see if your goal has been added to the array of goals. You can also try refreshing the page to see if the new goal still shows up.

**YOUR NOTES**
```

```