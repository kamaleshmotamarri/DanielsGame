// ChronoQuest - World and level data
const chronosCoreLevels = [
    {
        name: "PREHISTORIC ERA",
        subtitle: "65 Million Years Ago",
        description: "Navigate the primordial landscape. Beware of ancient predators.",
        bgGradient: ['#1a0a2e', '#2d1b4e', '#1a2a1a'],
        platformColor: '#3d2817',
        platformHighlight: '#5a3d23',
        accentColor: '#00ff88',
        enemyColor: '#8b4513',
        platforms: [
            { x: 0, y: 480, w: 250, h: 70 },
            { x: 200, y: 400, w: 120, h: 25 },
            { x: 380, y: 340, w: 140, h: 25 },
            { x: 300, y: 250, w: 100, h: 25 },
            { x: 500, y: 280, w: 150, h: 25 },
            { x: 550, y: 180, w: 120, h: 25 },
            { x: 700, y: 250, w: 100, h: 25 },
            { x: 820, y: 200, w: 80, h: 25 },
            { x: 750, y: 400, w: 150, h: 150 },
        ],
        enemies: [
            { x: 400, y: 300, type: 'walker', patrol: 100 },
            { x: 530, y: 240, type: 'walker', patrol: 80 },
            { x: 600, y: 140, type: 'walker', patrol: 60 },
        ],
        collectibles: [
            { x: 250, y: 360, type: 'orb' },
            { x: 420, y: 300, type: 'orb' },
            { x: 350, y: 210, type: 'orb' },
            { x: 600, y: 140, type: 'orb' },
            { x: 730, y: 210, type: 'orb' },
            { x: 840, y: 160, type: 'orb' },
            { x: 100, y: 350, type: 'orb' },
        ],
        hazards: [
            { x: 250, y: 460, w: 50, h: 20, type: 'spikes' },
        ],
        goal: { x: 790, y: 330, w: 50, h: 70 },
        spawn: { x: 60, y: 400 },
        decorations: [
            { type: 'tree', x: 80, y: 480, scale: 1.2 },
            { type: 'rock', x: 450, y: 480, scale: 0.8 },
            { type: 'tree', x: 650, y: 480, scale: 1 },
            { type: 'tree', x: 20, y: 480, scale: 0.8 },
        ]
    },
    {
        name: "MEDIEVAL ERA",
        subtitle: "1247 AD",
        description: "Storm the ancient castle. Watch for archers on the ramparts.",
        bgGradient: ['#0f1a2e', '#1a2a4a', '#2a1a3a'],
        platformColor: '#4a4a5a',
        platformHighlight: '#6a6a7a',
        accentColor: '#ffaa00',
        enemyColor: '#5a2a2a',
        platforms: [
            { x: 0, y: 480, w: 180, h: 70 },
            { x: 220, y: 420, w: 100, h: 25 },
            { x: 150, y: 330, w: 120, h: 25 },
            { x: 320, y: 260, w: 100, h: 25 },
            { x: 200, y: 180, w: 80, h: 25 },
            { x: 400, y: 350, w: 100, h: 25 },
            { x: 520, y: 280, w: 80, h: 25 },
            { x: 450, y: 180, w: 100, h: 25 },
            { x: 620, y: 240, w: 80, h: 25 },
            { x: 700, y: 320, w: 80, h: 25 },
            { x: 780, y: 200, w: 120, h: 300 },
            { x: 600, y: 120, w: 80, h: 25, moving: true, moveY: 60, speed: 1.0 },
        ],
        enemies: [
            { x: 170, y: 290, type: 'walker', patrol: 80 },
            { x: 420, y: 310, type: 'walker', patrol: 60 },
            { x: 480, y: 140, type: 'shooter' },
            { x: 720, y: 280, type: 'walker', patrol: 40 },
            { x: 620, y: 200, type: 'shooter' },
        ],
        collectibles: [
            { x: 260, y: 380, type: 'orb' },
            { x: 180, y: 290, type: 'orb' },
            { x: 350, y: 220, type: 'orb' },
            { x: 230, y: 140, type: 'orb' },
            { x: 550, y: 240, type: 'orb' },
            { x: 650, y: 200, type: 'orb' },
            { x: 470, y: 140, type: 'orb' },
            { x: 620, y: 100, type: 'orb' },
        ],
        hazards: [
            { x: 350, y: 460, w: 50, h: 20, type: 'spikes' },
            { x: 550, y: 460, w: 70, h: 20, type: 'spikes' },
            { x: 730, y: 460, w: 40, h: 20, type: 'spikes' },
        ],
        goal: { x: 810, y: 130, w: 50, h: 70 },
        spawn: { x: 60, y: 400 },
        decorations: [
            { type: 'flag', x: 100, y: 480, scale: 1 },
            { type: 'torch', x: 400, y: 350, scale: 1 },
            { type: 'torch', x: 620, y: 240, scale: 1 },
        ]
    },
    {
        name: "INDUSTRIAL ERA",
        subtitle: "1889 AD",
        description: "Navigate the steam-powered factory. Mind the moving machinery.",
        bgGradient: ['#1a1a1a', '#2a2a2a', '#1a1a2a'],
        platformColor: '#5a5a5a',
        platformHighlight: '#7a7a7a',
        accentColor: '#ff6600',
        enemyColor: '#4a3a2a',
        platforms: [
            { x: 0, y: 480, w: 150, h: 70 },
            { x: 180, y: 400, w: 80, h: 25, moving: true, moveX: 80, speed: 1.2 },
            { x: 320, y: 340, w: 100, h: 25 },
            { x: 480, y: 400, w: 80, h: 25, moving: true, moveY: 80, speed: 1 },
            { x: 350, y: 240, w: 80, h: 25, moving: true, moveX: 100, speed: 0.8 },
            { x: 550, y: 280, w: 100, h: 25 },
            { x: 500, y: 180, w: 80, h: 25 },
            { x: 650, y: 320, w: 80, h: 25, moving: true, moveY: 100, speed: 1.5 },
            { x: 750, y: 220, w: 150, h: 280 },
            { x: 200, y: 100, w: 100, h: 25, moving: true, moveX: 50, speed: 2.0 },
        ],
        enemies: [
            { x: 350, y: 300, type: 'walker', patrol: 60 },
            { x: 580, y: 240, type: 'shooter' },
            { x: 520, y: 140, type: 'walker', patrol: 40 },
            { x: 760, y: 180, type: 'walker', patrol: 40 },
        ],
        collectibles: [
            { x: 220, y: 360, type: 'orb' },
            { x: 350, y: 300, type: 'orb' },
            { x: 510, y: 360, type: 'orb' },
            { x: 390, y: 200, type: 'orb' },
            { x: 530, y: 140, type: 'orb' },
            { x: 690, y: 280, type: 'orb' },
            { x: 220, y: 80, type: 'orb' },
        ],
        hazards: [
            { x: 150, y: 460, w: 30, h: 20, type: 'spikes' },
            { x: 420, y: 460, w: 60, h: 20, type: 'spikes' },
            { x: 620, y: 460, w: 80, h: 20, type: 'spikes' },
        ],
        goal: { x: 800, y: 150, w: 50, h: 70 },
        spawn: { x: 50, y: 400 },
        decorations: [
            { type: 'gear', x: 200, y: 480, scale: 1.5 },
            { type: 'gear', x: 500, y: 480, scale: 1.2 },
            { type: 'pipe', x: 700, y: 400, scale: 1 },
        ]
    },
    {
        name: "FUTURE ERA",
        subtitle: "2157 AD",
        description: "Return to the source of the catastrophe. Time itself is unstable here.",
        bgGradient: ['#0a0a1f', '#1a1a3f', '#0a1a2f'],
        platformColor: '#2a4a5a',
        platformHighlight: '#3a6a7a',
        accentColor: '#00ffff',
        enemyColor: '#3a2a4a',
        platforms: [
            { x: 0, y: 480, w: 120, h: 70 },
            { x: 150, y: 400, w: 80, h: 25, moving: true, moveX: 60, speed: 1.5 },
            { x: 280, y: 340, w: 100, h: 25 },
            { x: 180, y: 260, w: 80, h: 25, moving: true, moveX: 80, speed: 1.2 },
            { x: 350, y: 200, w: 80, h: 25 },
            { x: 440, y: 300, w: 80, h: 25, moving: true, moveY: 80, speed: 1 },
            { x: 540, y: 220, w: 100, h: 25 },
            { x: 450, y: 130, w: 80, h: 25, moving: true, moveX: 100, speed: 0.8 },
            { x: 650, y: 160, w: 80, h: 25, moving: true, moveY: 60, speed: 1.3 },
            { x: 750, y: 100, w: 150, h: 400 },
            { x: 100, y: 150, w: 60, h: 25, moving: true, moveY: 50, speed: 2.0 },
        ],
        enemies: [
            { x: 300, y: 300, type: 'walker', patrol: 60 },
            { x: 380, y: 160, type: 'shooter' },
            { x: 560, y: 180, type: 'walker', patrol: 60 },
            { x: 480, y: 90, type: 'shooter' },
            { x: 800, y: 60, type: 'walker', patrol: 40 },
        ],
        collectibles: [
            { x: 190, y: 360, type: 'orb' },
            { x: 310, y: 300, type: 'orb' },
            { x: 220, y: 220, type: 'orb' },
            { x: 380, y: 160, type: 'orb' },
            { x: 480, y: 260, type: 'orb' },
            { x: 570, y: 180, type: 'orb' },
            { x: 500, y: 90, type: 'orb' },
            { x: 690, y: 120, type: 'orb' },
            { x: 120, y: 130, type: 'orb' },
        ],
        hazards: [
            { x: 120, y: 460, w: 30, h: 20, type: 'spikes' },
            { x: 380, y: 460, w: 60, h: 20, type: 'spikes' },
            { x: 530, y: 460, w: 100, h: 20, type: 'spikes' },
            { x: 700, y: 460, w: 50, h: 20, type: 'spikes' },
        ],
        goal: { x: 790, y: 30, w: 50, h: 70 },
        spawn: { x: 40, y: 400 },
        decorations: [
            { type: 'hologram', x: 250, y: 340, scale: 1 },
            { type: 'hologram', x: 550, y: 220, scale: 1 },
        ],
        boss: false
    },
    {
        name: "NEON CITY",
        subtitle: "2205 AD",
        description: "A vertical metropolis powered by pure energy. Don't fall.",
        bgGradient: ['#000022', '#001133', '#002244'],
        platformColor: '#111111',
        platformHighlight: '#00ffff',
        accentColor: '#ff00ff',
        enemyColor: '#cc00ff',
        platforms: [
            { x: 0, y: 480, w: 200, h: 70 },
            { x: 250, y: 400, w: 100, h: 25 },
            { x: 400, y: 350, w: 100, h: 25, moving: true, moveY: 100, speed: 1.5 },
            { x: 550, y: 400, w: 100, h: 25 },
            { x: 700, y: 300, w: 100, h: 25 },
            { x: 550, y: 200, w: 100, h: 25, moving: true, moveX: 100, speed: 1.0 },
            { x: 350, y: 150, w: 120, h: 25 },
            { x: 100, y: 250, w: 100, h: 25, moving: true, moveX: 50, speed: 1.2 },
            { x: 800, y: 200, w: 100, h: 400 },
        ],
        enemies: [
            { x: 280, y: 360, type: 'shooter' },
            { x: 580, y: 360, type: 'walker', patrol: 40 },
            { x: 380, y: 110, type: 'shooter' },
            { x: 120, y: 210, type: 'walker', patrol: 30 },
        ],
        collectibles: [
            { x: 270, y: 360, type: 'orb' },
            { x: 420, y: 310, type: 'orb' },
            { x: 580, y: 360, type: 'orb' },
            { x: 720, y: 260, type: 'orb' },
            { x: 400, y: 110, type: 'orb' },
            { x: 130, y: 210, type: 'orb' },
        ],
        hazards: [
            { x: 0, y: 530, w: 900, h: 20, type: 'spikes' },
        ],
        goal: { x: 820, y: 130, w: 50, h: 70 },
        spawn: { x: 50, y: 400 },
        decorations: [
            { type: 'hologram', x: 200, y: 480, scale: 1 },
            { type: 'hologram', x: 700, y: 300, scale: 1 },
        ]
    },
    {
        name: "TEMPORAL NEXUS",
        subtitle: "Outside of Time",
        description: "The heart of the timeline. Defeat the Temporal Anomaly to restore order.",
        bgGradient: ['#1a0020', '#300040', '#100030'],
        platformColor: '#4a3060',
        platformHighlight: '#6a4080',
        accentColor: '#ff00ff',
        enemyColor: '#600080',
        platforms: [
            { x: 0, y: 480, w: 900, h: 70 },
            { x: 100, y: 380, w: 100, h: 25 },
            { x: 300, y: 320, w: 100, h: 25 },
            { x: 500, y: 320, w: 100, h: 25 },
            { x: 700, y: 380, w: 100, h: 25 },
            { x: 350, y: 220, w: 200, h: 25 },
            { x: 200, y: 150, w: 80, h: 25, moving: true, moveX: 60, speed: 1 },
            { x: 620, y: 150, w: 80, h: 25, moving: true, moveX: 60, speed: 1 },
        ],
        enemies: [
            { x: 130, y: 340, type: 'walker', patrol: 60 },
            { x: 530, y: 280, type: 'walker', patrol: 60 },
            { x: 730, y: 340, type: 'walker', patrol: 60 },
            { x: 200, y: 110, type: 'shooter' },
            { x: 700, y: 110, type: 'shooter' },
        ],
        collectibles: [
            { x: 140, y: 340, type: 'orb' },
            { x: 340, y: 280, type: 'gem' },
            { x: 540, y: 280, type: 'orb' },
            { x: 740, y: 340, type: 'battery' },
            { x: 240, y: 110, type: 'gem' },
            { x: 660, y: 110, type: 'gem' },
            { x: 440, y: 180, type: 'battery' },
        ],
        hazards: [],
        goal: { x: 425, y: 150, w: 50, h: 70 },
        spawn: { x: 50, y: 400 },
        decorations: [],
        boss: {
            x: 400,
            y: 100,
            health: 12,
            maxHealth: 12,
            phase: 1
        }
    }
];

