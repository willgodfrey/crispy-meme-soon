# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern single-page portfolio website for Will Godfrey featuring a dark theme design with animated backgrounds. The entire site is self-contained in a single `index.html` file with inline CSS and JavaScript. No build process or external dependencies are required.

## Current Implementation Details

### Design Features
- **Dark theme** with black background and white/blue accent colors
- **Animated grid background** that moves subtly
- **Gradient blur effects** in corners for visual depth
- **Smooth scroll animations** using Intersection Observer
- **Hover effects** on all interactive elements

### Technical Stack
- **Zero dependencies**: No frameworks, libraries, or build tools
- **Single file**: Everything in `index.html` (HTML + inline CSS + inline JS)
- **Modern JavaScript**: ES6+ features, async/await patterns
- **CSS animations**: GPU-accelerated transforms for performance
- **Google Analytics**: GA4 tracking integrated (ID: G-RQMR51RTHC)

### Key Components

1. **Navigation Bar**
   - Fixed position with backdrop blur
   - Smooth scroll to sections
   - Responsive (hidden on mobile)

2. **Hero Section**
   - Animated avatar with fallback to initials
   - Professional headshot (400x400px)
   - Social links (LinkedIn, GitHub)

3. **Contact Implementation**
   - Advanced email obfuscation
   - Delayed loading (800ms) to prevent scraping
   - Multi-part string construction
   - Character codes for special characters
   - Smooth transition animations

4. **Favicon System**
   - SVG favicon with "WG" text on black background
   - PNG fallbacks (16x16, 32x32)
   - Multi-resolution ICO file
   - Inline base64 PNG for immediate loading

## Development Commands

- **Run locally**: 
  ```bash
  open index.html
  # or
  python -m http.server 8000
  ```

## File Structure

```
/
├── index.html           # Complete website
├── favicon.ico          # Multi-res icon
├── favicon.svg          # Vector favicon
├── favicon-16.png       # Small PNG
├── favicon-32.png       # Medium PNG
├── icons/
│   ├── linkedin.svg     # White-filled icon
│   ├── github.svg       # White-filled icon
└── images/
    └── will-godfrey.jpg # Headshot (400x400)
```

## Deployment Workflow

### Cloudflare Pages Configuration
- **Production branch**: `main`
- **Build command**: `exit 0`
- **Output directory**: `/`
- **Auto-deploy**: On every push
- **Preview URLs**: For non-main branches

### Important URLs
- **Production**: willgodfrey.com
- **Repository**: github.com/willgodfrey/crispy-meme-soon

## Code Style Guidelines

1. **No external dependencies** - Everything must be self-contained
2. **Inline everything** - CSS and JS stay in the HTML file
3. **Modern but compatible** - Use modern features with good browser support
4. **Performance first** - Minimize reflows, use GPU-accelerated animations
5. **Privacy conscious** - Obfuscate contact information properly

## Common Tasks

### Updating Contact Email
The email is constructed in the JavaScript section:
```javascript
const p1 = 'hel';
const p2 = 'lo';
const d1 = 'will';
const d2 = 'godfrey';
const ext = 'com';
```

### Modifying Colors
Update CSS custom properties in the `:root` selector:
```css
--blue-600: #0EA5E9;
--orange-500: #F97316;
--black: #000000;
```

### Adding Experience Items
Add new `.experience-item` divs in the experience section following the existing pattern.

## Performance Considerations

1. **Single file approach** ensures one HTTP request
2. **Inline SVG favicon** prevents extra favicon requests
3. **Optimized animations** use `transform` and `opacity` only
4. **Lazy-loaded contact** reduces initial JavaScript execution
5. **System fonts** prevent web font downloads

## Security Features

1. **Email obfuscation** with multiple layers:
   - Split string construction
   - Character code generation
   - Delayed rendering
   - No email in source HTML

2. **CSP-friendly** - No inline event handlers except necessary ones
3. **HTTPS-only** resources (GA script)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Fallbacks for missing images
- Progressive enhancement approach

## License

GPL v3 - Ensure any modifications comply with license terms.