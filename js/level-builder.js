// ChronoQuest - Level Builder
const BUILDER_WIDTH = 900;
const BUILDER_HEIGHT = 550;

let builderLevel = {
    platforms: [],
    enemies: [],
    collectibles: [],
    hazards: [],
    goal: null,
    spawn: null
};

let builderCanvasCtx = null;
let builderInitialized = false;
let builderDragging = null;
let builderDragOffsetX = 0;
let builderDragOffsetY = 0;
let builderSelected = null;
let builderDragCandidate = null;
let builderDragStartX = 0;
let builderDragStartY = 0;
const BUILDER_DRAG_THRESHOLD = 5;

const BUILDER_DEFAULTS = {
    bgGradient: ['#1a0a2e', '#2d1b4e', '#1a2a1a'],
    platformColor: '#3d2817',
    platformHighlight: '#5a3d23',
    accentColor: '#00ff88',
    enemyColor: '#8b4513'
};

function initLevelBuilder() {
    const canvas = document.getElementById('builderCanvas');
    if (!canvas || builderInitialized) return;

    builderCanvasCtx = canvas.getContext('2d');
    builderInitialized = true;

    document.querySelectorAll('.builder-chip').forEach(function (chip) {
        chip.addEventListener('dragstart', handleBuilderDragStart);
    });

    canvas.addEventListener('dragover', handleBuilderDragOver);
    canvas.addEventListener('drop', handleBuilderDrop);

    canvas.addEventListener('mousedown', handleBuilderMouseDown);
    canvas.addEventListener('mousemove', handleBuilderMouseMove);
    canvas.addEventListener('mouseup', handleBuilderMouseUp);
    canvas.addEventListener('mouseleave', handleBuilderMouseUp);

    document.addEventListener('keydown', handleBuilderKeyDown);
}

function handleBuilderDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.dataTransfer.effectAllowed = 'copy';
}

function handleBuilderDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleBuilderDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    const canvas = document.getElementById('builderCanvas');
    if (!canvas || !builderCanvasCtx) return;

    const coords = getBuilderCanvasCoords(e.clientX, e.clientY);
    addBuilderComponent(type, coords.x, coords.y);
    drawBuilderCanvas();
}

function getBuilderCanvasCoords(clientX, clientY) {
    const canvas = document.getElementById('builderCanvas');
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: Math.round((clientX - rect.left) * scaleX),
        y: Math.round((clientY - rect.top) * scaleY)
    };
}

function getBuilderComponentAt(x, y) {
    var item;
    var i;

    if (builderLevel.spawn) {
        var s = builderLevel.spawn;
        if (x >= s.x && x < s.x + 28 && y >= s.y && y < s.y + 36) {
            return { category: 'spawn', index: 0 };
        }
    }

    for (i = 0; i < builderLevel.collectibles.length; i++) {
        item = builderLevel.collectibles[i];
        var cx = item.x + 10, cy = item.y + 10;
        if (x >= item.x && x < item.x + 20 && y >= item.y && y < item.y + 20) {
            return { category: 'collectibles', index: i };
        }
    }

    if (builderLevel.goal) {
        var g = builderLevel.goal;
        if (x >= g.x && x < g.x + g.w && y >= g.y && y < g.y + g.h) {
            return { category: 'goal', index: 0 };
        }
    }

    for (i = 0; i < builderLevel.enemies.length; i++) {
        item = builderLevel.enemies[i];
        var w = item.type === 'walker' ? 24 : 28;
        var h = 28;
        if (x >= item.x && x < item.x + w && y >= item.y && y < item.y + h) {
            return { category: 'enemies', index: i };
        }
    }

    for (i = 0; i < builderLevel.hazards.length; i++) {
        item = builderLevel.hazards[i];
        if (x >= item.x && x < item.x + item.w && y >= item.y && y < item.y + item.h) {
            return { category: 'hazards', index: i };
        }
    }

    for (i = 0; i < builderLevel.platforms.length; i++) {
        item = builderLevel.platforms[i];
        if (x >= item.x && x < item.x + item.w && y >= item.y && y < item.y + item.h) {
            return { category: 'platforms', index: i };
        }
    }

    return null;
}