const frostfrontLevels = [
    {
        name: 'ICEBOUND LANDING',
        subtitle: 'Aether Frost - Sector 01',
        description: 'Land on frozen shelves and power up the relay through drifting snow.',
        bgGradient: ['#031424', '#0a2f4e', '#0e3e63'],
        platformColor: '#b8d8f0',
        platformHighlight: '#f5fbff',
        accentColor: '#7ef9ff',
        enemyColor: '#3f6f8d',
        platforms: [
            { x: 0, y: 480, w: 190, h: 70 },
            { x: 210, y: 420, w: 110, h: 25 },
            { x: 360, y: 360, w: 130, h: 25 },
            { x: 540, y: 300, w: 120, h: 25 },
            { x: 710, y: 240, w: 110, h: 25 },
            { x: 820, y: 180, w: 80, h: 320 },
            { x: 320, y: 270, w: 90, h: 25, moving: true, moveX: 70, speed: 1.1 },
            { x: 120, y: 320, w: 80, h: 25, moving: true, moveY: 65, speed: 1.3 }
        ],
        enemies: [
            { x: 240, y: 380, type: 'walker', patrol: 70 },
            { x: 390, y: 320, type: 'shooter' },
            { x: 590, y: 260, type: 'walker', patrol: 50 },
            { x: 740, y: 200, type: 'walker', patrol: 40 }
        ],
        collectibles: [
            { x: 240, y: 380, type: 'orb' },
            { x: 390, y: 320, type: 'gem' },
            { x: 580, y: 260, type: 'orb' },
            { x: 750, y: 200, type: 'orb' },
            { x: 340, y: 230, type: 'battery' },
            { x: 145, y: 280, type: 'orb' }
        ],
        hazards: [
            { x: 190, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 480, y: 460, w: 50, h: 20, type: 'spikes' }
        ],
        goal: { x: 835, y: 110, w: 45, h: 70 },
        spawn: { x: 50, y: 400 },
        decorations: []
    },
    {
        name: 'AURORA PASS',
        subtitle: 'Aether Frost - Sector 02',
        description: 'Chase the light ribbons through suspended ice bridges.',
        bgGradient: ['#07112b', '#123a58', '#274f6d'],
        platformColor: '#a8cde6',
        platformHighlight: '#ffffff',
        accentColor: '#99f0ff',
        enemyColor: '#456f95',
        platforms: [
            { x: 0, y: 480, w: 140, h: 70 },
            { x: 180, y: 420, w: 90, h: 25, moving: true, moveX: 80, speed: 1.0 },
            { x: 330, y: 360, w: 110, h: 25 },
            { x: 500, y: 300, w: 90, h: 25, moving: true, moveY: 70, speed: 1.2 },
            { x: 640, y: 250, w: 110, h: 25 },
            { x: 760, y: 170, w: 140, h: 330 },
            { x: 420, y: 210, w: 80, h: 25, moving: true, moveX: 110, speed: 0.9 },
            { x: 230, y: 260, w: 70, h: 25 }
        ],
        enemies: [
            { x: 350, y: 320, type: 'walker', patrol: 45 },
            { x: 520, y: 260, type: 'shooter' },
            { x: 670, y: 210, type: 'walker', patrol: 55 },
            { x: 435, y: 170, type: 'walker', patrol: 60 }
        ],
        collectibles: [
            { x: 200, y: 380, type: 'orb' },
            { x: 365, y: 320, type: 'orb' },
            { x: 540, y: 260, type: 'gem' },
            { x: 675, y: 210, type: 'orb' },
            { x: 445, y: 170, type: 'battery' },
            { x: 790, y: 130, type: 'gem' }
        ],
        hazards: [
            { x: 140, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 300, y: 460, w: 80, h: 20, type: 'spikes' },
            { x: 600, y: 460, w: 40, h: 20, type: 'spikes' }
        ],
        goal: { x: 820, y: 100, w: 50, h: 70 },
        spawn: { x: 40, y: 400 },
        decorations: []
    },
    {
        name: 'CRYO REACTOR',
        subtitle: 'Aether Frost - Sector 03',
        description: 'Synchronize frozen turbines and avoid pressure vents.',
        bgGradient: ['#04172a', '#0c2a40', '#1d4358'],
        platformColor: '#88b4d1',
        platformHighlight: '#d9f5ff',
        accentColor: '#5de6ff',
        enemyColor: '#2e5979',
        platforms: [
            { x: 0, y: 480, w: 170, h: 70 },
            { x: 200, y: 420, w: 100, h: 25 },
            { x: 340, y: 360, w: 100, h: 25, moving: true, moveY: 90, speed: 1.1 },
            { x: 500, y: 310, w: 120, h: 25 },
            { x: 660, y: 260, w: 90, h: 25, moving: true, moveX: 70, speed: 1.3 },
            { x: 780, y: 210, w: 120, h: 290 },
            { x: 390, y: 230, w: 80, h: 25 },
            { x: 530, y: 170, w: 80, h: 25 }
        ],
        enemies: [
            { x: 220, y: 380, type: 'walker', patrol: 70 },
            { x: 390, y: 320, type: 'shooter' },
            { x: 530, y: 270, type: 'walker', patrol: 60 },
            { x: 675, y: 220, type: 'shooter' },
            { x: 540, y: 130, type: 'walker', patrol: 35 }
        ],
        collectibles: [
            { x: 225, y: 380, type: 'orb' },
            { x: 360, y: 320, type: 'battery' },
            { x: 540, y: 270, type: 'gem' },
            { x: 690, y: 220, type: 'orb' },
            { x: 545, y: 130, type: 'orb' },
            { x: 810, y: 170, type: 'gem' },
            { x: 405, y: 190, type: 'orb' }
        ],
        hazards: [
            { x: 170, y: 460, w: 30, h: 20, type: 'spikes' },
            { x: 460, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 750, y: 460, w: 30, h: 20, type: 'spikes' }
        ],
        goal: { x: 820, y: 140, w: 50, h: 70 },
        spawn: { x: 55, y: 400 },
        decorations: []
    },
    {
        name: 'GLACIER CHASM',
        subtitle: 'Aether Frost - Sector 04',
        description: 'Cross brittle shelves and narrow moving ice plates.',
        bgGradient: ['#051124', '#11304e', '#17456a'],
        platformColor: '#9fc8df',
        platformHighlight: '#e8fbff',
        accentColor: '#6be8ff',
        enemyColor: '#4f7591',
        platforms: [
            { x: 0, y: 480, w: 110, h: 70 },
            { x: 145, y: 420, w: 90, h: 25, moving: true, moveY: 70, speed: 1.5 },
            { x: 300, y: 360, w: 100, h: 25 },
            { x: 450, y: 300, w: 90, h: 25, moving: true, moveX: 90, speed: 1.1 },
            { x: 620, y: 240, w: 95, h: 25 },
            { x: 760, y: 180, w: 140, h: 320 },
            { x: 510, y: 160, w: 80, h: 25, moving: true, moveY: 60, speed: 1.4 }
        ],
        enemies: [
            { x: 320, y: 320, type: 'walker', patrol: 50 },
            { x: 470, y: 260, type: 'shooter' },
            { x: 635, y: 200, type: 'walker', patrol: 45 },
            { x: 525, y: 120, type: 'shooter' }
        ],
        collectibles: [
            { x: 170, y: 380, type: 'orb' },
            { x: 320, y: 320, type: 'orb' },
            { x: 485, y: 260, type: 'gem' },
            { x: 640, y: 200, type: 'battery' },
            { x: 530, y: 120, type: 'orb' },
            { x: 805, y: 140, type: 'gem' }
        ],
        hazards: [
            { x: 110, y: 460, w: 35, h: 20, type: 'spikes' },
            { x: 235, y: 460, w: 65, h: 20, type: 'spikes' },
            { x: 540, y: 460, w: 80, h: 20, type: 'spikes' }
        ],
        goal: { x: 820, y: 110, w: 45, h: 70 },
        spawn: { x: 30, y: 400 },
        decorations: []
    },
    {
        name: 'WHITEOUT ASCENT',
        subtitle: 'Aether Frost - Sector 05',
        description: 'Vertical climb through storm turbulence and frozen drones.',
        bgGradient: ['#0b1f36', '#234d6b', '#3a6784'],
        platformColor: '#90b4ce',
        platformHighlight: '#f6ffff',
        accentColor: '#8befff',
        enemyColor: '#416a86',
        platforms: [
            { x: 0, y: 480, w: 160, h: 70 },
            { x: 200, y: 420, w: 90, h: 25 },
            { x: 130, y: 340, w: 90, h: 25, moving: true, moveX: 80, speed: 1.1 },
            { x: 300, y: 280, w: 95, h: 25 },
            { x: 470, y: 230, w: 90, h: 25, moving: true, moveY: 85, speed: 1.0 },
            { x: 620, y: 180, w: 90, h: 25 },
            { x: 760, y: 120, w: 140, h: 380 },
            { x: 560, y: 100, w: 80, h: 25, moving: true, moveX: 100, speed: 0.8 }
        ],
        enemies: [
            { x: 215, y: 380, type: 'walker', patrol: 55 },
            { x: 320, y: 240, type: 'shooter' },
            { x: 490, y: 190, type: 'walker', patrol: 45 },
            { x: 640, y: 140, type: 'shooter' },
            { x: 585, y: 60, type: 'walker', patrol: 50 }
        ],
        collectibles: [
            { x: 220, y: 380, type: 'orb' },
            { x: 160, y: 300, type: 'orb' },
            { x: 330, y: 240, type: 'gem' },
            { x: 500, y: 190, type: 'battery' },
            { x: 645, y: 140, type: 'orb' },
            { x: 590, y: 60, type: 'gem' },
            { x: 805, y: 80, type: 'orb' }
        ],
        hazards: [
            { x: 160, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 395, y: 460, w: 75, h: 20, type: 'spikes' },
            { x: 710, y: 460, w: 45, h: 20, type: 'spikes' }
        ],
        goal: { x: 825, y: 55, w: 50, h: 70 },
        spawn: { x: 55, y: 400 },
        decorations: []
    },
    {
        name: 'CRYSTAL CITADEL',
        subtitle: 'Aether Frost - Sector 06',
        description: 'A precision finale inside a luminous ice fortress.',
        bgGradient: ['#031427', '#17395d', '#2a5a7e'],
        platformColor: '#9abfd8',
        platformHighlight: '#ffffff',
        accentColor: '#b6f5ff',
        enemyColor: '#3d6384',
        platforms: [
            { x: 0, y: 480, w: 130, h: 70 },
            { x: 170, y: 420, w: 90, h: 25, moving: true, moveY: 60, speed: 1.3 },
            { x: 310, y: 360, w: 90, h: 25 },
            { x: 450, y: 300, w: 90, h: 25, moving: true, moveX: 95, speed: 1.1 },
            { x: 610, y: 250, w: 90, h: 25 },
            { x: 730, y: 200, w: 80, h: 25, moving: true, moveY: 80, speed: 1.2 },
            { x: 810, y: 120, w: 90, h: 380 },
            { x: 560, y: 150, w: 70, h: 25 },
            { x: 390, y: 180, w: 70, h: 25 }
        ],
        enemies: [
            { x: 185, y: 380, type: 'walker', patrol: 45 },
            { x: 330, y: 320, type: 'shooter' },
            { x: 470, y: 260, type: 'walker', patrol: 55 },
            { x: 630, y: 210, type: 'shooter' },
            { x: 570, y: 110, type: 'walker', patrol: 35 },
            { x: 740, y: 160, type: 'walker', patrol: 35 }
        ],
        collectibles: [
            { x: 190, y: 380, type: 'orb' },
            { x: 330, y: 320, type: 'gem' },
            { x: 480, y: 260, type: 'battery' },
            { x: 640, y: 210, type: 'orb' },
            { x: 575, y: 110, type: 'gem' },
            { x: 745, y: 160, type: 'orb' },
            { x: 835, y: 80, type: 'gem' },
            { x: 410, y: 140, type: 'battery' }
        ],
        hazards: [
            { x: 130, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 260, y: 460, w: 50, h: 20, type: 'spikes' },
            { x: 540, y: 460, w: 70, h: 20, type: 'spikes' },
            { x: 700, y: 460, w: 40, h: 20, type: 'spikes' }
        ],
        goal: { x: 830, y: 45, w: 50, h: 70 },
        spawn: { x: 45, y: 400 },
        decorations: []
    }
];

