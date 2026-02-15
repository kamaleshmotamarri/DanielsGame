// ChronoQuest - Screen management and flow
function hideAllScreens() {
    document.querySelectorAll('.screen-overlay').forEach(function (s) { s.classList.add('hidden'); });
}

function showScreen(id) {
    hideAllScreens();
    const screen = document.getElementById(id);
    if (screen) screen.classList.remove('hidden');
}

function showModeSelect() {
    SFX.click();
    showScreen('modeScreen');
}

function selectMode(mode) {
    gameMode = mode;
    if (typeof isBuilderTest !== 'undefined' && isBuilderTest) {
        showCharacterSelect('SELECT AGENT FOR PLAY TEST');
    } else {
        showWorldSelect();
    }
}

function showWorldSelect() {
    SFX.click();
    renderWorldCards();
    showScreen('worldScreen');
}

function renderWorldCards() {
    const grid = document.getElementById('worldGrid');
    if (!grid) return;

    grid.innerHTML = '';

    gameWorlds.forEach(function (world) {
        const card = document.createElement('div');
        card.className = 'world-card' + (selectedWorldId === world.id ? ' selected' : '');
        card.style.setProperty('--world-accent', world.cardAccent);

        const title = document.createElement('h2');
        title.textContent = world.name;

        const tag = document.createElement('p');
        tag.className = 'world-tagline';
        tag.textContent = world.tagline + ' • ' + world.levels.length + ' LEVELS';

        const desc = document.createElement('p');
        desc.className = 'world-desc';
        desc.textContent = world.description;

        const btn = document.createElement('button');
        btn.className = 'menu-btn world-select-btn';
        btn.textContent = 'SELECT WORLD';
        btn.onclick = function (evt) {
            evt.stopPropagation();
            selectWorld(world.id);
        };

        card.appendChild(title);
        card.appendChild(tag);
        card.appendChild(desc);
        card.appendChild(btn);

        card.onclick = function () {
            SFX.click();
            selectedWorldId = world.id;
            renderWorldCards();
        };

        grid.appendChild(card);
    });
}

function selectWorld(worldId) {
    SFX.click();
    setActiveWorld(worldId);
    showCharacterSelect();
}

function backFromCharacterSelect() {
    SFX.click();
    if (typeof isBuilderTest !== 'undefined' && isBuilderTest) {
        showModeSelect();
    } else {
        showWorldSelect();
    }
}

function showStory() {
    SFX.click();
    const world = getActiveWorld();
    const nameEl = document.getElementById('storyWorldName');
    const descEl = document.getElementById('storyWorldDesc');

    if (nameEl) nameEl.textContent = world.name;
    if (descEl) descEl.textContent = world.description;

    showScreen('storyScreen');
}

function showControls() {
    SFX.click();
    showScreen('controlsScreen');
}

function hideControls() {
    SFX.click();
    showScreen('titleScreen');
}

function showLevelBuilder() {
    SFX.click();
    if (typeof showLevelBuilderScreen === 'function') {
        showLevelBuilderScreen();
    } else {
        showScreen('levelBuilderScreen');
    }
}

function showLevelIntro() {
    const data = levels[currentLevel];
    const world = getActiveWorld();

    document.getElementById('levelNumber').textContent = world.name + ' • LEVEL ' + (currentLevel + 1);
    document.getElementById('levelName').textContent = data.name;
    document.getElementById('levelName').style.color = data.accentColor;
    document.getElementById('levelDesc').textContent = data.description;
    showScreen('levelIntro');

    setTimeout(function () {
        hideAllScreens();
        gameState = 'playing';
    }, 2500);
}

function startGame() {
    initAudio();
    SFX.click();
    totalScore = 0;
    currentLevel = 0;
    setActiveWorld(selectedWorldId);
    loadLevel(0);
    showLevelIntro();
}

function togglePause() {
    if (gameState === 'playing') {
        gameState = 'paused';
        showScreen('pauseScreen');
    } else if (gameState === 'paused') {
        resumeGame();
    }
}

function resumeGame() {
    SFX.click();
    hideAllScreens();
    gameState = 'playing';
}

function restartLevel() {
    SFX.click();
    loadLevel(currentLevel);
    hideAllScreens();
    gameState = 'playing';
}

function quitToMenu() {
    SFX.click();
    gameState = 'title';
    if (typeof isBuilderTest !== 'undefined' && isBuilderTest) {
        isBuilderTest = false;
        pendingBuilderLevel = null;
        if (typeof showLevelBuilderScreen === 'function') {
            showLevelBuilderScreen();
        } else {
            showScreen('titleScreen');
        }
    } else {
        showScreen('titleScreen');
    }
}

