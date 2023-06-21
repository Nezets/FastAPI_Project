
# FastAPI Project

This is a simple full-stack web app that I began developing to learn a new tech stack that I will be working with in the future. The frontend is built with React and the Ant Design component, and the backend is built in Python using FastAPI, SQLAlchemy, and SQLite. It is a basic CRUD app where users can create an account, login, and access an employee database table. 

## Getting Started

The project directory is split up to separate directories for the frontend and the backend. The `app` folder contains the frontend React files and the `api` folder contains the backend Python files. 

Install the React dependencies by navigating to the app folder and run the following command:
```
npm build
```

Run the frontend server by running the following command in the `app` folder:
```
npm start
```

Run the backend server by running the following command in the `api` folder:
```
py -m uvicorn main:app
```