# Pixelfiske website API

I'm making a pixel game called Pixelfiske and needed a tool to document my progress as well as organize my next steps and tasks, sort of like Trello.  
I also wanted this progress to be reflected on my Github so it doesn't look abandoned while I'm figuring out how to make the graphics.

Since I am a web developer, the solution is a website where I can both present the game and the progress made, as well as an admin part where I can manage tasks. When a task is marked as completed, it is added to a file keeping track of the progress, and then the updated file will be pushed to Github.

The backend is built with Fastify and a MySQL database. Bcrypt is used for hashing passwords and whatnot, and jsonwebtokens are used for authentication.

## Usage

-   Install packages with `npm install`
-   Set up a database on your local machine, then run `node install.js` to create tables
-   Fire up the application by running `npm run start`