function updateBuilderComponentPosition(category, index, x, y) {
    if (category === 'platform') return;
    var item;
    if (category === 'spawn') {
        builderLevel.spawn = { x: x - 14, y: y - 18 };
    } else if (category === 'goal') {
        var g = builderLevel.goal;
        builderLevel.goal = { x: x - g.w / 2, y: y - g.h / 2, w: g.w, h: g.h };
    } else if (category === 'collectibles') {
        item = builderLevel.collectibles[index];
        builderLevel.collectibles[index] = { x: x - 10, y: y - 10, type: item.type };
    } else if (category === 'enemies') {
        item = builderLevel.enemies[index];
        var w = item.type === 'walker' ? 12 : 14;
        builderLevel.enemies[index] = { ...item, x: x - w, y: y - 14 };
    } else if (category === 'hazards') {
        item = builderLevel.hazards[index];
        builderLevel.hazards[index] = { ...item, x: x - item.w / 2, y: y - item.h / 2 };
    } else if (category === 'platforms') {
        item = builderLevel.platforms[index];
        builderLevel.platforms[index] = { ...item, x: x - item.w / 2, y: y - item.h / 2 };
    }
}

function handleBuilderMouseDown(e) {
    if (builderDragging) return;
    var coords = getBuilderCanvasCoords(e.clientX, e.clientY);
    var hit = getBuilderComponentAt(coords.x, coords.y);
    if (!hit) {
        builderSelected = null;
        drawBuilderCanvas();
        return;
    }
    e.preventDefault();
    builderDragCandidate = { category: hit.category, index: hit.index };
    builderDragStartX = coords.x;
    builderDragStartY = coords.y;
    var item = null;
    var ox = 0, oy = 0;
    if (hit.category === 'spawn') {
        item = builderLevel.spawn;
        ox = 14; oy = 18;
    } else if (hit.category === 'goal') {
        item = builderLevel.goal;
        ox = item.w / 2; oy = item.h / 2;
    } else if (hit.category === 'collectibles') {
        item = builderLevel.collectibles[hit.index];
        ox = 10; oy = 10;
    } else if (hit.category === 'enemies') {
        item = builderLevel.enemies[hit.index];
        ox = item.type === 'walker' ? 12 : 14; oy = 14;
    } else if (hit.category === 'hazards') {
        item = builderLevel.hazards[hit.index];
        ox = item.w / 2; oy = item.h / 2;
    } else if (hit.category === 'platforms') {
        item = builderLevel.platforms[hit.index];
        ox = item.w / 2; oy = item.h / 2;
    }
    if (!item) return;
    builderDragOffsetX = coords.x - (item.x + ox);
    builderDragOffsetY = coords.y - (item.y + oy);
}

function handleBuilderMouseMove(e) {
    var coords = getBuilderCanvasCoords(e.clientX, e.clientY);
    if (builderDragCandidate && !builderDragging) {
        var dx = coords.x - builderDragStartX;
        var dy = coords.y - builderDragStartY;
        if (dx * dx + dy * dy > BUILDER_DRAG_THRESHOLD * BUILDER_DRAG_THRESHOLD) {
            builderDragging = builderDragCandidate;
            builderDragCandidate = null;
        }
    }
    if (!builderDragging) return;
    var centerX = coords.x - builderDragOffsetX;
    var centerY = coords.y - builderDragOffsetY;
    updateBuilderComponentPosition(builderDragging.category, builderDragging.index, centerX, centerY);
    drawBuilderCanvas();
}

function handleBuilderMouseUp(e) {
    if (builderDragging) {
        builderDragging = null;
    } else if (builderDragCandidate) {
        builderSelected = { category: builderDragCandidate.category, index: builderDragCandidate.index };
        builderDragCandidate = null;
        drawBuilderCanvas();
    }
    builderDragCandidate = null;
}

function handleBuilderKeyDown(e) {
    var screen = document.getElementById('levelBuilderScreen');
    if (!screen || screen.classList.contains('hidden')) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteBuilderSelected();
    }
}

function addBuilderComponent(type, x, y) {
    if (type === 'platform') {
        builderLevel.platforms.push({ x: x - 50, y: y - 12, w: 100, h: 25 });
    } else if (type === 'walker') {
        builderLevel.enemies.push({ x: x - 12, y: y - 14, type: 'walker', patrol: 80 });
    } else if (type === 'shooter') {
        builderLevel.enemies.push({ x: x - 14, y: y - 14, type: 'shooter' });
    } else if (type === 'orb' || type === 'gem' || type === 'battery') {
        builderLevel.collectibles.push({ x: x - 10, y: y - 10, type: type });
    } else if (type === 'spikes') {
        builderLevel.hazards.push({ x: x - 25, y: y - 10, w: 50, h: 20, type: 'spikes' });
    } else if (type === 'goal') {
        builderLevel.goal = { x: x - 25, y: y - 35, w: 50, h: 70 };
    } else if (type === 'spawn') {
        builderLevel.spawn = { x: x - 14, y: y - 18 };
    }
}

