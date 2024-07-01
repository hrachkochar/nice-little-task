
# Nice Little Task

## Project Description
Nice Little Task is a backend project for a small game. It manages users and calculates the best players for each event.

## Installation Instructions
To install and run this project, you need to have Node.js and MongoDB set up on your machine.

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the necessary dependencies:
   \`\`\`
   npm install
   \`\`\`
4. Ensure you have MongoDB set up and running.

## Configuration
Before running the project, create a \`.env\` file in the root directory of the project and add the following variables:
\`\`\`
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=your_jwt_expiration_time
MONGO_URI=your_mongo_db_uri
\`\`\`

## Usage
To start the project, run the following command:
\`\`\`
npm run start
\`\`\`

The project exposes the following endpoints:

### User Endpoints
1. **Register User:**
   - **Endpoint:** \`api/v1/user/register\`
   - **Description:** Registers a new user. I the type(fish, dolphin or whale) of the user is specified during registration just for convenience.

2. **Login User:**
   - **Endpoint:** \`api/v1/user/login\`
   - **Description:** Logs in a user. Returns a JWT token that must be used with every request for Event endpoints.

### Event Endpoints
1. **Get Current Event:**
   - **Endpoint:** \`api/v1/event\`
   - **Description:** Returns the current event ID, status, end time, and rewards information from previous events if any.

2. **Claim Rewards:**
   - **Endpoint:** \`api/v1/event/claim\`
   - **Description:** Claims the rewards of the player after each event.

3. **Send Score:**
   - **Endpoint:** \`api/v1/scoring\`
   - **Description:** Sends the current score of the user for the ongoing event.

4. **Get Leaderboard:**
   - **Endpoint:** \`api/v1/scoring/leaderboard\`
   - **Description:** Shows the standings of the players.
