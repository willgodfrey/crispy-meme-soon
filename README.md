# Will Godfrey - Personal Website

A modern, minimalist portfolio website featuring a dark theme design with smooth animations and privacy-focused contact implementation.

## Overview

This repository contains a single-page portfolio website built with vanilla HTML, CSS, and JavaScript. The site features a sophisticated dark theme with animated backgrounds, smooth scrolling navigation, and zero external dependencies, making it perfect for edge deployment on Cloudflare Pages.

### Live Site

🌐 [willgodfrey.com](https://willgodfrey.com)

### Key Features

- **Modern Dark Theme** - Sophisticated design with animated grid background and gradient effects
- **Zero Dependencies** - No frameworks, build tools, or external libraries
- **Privacy-First Contact** - Advanced email obfuscation with delayed loading
- **Smooth Animations** - Intersection observer for scroll animations, hover effects
- **Fast Performance** - Single HTML file with inline styles and scripts
- **Full Accessibility** - Semantic HTML with proper ARIA labels
- **Analytics Ready** - Google Analytics integration (GA4)
- **Responsive Design** - Mobile-first approach that works on all devices

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS custom properties, Grid, Flexbox, animations
- **Analytics**: Google Analytics 4 (G-RQMR51RTHC)
- **Deployment**: Cloudflare Pages with automatic Git integration
- **Icons**: Custom SVG favicons and social media icons

## Project Structure

```
.
├── index.html          # Complete website (HTML, CSS, JS inline)
├── favicon.ico         # Multi-resolution icon in root for compatibility
├── icons/              # All icon files
│   ├── favicon.svg     # Vector favicon with WG logo
│   ├── favicon-16.png  # 16x16 PNG favicon
│   ├── favicon-32.png  # 32x32 PNG favicon
│   ├── linkedin.svg    # LinkedIn icon (white fill)
│   └── github.svg      # GitHub icon (white fill)
├── images/             # Portfolio images
│   └── will-godfrey.jpg # Professional headshot (400x400)
├── README.md           # This file
├── CLAUDE.md           # AI assistant development guidance
└── LICENSE             # GPL v3.0 license
```

## Deployment

This site automatically deploys to Cloudflare Pages whenever changes are pushed to the repository.

### Automatic Deployment

1. **Git Integration**: Connected to GitHub repository
2. **Branch Deployments**: 
   - `main` branch → Production (willgodfrey.com)
   - Other branches → Preview URLs
3. **Build Configuration**:
   - Build command: `exit 0` (no build required)
   - Output directory: `/` (root)

### Local Development

```bash
# Clone the repository
git clone https://github.com/willgodfrey/crispy-meme-soon.git
cd crispy-meme-soon

# Open in browser
open index.html

# Or serve with HTTP server
python -m http.server 8000
# Visit http://localhost:8000
```

## Features in Detail

### Email Protection

The site uses advanced email obfuscation:
- Email address constructed dynamically after page load
- Multiple obfuscation layers (character codes, string splitting)
- Loading state prevents immediate scraping
- Smooth transition when revealing contact information

### Performance Optimizations

- Single HTTP request (everything inline)
- Optimized images (400x400 headshot)
- CSS animations use GPU-accelerated properties
- Lazy-loaded contact button via JavaScript

### Design System

```css
/* Core Colors */
--blue-600: #0EA5E9;    /* Primary accent */
--orange-500: #F97316;  /* Secondary accent */
--black: #000000;       /* Background */
--white: #FFFFFF;       /* Text */

/* Typography */
--font-sans: System font stack
--font-mono: Monospace stack for dates
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

While this is a personal portfolio site, suggestions and bug reports are welcome. Please open an issue for any problems you encounter.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contact

Visit [willgodfrey.com](https://willgodfrey.com) and use the contact section to get in touch.