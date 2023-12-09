# E-Commerce React Express Project

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

**Key Features:**
- React.js for dynamic and responsive user interfaces.
- Express.js server for handling backend logic and APIs.
- Integration with a backend database for product management.
- Mongoose as the MongoDB ODM for database integration.
- Web-scraping service for generating dummy shop data.
- User authentication and authorization for a personalized shopping experience.

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
  - `AddProductForm.jsx`
  - **generate-dummy-data/**
    - `GenerateDummyData.jsx`

- **navigation-bar/**
  - `NavigationBar.jsx`

- **product-details/**
  - `ProductDetails.jsx`
    - `EditProduct.jsx`
    - `PictureMaxSize.jsx`
    - **product-comments/**
      - `UserComments.jsx`
        - `Comment.jsx`

- **product-list/**
  - `ProductList.jsx`
    - **product-list-item/**
      - `ProductListItem.jsx`

- **user-login/**
  - `LoginComponent.jsx`

- **user-register/**
  - `RegisterComponent.jsx`

- **weather-api/**
  - `WeatherApi.jsx`

- `HomeLoad.jsx`
- `NotFound.jsx`


Each component has its own corresponding .module.css file.

add-product folder has two utility functions.

## Technologies Used

- React.js
- Node.js
- Express
- MongoDB
- Bootstrap
- CSS
- HTML