function playerDeath() {
    SFX.death();
    gameState = 'dead';
    spawnParticles(player.x + player.width / 2, player.y + player.height / 2, '#ff0044', 40, 200, 1, 6);
    screenShake = 0.5;
    screenFlash = 0.3;
    screenFlashColor = '#ff0000';

    setTimeout(function () {
        showScreen('deathScreen');
        const deathMsg = document.querySelector('#deathScreen h1');
        if (deathMsg) {
            if (gameMode === 'master') {
                deathMsg.textContent = 'MISSION FAILED';
                deathMsg.style.color = '#ff0000';
                const buttons = document.querySelectorAll('#deathScreen .menu-btn');
                if (buttons[0]) buttons[0].style.display = 'none';
            } else {
                deathMsg.textContent = 'TIMELINE FRACTURE';
                deathMsg.style.color = 'var(--primary)';
                const buttons = document.querySelectorAll('#deathScreen .menu-btn');
                if (buttons[0]) buttons[0].style.display = 'inline-block';
            }
        }
    }, 500);
}

function levelComplete() {
    SFX.levelComplete();
    gameState = 'levelComplete';

    levelTime = (performance.now() - levelStartTime) / 1000;
    const timeBonus = Math.max(0, Math.floor((120 - levelTime) * 10));
    const orbBonus = collectedCount * 100;
    const levelScore = 500 + timeBonus + orbBonus;
    totalScore += levelScore;

    document.getElementById('levelTime').textContent = formatTime(levelTime);
    document.getElementById('levelOrbs').textContent = collectedCount + '/' + totalCollectibles;
    document.getElementById('levelScore').textContent = levelScore.toLocaleString();

    spawnParticles(player.x + player.width / 2, player.y + player.height / 2, currentLevelData.accentColor, 50, 250, 1.2, 8, 'star');
    screenFlash = 0.3;
    screenFlashColor = currentLevelData.accentColor;

    setTimeout(function () { showScreen('winScreen'); }, 800);
}

function nextLevel() {
    SFX.click();
    if (currentLevel < levels.length - 1) {
        loadLevel(currentLevel + 1);
        showLevelIntro();
    } else {
        SFX.victory();
        document.getElementById('finalScore').textContent = totalScore.toLocaleString();
        showScreen('victoryScreen');
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + secs.toString().padStart(2, '0');
}

let selectedCharIndex = 0;

function showCharacterSelect(subtitleOverride) {
    SFX.click();
    showScreen('characterScreen');

    var subtitle = document.getElementById('characterSubtitle');
    if (subtitle) {
        subtitle.textContent = subtitleOverride || ('SELECT AGENT FOR ' + getActiveWorld().name);
    }

    var backBtn = document.querySelector('#characterScreen .character-actions .menu-btn.secondary');
    if (backBtn) {
        backBtn.textContent = (typeof isBuilderTest !== 'undefined' && isBuilderTest) ? 'BACK' : 'CHANGE WORLD';
    }

    const grid = document.getElementById('characterList');
    grid.innerHTML = '';

    characters.forEach(function (char, index) {
        const card = document.createElement('div');
        card.className = 'character-card ' + (index === selectedCharIndex ? 'selected' : '');
        card.onclick = function () { selectCharacter(index); };

        const preview = document.createElement('div');
        preview.className = 'character-preview';
        preview.style.backgroundColor = char.color;
        preview.innerHTML =
            '<div style="width: 100%; height: 30%; background: ' + char.headColor + '"></div>' +
            '<div style="width: 100%; height: 10%; background: ' + char.accentColor + '; margin-top: 20%"></div>';

        const label = document.createElement('span');
        label.className = 'character-name';
        label.textContent = char.name;

        card.appendChild(preview);
        card.appendChild(label);
        grid.appendChild(card);
    });

    updateCharacterStats();
}

function selectCharacter(index) {
    SFX.click();
    selectedCharIndex = index;
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(function (c, i) {
        c.className = 'character-card ' + (i === index ? 'selected' : '');
    });
    updateCharacterStats();
}

function updateCharacterStats() {
    const char = characters[selectedCharIndex];
    document.getElementById('charName').textContent = char.name.toUpperCase();
    document.getElementById('charName').style.color = char.accentColor;
    document.getElementById('charDesc').textContent = char.description;

    const bars = {
        statSpeed: char.speed / 1.5,
        statJump: char.jumpForce / 1.5,
        statHealth: char.maxHealth / 5
    };

    for (let id in bars) {
        const bar = document.getElementById(id);
        if (bar) {
            bar.style.width = (bars[id] * 100) + '%';
            bar.style.backgroundColor = char.accentColor;
            bar.style.boxShadow = '0 0 10px ' + char.accentColor;
        }
    }
}

function confirmCharacter() {
    SFX.click();
    selectedCharacter = characters[selectedCharIndex];
    if (typeof isBuilderTest !== 'undefined' && isBuilderTest && typeof loadBuilderLevelAndStart === 'function') {
        loadBuilderLevelAndStart();
    } else {
        showStory();
    }
}