function getBuilderSelectionBounds() {
    if (!builderSelected) return null;
    var cat = builderSelected.category;
    var idx = builderSelected.index;
    var item;
    if (cat === 'spawn') {
        item = builderLevel.spawn;
        return { x: item.x - 2, y: item.y - 2, w: 28 + 4, h: 36 + 4 };
    }
    if (cat === 'goal') {
        item = builderLevel.goal;
        return { x: item.x - 2, y: item.y - 2, w: item.w + 4, h: item.h + 4 };
    }
    if (cat === 'collectibles') {
        item = builderLevel.collectibles[idx];
        return { x: item.x - 2, y: item.y - 2, w: 24, h: 24 };
    }
    if (cat === 'enemies') {
        item = builderLevel.enemies[idx];
        var w = item.type === 'walker' ? 24 : 28;
        return { x: item.x - 2, y: item.y - 2, w: w + 4, h: 28 + 4 };
    }
    if (cat === 'hazards') {
        item = builderLevel.hazards[idx];
        return { x: item.x - 2, y: item.y - 2, w: item.w + 4, h: item.h + 4 };
    }
    if (cat === 'platforms') {
        item = builderLevel.platforms[idx];
        return { x: item.x - 2, y: item.y - 2, w: item.w + 4, h: item.h + 4 };
    }
    return null;
}

function deleteBuilderSelected() {
    if (!builderSelected) return;
    if (typeof SFX !== 'undefined' && SFX && SFX.click) SFX.click();
    var cat = builderSelected.category;
    var idx = builderSelected.index;
    if (cat === 'spawn') builderLevel.spawn = null;
    else if (cat === 'goal') builderLevel.goal = null;
    else if (cat === 'collectibles') builderLevel.collectibles.splice(idx, 1);
    else if (cat === 'enemies') builderLevel.enemies.splice(idx, 1);
    else if (cat === 'hazards') builderLevel.hazards.splice(idx, 1);
    else if (cat === 'platforms') builderLevel.platforms.splice(idx, 1);
    builderSelected = null;
    drawBuilderCanvas();
}

function clearBuilderLevel() {
    if (typeof SFX !== 'undefined' && SFX && SFX.click) SFX.click();

    builderSelected = null;
    builderLevel = {
        platforms: [],
        enemies: [],
        collectibles: [],
        hazards: [],
        goal: null,
        spawn: null
    };
    drawBuilderCanvas();
}

