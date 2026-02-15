// ChronoQuest - Screen management and flow
function hideAllScreens() {
    document.querySelectorAll('.screen-overlay').forEach(function (s) { s.classList.add('hidden'); });
}

function showScreen(id) {
    hideAllScreens();
    document.getElementById(id).classList.remove('hidden');
}

function showStory() {
    SFX.click();
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

function showLevelIntro() {
    const data = levels[currentLevel];
    document.getElementById('levelNumber').textContent = 'LEVEL ' + (currentLevel + 1);
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
    showScreen('titleScreen');
}

function playerDeath() {
    SFX.death();
    gameState = 'dead';
    spawnParticles(player.x + player.width / 2, player.y + player.height / 2, '#ff0044', 40, 200, 1, 6);
    screenShake = 0.5;
    screenFlash = 0.3;
    screenFlashColor = '#ff0000';

    setTimeout(function () { showScreen('deathScreen'); }, 500);
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

function showCharacterSelect() {
    SFX.click();
    showScreen('characterScreen');
    const grid = document.getElementById('characterList');
    grid.innerHTML = '';

    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = `character-card ${index === selectedCharIndex ? 'selected' : ''}`;
        card.onclick = () => selectCharacter(index);

        const preview = document.createElement('div');
        preview.className = 'character-preview';
        preview.style.backgroundColor = char.color;
        // Simple visual representation
        preview.innerHTML = `
            <div style="width: 100%; height: 30%; background: ${char.headColor}"></div>
            <div style="width: 100%; height: 10%; background: ${char.accentColor}; margin-top: 20%"></div>
        `;

        card.appendChild(preview);
        grid.appendChild(card);
    });

    updateCharacterStats();
}

function selectCharacter(index) {
    SFX.click();
    selectedCharIndex = index;
    const cards = document.querySelectorAll('.character-card');
    cards.forEach((c, i) => {
        c.className = `character-card ${i === index ? 'selected' : ''}`;
    });
    updateCharacterStats();
}

function updateCharacterStats() {
    const char = characters[selectedCharIndex];
    document.getElementById('charName').textContent = char.name;
    document.getElementById('charName').style.color = char.accentColor;
    document.getElementById('charDesc').textContent = char.description;

    // Normalize stats for display (assuming max speed ~1.5, jump ~1.5, health ~5)
    document.getElementById('statSpeed').style.width = (char.speed / 1.5 * 100) + '%';
    document.getElementById('statJump').style.width = (char.jumpForce / 1.5 * 100) + '%';
    document.getElementById('statHealth').style.width = (char.maxHealth / 5 * 100) + '%';

    document.getElementById('statSpeed').parentNode.style.boxShadow = `0 0 5px ${char.accentColor}`;
    document.getElementById('statSpeed').style.backgroundColor = char.accentColor;
}

function confirmCharacter() {
    SFX.click();
    selectedCharacter = characters[selectedCharIndex];
    showStory();
}
