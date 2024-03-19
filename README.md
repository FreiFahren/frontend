# FreiFahren

## Overview
Freifahren is an innovative project designed to map the presence of ticket inspectors across the Berlin public transport network. By offering a live map that tracks inspectors in real-time, the initiative seeks to inform and empower users to navigate the city with added confidence. The project leverages community-driven data from the [Freifahren Telegram group](https://t.me/freifahren_BE), where users report sightings of ticket inspectors.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/)

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/FreiFahren/frontend
    ```

2. Install NPM packages
    ```sh
    npm install
    ```

3. Set up enviromental variables
    ```sh
    REACT_APP_JAWG_ACCESS_TOKEN=YOUR_JAWG_ACCESS_TOKEN
    ```
    You can get a free access token from [Jawg](https://www.jawg.io/)

4. Run the app
    ```sh
    npm start
    ```
## How it works 

We are using leaflet to display the map and the markers in App.tsx. The markers are being updated every 5 seconds by fetching the data from the backend. The backend is a simple echo server that fetches the last reported locations of the ticket inspectors from the database and sends it to the frontend.

When a user reports a ticket inspector via the form, the data is sent to the backend and stored in the database. The backend then sends the updated data to the frontend.   
