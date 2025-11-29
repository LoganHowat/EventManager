# Event Manager

# Idea
The idea for this app came about when planing events with my friends and finding it difficult to track who was coming to what and when.
I also wanted a chance to solidify some of the skills I have learnt during my apprenticeship and this was a good oppurtunity. I also 
had the chance to learn some new technologies such as Github Pages, Auth0 and Supabase.

# Authentication/Authorization - Auth0

Authentication is handled using an Auth0 tenant. It uses a post-login action that sets users roles to authenticated, which can later be used with Supabases RLS
to prevent unauthenticated users making changes to the DB. This information will be accessed via a JWT.

# Database - Supabase/Postgres

I chose to use Supabase for this project as it offered a generouse free tier and was something I wanted to learn more about.
I am using a Postgres database to store event information with a joining table between the User table stored in Auth0
and the Events table. Below is an ER model:

<img width="1505" height="482" alt="image" src="https://github.com/user-attachments/assets/9bfe66e8-bd9f-43a5-86c9-8c192075c5fa" />

# Front-end

The front end was developer in React using Vite. I chose to use Rsuite for the components as it was clean and easy to implement. If I needed additional functionality on my components I creatd wrappers around the existing Rsuite ones.
I used custom styling for some aspects of the project by using custom css overrides. Stylng was done with a focus on mobile devices as this is how I imagine most people would interact with the app.

<img width="633" height="1352" alt="image" src="https://github.com/user-attachments/assets/96b5a21e-7b16-4ddc-97f9-5865ab435c8d" />

<img width="638" height="1352" alt="image" src="https://github.com/user-attachments/assets/9d0afaee-d1a8-4dcf-a553-132ac8bc4ad7" />

# Deployment and Local Development

For local development I made use of docker, choosing to have the front-end run inside a container on my machine. I found this helped keep an isolated environment and made it easier to manage
which dependencies were being installed.
As for deployment I used Github Pages as this was simple to use and did the job just fine.

# Future Improvements

I enjoyed this task and have learnt some things from it. However, I think there are things that could definitely be improved:

. Have different envrionments for development and production, especially for my db and Auth0 tenant

. Implement testing with Jest/Vite test

. Move the utils functions to a class and methods to prevent creating multiple Client Instances for the Supabase DB

. Integrate Github actions for deployment

. Split users into groups to keep different events separate
