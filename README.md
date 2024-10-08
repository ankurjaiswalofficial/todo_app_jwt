# JWT Authorized TODO Application

A simple TODO application demonstrating the real-world use case of JWT for authentication and authorization. The application allows users to register, log in, manage their tasks, and ensures that only authenticated users can access and modify their TODOs.

## Features

- **User Registration**: New users can sign up with their email and password.
- **User Login**: Existing users can log in to access their TODO list.
- **JWT Authentication**: Uses JWT to secure API routes and manage user sessions.
- **Protected Routes**: Only authenticated users can access and manage their tasks.
- **CRUD Operations**: Users can create, read, update, and delete TODO items.
- **Client-Side Storage**: JWT is stored securely in `localStorage`.
- **Form Validation**: Utilizes Zod for schema validation during registration and login.
- **Responsive UI**: Built using Tailwind CSS and shadcn/ui for a modern and responsive design.

## Tech Stack

- **Next.js**
  Framework for server-side rendering and routing (App Router).
- **React.js**
  Library for building the user interface.
- **TypeScript**
  Strongly typed language to enhance development.
- **jsonwebtoken**
  For JWT generation and verification.
- **Tailwind CSS**
  Utility-first CSS framework for styling.
- **shadcn/ui**
  Component library for consistent UI components.
- **Zod**
  Schema validation library for form validation.
- **LocalStorage**
  To manage user sessions on the client side.

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your system.
- MongoDB (or a hosted service like MongoDB Atlas) for the backend.

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ankurjaiswalofficial/todo_app_jwt.git
   cd jwt-todo-app
   ```
2. Install frontend dependencies:

   ```bash
   npm install
   ```
3. Generate OpeSSL Key and add it to the `.env` file in the root directory.

   ```bash
   npm run gensecret
   ```
4. Update API endpoints in your frontend files (`/src/app/api/*`) if needed.
5. Start the frontend:

   ```bash
   npm run dev
   ```
6. Access the application at [http://localhost:3000](http://localhost:3000).

## Application Structure

```
        ├── src/
        │   └── components/*
        │   └── app/api/*
        │   └── service/*
        │   └── schema/*
        │   └── lib/*
        │   └── hooks/*
        │   └── handler/*
        │   └── validation/*
        │   └── types/*
        ├── .env
        ├── components.json
        ├── README.md
        ├── package.json
```

### Structure Explanation:

- **`src/`**: The main directory containing the source code of the application.

  - **`components/`**: Contains reusable components, including those built using Shadcn UI components and any custom logic specific to your application. Examples include buttons, forms, modals, and input fields.
  - **`app/api/`**: Defines the API routes using Next.js App Router. This is where server-side code such as authentication, user registration, and CRUD operations for the TODOs is implemented.
  - **`service/`**: Contains service files that handle business logic and interact with API endpoints. This layer abstracts away API calls, so they can be reused throughout the application (e.g., user authentication, CRUD operations for todos).
  - **`schema/`**: Holds schema definitions using Zod for validating API requests and form data. This ensures data integrity and helps manage the types used in the application.
  - **`lib/`**: A utility folder that includes shared libraries, such as functions for interacting with local storage, token management (e.g., JWT helpers), and configuration files (e.g., Axios setup for API calls).
  - **`hooks/`**: Custom React hooks that encapsulate logic to be reused across different components. Examples include hooks for managing form state, authentication status (`useAuth`), and data fetching (`useFetchTodos`).
  - **`handler/`**: Functions that handle various events such as form submissions, button clicks, and API responses. This folder separates UI components from logic and event handling, promoting a clean and organized codebase.
  - **`validation/`**: Contains validation logic, often using Zod schemas or other validation libraries, to ensure the data coming from forms or APIs meets the expected criteria.
  - **`types/`**: Defines TypeScript types and interfaces used across the application, ensuring strong typing for props, API responses, and other entities.
- **`.env`**: Environment configuration file containing sensitive information like API keys, database URLs, JWT secrets, and other environment-specific settings. Make sure this file is included in `.gitignore` to prevent sensitive data from being exposed.
- **`components.json`**: A configuration file that may define component metadata, structure, and dependencies for the project, particularly when using libraries like shadcn or similar.
- **`README.md`**: The markdown file providing an overview of the project, installation steps, application features, usage instructions, and any other relevant documentation.
- **`package.json`**: The file that manages project dependencies and scripts. It defines the npm packages required for the frontend and backend of the application and provides scripts for development, building, and deployment.
  API Endpoints

---

## JWT Implementation

- The server issues a JWT upon successful login or registration.
- The token is stored in `localStorage` on the client side.
- If the token is missing or invalid, the user is redirected to the login page.

## Development Notes

- **Client-Side Form Validation**: Forms are validated using Zod before submission to ensure proper data structure.
- **Security Considerations**: JWTs are stored in `localStorage` for simplicity, but consider using `httpOnly` cookies for more secure storage.
- **Styling**: Tailwind CSS is used for styling, providing a responsive and modern design.

## Deployment

- Frontend can be deployed using Vercel.
- Backend can be deployed using platforms like Heroku or DigitalOcean.
- Ensure that environment variables like `MONGO_URI` and `JWT_SECRET` are set correctly in the deployment environment.

## License

This project is open-source and available under the [MIT License](LICENSE).
