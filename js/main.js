// ChronoQuest - Game loop and entry point
let lastTime = performance.now();

function gameLoop() {
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}

// Initial load and show title screen
setActiveWorld(selectedWorldId);
loadLevel(0);
showScreen('titleScreen');
gameLoop();
