# GREEDY
It is a top-down 2d game where you must collect orbs. Each orbs you collect adds weight to the player. So don't be greddy as the more you collect the more will the player get slowed down. So mind the weight and time. The time is ticking each level grants you a 20 seconds to pass the level + upgrades time if you bought each time upgrade adds 1 seconds on top of base 20 seconds. Strength upgrade will grant you a reduction of half the weigth of a orb. You can stack them. If you bought 2 you can carry a orb without getting slowed.

*(Note: Use the arrow keys to move your character around the map or WASD!)*
*(Note: keep an eye on the top timer bar! If time runs out, your character dies and its game over.)*
*(Note: Dont get too greedy! The heavier you get, the slower you move. Make sure you actually reach the exit!)*

## Features

* **Dynamic Weight Sytem:** This is the core mechanic. Every orb you grab increases your score, but also makes your character heavier and slower.You have to decide if the extra orb is worth the speed penalty!
* **In-Game Shop:** Made it to the end of the level? Awesome. Now you can spend your hard-earned orbs in the shop menu before the next stage starts.
* **Strategic Upgrades:** Use the shop to buy extra time on the clock, or  buy weight-reduction upgrades so you can carry more orbs without moving like a snail. 
* **Custom Sprite Animations:** Features a fully animated character that actually faces the direction you're walking, plus a dramatic death animation if the clock hits zero.
* **Grid-Based Movement & Collisions:** Smooth top-down movement width pixel-perfect collision detection. You can't walk through walls or cheat your way through walls or cheat your way through the crates!
* **Level Progression:** Reaching the end of a map procedurally loads the next layout. Your weight resets, but your purchased upgrades carry over with you.
* **Custom Canvas UI:** A clean, retro-style user interface that features a live-updating orb counter and a shrinking progress bar for your remaining time. 
* **Built from Scratch:** No heavy game engines here! Everything from the game loop (`requestAnimationFrame`), delta time calculations, state management, and rendering is handled purely with Vanilla JS and the HTML5 Canvas API.

## Installation and setup

Since this project is built entirely with vanilla web technologies (HTML,CSS,JS,CANVAS), you dont need to worry about installing random npm packages or bulky frameworks.

1. **clone the repository:**
  ```bash
  git clone https://github.com/VIKRAM2605/stealth.git```

2.**Run the project:** 
Because the game uses modern JavaScript es6 Modules (like  `import { player } from "./character.js"`), you cant jsut double-click the `index.html` file to play it.
simply open the project folder in your favorite code editor (like VS Code ) and start it up using a **Live server** extension. This will launch the game right in your browser!