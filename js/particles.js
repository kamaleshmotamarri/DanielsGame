// ChronoQuest - Particle system
class Particle {
    constructor(x, y, vx, vy, color, life = 1, size = 3, type = 'square') {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy;
        this.color = color; this.life = life; this.maxLife = life;
        this.size = size; this.type = type; this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy += 400 * dt;
        this.life -= dt;
        this.rotation += this.rotationSpeed * dt;
        this.size *= 0.98;
    }

    draw() {
        const alpha = Math.pow(this.life / this.maxLife, 0.5);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;

        if (this.type === 'square') {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else if (this.type === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'star') {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
                const r = i % 2 === 0 ? this.size : this.size / 2;
                if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
                else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            ctx.fill();
        }

        ctx.restore();
    }
}

function spawnParticles(x, y, color, count = 10, speed = 150, life = 0.6, size = 4, type = 'square') {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = speed * (0.5 + Math.random() * 0.5);
        particles.push(new Particle(
            x + (Math.random() - 0.5) * 10,
            y + (Math.random() - 0.5) * 10,
            Math.cos(angle) * spd,
            Math.sin(angle) * spd - 50,
            color,
            life * (0.7 + Math.random() * 0.6),
            size * (0.5 + Math.random()),
            type
        ));
    }
}

function spawnTrail(x, y, color, vx = 0, vy = 0) {
    particles.push(new Particle(x, y, vx * 0.2, vy * 0.2, color, 0.3, 6, 'circle'));
}

function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(dt);
        if (particles[i].life <= 0) particles.splice(i, 1);
    }
}
