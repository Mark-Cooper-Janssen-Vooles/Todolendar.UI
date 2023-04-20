# Todolendar.UI

This repository is the frontend for Todolendar, a project which is a todo list and calendar fusion. It is hosted in s3 and viewable [here](http://todolender-ui-s3-output.s3-website-ap-southeast-2.amazonaws.com/). Note that it was developed using chrome locally and no effort has been put into making it usable on other browsers (yet).

The backend for Todolendar is found at [Todolendar.API](https://github.com/Mark-Cooper-Janssen-Vooles/Todolendar.API).

Features include account creation, sign-in functionality, editing your profile, creating todo's and adding them into a calendar as a scheduled todo. Users will also be able to set SMS notifications for reminding them to plan their week / month / day, as well as for reminding them when they have a scheduled todo coming up.

---

## Planning
- Figma designs are available [here](https://www.figma.com/file/ona2QoEu6QzTcyffAervOy/Todolender?node-id=0%3A1&t=KPdD8o2qc6cbYQnZ-0).
- A basic system design is available [here](https://app.diagrams.net/#HMark-Cooper-Janssen-Vooles%2FTodolendar.API%2Fmaster%2FTodolendar%20System%20Design).
- A basic database schema is available [here](https://app.diagrams.net/#HMark-Cooper-Janssen-Vooles%2FTodolendar.API%2Fmaster%2FTodolendar.DB.Schema).

---

## Technology 

- This project is created as a React single page application. 
- Uses minimal but fully custom CSS with a focus on functionality 
- Testing has been purposefully skipped as this project was more about exploring functionality, API first approach, configuring different environments and devops in AWS
- React hook form has been used in some places, and in others just vanilla javascript forms
- Axios is used to make API calls
- DayJS is used to make dealing with dates and time easier
- Redux has been used to manage global state, as well as its inbuilt listenerMiddleware to make async API calls
- Typescript has been leveraged to improve the developer experience

---

## Running Locally
To run this project locally, you will need to first clone [Todolendar.API](https://github.com/Mark-Cooper-Janssen-Vooles/Todolendar.API) and follow the setup instructions for Todolendar.API to get that running locally.

Then, come back here to the UI and run `npm install` and `npm start`. The UI will open in a new tab and you should be able to login / signup and have all the functionality.

---

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

--- 

## Releasing 

Changes made to this repository and merged into master will trigger a CICD AWS CodePipeline pipeline on `ap-southeast-2`, and be deployed to an ec2 instance in production. 
The pipeline can be found [here](https://ap-southeast-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/todolendar-ui-pipeline-2/view?region=ap-southeast-2) once logged in.

### Source
Source is linked to the github repository and picks up any changes to master and kicks off another execution. It requires github authentication when set up.

### Build 
Build is using AWS CodeBuild, which uses the buildspec.yml - running the commands and outputting the artifacts into an s3 bucket.
It requires an IAM role attached which has s3 write permissions. 

### Deploy
The [S3 bucket](https://ap-southeast-2.console.aws.amazon.com/s3/buckets/todolender-ui-s3-output?region=ap-southeast-2&tab=properties) uses static website hosting, and is viewable on a public url [here](http://todolender-ui-s3-output.s3-website-ap-southeast-2.amazonaws.com).
