# 🌍 TripTales - Premium Travel Experiences

TripTales is a high-end travel platform designed for modern travelers, offering a seamless and premium experience for discovering and booking unique stays around the world.

![TripTales Preview](https://github.com/user-attachments/assets/a26437e3-d2f5-4e79-b51b-e60b0a4f8fd5)

## ✨ Premium Features

- 🌓 **Dynamic Theme Engine**: Persistent Dark and Light modes with system preference sync.
- 🚀 **Glassmorphism UI**: Modern navigation and interface elements with blur effects.
- ⚡ **Enhanced Performance**: Optimized listing cards with micro-animations and smooth transitions.
- 🛡️ **Advanced Security**: Integrated security headers (Helmet) and NoSQL injection protection.
- 📬 **Custom Notification System**: Premium toast notifications for real-time user feedback.
- 🗺️ **Interactive Maps**: Seamless integration with Leaflet for destination visualization.

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | EJS, Vanilla CSS (Custom Variable System), Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Auth** | Passport.js (Local Strategy), Passport-Local-Mongoose |
| **Storage** | Cloudinary (Media management) |
| **Security** | Helmet, Express-Mongo-Sanitize, Joi |

## 🚀 Quick Start

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB Atlas account
- Cloudinary account

### Installation
1. Clone the repo: `git clone https://github.com/sarthak03dot/PROJECT-TOURISTER.git`
2. Install dependencies: `npm install`
3. Set up `.env` with:
   ```env
   ATLASDB_URL=...
   CLOUD_API_KEY=...
   CLOUD_API_SECRET=...
   CLOUD_NAME=...
   SECRET=...
   ```
4. Launch the experience: `npm run dev`

## 📂 Architecture

```text
├── controllers/    # Business logic
├── models/         # Data schemas
├── routes/         # API endpoints
├── views/          # EJS templates
├── public/
│   ├── css/        # Custom design system
│   └── js/         # Dynamic interactions
└── utils/          # Global helpers
```

## 📜 License
This project is licensed under the MIT License - feel free to build upon it!
