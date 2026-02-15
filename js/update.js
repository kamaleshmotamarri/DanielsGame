// ChronoQuest - Game update loop (physics, collisions, time mechanics)
function update(dt) {
    if (gameState !== 'playing') return;

    levelTime = (performance.now() - levelStartTime) / 1000;

    const wasSlowing = timeScale < 0.9;
    const wasRewinding = isRewinding;

    if ((keys['ShiftLeft'] || keys['ShiftRight']) && !keys['KeyR']) {
        if (timeEnergy > 0) {
            targetTimeScale = 0.25;
            timeEnergy -= 35 * dt;
            if (!wasSlowing) SFX.timeSlow();
            if (Math.random() < 0.2) {
                spawnParticles(
                    player.x + player.width / 2 + (Math.random() - 0.5) * 100,
                    player.y + player.height / 2 + (Math.random() - 0.5) * 100,
                    '#00ffff', 1, 20, 0.5, 3, 'circle'
                );
            }
        } else {
            targetTimeScale = 1;
            if (wasSlowing) SFX.timeResume();
        }
        isRewinding = false;
    } else if (keys['KeyR']) {
        if (timeEnergy > 0 && rewindBuffer.length > 0) {
            isRewinding = true;
            timeEnergy -= 50 * dt;
            if (!wasRewinding) SFX.rewind();
        } else {
            isRewinding = false;
        }
        targetTimeScale = 1;
    } else {
        targetTimeScale = 1;
        isRewinding = false;
        if (wasSlowing) SFX.timeResume();
    }

    timeScale += (targetTimeScale - timeScale) * 10 * dt;

    if (timeScale > 0.9 && !isRewinding) {
        timeEnergy = Math.min(MAX_TIME_ENERGY, timeEnergy + 20 * dt);
    }

    if (isRewinding && rewindBuffer.length > 0) {
        const state = rewindBuffer.pop();
        player.x = state.x;
        player.y = state.y;
        player.vx = state.vx;
        player.vy = state.vy;
        player.onGround = state.onGround;
        if (Math.random() < 0.4) {
            spawnTrail(player.x + player.width / 2, player.y + player.height / 2, '#ff00ff');
        }
        enemies.forEach(function (e, i) {
            if (state.enemies && state.enemies[i]) {
                e.x = state.enemies[i].x;
                e.y = state.enemies[i].y;
            }
        });
        updateParticles(dt);
        return;
    }

    if (rewindBuffer.length >= MAX_REWIND_FRAMES) rewindBuffer.shift();
    rewindBuffer.push({
        x: player.x, y: player.y, vx: player.vx, vy: player.vy,
        onGround: player.onGround,
        enemies: enemies.map(function (e) { return { x: e.x, y: e.y }; })
    });

    const eDt = dt * timeScale;
    const gameTime = performance.now() / 1000;

    platforms.forEach(function (p, i) {
        if (p.moving) {
            const phase = gameTime * p.speed * 2 + platformPhases[i];
            if (p.moveX) p.x = p.origX + Math.sin(phase) * p.moveX;
            if (p.moveY) p.y = p.origY + Math.sin(phase) * p.moveY;
        }
    });

    const moveSpeed = 280 * (player.speed || 1);
    const jumpForce = -480 * (player.jumpForce || 1);
    const gravity = 1400; // Gravity constant for now
    const friction = 0.85;

    let moveInput = 0;
    if (keys['ArrowLeft'] || keys['KeyA']) { moveInput = -1; player.facingRight = false; }
    if (keys['ArrowRight'] || keys['KeyD']) { moveInput = 1; player.facingRight = true; }

    if (moveInput !== 0) {
        player.vx = moveInput * moveSpeed;
        if (player.onGround) player.state = 'run';
    } else {
        player.vx *= friction;
        if (player.onGround) player.state = 'idle';
    }

    if (player.onGround) {
        player.coyoteTime = 0.1;
        player.jumpCount = 0;
    } else {
        player.coyoteTime -= eDt;
    }

    if (keysPressed['ArrowUp'] || keysPressed['KeyW'] || keysPressed['Space']) {
        player.jumpBuffer = 0.1;
    }
    player.jumpBuffer -= eDt;

    if (player.jumpBuffer > 0) {
        if (player.coyoteTime > 0 || player.jumpCount < player.maxJumps) {
            if (player.coyoteTime > 0) {
                player.vy = jumpForce;
                player.jumpCount = 1;
                SFX.jump();
            } else if (player.jumpCount < player.maxJumps) {
                player.vy = jumpForce * 0.9;
                player.jumpCount++;
                SFX.doubleJump();
                spawnParticles(player.x + player.width / 2, player.y + player.height, '#ffffff', 8, 100, 0.4, 4);
            }
            player.onGround = false;
            player.coyoteTime = 0;
            player.jumpBuffer = 0;
            player.state = 'jump';
            spawnParticles(player.x + player.width / 2, player.y + player.height, '#ffffff', 6, 80, 0.3, 3);
        }
    }

    player.vy += gravity * eDt;
    if (player.vy > 800) player.vy = 800;

    player.x += player.vx * eDt;
    player.y += player.vy * eDt;

    if (!player.onGround) {
        player.state = player.vy < 0 ? 'jump' : 'fall';
    }

    player.animTimer += eDt;
    if (player.animTimer > 0.08) {
        player.animTimer = 0;
        player.animFrame = (player.animFrame + 1) % 8;
    }

    player.wasOnGround = player.onGround;
    player.onGround = false;

    for (let pi = 0; pi < platforms.length; pi++) {
        const plat = platforms[pi];
        if (player.x + player.width > plat.x && player.x < plat.x + plat.w &&
            player.y + player.height > plat.y && player.y < plat.y + plat.h) {
            const overlapLeft = (player.x + player.width) - plat.x;
            const overlapRight = (plat.x + plat.w) - player.x;
            const overlapTop = (player.y + player.height) - plat.y;
            const overlapBottom = (plat.y + plat.h) - player.y;
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            if (minOverlap === overlapTop && player.vy >= 0) {
                player.y = plat.y - player.height;
                player.vy = 0;
                player.onGround = true;
                if (!player.wasOnGround) SFX.land();
            } else if (minOverlap === overlapBottom && player.vy < 0) {
                player.y = plat.y + plat.h;
                player.vy = 0;
            } else if (minOverlap === overlapLeft) {
                player.x = plat.x - player.width;
                player.vx = 0;
            } else if (minOverlap === overlapRight) {
                player.x = plat.x + plat.w;
                player.vx = 0;
            }
        }
    }

    player.x = Math.max(0, Math.min(player.x, WIDTH - player.width));
    if (player.y > HEIGHT + 50) {
        playerDeath();
        return;
    }

    if (player.invincible > 0) player.invincible -= dt;

    for (let hi = 0; hi < hazards.length; hi++) {
        const haz = hazards[hi];
        if (player.x + player.width > haz.x && player.x < haz.x + haz.w &&
            player.y + player.height > haz.y && player.y < haz.y + haz.h) {
            if (player.invincible <= 0) {
                damagePlayer();
                if (player.health <= 0) return;
            }
        }
    }

    for (let ei = 0; ei < enemies.length; ei++) {
        const enemy = enemies[ei];
        if (enemy.health <= 0) continue;
        enemy.animTimer += eDt;

        if (enemy.type === 'walker') {
            enemy.x += enemy.vx * eDt;
            if (enemy.patrol) {
                if (enemy.x < enemy.origX - enemy.patrol || enemy.x > enemy.origX + enemy.patrol) {
                    enemy.vx *= -1;
                }
            }
            for (let pi = 0; pi < platforms.length; pi++) {
                const plat = platforms[pi];
                if (enemy.x + 10 > plat.x && enemy.x + 10 < plat.x + plat.w &&
                    Math.abs(enemy.y + 28 - plat.y) < 10) {
                    if (enemy.x < plat.x + 5 || enemy.x + 20 > plat.x + plat.w - 5) {
                        enemy.vx *= -1;
                    }
                    break;
                }
            }
        }

        if (enemy.type === 'shooter') {
            enemy.shootTimer -= eDt;
            if (enemy.shootTimer <= 0) {
                enemy.shootTimer = 1.5 + Math.random() * 0.5;
                const dx = player.x + player.width / 2 - enemy.x - 12;
                const dy = player.y + player.height / 2 - enemy.y - 12;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 400) {
                    projectiles.push({
                        x: enemy.x + 12, y: enemy.y + 12,
                        vx: (dx / dist) * 220, vy: (dy / dist) * 220,
                        hostile: true, life: 3
                    });
                    SFX.shoot();
                    spawnParticles(enemy.x + 12, enemy.y + 12, '#ff00ff', 5, 50, 0.2, 3);
                }
            }
        }

        if (player.x + player.width > enemy.x && player.x < enemy.x + 24 &&
            player.y + player.height > enemy.y && player.y < enemy.y + 28) {
            if (player.vy > 50 && player.y + player.height < enemy.y + 18) {
                enemy.health = 0;
                player.vy = -350;
                totalScore += 150;
                SFX.stomp();
                spawnParticles(enemy.x + 12, enemy.y + 14, currentLevelData.enemyColor, 20, 150, 0.6, 5);
                screenShake = 0.15;
            } else if (player.invincible <= 0) {
                damagePlayer();
                player.vx = player.x < enemy.x ? -250 : 250;
                player.vy = -200;
                if (player.health <= 0) return;
            }
        }
    }

    if (boss && !bossDefeated) {
        updateBoss(eDt);
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx * eDt;
        p.y += p.vy * eDt;
        p.life -= eDt;
        if (p.life <= 0 || p.x < -20 || p.x > WIDTH + 20 || p.y < -20 || p.y > HEIGHT + 20) {
            projectiles.splice(i, 1);
            continue;
        }
        if (Math.random() < 0.5) {
            spawnTrail(p.x, p.y, p.hostile ? '#ff44ff' : '#44ff44');
        }
        if (p.hostile && player.invincible <= 0 &&
            player.x + player.width > p.x - 6 && player.x < p.x + 6 &&
            player.y + player.height > p.y - 6 && player.y < p.y + 6) {
            damagePlayer();
            spawnParticles(p.x, p.y, '#ff0044', 10, 100, 0.4, 4);
            projectiles.splice(i, 1);
            if (player.health <= 0) return;
        }
    }

    for (let ci = 0; ci < collectibles.length; ci++) {
        const c = collectibles[ci];
        if (c.collected) continue;
        const cx = c.x + 10;
        const cy = c.y + 10 + Math.sin(gameTime * 3 + c.x) * 4;
        if (player.x + player.width > c.x && player.x < c.x + 20 &&
            player.y + player.height > cy - 10 && player.y < cy + 10) {
            c.collected = true;
            collectedCount++;
            if (c.type === 'gem') {
                totalScore += 500;
                SFX.collect(); // Use existing SFX or add new one
                spawnParticles(cx, cy, '#ff00ff', 20, 150, 0.8, 6, 'star');
                // Maybe play a different pitch if supported or just standard collect
            } else if (c.type === 'battery') {
                totalScore += 50;
                timeEnergy = Math.min(MAX_TIME_ENERGY, timeEnergy + 50);
                SFX.powerUp();
                spawnParticles(cx, cy, '#00ffff', 15, 120, 0.6, 5, 'circle');
            } else {
                totalScore += 100;
                SFX.collect();
                spawnParticles(cx, cy, currentLevelData.accentColor, 15, 120, 0.6, 5, 'star');
            }
        }
    }

    const goal = currentLevelData.goal;
    if (!boss || bossDefeated) {
        if (player.x + player.width > goal.x && player.x < goal.x + goal.w &&
            player.y + player.height > goal.y && player.y < goal.y + goal.h) {
            levelComplete();
            return;
        }
    }

    Object.keys(keysPressed).forEach(function (k) { keysPressed[k] = false; });

    updateParticles(eDt);

    screenShake *= 0.9;
    screenFlash *= 0.9;
}

