## Project Setup

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud-based like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Contact-Management-CRM.git
   cd Contact-Management-CRM
   ```

2. **Backend Setup**
   - Navigate to the `server` folder.
   - Create a `.env` file with the following content:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```
   - Start the backend server:
     ```bash
     nodemon index.js
     ```

3. **Frontend Setup**
   - Navigate to the `client` folder.
   - Install frontend dependencies:
     ```bash
     cd ../client
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```

Your app should now be running on:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Database Schema

The Contact document schema used in MongoDB:
```javascript
{
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  company: String,
  jobTitle: String
}

## How It Works

- **Frontend**: Built with React and Material UI, featuring a form for adding/editing contacts and a table to display contact information.
- **Backend**: Built with Node.js and Express, it includes API routes to perform CRUD operations.
- **Database**: MongoDB stores contact information with unique constraints on emails to prevent duplicates.
