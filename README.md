# WI-Marketplace--Frontend

This project is based on Next.js and Apollo GraphQL Api

A simple website which describe the functionnalities of Next.js page routing and dynmaic routes , including Material UI & Bootstrap for some part.

The Apollo CLient provide a connection through GraphQL to the keystone.js Backend [https://github.com/Bachir-Seghir/wi-marketplace-backend]

## Installation

# clone the repository locally

```sh
git clone https://github.com/Bachir-Seghir/wi-marketplace-frontend
```

got to project directory :

```sh
cd ~/wi-marketplace-frontend
```

# install dependencies

```sh
npm install or yarn install
```

# Ensure the Backend is running before running this frontend

[https://github.com/Bachir-Seghir/wi-marketplace-backend]

## Connection to Backend Api 
in the root folder you will find config.js file 
==> this is the url of the backend in development mode 
```sh
export const endpoint = `http://localhost:5000/api/graphql`; 
```
==> switch to production mode by filling the " prodEndpoint " 
```sh
export const prodEndpoint = `fill me is when we deploy`;
```

# run project in dev mode

```sh
npm run dev
```
