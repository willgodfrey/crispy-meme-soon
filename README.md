# Will Godfrey - Personal Website

A minimalist single-page portfolio website for Will Godfrey, entrepreneur and CTO & Co-Founder of Huper.

## Overview

This repository contains a clean, lightweight personal website built with vanilla HTML, CSS, and JavaScript. The entire site is self-contained in a single `index.html` file with no external dependencies, making it perfect for edge deployment on Cloudflare Workers.

### Key Features

- **Zero dependencies** - No frameworks, build tools, or external libraries
- **Single file architecture** - Everything in one HTML file for maximum simplicity
- **Privacy-focused** - Email address obfuscation to prevent scraping
- **Responsive design** - Works seamlessly across all devices
- **Fast loading** - Minimal footprint with inline styles and scripts
- **Accessibility** - Semantic HTML with ARIA labels where needed

## Deployment

This site is automatically deployed to Cloudflare Workers/Pages whenever changes are pushed to the repository.

### Automatic Deployment Setup

1. **Connect Repository**: The GitHub repository is connected to Cloudflare Pages
2. **Automatic Builds**: Every push to the `main` branch triggers an automatic deployment
3. **Preview Deployments**: Pull requests receive unique preview URLs for testing

### Manual Deployment

For local development and testing:

```bash
# Clone the repository
git clone https://github.com/willgodfrey/crispy-meme-soon.git
cd crispy-meme-soon

# Open directly in browser
open index.html

# Or serve with a local HTTP server
python -m http.server 8000
# Visit http://localhost:8000
```

### Cloudflare Configuration

The site is configured for Cloudflare Pages with:
- **Production branch**: `main`
- **Build command**: `exit 0` (no build required)
- **Build output directory**: `/` (root directory)

## Structure

```
.
├── index.html          # Complete website (HTML, CSS, JS inline)
├── README.md           # This file
├── CLAUDE.md           # Development guidance for AI assistants
├── LICENSE             # GPL v3.0 license
├── icons/              # Favicon and touch icons (to be added)
│   ├── favicon-16.png
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
└── images/             # Portrait image (to be added)
    └── will-godfrey.jpg
```

## Development

### Making Changes

1. Edit `index.html` directly - no build process required
2. Test locally by opening the file in a browser
3. Commit and push changes to trigger automatic deployment

### Adding Assets

If adding the missing image and icon files:
- Portrait image: `images/will-godfrey.jpg` (128x128px minimum recommended)
- Icons: Generate from the inline SVG design using a favicon generator

### Customization

The site uses CSS custom properties for easy theming:

```css
:root {
  --accent: #003B4C;      /* Primary accent color */
  --fg: #0f0f0f;          /* Text color */
  --bg: #fafafa;          /* Background color */
  --radius: .5rem;        /* Border radius */
  --avatar: 128px;        /* Avatar size */
}
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries, please visit the website and use the contact section.