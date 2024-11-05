# BookReview

**BookReview** (also known as *Book Heaven*) is a comprehensive web application built with the MERN stack for book enthusiasts. Users can explore, review, and manage a wide range of books, adding them to favorites or carts, leaving comments, and rating them. Admins can manage the book catalog, ensuring a dynamic and curated selection. The app is responsive, progressive, and offers a seamless user experience.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User-Friendly Book Exploration:** Discover a wide variety of books with details like author, language, description, and price.
- **Review and Rating System:** Users can rate books, leave comments, and read reviews.
- **Favorites & Cart Functionality:** Easily add books to favorites or cart for future reference.
- **Order Management:** Secure and seamless ordering process.
- **Responsive & Progressive:** Works well on mobile and desktop, with installable PWA features.
- **Admin Controls:** Admins can add, edit, and delete books from the collection.
- **Notifications:** Real-time toast notifications with React Toastify.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Framer Motion (for animations), React Toastify
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **PWA:** Vite Plugin PWA for progressive web app features
- **Deployment:** Render (backend), Netlify (frontend)
- **Authentication & State Management:** JWT, Redux Toolkit

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hanzala-mansuri/BookReviewMERNstack.git
   cd BookReviewMERNstack
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the backend folder and add the following variables:
     ```plaintext
     URI=your_mongo_db_connection_string (write your mongodb connection string) OR you can use my connection string. i.e. URI = mongodb+srv://hanzalamansuri11:hanzala@cluster0.izrji.mongodb.net/bookstore123 
     PORT=1000
     ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Application**
   - In the `backend` folder, start the backend server:
     ```bash
     node app.js
     ```
   - In the `frontend` folder, start the frontend server:
     ```bash
     npm run dev
     ```

5. **Access the App**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:1000](http://localhost:1000)

---

## Usage

### For Users:
- View available books, check details, rate, and comment.
- Add books to favorites or cart. Login required for commenting and purchasing.

### For Admins:
- Add new books, edit existing ones, and delete books as needed.

---

## Project Structure

```
BookReview/
├── backend/
│   ├── models/            # Mongoose models for the database
│   ├── routes/            # API routes
│   ├── controllers/       # Controller logic for routes
│   ├── config/            # Configuration files (e.g., DB connection)
│   ├── server.js          # Main server file
│   └── .env               # Environment variables for sensitive data
├── frontend/
│   ├── public/            # Static assets (e.g., icons, manifest)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # App pages (e.g., Home, Profile, About)
│   │   ├── store/         # Redux store setup
│   │   ├── App.js         # Main App component
│   │   └── main.js        # Main entry point
│   └── vite.config.js     # Vite configuration for PWA
└── README.md
```

---

## Deployment

### Frontend
- Deploy the `frontend` folder on **Netlify**. Ensure the build command is set to `npm run build` and the publish directory is set to `dist`.

### Backend
- Deploy the `backend` folder on **Render** or another Node.js-friendly platform. Ensure your `.env` file is configured correctly for production.

---

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

---

## License

This project is licensed under the MIT License.

---

Feel free to reach out @hanzalamansuri11@gmail.com, if you have questions or feedback. Happy coding!

---