const emberforgeLevels = [
    {
        name: 'CINDER GATE',
        subtitle: 'Inferno Forge - Ring 01',
        description: 'Cross unstable basalt while the furnace wakes.',
        bgGradient: ['#1d0505', '#3a0f08', '#5a1f10'],
        platformColor: '#47251c',
        platformHighlight: '#b65a2d',
        accentColor: '#ff7a1a',
        enemyColor: '#8b2a1d',
        platforms: [
            { x: 0, y: 480, w: 200, h: 70 },
            { x: 230, y: 410, w: 110, h: 25 },
            { x: 390, y: 350, w: 120, h: 25 },
            { x: 550, y: 290, w: 100, h: 25 },
            { x: 690, y: 240, w: 100, h: 25 },
            { x: 810, y: 180, w: 90, h: 320 },
            { x: 300, y: 260, w: 90, h: 25, moving: true, moveX: 80, speed: 1.0 }
        ],
        enemies: [
            { x: 250, y: 370, type: 'walker', patrol: 60 },
            { x: 420, y: 310, type: 'shooter' },
            { x: 570, y: 250, type: 'walker', patrol: 45 },
            { x: 710, y: 200, type: 'walker', patrol: 40 }
        ],
        collectibles: [
            { x: 260, y: 370, type: 'orb' },
            { x: 430, y: 310, type: 'gem' },
            { x: 580, y: 250, type: 'orb' },
            { x: 725, y: 200, type: 'orb' },
            { x: 330, y: 220, type: 'battery' },
            { x: 835, y: 140, type: 'gem' }
        ],
        hazards: [
            { x: 200, y: 460, w: 30, h: 20, type: 'spikes' },
            { x: 510, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 650, y: 460, w: 40, h: 20, type: 'spikes' }
        ],
        goal: { x: 835, y: 110, w: 45, h: 70 },
        spawn: { x: 55, y: 400 },
        decorations: []
    },
    {
        name: 'MAGMA LIFTS',
        subtitle: 'Inferno Forge - Ring 02',
        description: 'Ride piston towers over open lava channels.',
        bgGradient: ['#220808', '#49160c', '#6b2a14'],
        platformColor: '#3a221c',
        platformHighlight: '#d06a33',
        accentColor: '#ff9944',
        enemyColor: '#7f2e20',
        platforms: [
            { x: 0, y: 480, w: 130, h: 70 },
            { x: 170, y: 420, w: 90, h: 25, moving: true, moveY: 90, speed: 1.2 },
            { x: 320, y: 360, w: 100, h: 25 },
            { x: 470, y: 300, w: 90, h: 25, moving: true, moveY: 100, speed: 1.0 },
            { x: 620, y: 260, w: 90, h: 25 },
            { x: 760, y: 200, w: 140, h: 300 },
            { x: 540, y: 180, w: 80, h: 25, moving: true, moveX: 80, speed: 0.9 }
        ],
        enemies: [
            { x: 330, y: 320, type: 'walker', patrol: 45 },
            { x: 490, y: 260, type: 'shooter' },
            { x: 635, y: 220, type: 'walker', patrol: 50 },
            { x: 560, y: 140, type: 'shooter' }
        ],
        collectibles: [
            { x: 190, y: 380, type: 'orb' },
            { x: 340, y: 320, type: 'battery' },
            { x: 500, y: 260, type: 'gem' },
            { x: 645, y: 220, type: 'orb' },
            { x: 570, y: 140, type: 'orb' },
            { x: 810, y: 160, type: 'gem' }
        ],
        hazards: [
            { x: 130, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 260, y: 460, w: 60, h: 20, type: 'spikes' },
            { x: 560, y: 460, w: 60, h: 20, type: 'spikes' },
            { x: 710, y: 460, w: 50, h: 20, type: 'spikes' }
        ],
        goal: { x: 820, y: 130, w: 50, h: 70 },
        spawn: { x: 40, y: 400 },
        decorations: []
    },
    {
        name: 'SMELTER BELT',
        subtitle: 'Inferno Forge - Ring 03',
        description: 'Fast conveyors of heat and hostile turrets.',
        bgGradient: ['#1b0808', '#3f140b', '#5d2814'],
        platformColor: '#40251d',
        platformHighlight: '#c56c3a',
        accentColor: '#ff8f3a',
        enemyColor: '#6f2417',
        platforms: [
            { x: 0, y: 480, w: 170, h: 70 },
            { x: 210, y: 410, w: 100, h: 25, moving: true, moveX: 100, speed: 1.4 },
            { x: 360, y: 340, w: 100, h: 25 },
            { x: 500, y: 280, w: 100, h: 25 },
            { x: 640, y: 220, w: 100, h: 25, moving: true, moveY: 80, speed: 1.1 },
            { x: 770, y: 150, w: 130, h: 350 },
            { x: 420, y: 200, w: 70, h: 25, moving: true, moveX: 80, speed: 1.0 }
        ],
        enemies: [
            { x: 230, y: 370, type: 'walker', patrol: 70 },
            { x: 380, y: 300, type: 'shooter' },
            { x: 525, y: 240, type: 'walker', patrol: 55 },
            { x: 660, y: 180, type: 'shooter' },
            { x: 430, y: 160, type: 'walker', patrol: 35 }
        ],
        collectibles: [
            { x: 240, y: 370, type: 'orb' },
            { x: 390, y: 300, type: 'gem' },
            { x: 535, y: 240, type: 'orb' },
            { x: 670, y: 180, type: 'battery' },
            { x: 440, y: 160, type: 'orb' },
            { x: 805, y: 110, type: 'gem' },
            { x: 455, y: 160, type: 'orb' }
        ],
        hazards: [
            { x: 170, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 310, y: 460, w: 50, h: 20, type: 'spikes' },
            { x: 600, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 740, y: 460, w: 30, h: 20, type: 'spikes' }
        ],
        goal: { x: 820, y: 90, w: 50, h: 70 },
        spawn: { x: 60, y: 400 },
        decorations: []
    },
    {
        name: 'OBSIDIAN RUN',
        subtitle: 'Inferno Forge - Ring 04',
        description: 'Tight platforming over razor-sharp black glass.',
        bgGradient: ['#170808', '#33100a', '#501f10'],
        platformColor: '#2f2020',
        platformHighlight: '#e07a3f',
        accentColor: '#ffb063',
        enemyColor: '#7a2b21',
        platforms: [
            { x: 0, y: 480, w: 110, h: 70 },
            { x: 145, y: 420, w: 90, h: 25 },
            { x: 280, y: 360, w: 80, h: 25, moving: true, moveY: 75, speed: 1.4 },
            { x: 420, y: 300, w: 90, h: 25 },
            { x: 560, y: 250, w: 90, h: 25, moving: true, moveX: 90, speed: 1.1 },
            { x: 700, y: 200, w: 90, h: 25 },
            { x: 820, y: 130, w: 80, h: 370 },
            { x: 470, y: 170, w: 70, h: 25 }
        ],
        enemies: [
            { x: 160, y: 380, type: 'walker', patrol: 40 },
            { x: 300, y: 320, type: 'shooter' },
            { x: 430, y: 260, type: 'walker', patrol: 40 },
            { x: 585, y: 210, type: 'shooter' },
            { x: 710, y: 160, type: 'walker', patrol: 40 }
        ],
        collectibles: [
            { x: 165, y: 380, type: 'orb' },
            { x: 310, y: 320, type: 'gem' },
            { x: 440, y: 260, type: 'orb' },
            { x: 595, y: 210, type: 'battery' },
            { x: 720, y: 160, type: 'orb' },
            { x: 835, y: 90, type: 'gem' },
            { x: 485, y: 130, type: 'orb' }
        ],
        hazards: [
            { x: 110, y: 460, w: 35, h: 20, type: 'spikes' },
            { x: 235, y: 460, w: 45, h: 20, type: 'spikes' },
            { x: 510, y: 460, w: 50, h: 20, type: 'spikes' },
            { x: 650, y: 460, w: 50, h: 20, type: 'spikes' }
        ],
        goal: { x: 830, y: 70, w: 45, h: 70 },
        spawn: { x: 30, y: 400 },
        decorations: []
    },
    {
        name: 'CRUCIBLE TOWER',
        subtitle: 'Inferno Forge - Ring 05',
        description: 'Scale pressure vents and collapsing catwalks.',
        bgGradient: ['#1f0907', '#48160d', '#6a2912'],
        platformColor: '#38211c',
        platformHighlight: '#da7b40',
        accentColor: '#ff9d52',
        enemyColor: '#6e271e',
        platforms: [
            { x: 0, y: 480, w: 150, h: 70 },
            { x: 190, y: 420, w: 90, h: 25, moving: true, moveY: 70, speed: 1.2 },
            { x: 140, y: 340, w: 90, h: 25 },
            { x: 320, y: 280, w: 90, h: 25 },
            { x: 470, y: 230, w: 90, h: 25, moving: true, moveX: 100, speed: 1.0 },
            { x: 630, y: 170, w: 90, h: 25 },
            { x: 780, y: 110, w: 120, h: 390 },
            { x: 570, y: 100, w: 80, h: 25, moving: true, moveY: 70, speed: 1.3 }
        ],
        enemies: [
            { x: 210, y: 380, type: 'walker', patrol: 50 },
            { x: 160, y: 300, type: 'shooter' },
            { x: 340, y: 240, type: 'walker', patrol: 35 },
            { x: 490, y: 190, type: 'shooter' },
            { x: 650, y: 130, type: 'walker', patrol: 50 },
            { x: 580, y: 60, type: 'walker', patrol: 45 }
        ],
        collectibles: [
            { x: 220, y: 380, type: 'orb' },
            { x: 170, y: 300, type: 'gem' },
            { x: 350, y: 240, type: 'orb' },
            { x: 500, y: 190, type: 'battery' },
            { x: 660, y: 130, type: 'orb' },
            { x: 590, y: 60, type: 'gem' },
            { x: 815, y: 80, type: 'orb' }
        ],
        hazards: [
            { x: 150, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 280, y: 460, w: 40, h: 20, type: 'spikes' },
            { x: 560, y: 460, w: 70, h: 20, type: 'spikes' },
            { x: 720, y: 460, w: 60, h: 20, type: 'spikes' }
        ],
        goal: { x: 825, y: 45, w: 50, h: 70 },
        spawn: { x: 45, y: 400 },
        decorations: []
    },
    {
        name: 'ECLIPSE CRATER',
        subtitle: 'Inferno Forge - Ring 06',
        description: 'Final incursion. Break the anomaly core to stabilize the forge.',
        bgGradient: ['#220808', '#4d130d', '#7b260f'],
        platformColor: '#3b211d',
        platformHighlight: '#f18645',
        accentColor: '#ffb86d',
        enemyColor: '#7a2a1f',
        platforms: [
            { x: 0, y: 480, w: 900, h: 70 },
            { x: 90, y: 380, w: 100, h: 25 },
            { x: 260, y: 320, w: 100, h: 25 },
            { x: 430, y: 320, w: 100, h: 25 },
            { x: 610, y: 380, w: 100, h: 25 },
            { x: 360, y: 220, w: 180, h: 25 },
            { x: 190, y: 150, w: 90, h: 25, moving: true, moveX: 70, speed: 1.1 },
            { x: 630, y: 150, w: 90, h: 25, moving: true, moveX: 70, speed: 1.1 }
        ],
        enemies: [
            { x: 120, y: 340, type: 'walker', patrol: 60 },
            { x: 290, y: 280, type: 'walker', patrol: 60 },
            { x: 460, y: 280, type: 'walker', patrol: 60 },
            { x: 640, y: 340, type: 'walker', patrol: 60 },
            { x: 215, y: 110, type: 'shooter' },
            { x: 670, y: 110, type: 'shooter' }
        ],
        collectibles: [
            { x: 130, y: 340, type: 'orb' },
            { x: 300, y: 280, type: 'gem' },
            { x: 470, y: 280, type: 'orb' },
            { x: 650, y: 340, type: 'battery' },
            { x: 230, y: 110, type: 'gem' },
            { x: 650, y: 110, type: 'gem' },
            { x: 445, y: 180, type: 'battery' }
        ],
        hazards: [],
        goal: { x: 425, y: 150, w: 50, h: 70 },
        spawn: { x: 50, y: 400 },
        decorations: [],
        boss: {
            x: 400,
            y: 100,
            health: 14,
            maxHealth: 14,
            phase: 1
        }
    }
];

