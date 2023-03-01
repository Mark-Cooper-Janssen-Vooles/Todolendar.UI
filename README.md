# Todolender.UI

This repository is the frontend for Todolender, a project which is a todo list and calendar fusion. 

The backend for Todolender is found at [Todolender.API](https://github.com/Mark-Cooper-Janssen-Vooles/Todolender.API).

## Technology 

- This project is created as a React single page application. 
- Uses minimal but fully custom CSS with a focus on functionality 
- Testing has been purposefully skipped as this project was more about exploring functionality, API first approach, configuring different environments and devops in AWS
- React hook form has been used in some places, and in others just vanilla javascript forms
- Axios is used to make API calls
- DayJS is used to make dealing with dates and time easier
- Redux has been used to manage global state, as well as its inbuilt listenerMiddleware to make async API calls
- Typescript has been leveraged to improve the developer experience

## Planning
Figma designs are available [here](https://www.figma.com/file/ona2QoEu6QzTcyffAervOy/Todolender?node-id=0%3A1&t=KPdD8o2qc6cbYQnZ-0).

A basic database schema is available [here](https://app.diagrams.net/#G1NYqMTprbHGnyYW-6s-Pc1sLVT3hZQu_x).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
