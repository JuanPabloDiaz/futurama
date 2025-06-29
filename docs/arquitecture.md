# Futurama Project Architecture

This document details the architecture of the Futurama project, a full-stack web application built with **Next.js**.

## Overview

The Futurama project is a web application that displays information about characters from the animated series Futurama. The project's architecture is **full-stack**, exclusively using **Next.js**, eliminating the need for separate Express.js or Node.js instances.

## Core Components

### Frontend

  - **Framework**: React 18.2.0
  - **UI Library**: Next.js 13.4.1
  - **Styling**: Tailwind CSS 3.3.2
  - **Icons**: React Icons
  - **Animations**: Framer Motion

### Backend

  - **API Routes**: Provided by Next.js
  - **Endpoints**: `/api/characters`, `/api/characters/[slug]`, `/api/character-avatar/[slug]`
  - **No Separate Server**: Next.js handles all HTTP requests

### Data Storage

  - **Format**: JSON Files
  - **Location**: `/data/characters.json`
  - **No Traditional Database**: All data is static and stored in JSON files

## Folder Structure

```
/app                  # Main Next.js App Router directory
  /api                # API Routes (backend)
    /characters       # Endpoints for character data
    /character-avatar # Endpoint for character avatars
  /characters         # Character detail pages
  /page.jsx           # Home page
/components           # Reusable React components
/data                 # JSON files with data
/public               # Static assets (images, etc.)
/lib                  # Utilities and helper functions
/utils                # Additional utility functions
```

## Data Flow

1.  **Client Request**: The browser requests a page or data.
2.  **Page Rendering**: Next.js renders the page (SSR or CSR as applicable).
3.  **Data Request**: The React component makes a `fetch` request to an internal API endpoint.
4.  **API Processing**: The endpoint reads data from the JSON file.
5.  **Data Transformation**: The API processes and transforms the data as needed.
6.  **Response to Client**: Data is returned to the React component.
7.  **Final Rendering**: The component displays the data in the user interface.

## Advantages of this Architecture

1.  **Simplicity**: Everything resides within a single project and framework.
2.  **Performance**: Next.js automatically optimizes for performance.
3.  **Ease of Deployment**: The entire application can be deployed as a single unit.
4.  **No Need to Manage Multiple Servers**: Backend and frontend are integrated.
5.  **Faster Development**: Reduced configuration and fewer tools to manage.

## Key Technical Features

  - **Server-side Rendering (SSR)**: Improves SEO and initial page load performance.
  - **API Routes**: Handles data requests without the need for a separate server.
  - **Client-side Components**: Marked with `'use client'` for interactive elements.
  - **Image Handling**: A custom component manages image errors.
  - **Responsive Design**: Adapts seamlessly to various screen sizes.
  - **Thematic Styles**: Features a futuristic design consistent with the Futurama theme.

## Frontend-Backend Communication

The frontend communicates with the backend via `fetch` requests to internal API endpoints:

```javascript
// Example API request
async function fetchCharacters() {
  const response = await fetch(`/api/characters?t=${timestamp}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  })
  const data = await response.json()
  // Process data...
}
```

## API Endpoints

  - **GET `/api/characters`**: Returns a list of all characters.
  - **GET `/api/characters/[slug]`**: Returns detailed information about a specific character.
  - **GET `/api/character-avatar/[slug]`**: Generates an avatar for a character when an image is unavailable.

## Conclusion

The Futurama project's architecture is an excellent example of a modern full-stack application built with **Next.js**. By leveraging Next.js for both frontend and backend operations, the project achieves a simplified yet powerful architecture, eliminating the need for additional servers or frameworks.