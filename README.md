# SAIT Website Redesign — UI/UX Competition Submission

A production-quality prototype redesign for the **Student Association of Information Technology (SAIT)**, Division of Information Technology, School of Engineering, Cochin University of Science and Technology (CUSAT), Kochi, Kerala.

---

## 🏆 Competition Scoring Rubric Alignment (100 Points)

| Category | Points | Implementation Highlights in this Project |
| :--- | :---: | :--- |
| **Visual Design** | **25 pts** | Custom tech-forward aesthetic: Deep cyber slate (`#070a12`), electric indigo (`#6366f1`), neon cyan (`#06b6d4`), glassmorphism cards (`backdrop-filter: blur(16px)`), modern typography (`Outfit` display + `Inter` body + `JetBrains Mono` code), custom circular logo ring styling. |
| **Responsiveness** | **20 pts** | Tested fluid breakpoints across Mobile (<480px, <768px), Tablet (<1024px), and Desktop (>1280px). Includes sliding mobile navigation drawer, fluid column auto-fit grids, and responsive countdown counters. |
| **Innovation & Creativity** | **15 pts** | Live 8-hour hackathon countdown clock, interactive 10-problem statements explorer, functional Student Activity Logger with real-time points calculator, virtual hackathon pass generator, and seamless dark/light mode toggle with state persistence. |
| **Coding Modularity & Structure** | **10 pts** | Decoupled architecture with clear separation of design tokens (`css/variables.css`), base styles (`css/base.css`), reusable components (`css/components.css`), structured data models (`js/data/`), and interactive controllers (`js/components/`). Zero build-step lock-in. |
| **Content Completeness** | **30 pts** | **100% of required sections (A through I, L)** built with complete fidelity: all 14 real Executive Committee members, Smart Campus Innovation hackathon in memory of Abhijit Menon, 7 verified real achievements, 99%+ placements, alumni network, notifications feed, and full contact details. |

---

## 📁 Project Architecture & File Organization

```
sait-redesign/
├── index.html                   # Master single-page application shell
├── assets/
│   └── images/
│       └── sait-logo.png        # Official SAIT circular emblem
├── css/
│   ├── variables.css            # CSS Custom Properties (Colors, Glassmorphism, Radii, Shadows)
│   ├── base.css                 # Reset, typography, ambient mesh glows, grid overlays
│   ├── components.css           # Buttons, cards, badges, modal dialogs, tabs, forms, toasts
│   ├── sections.css             # Section-specific styles (hero, flagship, logger, faculty, etc.)
│   └── responsive.css           # Breakpoints (<1024px, <768px, <480px) & mobile drawer
├── js/
│   ├── data/
│   │   ├── teamData.js          # Official 14-member Executive Core + 5 sub-teams
│   │   ├── eventsData.js        # Smart Campus Innovation Hackathon + 10 Problem Statements + archives
│   │   ├── achievementsData.js  # 7 real verified hall of fame accolades
│   │   ├── alumniData.js        # 6 distinguished alumni profiles
│   │   ├── announcementsData.js # Categorized circulars & notifications
│   │   └── loggerData.js        # Activity points weights, mock feed, and department leaderboard
│   ├── components/
│   │   ├── navbar.js            # Glass sticky header, mobile drawer, active section spy
│   │   ├── themeToggle.js       # Dark/Light mode switcher with localStorage persistence
│   │   ├── countdown.js         # Real-time ticking hackathon countdown clock
│   │   ├── flagshipModal.js     # Hackathon registration & instant virtual ticket generator
│   │   ├── teamFilter.js        # Dynamic sub-team tabs & member card rendering
│   │   ├── activityLogger.js    # Interactive activity submission & points calculator
│   │   ├── notifications.js     # Filterable announcements & detail modal
│   │   └── contactModal.js      # Contact form validation & toast notifications
│   └── app.js                   # Application bootstrap & intersection animations
└── README.md                    # Project documentation
```

---

## 🚀 Running the Project Locally

The application uses standard modern ES6 Modules and requires an HTTP server to run locally (due to browser CORS restrictions on `file:///` ES module imports).

### Method 1: Using Python (Installed & Ready)
Run in PowerShell / Terminal in the project folder:
```powershell
python -m http.server 3000
```
Open your browser at:
```
http://localhost:3000
```

### Method 2: Using VS Code Live Server or Any Static Host
- Right-click `index.html` -> "Open with Live Server"
- Or deploy directly to GitHub Pages / Vercel / Netlify with zero configuration.

---

## 🌟 Key Interactive Features

1. **Smart Campus Innovation Hackathon Hub**:
   - Live countdown timer to the sprint.
   - 10 problem statements filterable cards.
   - Interactive registration modal with diversity rule validation (mandatory female participant) and real-time generation of a personalized digital entry pass.

2. **Student Activity Logger**:
   - **Tab 1: Submit Activity**: Form with real-time activity points calculation widget (+50 pts for hackathons, +60 pts for papers, etc.).
   - **Tab 2: Verified Feed**: Real-time stream of verified student co-curricular activities.
   - **Tab 3: Leaderboard**: Dynamic department leaderboard highlighting top student achievers.

3. **Executive Committee & Wings Filter**:
   - Complete 14-member real roster (Mrudul John Mathews, K V Trisha Gautham, Advaith Pradesh, etc.).
   - Filter tabs for Executive Core, Technical, Media & Arts, Events & Sports, Outreach & Alumni, and Placement Wings.

4. **Notifications & Announcements Modal**:
   - Filterable circulars (All, Events, Opportunities, Deadlines, Academics).
   - Clickable notification cards opening official circular details dialogs.

5. **Theme Switching**:
   - Dark mode (cyber slate aesthetic) by default.
   - Seamless switch to Light mode with synchronized logo contrast filter.
