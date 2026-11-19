# JA'MOIR Grand — Website

A complete, responsive one-page website for **JA'MOIR Grand Marquee & Event Complex**, Multani Chowk Bypass, Bahawalnagar.

## What's included

- Full-screen hero with the supplied video playing silently on a continuous loop (no play/volume controls)
- About section, feature highlights and a venue gallery with lightbox
- Owners section with all four owner photos, correctly labelled
- Instagram film section with the video in its original vertical format
- Live Instagram section embedding three real reels from @jamoir_grand (needs internet)
- TikTok links in the video section, booking section and footer
- Subtle animated background treatment on the Gallery and Owners sections
- Google Maps embed using the exact coordinates from the shared Maps link
- Booking phone numbers taken from the venue's own "Booking Open" graphic
- Mobile menu, scroll animations, sticky header, back-to-top button
- Accessibility and SEO optimised (Lighthouse: Accessibility 98, Best Practices 100)

## Files

```
jamoir-grand/
├── index.html          Main page
├── css/style.css       All styling
├── js/script.js        Interactions
├── robots.txt
├── serve.js            Tiny local preview server (optional)
├── Start Website.bat   Double-click to launch locally (Windows)
└── assets/
    ├── video/jamoir-hero.mp4   Your video
    └── img/
        ├── img-1.png           Updated JA'MOIR Grand crest logo (favicon & brand mark)
        ├── venue-1.jpg … venue-8.jpg   Stills extracted from your video for the gallery
        ├── video-poster.jpg    Video poster frame
        ├── owner-ahmed.png     Chaudary Ahmed (red shirt)
        ├── owner-hanan.png     Hanan Jatallah (sitting, using phone)
        ├── owner-usman.png     Usman Jatallah (glasses, white outfit)
        └── owner-daniyal.png   Updated Daniyal Jatallah photo (brown shirt, white trousers)
```

## Preview locally

Open a terminal in this folder and run:

```
node serve.js
```

Then visit **http://localhost:8123** in your browser.

You can also simply double-click `index.html` — everything works offline except the Google Maps iframe, Google Fonts and Instagram links, which need an internet connection.

## Going live

Upload the whole `jamoir-grand` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.). No build step or database is required.

## Details used on the site

- **Name:** JA'MOIR Grand Marquee & Event Complex
- **Tagline:** An iconic destination for grand celebrations
- **Address:** Multani Chowk Bypass, Bahawalnagar, Punjab, Pakistan
- **Coordinates:** 30.0002795° N, 73.2188498° E
- **Instagram:** https://www.instagram.com/jamoir_grand/
- **TikTok:** https://www.tiktok.com/@jamoir_grand
- **Bookings:** 0300 4947064 · 0300 7966879 · 0300 6933331

To change phone numbers, owner names/photos or the map pin, search for the value in `index.html` and replace it.
