# TrackMyHunt

**TrackMyHunt** is a comprehensive job-hunt management platform designed to help students and developers organize their career journey. It provides a centralized dashboard to track applications, plan opportunities, manage skills, and store resources.

![TrackMyHunt Dashboard](https://github.com/ayushkhandelwal18/TrackMyHunt/raw/main/frontend/src/assets/dashboardpreview.png)

## Features

- **📊 Dashboard**: Visual overview of your application status, interview counts, and skill progress.
- **💼 Application Tracker**: Log and manage job applications with status updates (Applied, Interview, Rejected, etc.).
- **📅 Opportunity Planner**: Plan future openings and internships month-by-month.
- **🎯 Skillboard**: Track technical skills and identify gaps for target roles.
- **📚 Resources Hub**: Save and organize learning materials, blogs, and courses.
- **📝 Notes**: Maintain personal notes, interview experiences, and reminders.
- **📄 Resume Manager**: Keep track of different resume versions and links.
- **🔐 Authentication**: Secure login/signup with Email/Password and **Google OAuth**.
- **📱 Fully Responsive**: Optimized for both desktop and mobile devices.

## Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **React Router** (Navigation)
- **React Google OAuth**

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **JWT** (Authentication)
- **Nodemailer** (OTP & Emails)
- **Google Auth Library**

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB connection string (Atlas or Local)
- Google Cloud Console Project (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushkhandelwal18/TrackMyHunt.git
   cd TrackMyHunt
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_app_password
   GOOGLE_CLIENT_ID=your_google_client_id
   CLIENT_URL=http://localhost:5173
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory if needed (e.g., for API URL if not hardcoded):
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
TrackMyHunt/
├── backend/            # Express.js API
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── services/       # Business logic
│
└── frontend/           # React App
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # React Context (Auth)
    │   ├── pages/      # Application pages
    │   └── services/   # API calls (Axios)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---
*Created by [Ayush Khandelwal](https://github.com/ayushkhandelwal18)*
