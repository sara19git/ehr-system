
## 🩺 Digital Record System

This repository contains a demo of a National Digital Record System, designed to securely store and manage patients' medical records. The system ensures efficient data access for healthcare professionals while maintaining high security standards and scalability.

## Technologies Used

###  Frontend
- React.js
- Tailwind CSS
- shadcn/ui
- Axios

### Backend

- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors

## Installation & Setup
First, make sure you have these prerequisites installed and running on your device:

- Node.js
- MongoDB
- Git

### 1. Clone the repository

After opening VS Code, open the Terminal and use this command to clone the project:

```bash
git clone https://github.com/sara19git/ehr-system.git
cd ehr-system
```

### 2. Run the Server

In the VS Code Terminal, write this command:
```bash
cd backend
```
then to install required packages add

```bash
npm install
```

### 3. Create the `.env` Environment File
After downloading and opening the project in VS Code, make sure to create a file named `.env` and add the following content:

``` javaScript
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- MONGO_URI: Replace this with the connection URL of your own MongoDB database.
- JWT_SECRET: Use a strong secret key (combination of letters, numbers, and symbols) to secure user authentication.

and 

```bash
npm start
```

### 4. Frontend Setup

```bash
cd frontend
```
then install required packages using this command

```bash
npm install
```
and run the project using this command 

```bash
npm run dev
```
Finally, congrats the demo is running on your browser and now you can test the current features...

## Current Features
- Doctor Registration
- Doctor Login with JWT Authentication
- Doctor Dashboard
- Create new medical record (name, age, diagnosis, prescriptions, etc...)
- View records belonging to the logged-in doctor

## How Doctors Use It
- Sign up via the registration page.
- Log in using email and password.
- After login, the doctor is redirected to the dashboard.
- From the dashboard, the doctor can:
- Click "Create New Record" to add a patient record.
- View all records linked to their account.

## Future Features (For Patients)
- Patient signup and login.
- View their personal informations (such as general infos & personal records).

## ⚠️ Notes
- This is currently just a demo version under  development.
- New features are coming soon.

# Demo Video

Watch the demo video on YouTube:

[![Watch the video](https://img.youtube.com/vi/6XxFdZJ_ukk/0.jpg)](https://youtu.be/6XxFdZJ_ukk)

The app interface deployed in Vercel.
https://ehr-system-beta.vercel.app/


