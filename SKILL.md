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
Modify the boilerplate to generate the final single-file `index.html`:
- **Populate Slides HTML**: Insert the gathered project data into Slide 1 to 6 inside `<div id="deck">`.
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
