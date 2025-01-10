```markdown
# Yhangry- Frontend README

This repository contains the frontend code for a web application.  The application displays set menus, allows filtering by cuisine, and handles pagination. It utilizes Vite for development, React for the UI, and Redux Toolkit for state management.

## Project Setup

Before running the application, ensure you have Node.js and npm installed, ideally using nvm.  The required Node version is v18.20.3.

```bash
# Install dependencies (using yarn)
yarn install
```

## Running the Development Server

```bash
# Start the development server
yarn dev
```

This command will start the Vite development server.  The application will be accessible in your browser at `http://localhost:5173`.

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx            // Main application component
│   ├── components/        // Reusable UI components
│   │   ├── Header.jsx     // Header component
│   │   ├── Logo.jsx       // Logo component
│   │   ├── ...            // Other components
│   ├── pages/            // Specific page components
│   │   ├── SetMenusPage.jsx
│   │   ├── ...            // Other pages
│   ├── features/          // Redux Toolkit reducers and actions
│   │   └── menusSlice.js
│   ├── styles/           // CSS and SCSS files
│   ├── app/              //  Redux store
│   │   └── store.js
│   ├── config.js         // API base URL
│   └── main.jsx          // Application entry point
├── vite.config.js        // Vite configuration
├── eslint.config.js       // ESLint configuration
└── package.json         // Project dependencies
```

## API Interaction

The frontend interacts with a backend API (likely a Flask or similar framework) running on `http://localhost:5000`.  The `/api` endpoint is proxied in `vite.config.js` for easier development.

- **`/api/set-menus`:** Retrieves set menus.  It supports pagination (`page`, `per_page`) and filtering by cuisine (`cuisineSlug`).
- **`/api/cuisines`:** Retrieves available cuisines.


## Code Explanation

### `frontend/vite.config.js`

This file configures Vite, enabling the React plugin and setting up a proxy for requests to the backend API.

### `frontend/src/config.js`

Defines the base URL for the backend API, making it easily configurable.

### `frontend/src/features/menusSlice.js`

Handles state management for menus and cuisines using Redux Toolkit.  It defines actions (`fetchMenus`, `fetchCuisines`) to fetch data from the backend and reducers to update the application state. It uses `createAsyncThunk` for asynchronous operations.

### `frontend/src/app/store.js`

Sets up the Redux store and registers the `menusReducer`.


### Components (e.g., `SetMenuCard`, `Filters`, `Pagination`)

These components handle the presentation and interaction logic for their respective features.

## Key Improvements (Compared to a Simple Structure)

- **Redux Toolkit:** Uses Redux Toolkit for state management, which improves organization and reduces boilerplate.  This is crucial for larger applications.
- **Async Actions (createAsyncThunk):**  Fetches data from the backend using asynchronous actions.  The code now correctly handles asynchronous operations and ensures the UI doesn't update before the data is available.
- **Error Handling:** Includes `rejectWithValue` in the `fetchMenus` and `fetchCuisines` functions for robust error handling.
- **Clearer Pagination:** The `Pagination` component allows loading more items instead of potentially confusing page-changing navigation.
- **Filter Reset:** Clicking "All" cuisine in the Filters correctly resets the display.
- **API Configuration:** The base API URL (`API_BASE_URL`) is extracted into a configurable variable for better maintainability.
- **Guest Quantity:** Added a quantity input to the page to adjust menu totals based on the number of guests.
- **Import of components:** Fixed the import of the Logo component in the Header component to prevent errors.
- **Styling and structure:** Implemented better CSS organization, using separate files for each page and component.

## Potential Future Enhancements


- **UI Enhancements:**  Consider adding features such as sorting options, searching, and improved layout.
- **State Validation:**  Implement checks and validation for state values.
- **Testing:** Add unit and integration tests for the application.


This detailed README aims to provide comprehensive information on the project's setup, functionality, and potential future development. Remember to thoroughly test any changes to avoid introducing bugs.
```