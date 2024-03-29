# E-Commerce React Express Project

**This is my MERN project which I use to train my knowledge on. It is not perfect - there are still many bugs and not implemented functionalities and there are many things I have to work on. The main purpose is to train my frontend, backend, database, api and design skills.**

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [React Contexts](#react-contexts)
- [Technologies Used](#technologies-used)
- [To be done (In Progress)](#to-be-done-in-progress)

**Key Features:**
- React.js for dynamic and responsive user interfaces.
- Express.js server for handling backend logic and APIs.
- Integration with a backend database for product management.
- Mongoose as the MongoDB ODM for database integration.
- Web-scraping service for generating dummy shop data (in development only).
- User authentication and authorization for a personalized shopping experience.
- Bulgarian version of the site available through LanguageContext.jsx. It takes the language from language enum in language.js.
- Weather and News APIs integrated for user convenience.
- Cache logic implemented on the backend for handling the limited API requests and data.

**Functionalities:**
  
  **Logged users**
   - Can add their own products;
   - Can EDIT and DELETE their own products;
   - Can add comments to all products;
   - Can add and delete items to/from their cart;
   - They are unable to add their own products to the cart.

  **Non-logged users**
   - They can only review the products and their respective comments;
   - The cart, my_products and add_products are not available to them.


  **Admin (available only in development environment)**
   - The admin can add products automatically through the web scraping service (this feature is available only on development environment in order to fill the site with products).
 
 - Language switch is availabe to both logged and non-logged users.

**API Integrations for user's convenience:**
- Integration with https://weatherstack.com/
- Integration with https://newsapi.org/ on the home page.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start server from the main server directory with npm run start;
4. Start vite from products-shop directory with npm run dev;


## Project Structure

The react components are structured in the following way:

- **home-page/**
  - `HomeComponent.jsx`

- **about-page/**
  - `AboutComponent.jsx`
  
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
    - tracking and updating the total price of the cart state;
    - triggering notifications upon adding new items in the cart;
    > [!IMPORTANT]
    >**N.B! - The initial state of the cart is being updated from `LoginComponent.jsx` after a successfull login as the server's response returns user's cart along with   their jwt token!**

 - `LoadingContext.jsx` - Keeps the state of a loading spinner. If a prolonged task is being executed, the spinner appears and disappears on task completion.

 `onSessionEnd.js` is a utility script that sends a session logout request to the server and deletes the session if user refreshes or closes the browser**

## To be done (In Progress)
 - [ ]Need a new implementation of the Weather Stack API - they have limited the free requests from 1000 to 100. The WeatherAPI data will be cached on the backend and it will be updated every 7'th hour. Thus the weather data will be available throughout the whole month. (19.01.2024);
 - [x] **FIXED ON 06.02.2024** The comments styling needs a fix - the star rating system is being displaced in case of longer comment or username. (19.01.2024);
 - [ ]Implementation of CAPTCHA in order to avoid bots;
 - [ ]Search products bar functionality (Initially it will work only with product names and then more complex search/filtering will be added but probably this will be done on the backend);
 - [x] **FIXED ON 05.02.2024** Fix Login and Register components on small screens - in some cases the error notifications pop up on top of the form input fields. Also they are not directly visible and the users have to scroll down a bit (due to the weather API component);  

 - [x] **FIXED ON 06.02.2024** Navigation bar to be made sticky - to stick on top of the view when the users scroll down;
 - [ ]Better implementation of form elements, especially when it comes to passwords;
 - [ ]Unique email check needs to be added on user registration, so we can not have multiple users registered with the same email (backend);
 - [ ]Implement order functionality:
      - [ ]The product quantity should be decreased on user order completion.
      - [ ]Implement SMS or email notification on order completion.
 - [ ]For some time I've been investigating an issue where the logout functionality fails - the server seems to receive the requests, however the responses fail and block the application. Need to investigate further.
## Technologies Used

- React.js
- Node.js
- Express
- MongoDB
- Bootstrap
- CSS
- HTML

