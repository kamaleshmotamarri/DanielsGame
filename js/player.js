// ChronoQuest - Player state and reset
const player = {
    x: 50, y: 300, vx: 0, vy: 0,
    width: 28, height: 36,
    onGround: false,
    wasOnGround: false,
    health: 3,
    maxHealth: 3,
    invincible: 0,
    facingRight: true,
    jumpCount: 0,
    maxJumps: 2,
    animFrame: 0,
    animTimer: 0,
    state: 'idle',
    coyoteTime: 0,
    jumpBuffer: 0,
};

function resetPlayer(spawnX, spawnY) {
    player.x = spawnX;
    player.y = spawnY;
    player.vx = 0;
    player.vy = 0;

    if (selectedCharacter) {
        player.maxHealth = selectedCharacter.maxHealth;
        player.speed = selectedCharacter.speed;
        player.jumpForce = selectedCharacter.jumpForce;
        player.color = selectedCharacter.color;
        player.headColor = selectedCharacter.headColor;
        player.accentColor = selectedCharacter.accentColor;
    } else {
        player.maxHealth = 3;
        player.speed = 1;
        player.jumpForce = 1;
    }

    if (gameMode === 'god') {
        player.maxHealth = 5;
        if (currentLevel === 0 || !player.health || player.health <= 0) {
            player.health = 5;
        } else {
            if (player.health > 5) player.health = 5;
        }
    } else {
        player.health = player.maxHealth;
    }

    player.invincible = 0;
    player.onGround = false;
    player.jumpCount = 0;
    player.state = 'idle';
}
