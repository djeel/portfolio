# Jules Beaugrand - Portfolio

A minimalist and modern portfolio website featuring smooth animations and HTMX for dynamic content loading.

## Features

- **Minimalist Design**: Clean, modern interface with a focus on typography
- **Loading Animation**: Elegant loading screen with animated elements
- **Text Animation Effects**: Smooth slide-up animations and typewriter effects
- **HTMX Integration**: Dynamic content loading without page refreshes
- **Responsive Design**: Optimized for all device sizes
- **Interactive Elements**: Hover effects and subtle 3D transformations
- **Modern Color Scheme**: Based on your design specifications with a distinctive red accent color

## Design Elements

- **Color Palette**: Dark theme with vibrant red accents (rgb(214, 64, 91))
- **Typography**: Inter font family for clean, readable text
- **Layout**: Centered card design with proper spacing and hierarchy
- **Animations**: Staggered text reveals, loading animations, and hover effects

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript for interactions and HTMX
├── server.js           # Express server for HTMX endpoints
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: rgb(214, 64, 91);
    --bg-color: #0a0a0a;
    --text-color: #ffffff;
    --card-bg: #111111;
}
```

### Content
Modify the content in the HTMX endpoint in `server.js` or edit the static content directly.

### Animations
Adjust animation timings and effects in `styles.css` and `script.js`.

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- HTMX for dynamic content
- Express.js for the server
- Google Fonts (Inter)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Minimal JavaScript footprint
- Optimized CSS animations
- Lazy loading with HTMX
- Responsive images and fonts
