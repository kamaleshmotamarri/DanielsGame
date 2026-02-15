// ChronoQuest - Game state and input
let gameState = 'title';
let currentLevel = 0;
let totalScore = 0;
let levelStartTime = 0;
let levelTime = 0;
let screenShake = 0;
let screenFlash = 0;
let screenFlashColor = '#fff';

// Time mechanics
let timeScale = 1;
let targetTimeScale = 1;
let isRewinding = false;
let rewindBuffer = [];
let timeEnergy = 100;

// Input
const keys = {};
const keysPressed = {};
document.addEventListener('keydown', function (e) {
    if (!keys[e.code]) keysPressed[e.code] = true;
    keys[e.code] = true;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    if (e.code === 'Escape' && gameState === 'playing') togglePause();
});
document.addEventListener('keyup', function (e) { keys[e.code] = false; });

// Level runtime state (set by loadLevel)
let currentLevelData = null;
let platforms = [];
let enemies = [];
let collectibles = [];
let hazards = [];
let projectiles = [];
let platformPhases = [];
let boss = null;
let bossDefeated = false;
let collectedCount = 0;
let totalCollectibles = 0;
let particles = [];
let selectedCharacter = null;

