# Auth0 Integration with SvelteKit

This repository demonstrates how to integrate Auth0 authentication with a SvelteKit application. Auth0 provides a flexible, secure, and easy-to-use authentication and authorization platform, while SvelteKit offers a powerful framework for building web applications with Svelte.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm/yarn
- Auth0 Account

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/arthurjgs/sveltekit-auth0-integration.git
   ```

2. **Install dependencies:**

   ```bash
   cd auth0-sveltekit-integration
   npm install
   ```

3. **Configuration:**

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Update `.env` with your Auth0 credentials and settings.

4. **Run the application:**

   ```bash
   npm run dev
   ```

   This command will start the development server. Open your browser and navigate to `http://localhost:5173` to view the application.

## Auth0 Configuration

1. **Create an Auth0 Application:**

   - Go to the [Auth0 Dashboard](https://manage.auth0.com/dashboard)
   - Navigate to Applications and click on "Create Application"
   - Choose "Regular Web Application" and provide a name for your application
   - Configure the allowed Callback URLs, Logout URLs, and Allowed Web Origins based on your development environment (`http://localhost:5173` for local development)
   - Save your changes

2. **Update Auth0 Settings in `.env`**

   - Update the `.env` file with your Auth0 Domain, Client ID, and Client Secret obtained from the Auth0 Dashboard.

## Usage

This application provides a simple demonstration of how to integrate Auth0 authentication with SvelteKit. Users can sign up, log in, and log out using Auth0's Universal Login feature. The authentication state is managed without any SDK.

## Folder Structure

- `/src`: Contains the source code of the SvelteKit application.
- `/src/routes/api`: Contains the api routes for handling authentication.
- `/src/lib/auth`: Contains utility functions and Auth0 configuration.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This README provides a basic overview of setting up Auth0 integration with SvelteKit. For more detailed information, refer to the official documentation of [Auth0](https://auth0.com/docs/) and [SvelteKit](https://kit.svelte.dev/docs).