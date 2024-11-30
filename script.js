// Canvas and Simulation Setup
const myCanvas = document.getElementById('myCanvas');
myCanvas.width = 1000;
myCanvas.height = 500;
const margin = 30;
const n = 20;
const spacing = (myCanvas.width - margin * 2) / n;
const maxColumnHeight = 400;
const ctx = myCanvas.getContext("2d");

let array = [];
let moves = [];
let cols = [];
let moveIndex = 0;

// Initialize the simulation with random array
function init() {
    array = Array.from({ length: n }, () => Math.random());
    moves = [];
    cols = array.map((value, i) => {
        const x = i * spacing + spacing / 2 + margin;
        const y = myCanvas.height - margin - i * 3;
        const width = spacing - 4;
        const height = maxColumnHeight * value;
        return new Column(x, y, width, height);
    });
    animate();
}

// Bubble Sort Algorithm
function bubbleSort(arr) {
    const moves = [];
    const array = [...arr];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                moves.push({ indices: [j, j + 1], swap: true });
            } else {
                moves.push({ indices: [j, j + 1], swap: false });
            }
        }
    }
    return moves;
}

// Trigger sorting
function play() {
    moves = bubbleSort(array);
    moveIndex = 0;
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    let changed = false;
    for (let col of cols) {
        changed = col.draw(ctx) || changed;
    }

    if (!changed && moves.length > 0) {
        const move = moves[moveIndex];
        const [i, j] = move.indices;
        const waveformType = move.swap ? "square" : "sine";

        playNote(cols[i].height + cols[j].height, waveformType);

        if (move.swap) {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i], -1);
            [cols[i], cols[j]] = [cols[j], cols[i]];
        } else {
            cols[i].jump();
            cols[j].jump();
        }

        moveIndex++;
        if (moveIndex >= moves.length) {
            moveIndex = 0;
            moves = [];
        }
    }

    requestAnimationFrame(animate);
}

// Initialize the simulation
init();