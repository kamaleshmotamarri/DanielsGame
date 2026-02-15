// ChronoQuest - Level loading
function loadLevel(index) {
    currentLevel = index;
    currentLevelData = levels[index];

    resetPlayer(currentLevelData.spawn.x, currentLevelData.spawn.y);

    platforms = currentLevelData.platforms.map(function(p) {
        return { ...p, origX: p.x, origY: p.y };
    });
    platformPhases = platforms.map(function() { return Math.random() * Math.PI * 2; });

    enemies = currentLevelData.enemies.map(function(e) {
        return {
            ...e,
            origX: e.x,
            vx: e.type === 'walker' ? 60 : 0,
            health: 1,
            shootTimer: e.type === 'shooter' ? 1.5 + Math.random() : 0,
            animTimer: 0
        };
    });

    collectibles = currentLevelData.collectibles.map(function(c) { return { ...c, collected: false }; });
    totalCollectibles = collectibles.length;
    collectedCount = 0;

    hazards = currentLevelData.hazards || [];

    projectiles = [];
    particles = [];

    timeEnergy = MAX_TIME_ENERGY;
    timeScale = 1;
    targetTimeScale = 1;
    isRewinding = false;
    rewindBuffer = [];

    levelStartTime = performance.now();

    if (currentLevelData.boss) {
        boss = { ...currentLevelData.boss };
        bossDefeated = false;
    } else {
        boss = null;
        bossDefeated = false;
    }
}
