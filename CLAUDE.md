# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a "Coming Soon" landing page for willgodfrey.com - a static website built with HTML, CSS (SCSS), and JavaScript. The site features a countdown timer targeting January 1, 2025, and includes a subscription form.

## Development Commands

Since this is a static site without a build system:
- **Run locally**: Open `index.html` directly in a browser or use a local server like `python -m http.server 8000` or `npx serve`
- **Compile SCSS**: If making style changes, SCSS files in `/assets/scss/` need to be compiled to CSS. Use a tool like `sass assets/scss/style.scss assets/css/style.css`

## Architecture & Structure

### Key Technologies
- **Frontend**: HTML5, Bootstrap 3.3.7, jQuery 1.12.3
- **Styling**: SCSS with Bourbon mixins (though Bourbon files are missing)
- **JavaScript**: Vanilla JS with jQuery for countdown timer and form handling

### Important Files
- `index.html` - Main landing page
- `assets/js/main.js` - Contains countdown timer logic and UI interactions
- `assets/scss/style.scss` - Main SCSS file that imports all other styles
- `assets/css/style.css` - Compiled CSS (do not edit directly)

### Missing Components
- `manifest.json` - Referenced but not present
- `php/subscribe.php` - Backend for subscription form
- Favicon files
- Bourbon mixin library files

## Important Considerations

1. **License**: This project is GPL v3 licensed - ensure any modifications comply with license terms
2. **Countdown Date**: Hardcoded to January 1, 2025 in `assets/js/main.js:37`
3. **Analytics**: Google Analytics is integrated (UA-116995311-1)
4. **Responsive Design**: Uses Bootstrap grid system - maintain mobile-first approach
5. **Form Submission**: Currently POSTs to non-existent `php/subscribe.php` - needs backend implementation or alternative solution