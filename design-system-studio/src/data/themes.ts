import { Theme } from '../types';

export const PRESET_THEMES: Theme[] = [
  {
    id: 'warm-minimalist',
    name: 'Warm Minimalist',
    description: 'An elegant, calm aesthetic using soft warm sand, cream backgrounds, and refined charcoal typography. Ideal for high-end blogs, portfolios, and lifestyle services.',
    fontSans: '"Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    primaryColor: '#1d1d1f', // Charcoal
    secondaryColor: '#f5f5f7', // Warm off-white
    accentColor: '#c5a880', // Soft sand/gold
    backgroundColor: '#faf9f6', // Linen white
    textColor: '#1c1917', // Stone-900
    containerBg: '#ffffff', // Pure white
    borderColor: '#e7e5e4', // Stone-200
    radius: 'lg',
    shadow: 'sm',
    heroImageUrl: 'minimalist_beige_hero_1779631323524.png'
  },
  {
    id: 'cosmic-slate',
    name: 'Cosmic Slate',
    description: 'A deep, high-contrast dark theme emphasizing deep space grays, navy tones, and neon teal and violet glow accents. Perfect for developer tools and software apps.',
    fontSans: '"Space Grotesk", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    primaryColor: '#0ea5e9', // Cyber blue/cyan
    secondaryColor: '#0f172a', // Dark slate bg
    accentColor: '#a855f7', // Violet
    backgroundColor: '#090d16', // Deep galactic space
    textColor: '#f1f5f9', // Slate-100
    containerBg: '#0f172a', // Slate-900
    borderColor: '#1e293b', // Slate-800
    radius: 'xl',
    shadow: 'lg',
    heroImageUrl: 'cosmic_slate_hero_1779631346828.png'
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist',
    description: 'A high-impact, playful theme characterized by thick black borders, flat vibrant pastel colors, and stark offset shadows. Highly distinct, loud, and modern.',
    fontSans: '"Space Grotesk", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    primaryColor: '#facc15', // Vibrant yellow
    secondaryColor: '#fdba74', // Warm orange
    accentColor: '#38bdf8', // Light sky blue
    backgroundColor: '#fefefe', // Crisp white background
    textColor: '#000000', // Solid black
    containerBg: '#ffffff', // White cards
    borderColor: '#000000', // Thick black borders
    radius: 'none',
    shadow: 'md',
    heroImageUrl: 'vibrant_brutalist_hero_1779631370567.png'
  },
  {
    id: 'editorial-serif',
    name: 'Editorial Serif',
    description: 'A classical editorial layout using serif text pairings, forest green and burgundy hues, and premium paper textures. Perfect for essays, long-form reading, or news.',
    fontSans: '"Playfair Display", serif',
    fontMono: '"Courier New", monospace',
    primaryColor: '#166534', // Forest green
    secondaryColor: '#fafaf9', // Stone stone text card bg
    accentColor: '#991b1b', // Burgundy wine
    backgroundColor: '#f5f5f4', // Soft gray-stone paper
    textColor: '#1c1917', // Very dark stone
    containerBg: '#ffffff', // White
    borderColor: '#e7e5e4', // Soft borders
    radius: 'sm',
    shadow: 'none',
    heroImageUrl: 'minimalist_beige_hero_1779631323524.png'
  }
];

export const GOOGLE_FONTS_IMPORTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');`;
