Chat Application Setup and Documentation
Prerequisites

Node.js installed on your machine.
Yarn package manager installed (preferred).

Step 1: Clone the Repository

Clone the chat application repository from GitHub to your local machine.

    git clone https://github.com/satyan0/chat_app.git

Step 2: Set Up the Backend (API)
1. Navigate to the API folder:

        cd chat_app/api

2. Install Dependencies:

        yarn install

3. Set Environment Variables:

Create a .env file in the api directory with the following content:

    MONGO_URL="mongodb+srv://<your-mongodb-connection-url>"
    JWT_SECRET="your-secret-key"
    CLIENT_URL="http://localhost:3000"  # If you're running the frontend locally, set the client URL accordingly.

Make sure to replace <your-mongodb-connection-url> with your actual MongoDB connection URL.
4. Start the Backend Server:

    yarn start

The backend server will start on port 4040.
Step 3: Set Up the Frontend (Client)
1. Navigate to the Client folder:

        cd ../client

2. Install Dependencies:

        yarn install

3. Start the Frontend Development Server:
        
        yarn dev

The frontend development server will start, and you can access the application in your web browser at http://localhost:3000 (or the URL you set in the .env file).
Step 4: Using the Chat Application

Open your web browser and go to http://localhost:3000 (or the URL you set).

You can either log in or register using your username and password.

Once logged in, you can start chatting with other users. You will see the list of online users in the sidebar.
Click on a user's name in the sidebar to start a chat with them.
Type your messages in the chat input field and press Enter to send a message.

You can switch between different users in the sidebar to have multiple chat sessions.
