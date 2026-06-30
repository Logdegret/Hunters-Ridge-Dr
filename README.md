# Hunters Ridge Community

The official community website for Hunters Ridge Drive — a private neighborhood of 18 homes in Pennington, New Jersey.

<img width="1699" height="833" alt="image" src="https://github.com/user-attachments/assets/fb4ef764-1d31-46d6-8f06-4fe129053098" />


**[View the site →](hrd.homes)**

## What it is

A simple, clean community website for Hunters Ridge homeowners. It gives the neighborhood a shared home on the web — a place to pay annual dues, find the address, and learn about the community.

## Features

- Annual HOA dues payment via Zelle or check, with a QR code modal
- Photo carousel of homes around the neighborhood
- Embedded Google Maps street view of the street
- Neighborhood merchandise store (Printify-powered)
- Fully responsive — works on mobile and desktop
- Fast-loading static site with compressed images
- Has recommended vendors/contractors for our neighborhood

## How it works

A minimal Node/Express server (`server.js`) serves the static files in `public/`. The entire frontend is vanilla HTML, CSS, and JavaScript — no frameworks, no build step. The payment modal uses the native `<dialog>` element. The image carousel is hand-rolled with CSS transitions and a JS interval timer.

The home photos are compressed JPEG (converted from PNG at 78% quality, max 1400px wide) to keep page load fast on mobile.


## Credits

No AI used
