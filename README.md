# final-project
A full stack JavaScript solo project for couples to add different date ideas into unique lists and randomly pick items from those lists.

GIF

## Motivation
Since learning how to code, I wanted to create an app that would be aesthetically pleasing and also functional for everyone, in more than one way. After learning how to impletment a Node.js server and PostreSQL databse, I was able to put my vision together and create this full-stack project. I've always been a fan of party games and of keeping dates interesting with unexpected destinations. So why not create an app that could offer this many uses, to the client.

## Technologies Used
**Client Side**
* Built using **React** for a responsive and dynamic front-end experience
* Kept my styling as universal as possible by creating reusable **CSS** classes
* Sent **API calls** to my server via **Fetch** requests
**Server Side**
* Impletmented server side with **Express**
* Manages user loginauthentication with **Argon2**, **JSON Web Tokens**, and **localStorage**
**Database**
* Used PostgreSQL database to store users, lists, date ideas, and history for each account

## Features
**Current Features**
1. User can view their own lists
2. User can create a custom list
3. User can add date ideas to their lists
4. User can view their date lists
5. User can generate a date idea with a price filter
6. User can sign In
7. User can sign Up
8. User can save the date idea into their date history
9. User can deactivate certain date ideas for the next random draw

**Pending Stretch Features**
1. User can delete date ideas from their own list
2. User can browse date lists of other users
3. User can toggle if a list is private or public
4. User can save date ideas from other users’ lists

## Getting Started
1. Download Node.js.
2. Clone the OneTwoDate repository.
3. Open the terminal to the OneTwoDate repository.
4. Run the command `npm install` to download the necessary npm packages.
5. Run the command `cp .env.example .env` to create a .env file for the application.
6. In the `.env` file, change the `TOKEN_SECRET` to a suitable value.
7. In the `.env` file, change the `DATABASE_URL` at dbName to `oneTwoDate`.
8. Run the command `sudo service postgresql status` to see if postgresql is running.
9. If postgresql is not running, run the command `sudo service postgresql start`.
10. Run the command `createdb oneTwoDate` to instantiate the database.
11. Run the command `npm run db:import` to import the schema and initial data.
12. Run the command `npm run dev` to start the server and run the client as a live server.
13. View the client in the browser at `localhost:3000`.
14. To view the database on pgweb, open another terminal and run the command pgweb `--db=<insert DATABASE_URL's changeMe from .env>`; then, open the browser to `localhost:8081`.

## Live
Check out my app here!
