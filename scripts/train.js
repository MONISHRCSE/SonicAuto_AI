import fs from 'fs';
import path from 'path';
import WavDecoder from 'wav-decoder';

const DATASET_DIR = './datasets/ai-mechanic-export/training';
const OUTPUT_FILE = './src/data/brain.json';
const FFT_SIZE = 512;

const profiles = {};
const classSums = {};
const classCounts = {};

// Helper: Hanning Window
function applyWindow(buffer) {
    const n = buffer.length;
    const output = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        output[i] = buffer[i] * (0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1))));
    }
    return output;
}

// Helper: Simple Magnitude Spectrum (Real-only FFT approx)
function simpleFFT(input) {
    const N = input.length;
    const output = new Float32Array(N / 2);
    // Optimized DFT for Node.js (still slow for large files, but run once)
    // Actually, for Node, we can just use a library or stick to the slow one since it's offline.
    // Let's stick to the slow one to match frontend logic exactly.
    for (let k = 0; k < N / 2; k++) {
        let real = 0;
        let imag = 0;
        for (let n = 0; n < N; n++) {
            const angle = -2 * Math.PI * k * n / N;
            real += input[n] * Math.cos(angle);
            imag += input[n] * Math.sin(angle);
        }
        output[k] = Math.sqrt(real * real + imag * imag);
    }
    return output;
}

async function processFile(filePath) {
    const buffer = fs.readFileSync(filePath);
    const decoded = await WavDecoder.decode(buffer);
    const channelData = decoded.channelData[0]; // Mono

    // Classification Logic (Label Extraction)
    const name = path.basename(filePath).toLowerCase();
    let label = "Unknown";
    if (name.includes("air leak")) label = "Air Leak";
    else if (name.includes("idling")) label = "Idling";
    else if (name.includes("oil cap")) label = "Oil Cap Issue";
    else if (name.includes("background")) label = "Background Noise";
    else if (name.includes("normal")) label = "Normal Engine";
    else if (name.includes("knock")) label = "Rod Knock";

    if (!classSums[label]) {
        classSums[label] = new Float32Array(FFT_SIZE / 2).fill(0);
        classCounts[label] = 0;
    }

    // Feature Extraction (Welch's Method Lite)
    const winSize = FFT_SIZE;
    const hopSize = Math.floor(winSize / 2);
    let windows = 0;
    const fileSpectrum = new Float32Array(FFT_SIZE / 2).fill(0);

    // Limit processing to first 30 seconds to speed up training
    const maxSamples = Math.min(channelData.length, 44100 * 30);

    for (let i = 0; i < maxSamples - winSize; i += hopSize) {
        const window = channelData.slice(i, i + winSize);
        const winAndHanning = applyWindow(window);
        const fft = simpleFFT(winAndHanning);

        for (let j = 0; j < fft.length; j++) {
            fileSpectrum[j] += fft[j];
        }
        windows++;
    }

    if (windows > 0) {
        for (let j = 0; j < fileSpectrum.length; j++) {
            fileSpectrum[j] /= windows;
            classSums[label][j] += fileSpectrum[j];
        }
        classCounts[label]++;
        console.log(`Processed ${path.basename(filePath)} -> ${label}`);
    }
}

async function train() {
    console.log("Reading dataset...");
    const files = fs.readdirSync(DATASET_DIR).filter(f => f.endsWith('.wav'));

    for (const file of files) {
        await processFile(path.join(DATASET_DIR, file));
    }

    // Compute Centroids
    for (const label in classSums) {
        const count = classCounts[label];
        if (count > 0) {
            profiles[label] = Array.from(classSums[label].map(v => v / count)); // Convert to Array for JSON
        }
    }

    // Ensure directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
        profiles,
        counts: classCounts,
        trainedAt: new Date().toISOString()
    }, null, 2));

    console.log(`Training Complete! Saved to ${OUTPUT_FILE}`);
    console.log(classCounts);
}

train();
