# ShareList

A grocery list web-application designed to be shared by multiple people with real-time updates.

**Live Site:**
https://sqwisha-sharelist.herokuapp.com/

#### The Problem
Most households have a lot of grocery shopping to do. It's more efficient to break up the work between housemates. How can they easily keep track of what's been purchased? How can they avoid inefficiency and redundant purchases?

#### A Solution
With ShareList and a smartphone, housemates can view the same list with real-time updates as items are added, edited, and marked as purchased.

## User Interface
### Landing
![Imgur](https://i.imgur.com/EVOV6H8.png)

### Sign Up
![Imgur](https://i.imgur.com/omDsUzi.png)

### Sign In
![Imgur](https://i.imgur.com/iy5H6CK.png)


### Private List
![Imgur](https://i.imgur.com/hgM4cQ7.png)

### Edit
![Imgur](https://i.imgur.com/8ZNbiOj.png)


## Technologies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Back-end created with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/)

Real-time Database hosted with [Google Firebase](https://firebase.google.com/)

Testing with [Jest](https://jestjs.io/) and [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro)

Hosting by [Heroku](https://www.heroku.com/)

Styling helped along greatly by 💅[Styled Components](https://www.styled-components.com/)

Planning with [Trello](https://www.heroku.com)


Due to the need for real-time updates on multiple devices, I chose to use Firebase Real-time Database. I've worked with it past projects and love how easily it integrates with React.

React was an obvious choice for the front end, with the virtual DOM rendering only changed items, seeing updates will require less of the user's device, bandwidth, and patience.

Node.js with Express are the de facto best choice for me as a JavaScript developer, and I chose Heroku for the sake of familiarity and dependability.

Testing was tricky to decide on, but I chose Jest with React-Testing-Library. Jest is already integrated with Create-React-App, and I appreciated the philosophy of RTL: test the app as the user would interact with it.

As you can see from the UI screenshots, this web application is designed with mobile-first in mind.

## What's Broken/What's Next?

#### Functionality:
- Make the error messages on sign-up more user friendly. Currently they're piped straight from Firebase.
- On localhost, the wildcard catcher for routes like `/this_goes_nowhere` redirects neatly to Home. On Heroku, it does not. I'd like to fix that.
- Make the "Demo List" default to the same set of items each time and keep state local, since the list is open to any an all passers-by.
- Add a condition to prevent blank items from being added to the list.
- Move the edit/delete work to the back end so the Firebase calls are all in one place. Not broken, just not entirely intuitive when looking through app structure.
- Future features I'd like to implement:
  - Multiple lists per user
  - Sharable lists (not requiring all users be logged in to the same account to view the same list)
  - Allow re-ordering of lists
  - Automatically move checked items to bottom of list
  - "Frequently purchased" suggestions
  - Clearly this is not a only a grocery list app, it can be used for many purposes, and expanded as such.


#### Testing:
- Jest and React-Testing-Library are new-to-me technologies, so there was a bit of a learning curve. With more time I'd like to set up tests for mocking authentication. Also, because deciding on a test framework was blocking me at the beginning, I did a no-no and wrote nearly everything before writing tests 😅.
- Add PropTypes to components.

#### UI:
- Checkboxes need to be styled
- Consider the color-blind-friendliness of my color scheme
- Improve accessibility
- Create depth with styling (à la Material Design)
- Make the nav link hover effect persist when a specific page is rendered _(see below)_

![Imgur](https://i.imgur.com/r8HghJi.png)



### Thanks for checking out my project!
