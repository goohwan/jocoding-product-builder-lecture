# Blueprint: APBP (AI Product Builder's PlayGround)

## Overview

This project is a multi-service web application rebranded as **APBP (AI Product Builder's PlayGround)**. It starts with a landing page that introduces the available services and provides navigation to each one. The initial services include a Lotto Number Generator, with plans to add more in the future. The application supports multiple languages, a dark/light theme, and includes a privacy policy page. Google AdSense is integrated for monetization.

## Project Structure & Features

### 1. **Pages**
    *   **`index.html`**: The main landing page (Service Hub).
    *   **`lotto.html`**: The Lotto Number Generator service.
    *   **`food.html`**: The "What to eat today?" service.
    *   **`privacy.html`**: The Privacy Policy page.

### 2. **Core Components**
    *   **Navigation (`<app-nav>`)**: A reusable custom web component for site-wide navigation.
        *   Links to all main pages.
        *   Theme toggle switch (dark/light mode).
        *   Language selector (English/Korean).
        *   **Sticky Position**: Fixed at the top for better UX.
    *   **Internationalization (i18n)**: A module to handle language switching across the site using `data-i18n` attributes.
    *   **Styling**: A central `style.css` for consistent look and feel, using modern CSS features like variables for theming.
    *   **Assets**: SVG icons for services located in `assets/`.

### 3. **Design & UX**
    *   **Theme**: Dark and light modes for user preference. Default is **Dark Mode**.
    *   **Language**: Support for English and Korean. Default is **Korean**.
    *   **Layout**: A clean, modern, and responsive layout that works on both mobile and web.
    *   **Visuals**: Use of iconography and clear typography to enhance user experience.
    *   **Interactivity**: 
        *   Clicking on a generated lotto number row copies the numbers to the clipboard.
        *   Visual feedback is provided upon copying.
        *   "What to eat today?" features a random meal recommender with dynamic image fetching (simulated search) and a "Thinking..." loading state.

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

### Phase 3: Visual & UX Enhancements (Completed)
*   **[Done]** **Add Service Images**: Replaced emoji placeholders with custom SVG icons (`lotto-icon.svg`, `rocket-icon.svg`) for a more professional look.
*   **[Done]** **Center Lotto Machine**: Fixed the alignment of the lotto machine container to be perfectly centered on the page using `margin: 0 auto`.
*   **[Done]** **Copy to Clipboard**: Added functionality to copy lotto numbers to the clipboard when a user clicks on a number row, with visual "Copied!" feedback.

### Phase 4: New Services (Completed)
*   **[Done]** **Add "What to eat today?"**: Create a new service that randomly recommends a meal (Korean, Chinese, Japanese, Western) and fetches a relevant image. Includes a "Thinking..." loading state.

### Phase 5: Refinements & Fixes (Current)
*   **[Done]** **Navigation Update**: Added "What to eat today?" link to the main navigation bar.
*   **[Done]** **Fix Toggles**: Refactored `nav.js` to handle theme and language toggles internally, ensuring they work consistently across all pages without external dependencies.
*   **[Done]** **Naver Image Search Integration**: Implemented Naver Search API (Image) logic to fetch real "Nth" search results using the provided Client ID and Secret. **Note:** Direct frontend calls may encounter CORS issues in some environments.