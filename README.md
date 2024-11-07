# Bitcoin Live Data

## Introduction
This project is an application that fetches live data about Bitcoin and presents it in a graphical user interface. The application was developed as part of the portfolio exam in Software Technology in Cyber-Physical Systems during the 4th semester.

## Technologies
- **Backend**: 
  - Node.js
  - Express.js
  - Axios
  - Moment.js
  - MySQL
  - Sequelize
  - CORS
  - dotenv

- **Frontend**: 
  - React
  - Chart.js
  - React Chart.js 2
  - Axios

## Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend folder and add your environment variables:
   ```
   CRYPTO_API_URL=<your_api_url>
   CRYPTO_API_URL_TOKEN=<your_api_token>
   DB_HOST=<database_host>
   DB_USER=<database_user>
   DB_PASSWORD=<database_password>
   DB_PORT=<database_port>
   DB_NAME=<database_name>
   ```

## Running the Application
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

## API Endpoints
- `GET /api/dashboard/get-crypto-graph-data`: Fetches graph data for cryptocurrency.
- `GET /api/dashboard/fetch-crypto-live-data`: Fetches live data for Bitcoin and updates the database.

## Contributing
Contributions are welcome! If you would like to contribute to the project, feel free to create a pull request or open an issue.