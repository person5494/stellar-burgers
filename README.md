# Stellar Burgers

Stellar Burgers is a React application where users can build a burger from available ingredients, place orders and follow order information.

The project focuses on application state, routing, authentication and interaction with an external API.

## Features

- burger constructor with ingredients received from the API;
- user registration and authentication;
- protected routes for authenticated users;
- user profile and order history;
- order feed;
- Redux-based application state;
- API requests and asynchronous actions;
- automatic tests for application behavior.

## Tech stack

- React
- TypeScript
- Redux Toolkit
- React Router
- Webpack
- Jest
- React Testing Library
- Playwright
- Storybook

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/person5494/stellar-burgers.git
cd stellar-burgers
npm install
```

Create an `.env` file based on `.env.example` and provide the API URL required by the project.

Start the development server:

```bash
npm start
```

## Useful commands

```bash
npm start
npm run lint
npm run test
npm run test:playwright
npm run storybook
```

## About the project

This project was completed as part of the Yandex Practicum Frontend Developer course. The initial repository provided the UI components and project setup; my work focused on implementing the application logic, routing, state management, API interaction, authentication and related functionality.
