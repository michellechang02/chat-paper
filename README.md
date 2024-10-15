# ChatPaper: CIS 7000 Assignment 3

## How to Run this application locally

### Frontend
To start the frontend, run the following commands:
```bash
cd frontend
npm install
npm run dev
```
To kill the frontend, sent a SIGINT to the process using ctrl+c.

### Backend
To start the backend, run the following commands:
```bash
cd backend
uvicorn main:app --reload
```
To kill the backend, sent a SIGINT to the process using ctrl+c.

## Deployment of the application

### Frontend
[https://michellechang02.github.io/chat-paper/](https://michellechang02.github.io/chat-paper/)

### Backend
[https://chat-paper-eight.vercel.app/](https://chat-paper-eight.vercel.app/)


## This final application includes:

- A fully functional chat interface that takes in user input, displays it as a chat, and displays the AI response

- The chat uses the OpenAI API to answer questions about the provided paper, using the paper as context; and it looks from the demo like it mostly works

- The chat responses include inline links that, when clicked, highlight parts of the text relevant to the answer

- A demo of these requirements can be viewed here: Demo