function drawBuilderCanvas() {
    const canvas = document.getElementById('builderCanvas');
    if (!canvas || !builderCanvasCtx) return;

    const ctx = builderCanvasCtx;
    ctx.fillStyle = BUILDER_DEFAULTS.bgGradient[0];
    ctx.fillRect(0, 0, BUILDER_WIDTH, BUILDER_HEIGHT);

    const grad = ctx.createLinearGradient(0, 0, 0, BUILDER_HEIGHT);
    grad.addColorStop(0, BUILDER_DEFAULTS.bgGradient[0]);
    grad.addColorStop(0.5, BUILDER_DEFAULTS.bgGradient[1]);
    grad.addColorStop(1, BUILDER_DEFAULTS.bgGradient[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, BUILDER_WIDTH, BUILDER_HEIGHT);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let gx = 0; gx < BUILDER_WIDTH; gx += 50) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, BUILDER_HEIGHT);
        ctx.stroke();
    }
    for (let gy = 0; gy < BUILDER_HEIGHT; gy += 50) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(BUILDER_WIDTH, gy);
        ctx.stroke();
    }

    builderLevel.hazards.forEach(function (h) {
        ctx.fillStyle = '#cc2222';
        for (let i = 0; i < h.w; i += 14) {
            ctx.beginPath();
            ctx.moveTo(h.x + i, h.y + h.h);
            ctx.lineTo(h.x + i + 7, h.y);
            ctx.lineTo(h.x + i + 14, h.y + h.h);
            ctx.fill();
        }
    });

    builderLevel.platforms.forEach(function (p) {
        ctx.fillStyle = BUILDER_DEFAULTS.platformColor;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = BUILDER_DEFAULTS.platformHighlight;
        ctx.fillRect(p.x, p.y, p.w, 4);
    });

    builderLevel.goal && (function (g) {
        ctx.fillStyle = BUILDER_DEFAULTS.accentColor;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(g.x, g.y, g.w, g.h);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(g.x, g.y, g.w, g.h);
    })(builderLevel.goal);

    builderLevel.collectibles.forEach(function (c) {
        const cx = c.x + 10;
        const cy = c.y + 10;
        if (c.type === 'gem') {
            ctx.fillStyle = '#ff00ff';
            ctx.beginPath();
            ctx.moveTo(cx, cy - 10);
            ctx.lineTo(cx + 8, cy);
            ctx.lineTo(cx, cy + 10);
            ctx.lineTo(cx - 8, cy);
            ctx.fill();
        } else if (c.type === 'battery') {
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(cx - 6, cy - 8, 12, 16);
        } else {
            ctx.fillStyle = BUILDER_DEFAULTS.accentColor;
            ctx.beginPath();
            ctx.arc(cx, cy, 9, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    builderLevel.enemies.forEach(function (e) {
        ctx.fillStyle = BUILDER_DEFAULTS.enemyColor;
        if (e.type === 'walker') {
            ctx.fillRect(e.x, e.y, 24, 28);
        } else {
            ctx.fillRect(e.x, e.y, 28, 28);
        }
    });

    builderLevel.spawn && (function (s) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(s.x, s.y, 28, 36);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fillRect(s.x, s.y, 28, 36);
    })(builderLevel.spawn);

    var sel = getBuilderSelectionBounds();
    if (sel) {
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(sel.x, sel.y, sel.w, sel.h);
        ctx.setLineDash([]);
    }
}

function buildLevelData() {
    if (!builderLevel.spawn) return null;
    if (!builderLevel.goal) return null;

    const baseFloor = {
        x: 0,
        y: 480,
        w: BUILDER_WIDTH,
        h: 70
    };
    const platforms = builderLevel.platforms.length > 0
        ? builderLevel.platforms.slice()
        : [baseFloor];

    return {
        name: 'CUSTOM LEVEL',
        subtitle: 'Level Builder',
        description: 'A custom timeline created in the Level Builder.',
        bgGradient: BUILDER_DEFAULTS.bgGradient.slice(),
        platformColor: BUILDER_DEFAULTS.platformColor,
        platformHighlight: BUILDER_DEFAULTS.platformHighlight,
        accentColor: BUILDER_DEFAULTS.accentColor,
        enemyColor: BUILDER_DEFAULTS.enemyColor,
        platforms: platforms,
        enemies: builderLevel.enemies.slice(),
        collectibles: builderLevel.collectibles.slice(),
        hazards: builderLevel.hazards.slice(),
        goal: { ...builderLevel.goal },
        spawn: { ...builderLevel.spawn },
        decorations: []
    };
}

function showLevelBuilderScreen() {
    var container = document.getElementById('gameContainer');
    if (container) container.classList.add('builder-active');
    showScreen('levelBuilderScreen');
    initLevelBuilder();
    drawBuilderCanvas();
}

function hideLevelBuilder() {
    var container = document.getElementById('gameContainer');
    if (container) container.classList.remove('builder-active');
    if (typeof SFX !== 'undefined' && SFX && SFX.click) SFX.click();
    showScreen('titleScreen');
}

function startBuilderLevel() {
    var levelData = buildLevelData();
    if (!levelData) {
        alert('Add a Spawn point and Temporal Door before playing.');
        return;
    }

    if (typeof SFX !== 'undefined' && SFX && SFX.click) SFX.click();

    pendingBuilderLevel = levelData;
    isBuilderTest = true;
    showModeSelect();
}

function loadBuilderLevelAndStart() {
    if (!pendingBuilderLevel) return;

    var container = document.getElementById('gameContainer');
    if (container) container.classList.remove('builder-active');

    if (typeof initAudio === 'function') initAudio();

    levels = [pendingBuilderLevel];
    currentLevel = 0;
    setActiveWorld('chronos-core');
    levels = [pendingBuilderLevel];
    loadLevel(0);
    pendingBuilderLevel = null;
    isBuilderTest = false;
    hideAllScreens();
    gameState = 'playing';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLevelBuilder);
} else {
    initLevelBuilder();
}
