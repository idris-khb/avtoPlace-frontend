# AutoPlace Frontend

Frontend for AutoPlace microservice platform.

## 📌 Description

Frontend client for AutoPlace.

Responsibilities:

- UI for users
- sending requests to API Gateway
- displaying data from backend services
- working with REST API

Works with AutoPlace Gateway.

## 🛠 Tech stack

- TypeScript
- JavaScript
- HTML
- CSS
- Vite
- REST API

## 🏗 Architecture

Client → Frontend → Gateway → Microservices

Example:

Frontend → Gateway → User Service  
Frontend → Gateway → Media Service  

## ▶ Run locally

Install dependencies:

npm install

Run project:

npm run dev

Build project:

npm run build

## ⚙️ API connection

Frontend sends requests to Gateway.

Example:

http://localhost:8080/users  
http://localhost:8080/media  

Gateway routes requests to services.

## 📡 Part of project

This project is part of AutoPlace.

AutoPlace — microservice platform for car marketplace.

Includes:

- gateway-service
- user-service
- media-service
- frontend

## 👤 Author

Idris Khabudze  
GitHub: https://github.com/username
