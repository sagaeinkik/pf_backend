# Pixelfiske website API

I'm making a pixel game called Pixelfiske and needed a tool to document my progress as well as organize my next steps and tasks, sort of like Trello.  
I also wanted this progress to be reflected on my Github so it doesn't look abandoned while I'm figuring out how to make the graphics.

Since I am a web developer, the solution is a website where I can both present the game and the progress made, as well as an admin part where I can manage tasks. When a task is marked as completed on the website, it is added to a file keeping track of the progress, and then the updated file will be pushed to Github.

This is the backend. It's built with Fastify, Prisma and a MySQL database. Bcrypt is used for hashing passwords and whatnot, and jsonwebtokens are used for authentication.

## Usage

-   Install packages with `npm install`
-   Set up a database on your local machine and add variables to .env-file according to structure in .env.sample
-   Run `node install.js` to create the tables tables
-   Fire up the application by running `npm run start`

## Routes

Please note that you can update and delete tasks created by other accounts in order to collaborate on project. To delete an account, the user must be logged into that account.

|  Method | Endpoint         |  Description          | Auth |
| ------- | ---------------- | --------------------- | ---- |
|  GET    |  /               |  Welcome route        | -    |
|  GET    |  /users          |  Get all users        | -    |
|  GET    |  /users/:id      |  Get user by ID       | -    |
|  POST   |  /users/register |  Register new user    | -    |
|  POST   |  /users/login    |  Log in user          | -    |
|  DELETE |  /users/:id      |  Deletes user         | Yes  |
|  GET    |  /categories     |  Gets all categories  | -    |
|  GET    |  /categories/:id |  Gets category by ID  | -    |
|  POST   |  /categories     |  Creates new category | Yes  |
|  PUT    |  /categories/:id |  Updates category     | Yes  |
|  DELETE |  /categories/:id |  Deletes category     | Yes  |
|  GET    |  /tasks          |  Gets all tasks       |  -   |
|  GET    |  /tasks/:id      |  Gets task by ID      |  -   |
|  POST   |  /tasks          | Creates new task      |  Yes |
|  PUT    |  /tasks/:id      |  Updates task         |  Yes |
|  DELETE |  /tasks/:id      |  Deletes task         |  Yes |

## Further development

This backend has base functionality for task management that could be used for any project, really. However, since I'm using this for solo work, I didn't spend much time adding functionality for updating users etc. User functionality could easily be further developed if needed.
