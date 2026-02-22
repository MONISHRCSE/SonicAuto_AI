import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

const VisualizerCore = ({ isRecording, isScanning }) => {
    const containerRef = useRef(null);
    const wavesurfer = useRef(null);
    const record = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize WaveSurfer
        wavesurfer.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'rgb(34, 211, 238)', // electric-cyan
            progressColor: 'rgb(34, 211, 238)',
            cursorColor: 'transparent',
            barWidth: 3,
            barGap: 3,
            barRadius: 3,
            height: 200,
            normalize: true,
            minPxPerSec: 100,
        });

        // Initialize Record Plugin
        record.current = wavesurfer.current.registerPlugin(RecordPlugin.create({
            scrollingWaveform: true,
            renderRecordedAudio: false
        }));

        return () => {
            // Destroy wavesurfer instance on unmount
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    // Handle Recording State
    useEffect(() => {
        if (!record.current) return;

        if (isRecording) {
            record.current.startMic().catch(e => console.error('Mic Error:', e));
        } else {
            record.current.stopMic();
        }
    }, [isRecording]);

    // Clear Waveform when not active (e.g. Result or Idle)
    useEffect(() => {
        if (!isRecording && !isScanning && wavesurfer.current) {
            console.log("Clearing Waveform...");
            wavesurfer.current.empty();
            // Force a re-render/cleanup of the internal buffer if possible
            if (record.current) {
                record.current.stopMic();
            }
        }
    }, [isRecording, isScanning]);

    return (
        <div className="w-full h-full flex items-center justify-center relative bg-black/50 overflow-hidden">
            {/* The WaveContainer */}
            <div ref={containerRef} className="w-full h-full mt-[100px]" />

            {/* Placeholder Animation if idle */}

        </div>
    );
};

export default VisualizerCore;
