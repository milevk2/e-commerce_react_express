# E-Commerce React Express Project

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [React Contexts](#react-contexts)
- [Technologies Used](#technologies-used)

**Key Features:**
- React.js for dynamic and responsive user interfaces.
- Express.js server for handling backend logic and APIs.
- Integration with a backend database for product management.
- Mongoose as the MongoDB ODM for database integration.
- Web-scraping service for generating dummy shop data.
- User authentication and authorization for a personalized shopping experience.
- Bulgarian version of the site available through LanguageContext.jsx. It takes the language from language enum in language.js.

**API Integrations:**
- Integration with https://weatherstack.com/ for user's convenience.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start server from the main server directory with npm run start;
4. Start vite from products-shop directory with npm run dev;


## Project Structure

The react components are structured in the following way:

- **add-product/**
  - `AddProductForm.jsx` - controlled form used
  - **generate-dummy-data/**
    - `GenerateDummyData.jsx`  - stateless component

- **navigation-bar/**
  - `NavigationBar.jsx`

- **product-details/**
  - `ProductDetails.jsx`
    - `EditProduct.jsx` - controlled form used
    - `PictureMaxSize.jsx`  - stateless component
    - **product-specs/**
      - `ProductSpecs.jsx`
    - **product-comments/**
      - `UserComments.jsx` -uncontrolled form used
        - `Comment.jsx` 

- **product-list/**
  - `ProductList.jsx`
    - **product-list-item/**
      - `ProductListItem.jsx`

- **user-login/**
  - `LoginComponent.jsx` -uncontrolled form used

- **user-profile/**
  - `UserProfile.jsx` -uncontrolled form used    

- **user-register/**
  - `RegisterComponent.jsx` - controlled form used

- **weather-api/**
  - `WeatherApi.jsx`

- `HomeLoad.jsx` - stateless component
- `NotFound.jsx` - stateless component

Each component has its own corresponding .module.css file.

add-product folder has two utility functions.

## React Contexts

 - `LanguageContext.jsx` - for handling language state across the App. It interacts with language enum from `language.js`;

 - `LoggerContext.jsx` - for handling login/logout functionality and managing sessionStorage and thus managing the permissions of the user.

 - `CartContext.jsx` - for handling user's cart functionality:
    - adding new items to the cart state;
    - deleting cart items;
    - updating user's cart DB;
    - tracking and updating thye total price of the cart state;
    - triggering notifications upon adding new items in the cart;
    **N.B! - The initial state of the cart is being updated from `LoginComponent.jsx` after a successfull login as the server's response returns user's cart along with their jwt token!**

 - `LoadingContext.jsx` - Keeps the state of a loading spinner. If a prolonged task is being executed, the spinner appears and disappears on task completion.

 `onSessionEnd.js` is a utility script that sends a session logout request to the server and deletes the session if user refreshes or closes the browser**

## Technologies Used

- React.js
- Node.js
- Express
- MongoDB
- Bootstrap
- CSS
- HTML

