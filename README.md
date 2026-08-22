# T-Phones Authenticator

Build a fully functional and responsive web application called "T-Phones" designed to help users search for original mobile phones and check their authenticity. The app should be built using React, Next.js (App Router), and styled with Tailwind CSS and shadcn/ui components.

Here are the core requirements and features:

1. UI/UX Design & Vibe:

- The design should be modern, clean, and trustworthy (similar to Apple or Samsung's official sites). 

- Use a minimalist color palette: deep tech blue (#0f172a), crisp white, and subtle slate grays. Use a bright green (#22c55e) for "Authentic" badges and red (#ef4444) for "Warning" alerts.

- Ensure smooth transitions and hover effects on buttons and cards.

- The app must be fully mobile-responsive.

2. Core Features & Pages:

A. Landing Page (Home):

- A hero section with a bold headline: "Find and Verify Original Phones."

- Two main call-to-action buttons: "Search Phones" and "Verify Authenticity".

- A clean search bar in the center of the hero section.

B. Authenticity Checker (The Check Tool):

- A dedicated section where a user can enter a 15-digit IMEI number or Serial Number.

- Include a small helper text or modal showing "How to find your IMEI (e.g., dial *#06#)".

- Create a mock validation function: If the user inputs a 15-digit number, show a loading spinner for 2 seconds, then return a "Mock Success" results card showing: 

  - Status: "✅ Verified Original" 

  - Brand: (Mock data)

  - Model: (Mock data)

  - Warranty Status: Active.

C. Phone Search & Catalog:

- A page displaying a grid of popular mobile phones (use mock data for iPhone 15, Samsung Galaxy S24, Google Pixel 8, etc.).

- Each phone card should display: A placeholder image, Phone Name, Price, and a "Verified Original" badge.

- Include a sidebar or top bar with filters: Brand, Price Range, and Operating System.

3. Technical Requirements:

- Use Lucide React for modern icons.

- Create a reusable Layout component with a standard Header (Logo, Home, Search, Verify) and Footer.

- Do not require a backend or database right now; use a robust mock data array (JSON format) within the application state to simulate fetching phone details and verifying IMEI numbers.

- Ensure the code is modular, well-commented, and split into logical React components (e.g., `Hero`, `PhoneCard`, `IMEIForm`).

Please generate the complete, working codebase for this application so I can preview and interact with it immediately.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c628389-e50e-4b60-ad54-b9aba30d3b6e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
