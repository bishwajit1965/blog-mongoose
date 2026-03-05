# Bishwajit.Dev – Full Stack Blogging Platform

Bishwajit.Dev is a modern full-stack blogging platform built with **React, Node.js, Express, and MongoDB**.
It supports dynamic blog publishing, category and tag filtering, RSS feeds, SEO-friendly routing, and a scalable backend architecture.

This project was developed as a **production-style portfolio project** to demonstrate full-stack development skills including authentication systems, REST API design, database modeling, and modern frontend architecture.

---

## Developer

This project was designed and developed by:

**Bishwajit Paul**
Full Stack JavaScript Developer

Specializing in building scalable web applications using the MERN stack.

---

## Developer Skills Demonstrated

This project showcases practical experience in:

### Frontend Development

- React component architecture
- React Hooks based state management
- Dynamic routing with React Router
- Responsive UI using TailwindCSS
- API integration using Axios
- Component reusability and modular design

---

### Backend Development

- RESTful API design with Express.js
- MVC style controller architecture
- JWT authentication and authorization
- Role based access control
- Middleware based request validation
- File upload handling using Multer

---

### Database Design

- MongoDB schema design with Mongoose
- Relational document modeling
- Indexing and optimized queries
- Data validation and schema enforcement

---

### Advanced Features Implemented

- Scheduled post publishing system
- Blog filtering by categories and tags
- Full site text based search
- RSS feed generation
- SEO friendly blog routing
- Blog view tracking
- Image upload handling
- Modular and scalable backend structure

---

### Development Principles Followed

- Clean and modular code structure
- Separation of concerns
- Reusable components
- Maintainable folder architecture
- Production-style backend organization

---

## Purpose of the Project

This project was built to:

- Demonstrate full-stack development capability
- Showcase backend API architecture
- Practice real-world blog platform features
- Build a production-ready portfolio project

---

## Contact

GitHub: https://github.com/bishwajit1965/blog-mongoose
Email: paul.bishwajit09@gmail.com

# Features

## Core Blog Features

- Create, edit, update, and delete blog posts
- Draft, scheduled, and published post workflow
- Category and tag system
- Blog filtering by category and tag
- Featured images for posts
- Responsive blog post cards
- Scheduled posts with countdown timer
- "Coming Soon" post preview

---

## User Interaction

- Comment system
- Post view tracking
- Category navigation
- Tag based content discovery
- Responsive layout for mobile and desktop

---

## SEO & Content Distribution

- SEO friendly slug URLs
- RSS feed support
- Sitemap generation
- Structured blog content rendering

---

## Admin Dashboard

- Secure admin authentication
- Blog post management (CRUD)
- Category and tag management
- Post scheduling system

---

# Tech Stack

## Frontend

- React
- React Router
- TailwindCSS
- Axios
- React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file upload)
- Node Cron (scheduled tasks)

---

# Project Architecture

The project follows a **layered architecture** separating frontend, API logic, and database models.

```
Client (React)
      ↓
REST API (Express)
      ↓
Controllers
      ↓
Mongoose Models
      ↓
MongoDB Database
```

---

# Folder Structure

## Client

```
client/
│
├── components
├── pages
├── hooks
├── services
├── contexts
└── utils
```

---

## Server

```
server/
│
├── controllers
├── models
├── routes
├── middleware
├── utils
└── config
```

---

# Authentication System

The platform uses **JWT based authentication with refresh tokens**.

### Authentication Flow

1. User logs in with email and password
2. Server generates

- Access Token
- Refresh Token

3. Access token is used for protected API requests
4. Refresh token generates a new access token when expired

### Security Features

- Password hashing with bcrypt
- Token verification middleware
- Role based access control

---

# Database Models

The application uses **MongoDB with Mongoose schemas**.

---

## User Model

```
name
email
password
role
avatar
createdAt
```

---

## BlogPost Model

```
title
slug
content
author
category
tags
featuredImage
status
publishAt
views
createdAt
```

Post status options:

```
draft
scheduled
published
```

---

## Comment Model

```
post
user
content
status
createdAt
```

---

## Category Model

```
name
slug
description
```

---

## Tag Model

```
name
slug
```

---

# Filtering System

Posts can be filtered using **category and tag combinations**.

Example query:

```
/blogs?category=nodejs&tag=authentication
```

This allows dynamic discovery of blog posts.

---

# RSS Feed

The blog generates an RSS feed for content distribution.

Feed endpoint:

```
/api/blogs/rss
```

Users can subscribe to the feed using RSS readers or browser extensions to automatically receive updates when new posts are published.

---

# Scheduled Posts

The platform supports **Coming Soon publishing**.

The platform supports **Future Publishing**.

Posts scheduled for the future:

- Appear in the "Coming Soon" section
- Display a countdown timer
- Automatically become visible once the publish time arrives

---

# Image Upload System

Images are uploaded using **Multer middleware**.

Used for:

- Blog featured images
- Author profile images
- Media uploads for future features

---

# Performance Considerations

The application includes several optimizations:

- Lean MongoDB queries
- Modular controller design
- Pagination for blog lists
- Optimized API responses

---

# Installation

## Clone the Repository

```
git clone https://github.com/bishwajit1965/blog-mongoose.git
```

---

## Install Dependencies

Client

```
cd client
npm install
```

Server

```
cd server
npm install
```

---

# Environment Variables

Create a `.env` file in the **server** directory.

Example configuration:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

# Run the Project

Start backend server

```
npm run dev  OR nodemon index.js
```

Start frontend

```
npm run dev
```

---

# Future Improvements

Planned enhancements for the project include:

- Full text search
- Redis caching
- Markdown editor support
- Post reactions system
- Email newsletter integration
- Advanced analytics dashboard

---

# Author

**Bishwajit Paul**

Full Stack JavaScript Developer
React | Node.js | Express | MongoDB

---

# License

This project is licensed under the MIT License.
