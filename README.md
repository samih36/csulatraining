# CS ULA Training App

This app exists to provide a way to virtually provide training to undergraduate learning assistants within the computer science department through a variety of learning modules and quizzes. Students will be able to add courses, complete modules and take quizzes in order to learn and display the necessary information. Professors can create courses and for their ULAs and track student progress. 




## Getting Started


### Installation

This project uses npm for it's package management. To install the dependencies for this project, be sure to run  ```npm install``` from the ulatraining folder (if in the root folder, run ```cd ulatraining```)

### Running Locally

Once everything is installed, you can start a local server my running  ```npm start```
from the ulatraining folder. This should open the homepage in your local browser at [localhost:3000](localhost:3000)
,
### Warranty

These instructions were last tested and verified to work on 11/12/2021 by Sami on a mac.


## Testing

Users can run the entire test suite by running ```npm test```

To run the test suite and view a coverage report of all files, run ```npm test -- --coverage --watchAll```

To run a specific test file, run ```npm test filename```, including a test coverage with ```npm test filename -- --coverage --watchAll```

There is a also a testing firebase database for various usage so as to not manipulate the real data. The testing firebase project can be found at [https://console.firebase.google.com/project/csula--testing/overview](https://console.firebase.google.com/project/csula--testing/overview) (must be invited first)


## Deployment

This app is deployed using firebase hosting, which is convinient given that all of our data and authentication currently lives in firebase. The firebase console for this project can be found at [https://console.firebase.google.com/project/csula-8296c/overview](https://console.firebase.google.com/project/csula-8296c/overview) (must be invited to the project first)

once invited, if you want to deploy the code currently on the main branch of the project:

to use any of the firebase commands, you must first sign in using `firebase login`, which will take you to a web page that will prompt you to sign in with your google account. Use the account that is associated with the project. 


once logged in, run `npm run build`

then `firebase deploy`

if `firebase deploy` does not work, or you want to change some part of the configuration of the deployment, you can run `firebase init` which will prompt you with various options for your deployment.

There currently is no CI/CD enabled, so run the above commands whenever you are ready to push to production. 

## Technologies used

The front end for this project is built using React, and all of our data and authentication is handled by Firebase, specifically their Realtime database for our database. The rendered content of our site is fully dependent on the state of the database at a given time. The ADRs for this project are located inside the `ulatraining` folder in a file called `ADR.md`

## Contributing

To contribute to this project, a new developer would need access to this github repository as well as access to both the [firebase project](https://console.firebase.google.com/project/csula-8296c/overview) and the [firebase testing project](https://console.firebase.google.com/project/csula--testing/overview)

There aren't any particularly specific style or process conventions used that a new developer would need to adhere to. See the current testing suite using Jest and Enzyme for an idea of how we are testing this application.

Our project website, which contains more background information about the project and a view of our progress over the course of the semester, can be found at [https://tarheels.live/csulatraining/](https://tarheels.live/csulatraining/)


## Authors

The major authors of this project have been Sami Habib, Devin Lynch, Nicholas Nguyen, and Alex Yalcin, who created this project for their COMP523 Class. 


## License

The source code for this project is licenced with the open-source MIT license.

## Acknowledgements

We would like to thank and acknowledge Jacob Yackenovich for his time and valuable mentorship to us this semester, Professor Terrell for his intruction and support, and Professor Joseph-Nicolas for her feedback and direction over the course of the development for this application. 