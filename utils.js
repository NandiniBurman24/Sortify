// Lerp function for smooth interpolation
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Audio note playing function
function playNote(freq, type = 'sine') {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}