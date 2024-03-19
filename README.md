# FreiFahren

## Overview
Freifahren is an innovative project designed to map the presence of ticket inspectors across the Berlin public transport network. By offering a live map that tracks inspectors in real-time, the initiative seeks to inform and empower users to navigate the city with added confidence. The project leverages community-driven data from the [Freifahren Telegram group](https://t.me/freifahren_BE), where users report sightings of ticket inspectors.

If you have any questions feel free to reach out to: johan@trieloff.net or dbrandesx@gmail.com.

<img width="1440" alt="Bildschirm­foto 2024-03-19 um 12 44 26" src="https://github.com/FreiFahren/frontend/assets/30388999/ab3b5eee-3b93-4c80-a4f3-946d4af38898">

<img width="1440" alt="Bildschirm­foto 2024-03-19 um 12 43 57" src="https://github.com/FreiFahren/frontend/assets/30388999/5681a8c3-4683-4dae-937b-2f5ba42333de">



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

FreiFahren operates by leveraging real-time, community-driven data to track the presence of ticket inspectors across the Berlin public transport network. Here's a step-by-step breakdown of how it works:

1. **Data Collection:**  Our primary data source is the (FreiFahren Telegram group)[https://t.me/freifahren_BE]. Here, community members report sightings of ticket inspectors. Each report includes the location and time of the sighting.

2. **Data Processing:** Once a report is submitted, our backend system processes the data. It verifies the report, extracts the necessary information, and updates our database.

3. **Real-Time Updates:** The processed data is then pushed to our live map in real-time. This ensures that users always have the most up-to-date information about the presence of ticket inspectors.

4. **User Interface:** Users can access the live map through our web application. The map displays the current locations of ticket inspectors, allowing users to plan their journeys accordingly.

5. **Community Engagement:** Users are encouraged to contribute to the community by reporting their own sightings of ticket inspectors. This helps keep the map accurate and up-to-date.

By harnessing the power of community reporting and real-time data processing, FreiFahren provides a valuable tool for navigating the Berlin public transport network with confidence.