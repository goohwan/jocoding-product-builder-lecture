# Blueprint: Service Hub Website

## Overview

This project is a multi-service web application. It starts with a landing page that introduces the available services and provides navigation to each one. The initial services include a Lotto Number Generator, with plans to add more in the future. The application supports multiple languages, a dark/light theme, and includes a privacy policy page.

## Project Structure & Features

### 1. **Pages**
    *   **`index.html`**: The main landing page (Service Hub).
    *   **`lotto.html`**: The Lotto Number Generator service.
    *   **`privacy.html`**: The Privacy Policy page.

### 2. **Core Components**
    *   **Navigation (`<app-nav>`)**: A reusable custom web component for site-wide navigation.
        *   Links to all main pages.
        *   Theme toggle switch (dark/light mode).
        *   Language selector (English/Korean).
        *   **Sticky Position**: Fixed at the top for better UX.
    *   **Internationalization (i18n)**: A module to handle language switching across the site using `data-i18n` attributes.
    *   **Styling**: A central `style.css` for consistent look and feel, using modern CSS features like variables for theming.

### 3. **Design & UX**
    *   **Theme**: Dark and light modes for user preference. Default is **Dark Mode**.
    *   **Language**: Support for English and Korean. Default is **Korean**.
    *   **Layout**: A clean, modern, and responsive layout that works on both mobile and web.
    *   **Visuals**: Use of iconography and clear typography to enhance user experience.

## Development Log

### Phase 1: Initial Setup and Refactoring (Completed)
*   **[Done]** Restore project files.
*   **[Done]** Create `app-nav` web component.
*   **[Done]** Create `privacy.html` page.
*   **[Done]** Implement internationalization (i18n) module.
*   **[Done]** Refactor `index.html` into a landing page.
*   **[Done]** Ensure `lotto.html` functions correctly as a sub-page.
*   **[Done]** Apply consistent styling across all pages.

### Phase 2: Bug Fixes & Improvements (Completed)
*   **[Done]** **Fix Navigation Bar**: Made the navigation bar sticky (`position: sticky`) so it remains visible while scrolling.
*   **[Done]** **Fix Lotto Generator**: Refactored `lotto.js` to use a reliable local random number generator instead of a potentially unstable external API dependency. Added proper error handling and animation delays.
*   **[Done]** **Fix Toggles**: Resolved issues where Dark/Light mode and Language toggles were unresponsive by ensuring scripts and modules load correctly without blocking errors.
*   **[Done]** **Set Defaults**: Verified configuration to default to **Korean** language and **Dark Mode** for new users.
