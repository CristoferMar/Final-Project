# OneTwoDate
A full-stack solo project that allows couples to add different date ideas into unique lists and randomly pick activities from those lists.

![OneTwoDate-ReadMe-GIF](https://user-images.githubusercontent.com/82407007/147631193-6bc14458-1134-4ea4-a0fc-792ffce9582a.gif)


## Motivation
Since learning how to code, I wanted to create an app that would be aesthetically pleasing and functional for everyone in more than one way. After learning how to implement a Node.js server and PostgreSQL databases, I was able to put my vision together and create this full-stack project. I've always been a fan of party games and keeping dates interesting with unexpected destinations. So why not make an app that could offer this and other uses to the client.

## Technologies Used
**Client Side**
* Built using **React** for a responsive and dynamic front-end experience
* Kept my styling as universal as possible by creating reusable **CSS** classes
* Sent **API calls** to my server via **Fetch** requests
**Server Side**
* Implemented server side with **Express**
* Managed user login authentication with **Argon2**, **JSON Web Tokens**, and **localStorage**
**Database**
* Used PostgreSQL database to store users, lists, date ideas, and history for each account

## Features
**Current Features**
1. Users can view their own lists
2. Users can create a custom list
3. Users can add date ideas to their lists
4. Users can view their date lists
5. Users can generate a date idea with a price filter
6. Users can sign In
7. Users can sign Up
8. Users can save the date idea into their date history
9. Users can deactivate specific date ideas for the next random draw

**Pending Stretch Features**
1. Users can delete date ideas from their own list
2. Users can browse date lists of other users
3. Users can toggle if a list is private or public
4. Users can save date ideas from other users’ lists

## Getting Started
1. Download Node.js.
2. Clone the OneTwoDate repository.
3. Open the terminal to the OneTwoDate repository.
4. Run the command `npm install` to download the necessary npm packages.
5. Run the command `cp .env.example .env` to create a .env file for the application.
6. In the `.env` file, change the `TOKEN_SECRET` to a suitable value.
7. In the `.env` file, change the `DATABASE_URL` at dbName to `oneTwoDate`.
8. Run the command `sudo service postgresql status` to see if PostgreSQL is running.
9. If PostgreSQL is not running, run the command `sudo service postgresql start`.
10. Run the command `createdb oneTwoDate` to initiate the database.
11. Run the command `npm run db:import` to import the schema and initial data.
12. Run the command `npm run dev` to start the server and run the client as a live server.
13. View the client in the browser at `localhost:3000`.
14. To view the database on pgweb, open another terminal and run the command `pgweb --db=oneTwoDate`; then, open the browser to `localhost:8081`.

## Live
Check out my app with the following link:
[OneTwoDate](https://one-two-date.herokuapp.com/)
