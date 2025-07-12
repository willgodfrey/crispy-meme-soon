# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimalist single-page portfolio website for Will Godfrey. The entire site is self-contained in a single `index.html` file with inline CSS and minimal JavaScript. No build process or external dependencies are required.

## Development Commands

- **Run locally**: Open `index.html` directly in a browser or use a simple HTTP server:
  - `python -m http.server 8000`
  - `npx serve`
  - `php -S localhost:8000`

## Architecture & Structure

### Design Philosophy
- **Zero dependencies**: No external CSS, JS libraries, or frameworks
- **Single file**: Everything contained in `index.html`
- **Inline everything**: CSS and JS are embedded directly
- **Privacy-focused**: Email address is obfuscated and only revealed on user interaction

### Key Features
1. **Responsive design** using CSS custom properties and flexbox
2. **Avatar with fallback**: Shows initials "WG" if image fails to load
3. **Email obfuscation**: Contact email assembled only after button click
4. **Inline SVG favicon**: No external favicon file needed for primary icon

### Missing Assets
The following files are referenced but not present:
- `images/will-godfrey.jpg` - Portrait photo
- `icons/apple-touch-icon.png` - Apple touch icon (180x180)
- `icons/favicon-32.png` - 32x32 favicon
- `icons/favicon-16.png` - 16x16 favicon
- `icons/site.webmanifest` - Web app manifest

## Deployment Workflow

### Automatic Deployment
This site is automatically deployed to Cloudflare Pages:
- **Trigger**: Every push to the `main` branch
- **Build command**: `exit 0` (no build required)
- **Output directory**: `/` (root)
- **Preview deployments**: Pull requests get unique preview URLs

### Important Deployment Notes
1. **No build step**: Since everything is in one HTML file, Cloudflare uses `exit 0` as the build command
2. **Git integration**: The repository is connected directly to Cloudflare Pages
3. **Branch deployments**: Non-main branches create preview deployments
4. **Instant updates**: Changes go live within seconds of pushing to GitHub

## Important Considerations

1. **License**: GPL v3 licensed - ensure modifications comply
2. **CSS Variables**: Theme customization via CSS custom properties at `:root`
3. **No Build Process**: Direct edits to `index.html` - no compilation needed
4. **Email Protection**: Contact email split into parts and assembled on click to prevent scraping
5. **Performance**: The single-file approach ensures minimal network requests and fastest possible load times
6. **Edge Deployment**: Optimized for Cloudflare's edge network with no server-side requirements