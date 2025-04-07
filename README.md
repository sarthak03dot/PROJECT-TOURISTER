# PROJECT-TOURISTER

The Project Tourister using modern web development technologies. This project replicates key features of the Airbnb platform, providing users with a seamless experience for browsing, booking, and managing rental properties.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign-up, Login, Logout)
- Browse Listings by Location, Date, and Guests
- Detailed Property Pages with Photos and Descriptions
<!-- - Booking Functionality -->
- Host Dashboard for Managing Listings
- Search and Filter Options
- Responsive Design for Mobile and Desktop

## Tech Stack

- **Frontend:** EJS, Bootstrap,
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js
- **Cloud Services:** Cloudinary (for image uploads)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v16 or higher)
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   https://github.com/sarthak03dot/PROJECT-TOURISTER.git
   cd PROJECT-TOURISTER
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install server dependencies
   npm install

   ```

3. Configure environment variables:
   Create a `.env` file in the  directory with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Usage

- Create an account or log in as a user.
- Browse available properties and filter based on your preferences.
- View detailed property information and book a stay.
- Hosts can log in to manage their listings.

## Screenshots

![Image](https://github.com/user-attachments/assets/a26437e3-d2f5-4e79-b51b-e60b0a4f8fd5)

## Folder Structure

```
project-root
|--    controllers
|--    init
|--    models
|--    node_modules
|--    public
|--    routes
|--    uploads
|--    utils
|--    views
|--   .gitignore
|--   app.js
|--  cloudconfig.js
|--  middleware.js
|--  package-lock.json
|--  package.json
|--  README.md
|--  schema.js


```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add feature name'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
