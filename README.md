# Website Name: Library Management Platform

This document provides a comprehensive introduction to the Library Management System, a REST API built with Node.js, Express, and MongoDB. The system enables management of books and borrowing operations through a clean, type-safe API interface.


## Live Site URL
Visit the live site at [Server Side](https://level2-assignment-2-azure.vercel.app/)

## System Purpose
The Library Management System provides a RESTful API for managing library operations including:
- **Book Management:** 
  Complete CRUD operations for books with metadata including title, author, genre, ISBN, and availability tracking

- **Borrowing Operations:** 
  Creating borrow records with automatic inventory management and due date tracking
  
- **Inventory Control:** 
  Automatic updates to book availability and copy counts during borrowing operations

The system is designed as a backend service that can be consumed by frontend applications, mobile apps, or other services requiring library management functionality.


## System Architecture
The following diagram illustrates the high-level architecture mapping to actual code entities:


![Architecture](https://i.postimg.cc/50vzkqkZ/Screenshot-54.png)


## Technology Stack
The system is built using modern JavaScript technologies with TypeScript for type safety:
- Node.js
- Express
- MongoDB
- Mongoose
- Typescript
- ts-node-dev
- ESLint


## API Surface
The system exposes two main API categories through specific route patterns:
![API Interface](https://i.postimg.cc/L60TQxVG/Screenshot-55.png)

## How to Start This Application

1. **Clone the Repositories:**
    ```sh
    # Server Side:
    git clone https://github.com/DeveloperImran1/Level2-assignment-2.git
    cd Level2-assignment-2
    ```

2. **Install Dependencies:**
    ```sh
    npm install
    ```

3. **Start the Development Server:**
    ```sh
    npm run start:dev
    ```

4. **Build for Production:**
    ```sh
    npm run build
    ```

5. **Deploy to vercel:**
    ```sh
    vercel website to build and deploy
    ```

## Server Side Github Link
[Server Code](https://github.com/DeveloperImran1/Level2-assignment-2)


## Environment Variables:
  - Create a `.env` file in the root of your client project and add the following variables:

 <b> MongoDB Credentials <b/> <br /> <br />
   DB_USER=your_database_user <br />
   DB_PASS=your_database_password <br />
   DB_NAME=your_database_name <br />


## Folder Structure:
 ![Folder Structure](https://i.postimg.cc/q7QBBt6z/Screenshot-56.png)


## Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

