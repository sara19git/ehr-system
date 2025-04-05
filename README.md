
# Digital Record System

This repository contains the backend implementation of a National Digital Record System, designed to securely store and manage patients' medical records. The system ensures efficient data access for healthcare professionals while maintaining high security standards and scalability.


## 🔹 Features: 

✅ Utilizes MongoDB as the database to store unstructured medical records informations.

✅ Developed using Node.js & Express.js for a backend.

✅ Provides RESTful APIs for seamless integration with healthcare systems.

✅ Supports patient history tracking, including diagnoses, prescriptions, and test results.

✅ Ensures data security & privacy through authentication (JWT) and encryption mechanisms (bcryptjs).

## 🔹 Future Enhancements:

✅ Integration with frontend interfaces (React.js) for doctors, patients, and admins.

## 📌Note: 

 This repository currently includes only the backend part of the system. The full project, including the frontend, will be published soon upon completion.


## usage steps

## Prerequisites

First, make sure you have these prerequisites installed on your device:

- Node.js

- MongoDB (or use MongoDB Atlas)

- Git (to download the project from GitHub)

- Postman (to test the APIs)

## How to Run the Project

## 1️⃣ Clone the Project from GitHub
After opening VS Code, open the Terminal and use this command to clone the project:

```bash
git clone https://github.com/sara19git/ehr-system.git
cd ehr-system
```

## 2️⃣ Install Required Packages
The project includes a list of packages defined in the `package.json` file. They will be installed automatically using this command:

```bash
  npm install
```

## 3️⃣ Create the `.env` Environment File
After downloading and opening the project in VS Code, make sure to create a file named `.env` and add the following content:

``` javaScript
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- MONGO_URI: Replace this with the connection URL of your own MongoDB database.
- JWT_SECRET: Use a strong secret key (combination of letters, numbers, and symbols) to secure user authentication.

## Run the Server 
In the VS Code Terminal, write this command: 

```bash
  npm run dev
```

Then add:

```bash
  npm start
```

If everything is working correctly, you should see this message:

```bash
  DataBases is connectd successfully!
  Server is running on PORT 8000
```

## Available APIs (Endpoints)


| method    | path     | Description |              
| :-------- | :------- | :-----------|
| `POST` | `http://localhost:8000/api/patient/createPatient` | 	Create and store new patient data in the database | 
| `GET` | `http://localhost:8000/api/patient/getAllPatients` | Retrieve all stored patients' data from the database | 
| `PUT` | `http://localhost:8000/api/patient/updatePatient/:id/` | Update a specific patient’s data using their ID|
| `DELETE` | `http://localhost:8000/api/patient/deletePatient/:id/` | Delete a specific patient’s data using their ID| 
| `POST` | `http://localhost:8000/api/patient/registerPatient` | Register a new patient account   |
| `POST` | `http://localhost:8000/api/patient/loginPatient` | Log in |
| `GET` | `http://localhost:8000/api/patient/getPatient` | Retrieve a single patient's data from the database |

## Note:

To test these APIs, use Postman.

In particular, this API:
`http://localhost:8000/api/patient/getPatient`
requires authentication using a Token.
When logging in using this API:
`http://localhost:8000/api/patient/loginPatient`,
you will receive a Token that must be included in the Authorization header.

## API Testing with Swagger UI
The APIs have been documented using Swagger UI, and you can access it via your browser when the server is running:

http://localhost:8000/api-docs

You can test all the APIs directly through Swagger’s graphical interface.

