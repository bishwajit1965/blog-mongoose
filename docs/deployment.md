# Nova Journal — Deployment Guide

## Production Architecture

Nova Journal uses a three-part production architecture:

- Frontend: Vercel
- Backend API: Render
- Database: MongoDB Atlas

### Production Flow

Browser
→ Vercel Frontend
→ Render API
→ MongoDB Atlas

## Production URLs

### Frontend

https://blog-mongoose-one.vercel.app

This is the stable Vercel Production domain.

### Backend API

https://nova-journal-api.onrender.com

The frontend communicates with the backend through the `/api` path.

## Frontend Environment

The Vite frontend uses:

VITE_API_BASE_URL=https://nova-journal-api.onrender.com/api

## Backend CORS

The backend must allow the stable Vercel Production origin:

CLIENT_ORIGIN=https://blog-mongoose-one.vercel.app

Do not use an individual Vercel deployment URL as the permanent production origin.

Vercel may generate different deployment URLs for individual deployments.

## Deployment Procedure

### 1. Verify the local application

Test the application locally and confirm that:

- frontend data loads
- CRUD operations work
- authentication works where applicable
- no important console errors remain

### 2. Commit changes

```bash
git add .
git commit -m "Deployment related details are documented for future reference"