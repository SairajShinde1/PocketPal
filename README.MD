# PocketPal - Expense Tracker

## Tech Stack

MongoDB | Express.js | React.js | Node.js (MERN) | Tailwind CSS

## Overview

PocketPal is a full-stack MERN-based expense tracker designed to help users manage their finances efficiently. It provides a seamless experience for tracking income, expenses, and savings while offering insightful visualizations through bar charts and pie charts. The application ensures secure access with JWT-based authentication, allowing only authorized users to make changes.

## Features

- **Secure Authentication** – JWT-based authentication ensures only authorized users can modify data.
- **Forgot Password** - Forgot Password feature with email-based password reset using JWT, Nodemailer, and bcrypt for secure authentication.
- **Expense & Budget Management** – Users can add, edit, delete and track their transactions with ease.
- **Visual Insights** – Includes interactive bar charts for **Income vs. Expenses** and **Savings vs. Goal**, along with a pie chart for expense distribution.
- **Transaction History** – Users can view and filter past expenses efficiently.
- **Customization Options** – Allows users to set savings goals, change currency, and personalize preferences.
- **User-Friendly Interface** – Built with Tailwind CSS for a clean and responsive design.

## Installation & Setup

1. Clone the repository:
   <br>
   git clone https://github.com/SairajShinde1/PocketPal.git

2. Navigate to the project directory:
   <br>
   cd pocketpal

3. 🖥️ Frontend Setup:
   <br>
   cd pocketpal-ui
   <br>
   npm install
   <br>
   npm start

4. ⚙️ Backend Setup:
   <br>
   cd pocketpal-server
   <br>
   npm install
   <br>
   npm start

5. 🔑 Environment Variables (.env):
   <br>
   MONGODBAT_URI= your_mongodb_connection_string
   <br>
   JWT_SECRET= your_secret_key

6. Open the application in your browser at `http://localhost:3000`

## Deployment

- The PocketPal Application has been successfully deployed on Render:
  <br>
- https://pocketpal-hs0y.onrender.com/
  <br/>
- Database: MongoDB Atlas

## Future Enhancements

- Implement forgot-password feature. <b>Added **08/02/2025**</b>
- Implement the feature to see previous year's Expense's & Savings
- Email notifications/reminders

**Made with ❤️ by Sairaj Shinde**
