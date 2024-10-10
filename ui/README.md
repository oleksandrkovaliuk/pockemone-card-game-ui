
# Pokémon Card Game

A Pokémon card game built using **React.js**, **Node.js (Express.js)**, **MongoDB (Mongoose)**, and **WebSockets (Socket.io)**.

## Features

- **Secure and Optimized Communication**: 
  Established a secure communication channel between the front-end and back-end by configuring secure headers, CORS settings, and including Bearer tokens for user authentication.

- **Integrated State Management**:
  Implemented a Redux store along with RTK Query (RTKQ) to efficiently cache and optimize API queries for improved performance.

- **Web3 Authentication**:
  Integrated Web3-based authentication using JWT to generate unique user tokens, allowing users to connect their wallets via MetaMask.

- **MongoDB Models**:
  Designed and implemented three MongoDB models for handling:
  - **Pokémon**
  - **Users**
  - **Fight Sessions**

- **Real-time Fight Sessions**:
  Utilized Socket.io to manage fight sessions, providing unique real-time communication channels between users.

- **Pagination and Search Optimization**:
  Enhanced Pokémon data handling by implementing pagination and a search feature to manage large data sets efficiently.

- **Opponent Regeneration**:
  Added functionality for users to regenerate an opponent if they are dissatisfied with their current one.

- **Real-time Actions and AI Auto-Attacks**:
  On the fight session page, implemented real-time user actions along with automatic attacks performed by an AI-controlled opponent.
