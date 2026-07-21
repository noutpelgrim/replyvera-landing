# ReplyVera — Marketing Homepage

## Project Overview
ReplyVera is a SaaS product that helps businesses automatically reply to Google reviews using AI. This is the marketing homepage / landing page for the product.

## Completed Features
- ✅ Fixed navigation bar with scroll transparency effect and mobile hamburger menu
- ✅ Hero section with animated typing effect (simulated AI reply), floating review card, and blob background animations
- ✅ Logo bar / industry chip row
- ✅ 6-feature benefits grid (key features section)
- ✅ 3-step "How It Works" section
- ✅ Real reply examples (5-star, 3-star, 1-star reviews)
- ✅ 4-card testimonials section
- ✅ Animated stats counter banner
- ✅ 3-tier pricing section with monthly/annual toggle
- ✅ FAQ accordion section
- ✅ CTA banner section
- ✅ Footer with links and social icons
- ✅ Scroll-triggered fade-up animations via IntersectionObserver
- ✅ Mouse parallax on hero blobs
- ✅ Active nav highlight on scroll
- ✅ Interactive self-serve product demo page (`demo.html`)

## File Structure
```
index.html          — Main homepage HTML
demo.html           — Standalone interactive product sandbox
css/style.css       — All styles (dark SaaS theme)
js/main.js          — Interactivity, animations, counters
README.md           — This file
```

## Entry Point
- `/index.html` — Main landing page
- `/demo.html` — Interactive product demo

## Design Tokens
- Primary color: `#6C47FF` (purple)
- Accent: `#00C9A7` (teal)
- Background: `#0A0A14` (near-black)
- Typography: Inter (Google Fonts)

## Not Yet Implemented
- Real backend / API integration
- Authentication / user dashboard
- Live Google API connection
- Blog or help center pages
- Contact / support form logic

## Recommended Next Steps
1. Add a simple contact/support inquiry form (e.g. Formspree embed)
2. Add a dashboard preview screenshot or Lottie animation in the hero
3. Create individual pages for each feature
4. Connect real pricing to a payment provider (Stripe)
