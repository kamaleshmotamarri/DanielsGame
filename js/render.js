// ChronoQuest - Rendering (canvas draw calls)
function draw() {
    ctx.save();

    if (screenShake > 0.01) {
        ctx.translate(
            (Math.random() - 0.5) * screenShake * 25,
            (Math.random() - 0.5) * screenShake * 25
        );
    }

    drawBackground();

    if (gameState === 'playing' || gameState === 'paused' || gameState === 'dead' || gameState === 'levelComplete') {
        drawGame();
    }

    ctx.restore();

    if (screenFlash > 0.01) {
        ctx.fillStyle = screenFlashColor;
        ctx.globalAlpha = screenFlash * 0.4;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.globalAlpha = 1;
    }

    if (gameState === 'playing') {
        drawUI();
    }
}

function drawBackground() {
    const colors = currentLevelData ? currentLevelData.bgGradient : ['#1a0a2e', '#2d1b4e', '#1a2a1a'];
    const worldId = activeWorld ? activeWorld.id : 'chronos-core';
    const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(0.5, colors[1]);
    grad.addColorStop(1, colors[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const time = performance.now() / 1000;

    if (worldId === 'aether-frost') {
        ctx.fillStyle = 'rgba(220, 245, 255, 0.45)';
        for (let i = 0; i < 90; i++) {
            const drift = Math.sin(time * 1.5 + i) * 8;
            const x = (i * 37 + time * 28 + drift) % (WIDTH + 40) - 20;
            const y = (i * 59 + time * 42) % (HEIGHT + 20) - 10;
            const r = (i % 3) + 1;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (worldId === 'inferno-forge') {
        for (let i = 0; i < 65; i++) {
            const x = (i * 43 + time * 36) % (WIDTH + 30) - 15;
            const y = HEIGHT - ((i * 71 + time * 55) % (HEIGHT + 40));
            const alpha = 0.2 + ((i % 4) * 0.1);
            ctx.fillStyle = 'rgba(255, 170, 90, ' + alpha + ')';
            ctx.fillRect(x, y, 2, 2 + (i % 3));
        }
    } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 60; i++) {
            const x = ((i * 47 + time * 5) % (WIDTH + 20)) - 10;
            const y = (i * 73) % HEIGHT;
            const size = (i % 3) + 1;
            ctx.fillRect(x, y, size, size);
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < 40; i++) {
            const x = ((i * 61 + time * 3) % (WIDTH + 20)) - 10;
            const y = (i * 89 + 50) % HEIGHT;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawGame() {
    const gameTime = performance.now() / 1000;

    for (let hi = 0; hi < hazards.length; hi++) {
        const h = hazards[hi];
        ctx.fillStyle = '#cc2222';
        for (let i = 0; i < h.w; i += 14) {
            ctx.beginPath();
            ctx.moveTo(h.x + i, h.y + h.h);
            ctx.lineTo(h.x + i + 7, h.y);
            ctx.lineTo(h.x + i + 14, h.y + h.h);
            ctx.fill();
        }
    }

    for (let pi = 0; pi < platforms.length; pi++) {
        const p = platforms[pi];
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(p.x + 4, p.y + 4, p.w, p.h);
        ctx.fillStyle = currentLevelData.platformColor;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = currentLevelData.platformHighlight;
        ctx.fillRect(p.x, p.y, p.w, 4);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
        if (p.moving) {
            ctx.fillStyle = currentLevelData.accentColor;
            ctx.globalAlpha = 0.5 + Math.sin(gameTime * 4) * 0.3;
            ctx.fillRect(p.x + p.w / 2 - 10, p.y + 2, 20, 2);
            ctx.globalAlpha = 1;
        }
    }

    const goal = currentLevelData.goal;
    const goalActive = !boss || bossDefeated;
    if (goalActive) {
        const pulse = Math.sin(gameTime * 4) * 0.3 + 0.7;
        ctx.fillStyle = currentLevelData.accentColor;
        ctx.globalAlpha = pulse * 0.3;
        ctx.fillRect(goal.x - 10, goal.y - 10, goal.w + 20, goal.h + 20);
        ctx.globalAlpha = 1;
        const portalGrad = ctx.createLinearGradient(goal.x, goal.y, goal.x, goal.y + goal.h);
        portalGrad.addColorStop(0, currentLevelData.accentColor);
        portalGrad.addColorStop(0.5, '#ffffff');
        portalGrad.addColorStop(1, currentLevelData.accentColor);
        ctx.fillStyle = portalGrad;
        ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.strokeRect(goal.x, goal.y, goal.w, goal.h);
        ctx.strokeStyle = currentLevelData.accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
            const t = i / 20;
            const r = 15 * (1 - t);
            const angle = t * Math.PI * 4 + gameTime * 3;
            const x = goal.x + goal.w / 2 + Math.cos(angle) * r;
            const y = goal.y + goal.h / 2 + Math.sin(angle) * r * 1.5;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    for (let ci = 0; ci < collectibles.length; ci++) {
        const c = collectibles[ci];
        if (c.collected) continue;
        const bob = Math.sin(gameTime * 3 + c.x * 0.1) * 4;
        const cx = c.x + 10;
        const cy = c.y + 10 + bob;
        if (c.type === 'gem') {
            const pulse = Math.sin(gameTime * 5 + c.x) * 0.2 + 1.0;
            ctx.fillStyle = '#ff00ff'; // Gem color
            ctx.beginPath();
            ctx.moveTo(cx, cy - 10 * pulse);
            ctx.lineTo(cx + 8 * pulse, cy);
            ctx.lineTo(cx, cy + 10 * pulse);
            ctx.lineTo(cx - 8 * pulse, cy);
            ctx.fill();

            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.moveTo(cx - 3, cy - 3);
            ctx.lineTo(cx + 2, cy - 3);
            ctx.lineTo(cx, cy - 8);
            ctx.fill();
        } else if (c.type === 'battery') {
            const pulse = Math.sin(gameTime * 4 + c.x) * 0.2 + 0.8;
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(cx - 6, cy - 8, 12, 16);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(cx - 2, cy - 10, 4, 2); // Cap

            // Charge level
            ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
            ctx.fillRect(cx - 4, cy - 4, 8, 4);
            ctx.fillRect(cx - 4, cy + 2, 8, 4);
        } else {
            // Orb (default)
            const pulse = Math.sin(gameTime * 5 + c.x) * 0.2 + 0.8;
            ctx.fillStyle = currentLevelData.accentColor;
            ctx.globalAlpha = 0.3 * pulse;
            ctx.beginPath();
            ctx.arc(cx, cy, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            const orbGrad = ctx.createRadialGradient(cx - 3, cy - 3, 0, cx, cy, 10);
            orbGrad.addColorStop(0, '#ffffff');
            orbGrad.addColorStop(0.5, currentLevelData.accentColor);
            orbGrad.addColorStop(1, currentLevelData.platformColor);
            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(cx - 3, cy - 3, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let ei = 0; ei < enemies.length; ei++) {
        const e = enemies[ei];
        if (e.health <= 0) continue;
        const bounce = Math.sin(gameTime * 8 + e.x) * 2;
        if (e.type === 'walker') {
            ctx.fillStyle = currentLevelData.enemyColor;
            ctx.fillRect(e.x, e.y + bounce, 24, 28);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(e.x, e.y + 20 + bounce, 24, 8);
            ctx.fillStyle = '#ffffff';
            const eyeX = e.vx > 0 ? e.x + 14 : e.x + 4;
            ctx.fillRect(eyeX, e.y + 8 + bounce, 8, 8);
            ctx.fillStyle = '#000000';
            const pupilOffset = e.vx > 0 ? 4 : 0;
            ctx.fillRect(eyeX + pupilOffset + 1, e.y + 11 + bounce, 3, 4);
            ctx.fillStyle = currentLevelData.enemyColor;
            ctx.fillRect(eyeX - 1, e.y + 6 + bounce, 10, 3);
        } else if (e.type === 'shooter') {
            ctx.fillStyle = currentLevelData.enemyColor;
            ctx.fillRect(e.x, e.y, 28, 28);
            ctx.fillStyle = currentLevelData.accentColor;
            ctx.globalAlpha = 0.5 + Math.sin(gameTime * 6) * 0.3;
            ctx.fillRect(e.x + 4, e.y + 4, 20, 2);
            ctx.fillRect(e.x + 4, e.y + 22, 20, 2);
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(e.x + 14, e.y + 14, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(e.x + 14, e.y + 14, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff0000';
            ctx.globalAlpha = Math.sin(gameTime * 10) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(e.x + 14, e.y + 14, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    if (boss && !bossDefeated) {
        drawBoss();
    }

    for (let pi = 0; pi < projectiles.length; pi++) {
        const p = projectiles[pi];
        ctx.fillStyle = p.hostile ? '#ff00ff' : '#00ff00';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawPlayer();

    for (let pi = 0; pi < particles.length; pi++) {
        particles[pi].draw();
    }

    if (timeScale < 0.9) {
        ctx.fillStyle = 'rgba(0, 100, 150, 0.12)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = 'rgba(0, 200, 255, 0.04)';
        for (let y = 0; y < HEIGHT; y += 4) {
            ctx.fillRect(0, y, WIDTH, 2);
        }
        const vigGrad = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 100, WIDTH / 2, HEIGHT / 2, 500);
        vigGrad.addColorStop(0, 'rgba(0, 255, 255, 0)');
        vigGrad.addColorStop(1, 'rgba(0, 100, 150, 0.3)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    if (isRewinding) {
        ctx.fillStyle = 'rgba(150, 0, 150, 0.15)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = 'rgba(255, 0, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 10; i++) {
            const y = (gameTime * 500 + i * 60) % (HEIGHT + 100) - 50;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(WIDTH, y + 50);
            ctx.stroke();
        }
    }
}

function drawPlayer() {
    if (player.invincible > 0 && Math.floor(player.invincible * 10) % 2 === 0) return;

    const px = player.x;
    const py = player.y;
    const gameTime = performance.now() / 1000;

    // Default colors if not set
    const bodyColor = player.color || '#2a4466';
    const headColor = player.headColor || '#ffcc99';
    const armorColor = player.accentColor || '#4488cc';

    if (timeScale < 0.9) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fillRect(px - 6, py - 6, player.width + 12, player.height + 12);
    }
    if (isRewinding) {
        ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
        ctx.fillRect(px - 6, py - 6, player.width + 12, player.height + 12);
    }

    ctx.save();
    if (!player.facingRight) {
        ctx.translate(px + player.width / 2, 0);
        ctx.scale(-1, 1);
        ctx.translate(-(px + player.width / 2), 0);
    }

    const legAnim = player.state === 'run' ? Math.sin(player.animFrame * 1.5) * 4 : 0;
    const breathe = player.state === 'idle' ? Math.sin(gameTime * 2) * 1 : 0;

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(px + player.width / 2, py + player.height + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = bodyColor; // darker body color for legs usually
    ctx.filter = 'brightness(0.8)';
    ctx.fillRect(px + 5, py + 26, 7, 10 + legAnim);
    ctx.fillRect(px + 16, py + 26, 7, 10 - legAnim);
    ctx.filter = 'none';

    // Body
    ctx.fillStyle = armorColor;
    ctx.fillRect(px + 4, py + 10 + breathe, 20, 18);

    // Chest piece
    ctx.fillStyle = bodyColor;
    ctx.fillRect(px + 6, py + 12 + breathe, 6, 8);

    // Core
    ctx.fillStyle = timeScale < 0.9 ? '#00ffff' : (isRewinding ? '#ff00ff' : '#aaddff');
    ctx.beginPath();
    ctx.arc(px + 14, py + 18 + breathe, 4, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = headColor;
    ctx.fillRect(px + 6, py + breathe, 16, 14);

    // Helmet/Hair
    ctx.fillStyle = bodyColor;
    ctx.fillRect(px + 5, py - 2 + breathe, 18, 6);
    ctx.fillRect(px + 4, py + 2 + breathe, 4, 4);

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 10, py + 5 + breathe, 5, 5);
    ctx.fillRect(px + 17, py + 5 + breathe, 5, 5);
    ctx.fillStyle = '#000000';
    const lookOffset = player.state === 'jump' ? -1 : (player.state === 'fall' ? 1 : 0);
    ctx.fillRect(px + 12, py + 7 + breathe + lookOffset, 2, 2);
    ctx.fillRect(px + 19, py + 7 + breathe + lookOffset, 2, 2);

    // Arms
    const armAnim = player.state === 'run' ? Math.sin(player.animFrame * 1.5 + Math.PI) * 3 : 0;
    ctx.fillStyle = headColor; // Skin color arms
    ctx.fillRect(px, py + 12 + breathe + armAnim, 5, 12);
    ctx.fillRect(px + 23, py + 12 + breathe - armAnim, 5, 12);

    ctx.restore();
}

function drawBoss() {
    const gameTime = performance.now() / 1000;
    const pulse = Math.sin(gameTime * 3) * 0.2 + 0.8;
    const shake = boss.health < 4 ? Math.sin(gameTime * 20) * 3 : 0;
    const glowColor = boss.phase === 1 ? '#8800ff' : (boss.phase === 2 ? '#ff00ff' : '#ff0000');

    ctx.fillStyle = glowColor;
    ctx.globalAlpha = 0.3 * pulse;
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 40, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#3a1a5a';
    ctx.fillRect(boss.x + shake, boss.y, 80, 80);
    ctx.fillStyle = glowColor;
    ctx.globalAlpha = 0.5 + Math.sin(gameTime * 5) * 0.3;
    ctx.fillRect(boss.x + 10 + shake, boss.y + 10, 60, 5);
    ctx.fillRect(boss.x + 10 + shake, boss.y + 65, 60, 5);
    ctx.fillRect(boss.x + 10 + shake, boss.y + 10, 5, 60);
    ctx.fillRect(boss.x + 65 + shake, boss.y + 10, 5, 60);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 40, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 40, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(boss.x + 40 + shake, boss.y + 40, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(boss.x + 35 + shake, boss.y + 35, 5, 0, Math.PI * 2);
    ctx.fill();

    const healthPct = boss.health / boss.maxHealth;
    ctx.fillStyle = '#333';
    ctx.fillRect(boss.x, boss.y - 20, 80, 10);
    ctx.fillStyle = glowColor;
    ctx.fillRect(boss.x, boss.y - 20, 80 * healthPct, 10);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.strokeRect(boss.x, boss.y - 20, 80, 10);
}

function drawUI() {
    const world = activeWorld || { name: 'CHRONOS CORE' };
    const hudAccent = (world && world.cardAccent) ? world.cardAccent : currentLevelData.accentColor;

    for (let i = 0; i < player.maxHealth; i++) {
        const x = 20 + i * 35;
        const y = 20;
        if (i < player.health) {
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 6);
            ctx.bezierCurveTo(x + 12, y + 2, x + 6, y, x + 6, y + 6);
            ctx.bezierCurveTo(x + 6, y + 12, x + 12, y + 18, x + 12, y + 22);
            ctx.bezierCurveTo(x + 12, y + 18, x + 18, y + 12, x + 18, y + 6);
            ctx.bezierCurveTo(x + 18, y, x + 12, y + 2, x + 12, y + 6);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(x + 8, y + 7, 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.strokeStyle = '#ff4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 6);
            ctx.bezierCurveTo(x + 12, y + 2, x + 6, y, x + 6, y + 6);
            ctx.bezierCurveTo(x + 6, y + 12, x + 12, y + 18, x + 12, y + 22);
            ctx.bezierCurveTo(x + 12, y + 18, x + 18, y + 12, x + 18, y + 6);
            ctx.bezierCurveTo(x + 18, y, x + 12, y + 2, x + 12, y + 6);
            ctx.stroke();
        }
    }

    const barX = 20, barY = 50, barW = 150, barH = 14;
    ctx.fillStyle = '#222';
    ctx.fillRect(barX, barY, barW, barH);
    const energyPct = timeEnergy / MAX_TIME_ENERGY;
    const energyColor = timeScale < 0.9 ? '#00ffff' : (isRewinding ? '#ff00ff' : '#4488ff');
    const energyGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
    energyGrad.addColorStop(0, energyColor);
    energyGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = energyGrad;
    ctx.fillRect(barX, barY, barW * energyPct, barH);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barW, barH);
    ctx.fillStyle = '#888';
    ctx.font = '10px Orbitron';
    ctx.fillText('TIME ENERGY', barX, barY - 4);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Orbitron';
    ctx.textAlign = 'right';
    ctx.fillText(totalScore.toLocaleString(), WIDTH - 20, 35);
    ctx.font = '10px Orbitron';
    ctx.fillStyle = '#888';
    ctx.fillText('SCORE', WIDTH - 20, 20);
    ctx.textAlign = 'left';

    ctx.fillStyle = hudAccent;
    ctx.font = '12px Orbitron';
    ctx.fillText(collectedCount + '/' + totalCollectibles, WIDTH - 60, 55);
    ctx.beginPath();
    ctx.arc(WIDTH - 75, 52, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '11px Orbitron';
    ctx.fillText(currentLevelData.name, 20, HEIGHT - 15);
    ctx.font = '10px Orbitron';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText(world.name + ' [' + (currentLevel + 1) + '/' + levels.length + ']', 20, HEIGHT - 30);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'right';
    ctx.fillText(formatTime(levelTime), WIDTH - 20, HEIGHT - 15);
    ctx.textAlign = 'left';

    if (timeScale < 0.9) {
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 14px Orbitron';
        ctx.fillText('[ TIME SLOW ]', WIDTH / 2 - 50, 30);
    } else if (isRewinding) {
        ctx.fillStyle = '#ff00ff';
        ctx.font = 'bold 14px Orbitron';
        ctx.fillText('[ REWINDING ]', WIDTH / 2 - 50, 30);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = '10px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText('WASD: Move  |  SHIFT: Time Slow  |  R: Rewind  |  ESC: Pause', WIDTH / 2, HEIGHT - 5);
    ctx.textAlign = 'left';
}
