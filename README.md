# EdTech CRM & Inquiry System

A full-stack inquiry management application for an EdTech business. Visitors can submit inquiries through a public form, and an administrator can log in to review and search submitted inquiries.

## Features

### Public Inquiry Form
- User Type: Parent, Student, or School
- Category: Scholarship, Concert, Admission, or General Query
- Personal details: Name, Email, Phone Number
- Message / Query field
- Backend validation and storage in Supabase PostgreSQL

### Admin Dashboard
- Custom admin authentication using bcrypt and JWT
- JWT stored in an HttpOnly cookie
- Protected dashboard API
- Inquiry table displaying Name, Phone, Email, User Type, Category, Date, and Status
- Filter inquiries by Category and User Type
- Search inquiries by Name or Phone Number
- Admin logout functionality

## Technology Stack

- **Frontend:** React.js, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** Supabase PostgreSQL
- **Database Client:** pg
- **Validation:** Zod
- **Authentication:** bcrypt, JSON Web Token (JWT), HttpOnly Cookies

## Project Structure

k12-hunar-assignment/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── Routes/
│   ├── schema.sql
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

## Prerequisites

- Node.js and npm
- Supabase account and PostgreSQL database

## Database Setup

1. Create a project on [Supabase](https://supabase.com/).
2. Open the SQL Editor in your Supabase dashboard.
3. Execute the SQL queries provided in `Backend/schema.sql`.
4. Copy your PostgreSQL connection string from Supabase project settings.
5. Add the connection string to `Backend/.env` as `DATABASE_URL`.

The database contains two main tables:

- **admins:** Stores administrator details and bcrypt-hashed passwords.
- **inquiries:** Stores submitted inquiry details, timestamps, and status.

### Creating the First Admin

Create the initial admin account using your backend's admin creation process. The password must be hashed using bcrypt before storing it in the database.

Never store plain-text passwords.

## Environment Variables

Create the following environment files locally.

### Backend/.env

```env
PORT=5000
DATABASE_URL=your_supabase_postgresql_connection_string
JWT_SECRET_KEY=your_long_random_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend/.env

```env
VITE_BACKEND_URL=http://localhost:5000
```

Replace the example values with the actual configuration used by your application.

Do not upload `.env` files or expose database credentials and JWT secrets in the GitHub repository.

## Installation and Running Locally

### 1. Start the Backend

Open a terminal and execute:

```bash
cd Backend
npm install
npm run dev
```

If your backend does not have a `dev` script, use the start command defined in `package.json`.

### 2. Start the Frontend

Open another terminal and execute:

```bash
cd Frontend
npm install
npm run dev
```

The Vite development server will provide the frontend URL, usually:

```text
http://localhost:5173
```

## Application Testing

### Public Inquiry Form

1. Open the application in your browser.
2. Fill in the inquiry form.
3. Select the appropriate User Type and Category.
4. Submit the inquiry.
5. Verify that the inquiry is stored in the Supabase PostgreSQL database.

### Admin Authentication

1. Open the Admin Login page.
2. Enter valid administrator credentials.
3. Verify that the backend authenticates the admin using bcrypt password comparison.
4. Verify that a JWT is generated and stored in an HttpOnly cookie.
5. Access the protected dashboard.
6. Verify that unauthenticated requests to protected backend routes are rejected.

### Dashboard Testing

1. Verify that submitted inquiries appear in the dashboard.
2. Test filtering by Category.
3. Test filtering by User Type.
4. Test searching by Name.
5. Test searching by Phone Number.
6. Test the logout functionality.
7. After logout, verify that protected dashboard API requests are rejected.

## Authentication and Security

- Passwords are stored as bcrypt hashes.
- JWT-based authentication is implemented in the backend.
- JWT tokens are stored in HttpOnly cookies.
- Protected backend routes use authentication middleware.
- Frontend requests that require cookies use `credentials: "include"`.
- Express CORS must allow the frontend origin with credentials enabled.
- Database queries should use parameterized SQL queries to prevent SQL injection.

Frontend route protection is not a replacement for backend authentication middleware.

## API Endpoints

The following are example endpoints. Refer to the backend route files for the exact paths implemented in the application.

| Functionality | Method | Endpoint |
|---|---|---|
| Submit Inquiry | POST | `/inquiry/storeInquiry` |
| Admin Login | POST | `/auth/login` |
| Admin Logout | POST | `/auth/logout` |
| Fetch Dashboard Inquiries | GET | `/inquiry/dashboard` |

## Deployment

The application can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Supabase PostgreSQL

### Deployment Steps

1. Push the project to GitHub.
2. Deploy the Backend directory using Render.
3. Deploy the Frontend directory using Vercel.
4. Configure the required environment variables on both platforms.
5. Set `VITE_BACKEND_URL` to the deployed backend URL.
6. Configure backend CORS to allow the deployed frontend origin.
7. Configure secure cookie settings for production HTTPS.
8. Test the inquiry form, admin login, dashboard, filters, and logout on the deployed application.

## Important Notes

- Never commit `.env` files to GitHub.
- Never expose your Supabase database credentials.
- Never store plain-text admin passwords.
- Keep `schema.sql` and `README.md` in the root directory of the repository.
- Ensure that database table and column names match the SQL queries used in the backend.

---

**Project:** EdTech CRM & Inquiry System  
**Architecture:** React + Node.js + Express + Supabase PostgreSQL