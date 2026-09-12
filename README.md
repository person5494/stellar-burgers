# Stellar Burgers

Stellar Burgers is a React and TypeScript application for building custom burgers, placing orders and working with a live order feed.

The project is focused on application logic, state management, routing, authentication, API integration and testing.

## Features

- burger constructor based on ingredients loaded from an external API;
- user registration, login and logout;
- protected routes for authenticated users;
- session restoration and token-based authentication;
- user profile and personal order history;
- public order feed and order details;
- Redux-based application state;
- asynchronous API requests and error handling;
- modal routing for ingredient and order details;
- automated tests for application behavior.

## My contribution

The project was built on top of a provided starter interface and component set. My work was focused on the application layer and included:

- implementing Redux state management and asynchronous actions;
- connecting the interface to the external API;
- implementing authentication, session handling and token refresh logic;
- configuring protected routes and post-login navigation;
- implementing order creation, order history and feed-related behavior;
- wiring modal routes and page-level navigation;
- adding and maintaining automated tests for the implemented functionality.

## Tech stack

- React 18
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Webpack
- Jest
- React Testing Library
- Playwright
- Storybook

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/alexeydev42/stellar-burgers.git
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
npm run test:coverage
npm run test:playwright
npm run storybook
```

## Testing

The project includes automated tests for application logic and user flows. Jest and React Testing Library are used for component and application-level tests, while Playwright is used for end-to-end scenarios.

## About the project

The project was developed during the Yandex Practicum Frontend Developer program using a prepared UI foundation. The main development work in this repository was centered around frontend application logic, routing, state management, API integration, authentication and testing.