const gameWorlds = [
    {
        id: 'chronos-core',
        name: 'CHRONOS CORE',
        tagline: 'Original Campaign',
        description: 'Play every existing level from Prehistoric Era to Temporal Nexus.',
        uiTheme: 'theme-core',
        cardAccent: '#00ffff',
        levels: chronosCoreLevels
    },
    {
        id: 'aether-frost',
        name: 'AETHER FROST',
        tagline: 'Cryo Frontier',
        description: 'Six brand-new glacial levels with bright ice visuals and precision routes.',
        uiTheme: 'theme-frost',
        cardAccent: '#9cf2ff',
        levels: frostfrontLevels
    },
    {
        id: 'inferno-forge',
        name: 'INFERNO FORGE',
        tagline: 'Volcanic Siege',
        description: 'Six brand-new lava levels with aggressive pacing and heat-heavy hazards.',
        uiTheme: 'theme-forge',
        cardAccent: '#ff9f5a',
        levels: emberforgeLevels
    }
];

function applyWorldTheme(themeClass) {
    const themeClasses = ['theme-core', 'theme-frost', 'theme-forge'];
    if (!document.body) return;
    themeClasses.forEach(function (cls) { document.body.classList.remove(cls); });
    document.body.classList.add(themeClass || 'theme-core');
}

function setActiveWorld(worldId) {
    const found = gameWorlds.find(function (world) { return world.id === worldId; }) || gameWorlds[0];
    activeWorld = found;
    selectedWorldId = found.id;
    levels = found.levels;
    applyWorldTheme(found.uiTheme);
    return found;
}

function getActiveWorld() {
    return activeWorld || gameWorlds[0];
}

setActiveWorld(selectedWorldId);
