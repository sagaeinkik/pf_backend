# Pixelfiske website API

I'm making a pixel game called Pixelfiske and needed a tool to document my progress as well as organize my next steps and tasks, sort of like Trello.  
I also wanted this progress to be reflected on my Github so it doesn't look abandoned while I'm figuring out how to make the graphics.

Since I am a web developer, the solution is a website where I can both present the game and the progress made, as well as an admin part where I can manage tasks. When a task is marked as completed, it is added to a file keeping track of the progress, and then the updated file will be pushed to Github.

The backend is built with Fastify and a MySQL database. Bcrypt is used for hashing passwords and whatnot, and jsonwebtokens are used for authentication.

## Usage

-   Install packages with `npm install`
-   Set up a database on your local machine and add variables to .env-file according to structure in .env.sample
-   Run `node install.js` to create the tables tables
-   Fire up the application by running `npm run start`

## Further development

This backend has base functionality for task management that could be used for any project, really. However, since I'm using this for solo work, I didn't spend much time adding functionality for updating users etc. User functionality could easily be further developed if needed.
