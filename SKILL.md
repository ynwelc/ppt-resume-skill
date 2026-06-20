---
name: ppt-resume-skill
description: Create a stunning, high-fidelity, interactive personal slideshow presentation resume website from scratch. Trigger this skill whenever the user asks for a personal webpage, portfolio, interactive CV, slide-deck resume, or personal homepage, especially if they mention outer space, cosmic elements, planetary orbits, interactive slide carousels, cyberpunk styles, light/dark themes, terminal screens, or HUD widgets.
---

# Interactive PPT Resume Generator Skill

This skill guides the creation of a high-fidelity, interactive personal portfolio website structured as a space-themed, horizontal slideshow deck. It implements modern web aesthetics (glassmorphism, neon color systems, canvas starfields) and responsive controls (wheel/swipe/keyboard navigation, HUD, index grid).

## Skill Directory Structure
```
ppt-resume-skill/
├── SKILL.md (This file)
├── resources/
│   └── deck-boilerplate.html (Baseline skeleton with CSS, Canvas engine, and layout)
└── examples/
    └── projects-sample.json (Example JSON payload for structuring personal content)
```

---

## Workflow Instructions

When this skill is triggered, follow these steps to build the portfolio site:

### 1. Read the Boilerplate
Always read the boilerplate code in [deck-boilerplate.html](file:///D:/aaaa/postman/ppt-resume-skill/resources/deck-boilerplate.html) using the `view_file` tool to understand the base layout, CSS themes, and JS logic. Do NOT write all CSS and JS slider code from memory; utilize the boilerplate as your foundation.

### 2. Gather User Content
Collect or extract the following content from the user's workspace (e.g. README files, CV documents, or direct prompts):
- **Personal Details**: Name, tagline, bio, GitHub link, profile picture canvas parameters.
- **Projects List (exactly 6 projects recommended)**: Title, subtitle, tech badges, bullet points, GitHub links, video links.
- **Project Visuals**: Determine the visual panel type for each project (e.g., flow diagrams, mock terminals, sequence grids, tool matrix cells).
- **Control Room Slides**: Collect list of local screenshots, terminal capture pictures, or milestones to play back in the virtual console slide.

### 3. Customize and Fill the Boilerplate
To prevent LLM network timeouts and token limit truncations, you MUST split the generated output into a multi-file structure (`index.html`, `styles.css`, `script.js`):
- **Populate Slides HTML**: Insert the gathered project data into Slide 1 to 6 inside `<div id="deck">` in `index.html`.
- **Match Animation Overlays**: Inject visual elements (such as orbit dots, sparkles, chat bubbles, or scan lines) matching the references inside each project's `.glass-card`.
- **Set Up Side Panels**: Build the right-side visualizers (sequence flows, thread execution rows, terminal commands, or vector databases) to reflect the project's core functionality.
- **Configure Canvas Background**: Tweak the Space Background canvas engine variables (star count, camera coordinates, rotation speed, focal point offsets) to match the project's visual hierarchy.
- **Define Responsive Overrides**: Ensure layouts stack vertically on viewports narrower than `768px`.

### 4. Verify Theme Compatibility
Ensure every element adapts cleanly when toggling between dark and light themes:
- Color styles must use theme CSS variables (`var(--glow-cyan)`, `var(--glow-gold)`, `var(--card-bg)`, etc.) rather than hardcoded hex values.
- Dark theme backgrounds should feel deep and cosmic (semi-transparent dark backdrops, cyan glows).
- Light theme backgrounds should remain clean and legible (warm paper backgrounds, deep blue or amber accents, dark text colors).

---

## Designing Project Card Hover Animations

Each project card should have a unique, interactive micro-animation overlay inside `.card-animation` to represent its technology domain:

| Project Theme | Animation Elements | CSS Animation Properties | Description |
|---|---|---|---|
| **Workflow / Auto-Gen** | Neon sweep line + code symbol glitch | `scan-line`, `code-glitch` | A neon line scanning downwards with code characters flashing in the corner. |
| **Multi-Agent / Orbits** | Mini solar system orbits around a core | `orbit-a..e`, `center-pulse` | Staggered colored dots orbiting around a pulsating core. |
| **RAG / Vector DB** | Sparkle star bursts at the corners | `sparkle-fade`, `sparkle-float` | Random small sparkles twinkling and drifting inside the card edges. |
| **Essence / Healthcare** | Concentric radial pulse with particles | `essence-pulse`, `float-particle` | Soft color gradients inflating and deflating, releasing rising sparkles. |
| **Chat / Assistant** | Sequenced message bubbles rising up | `chat-rise` | Small text bubbles or dots climbing upwards and fading away. |
| **Ops / Monitoring** | Double concentric sonar rings + data flow | `pulse-ring`, `data-flow` | Expanding pulse rings with a horizontal neon trace line. |

---

## Controls and Navigation Systems
The generated presentation site must support:
- **Keyboard Controls**: `ArrowRight` / `Space` (next slide), `ArrowLeft` (previous slide), `Home` / `End` (skip boundaries), `Escape` (toggle navigational grid).
- **Mouse Wheel Swiping**: Accumulating scrolling vectors to trigger page transition thresholds.
- **Touch Swipe Gestures**: Touch start/end coordinates tracking horizontal delta sweeps.
- **Holographic HUD Widget**: Fixed header widget showing orbiting statuses, theme toggle button, and a Grid Index modal navigation toggle button.
- **ESC System Index Grid**: A fullscreen overlay showing preview cards of all slides. Selecting a card jumps to the corresponding page.

---

## Developer Notes: Problems & Solutions (开发复盘与避坑指南)

This section records the core technical challenges encountered during the creation of this skill framework and how they were resolved. It serves as historical context to ensure the stability of the generated templates.

1. **Problem**: Implementing smooth, pure-frontend cross-platform horizontal scrolling.
   **Solution**: Engineered a unified gesture and event listening system in `deck-boilerplate.html`. Intercepted `keydown`, `wheel`, and `touchstart/touchend` events, accumulating scroll vectors and converting them into `transform: translateX` translations with `cubic-bezier` easing.

2. **Problem**: Adapting to dark and light modes seamlessly while maintaining glassmorphism aesthetics.
   **Solution**: Built a CSS Variables-based dynamic color mapping system (`--bg-dark`, `--glow-cyan`, `--card-bg`). Toggling the `.light-theme` class on the body switches the deep cosmic dark backgrounds to high-contrast paper-light tones and soft shadows seamlessly.

3. **Problem**: Providing differentiated visual feedback for various tech-stack projects to avoid template monotony.
   **Solution**: Designed a data-driven micro-animation system. HTML `data-project` attributes map directly to predefined CSS Keyframes (e.g., `scan-line` for Auto-Gen, `orbit` for Multi-Agent, `sparkle` for RAG), triggering on card hover.

4. **Problem**: Preventing users from getting lost in a long horizontal sequence.
   **Solution**: Developed dual navigation systems: A fixed Holographic HUD at the top right, and a global ESC System Index Grid. Pressing ESC overlays a frosted-glass grid of all slide preview cards for one-click direct jumping.

5. **Problem**: Ensuring the AI consistently generates complex nested DOM structures without omitting animations or layouts.
   **Solution**: Established a strict 4-step workflow in `SKILL.md` that separates "reading the boilerplate" from "gathering user data", and strictly matches the structured schema in `projects-sample.json`.

6. **Problem**: Expanding the framework to support multi-file outputs (HTML, CSS, JS separated) and alternative themes (e.g., Map Exploration).
   **Solution**: Updated the generation workflow to allow splitting the boilerplate into `index.html`, `styles.css`, and `script.js`. Handled the dynamic "Map Explore" theme by completely rewriting the Canvas background engine into a panning latitude/longitude grid (`drawGrid`), customizing CSS variables to earthy/vintage tones, and mapping hover animations to radar scans and compass spins instead of cosmic orbits.
