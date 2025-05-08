# TicTacTOe
This is a browser game that includes the following functionality:

1. On load the user is presented with a welcoming screen to the game and three button options
  	- (a) Play vs Player (a disabled button to show a future feature)
  	- (b) Play vs AI (leads to the actual game where the user plays against the AI)
  	- (c) Show Leaderboard (expands a table with the scores of the user and the AI - Wins, Draws and Losses)
2. By clicking on the Play vs AI, a new board game is generated with its own unique ID.
3. The latest state of the game is saved and can be accessed through the ID at any time.
4. The user is prompted to play first and after each move, the AI then makes its own move until the game is over.
5. After a win, the winner is shown and no more moves can be made to that game. 
6. At any point the user has on the interface three button options.
  	- (a) Home (Returns to the homepage)
  	- (b) Restart Game (Restarts the current game - the result is then overwritten)
  	- (c) New game (Generate a new game)
7. The user in both cases can get more results by scrolling downwards.


## How to run

Enviromental variables are defined in `.env` file.
For simplicity .env has been committed to ensure that it will always be present.

I tried to use docker in both client & server, but had some issues related to nextjs, so Docker is only used on the server-side to deploy two services:
- server under :4000
- MongoDB

#### Backend: Docker (--build the first time):
```bash
cd server
```
```bash
docker-compose up --build
```
The app is reachable at [http://localhost:3000/](http://localhost:3000/).

#### Frontend

```bash
cd client
```

Install dependencies
```bash
npm install
```
Run dev services 

macOSX or Linux:
```bash
npm run dev
```
The app is reachable at [http://localhost:4000/](http://localhost:4000/).

## How to test

Tests have been added in client only, you need to be in the relevant space to run them as follows

```bash
npm run test
```

## Architecture

### File structure (simplified)

```
tictactoe
├─ README.md
├─ client
│  ├─ src
│  │  ├─ assets
│  │  │  ├─ nigiri.png
│  │  │  └─ sushi.png
│  │  ├─ controls
│  │  │  ├─ __tests__
│  │  │  │  └─ gameLogic.test.ts
│  │  │  ├─ gameLogic.test.ts
│  │  │  └─ gameLogic.ts
│  │  ├─ models
│  │  │  ├─ gameState.interface.ts
│  │  │  ├─ player.enum.ts
│  │  │  ├─ playerStats.interface.ts
│  │  │  └─ state.enum.ts
│  │  └─ pages
│  │     ├─ HomePage.module.css
│  │     ├─ __snapshots__
│  │     │  └─ index.test.tsx.snap
│  │     ├─ components
│  │     │  └─ TTTCell
│  │     │     ├─ TTTCell.module.css
│  │     │     ├─ TTTCell.test.tsx
│  │     │     ├─ TTTCell.tsx
│  │     │     ├─ __snapshots__
│  │     │     │  └─ TTTCell.test.tsx.snap
│  │     │     └─ index.ts
│  │     ├─ game
│  │     │  ├─ [id].tsx
│  │     │  └─ game.module.css
│  │     ├─ index.test.tsx
│  │     └─ index.tsx
│  └─ tsconfig.json
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ docker-compose.yml
│  ├─ jest.config.js
│  ├─ jest.setup.js
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
└─ server
   ├─ src
   │  └─ index.ts
   │  ├─ routes
   │  │  └─ gameRoutes.js
   │  ├─ controllers
   │  │  ├─ constants.js
   │  │  ├─ dbController.js
   │  │  └─ gameController.js
   │  ├─ models
   │  │  ├─ Game.js
   │  │  └─ Leaderboard.js
   ├─ Dockerfile
   ├─ docker-compose.yml
   ├─ package-lock.json
   ├─ package.json
   └─ tsconfig.json

```

<br>

### Tech stack

- Next.JS
- Node.JS
- Express.JS
- Jest


### Environmental Variables

Frontend: 

| Name | Description  |
| ------- | --- |
| `NEXT_PUBLIC_SERVER_URI` | local server uri|

## Future work

Regarding this test exercise, the followings bits could be considered future work:
- Enable player vs player mode
- Improve AI efficiency by implementing a better algorithm
- Enhance the UI/UX with animations, sound effects and further responsive design improvements.
