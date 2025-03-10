# Snake Game

A modern, interactive web version of the classic Snake game built with HTML, CSS, and JavaScript. This project features a responsive design, multiple levels, a collapsible sidebar, and a secure contact form.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Features
- **Four Playable Levels**: Switch between stages with increasing difficulty (defined in `game.js`).
- **Responsive Design**: Works on desktop and mobile with a D-pad for touch controls (< 800px).
- **Collapsible Sidebar**: Menu toggle with state persistence using `localStorage`.
- **Contact Form**: Client-side validation with regex and required fields (`contact.js`).
- **Security**: Content Security Policy (CSP) implemented (`default-src 'self'`).
- **Audio Feedback**: Sound effects for eating fruit and hitting walls.

## Demo
Play the game live on [Netlify](https://melvin-snakegame.netlify.app/)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MelvinAssi/Snake_Game.git
2. cd snake-game
3. Open index.html in a web browser: Use a local server (e.g., VSCode Live Server) for best results due to CSP restrictions.
## Usage
    Gameplay:
        Use arrow keys (desktop) or D-pad (mobile) to move the snake.
        Eat fruits to grow and avoid walls/self-collision.
        Switch levels with "Increase" and "Decrease" buttons.
        Sidebar: Click the toggle button to expand/collapse the menu.
        Settings: Adjust volume and border options (saved in localStorage).
        Contact: Fill the form in contact.html to simulate a message.
## Tech Stack
    HTML5: Semantic structure and canvas for the game.
    CSS3: Responsive design and transitions (e.g., sidebar 300ms).
    JavaScript: Core logic (game.js), sidebar (sidebar.js), settings (settings.js).
    Tools:
        Figma: Design mockups.
        Trello: Project management.
        GitHub: Version control.
        VSCode: Development environment.
        Netlify: Deployment.
## Project Structure
snake-game/
├── index.html        # Homepage
├── game.html        # Game page with canvas
├── contact.html     # Contact form
├── settings.html    # settings
├── about.html       # why i develop this web site
├── rules.html       # rules
├── assets/          # css, js,fonts, sounds, and icons
├── gitignore         # ignore files and folders
└── README.md        # This file