function damagePlayer() {
    player.health--;
    player.invincible = 1.5;
    screenShake = 0.3;
    screenFlash = 0.2;
    screenFlashColor = '#ff0000';
    SFX.hurt();
    spawnParticles(player.x + player.width / 2, player.y + player.height / 2, '#ff4444', 15, 120, 0.5, 4);
    if (player.health <= 0) {
        playerDeath();
    }
}

function updateBoss(dt) {
    if (!boss || bossDefeated) return;

    const gameTime = performance.now() / 1000;
    boss.x = 400 + Math.sin(gameTime * 1.5) * 150;
    boss.y = 80 + Math.sin(gameTime * 2) * 40;

    if (!boss.shootTimer) boss.shootTimer = 0;
    boss.shootTimer -= dt;

    if (boss.shootTimer <= 0) {
        const shootCount = boss.phase === 1 ? 3 : (boss.phase === 2 ? 5 : 8);
        boss.shootTimer = boss.phase === 1 ? 1.5 : (boss.phase === 2 ? 1.2 : 0.8);
        for (let i = 0; i < shootCount; i++) {
            const angle = (Math.PI * 2 / shootCount) * i + gameTime;
            projectiles.push({
                x: boss.x + 40, y: boss.y + 40,
                vx: Math.cos(angle) * 150,
                vy: Math.sin(angle) * 150,
                hostile: true, life: 4
            });
        }
        SFX.shoot();
    }

    if (player.vy > 50 && player.invincible <= 0 &&
        player.x + player.width > boss.x && player.x < boss.x + 80 &&
        player.y + player.height > boss.y && player.y < boss.y + 80 &&
        player.y + player.height < boss.y + 50) {
        boss.health--;
        player.vy = -400;
        player.invincible = 0.5;
        screenShake = 0.4;
        SFX.stomp();
        spawnParticles(boss.x + 40, boss.y + 40, '#ff00ff', 30, 200, 0.8, 6);
        if (boss.health <= 6 && boss.phase === 1) {
            boss.phase = 2;
            SFX.powerUp();
        } else if (boss.health <= 3 && boss.phase === 2) {
            boss.phase = 3;
            SFX.powerUp();
        }
        if (boss.health <= 0) {
            bossDefeated = true;
            totalScore += 1000;
            SFX.victory();
            spawnParticles(boss.x + 40, boss.y + 40, '#ffff00', 50, 250, 1.2, 8, 'star');
            screenFlash = 0.5;
            screenFlashColor = '#ffff00';
        }
    }

    if (player.invincible <= 0 &&
        player.x + player.width > boss.x + 10 && player.x < boss.x + 70 &&
        player.y + player.height > boss.y + 10 && player.y < boss.y + 70) {
        damagePlayer();
        player.vx = player.x < boss.x + 40 ? -300 : 300;
        player.vy = -250;
    }
}
