// ChronoQuest - Audio system
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(freq, duration, type = 'square', volume = 0.08, delay = 0) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
}

const SFX = {
    jump: () => { playTone(280, 0.1, 'square'); playTone(350, 0.1, 'square', 0.06, 0.05); },
    doubleJump: () => { playTone(400, 0.08, 'square'); playTone(500, 0.08, 'square', 0.06, 0.04); playTone(600, 0.08, 'square', 0.04, 0.08); },
    land: () => playTone(100, 0.05, 'triangle', 0.03),
    collect: () => { playTone(600, 0.08); playTone(800, 0.08, 'square', 0.06, 0.06); playTone(1000, 0.12, 'square', 0.04, 0.12); },
    hurt: () => { playTone(150, 0.2, 'sawtooth', 0.12); playTone(100, 0.2, 'sawtooth', 0.08, 0.1); },
    death: () => { playTone(200, 0.3, 'sawtooth', 0.1); playTone(150, 0.3, 'sawtooth', 0.08, 0.15); playTone(100, 0.4, 'sawtooth', 0.06, 0.3); },
    timeSlow: () => playTone(80, 0.15, 'sine', 0.06),
    timeResume: () => playTone(120, 0.1, 'sine', 0.04),
    rewind: () => { playTone(200, 0.06, 'sine', 0.05); playTone(180, 0.06, 'sine', 0.04, 0.03); },
    stomp: () => { playTone(300, 0.1, 'square'); playTone(200, 0.15, 'square', 0.08, 0.05); },
    portal: () => { [400, 500, 600, 700, 800].forEach((f, i) => playTone(f, 0.15, 'sine', 0.05, i * 0.08)); },
    levelComplete: () => { [523, 659, 784, 1047].forEach((f, i) => playTone(f, 0.25, 'square', 0.06, i * 0.12)); },
    victory: () => {
        [523, 659, 784, 659, 784, 1047].forEach((f, i) => playTone(f, 0.2, 'square', 0.07, i * 0.15));
        [262, 330, 392, 523].forEach((f, i) => playTone(f, 0.4, 'triangle', 0.04, i * 0.15));
    },
    click: () => playTone(800, 0.05, 'square', 0.03),
    powerUp: () => { playTone(400, 0.1, 'sine'); playTone(600, 0.1, 'sine', 0.06, 0.08); playTone(800, 0.15, 'sine', 0.05, 0.16); },
    shoot: () => playTone(180, 0.08, 'sawtooth', 0.04),
};
