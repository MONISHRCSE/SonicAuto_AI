import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Database, UploadCloud, Activity, MapPin, Phone, Star, X, Search } from 'lucide-react';
import VisualizerCore from './VisualizerCore';
import HUDCard from './HUDCard';
import ScannerOverlay from './ScannerOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioClassifier } from '../services/AudioClassifier';
import showroomsData from '../data/showrooms.json';

const classifier = new AudioClassifier();

const BRAND_LOGOS = {
    toyota: "https://www.vectorlogo.zone/logos/toyota/toyota-icon.svg",
    honda: "https://www.vectorlogo.zone/logos/honda/honda-icon.svg",
    ford: "https://www.vectorlogo.zone/logos/ford/ford-icon.svg",
    bmw: "https://www.vectorlogo.zone/logos/bmw/bmw-icon.svg",
    mercedes: "https://www.vectorlogo.zone/logos/mercedes/mercedes-icon.svg",
    audi: "https://www.vectorlogo.zone/logos/audi/audi-icon.svg",
    hyundai: "https://www.vectorlogo.zone/logos/hyundai/hyundai-icon.svg",
    nissan: "https://www.vectorlogo.zone/logos/nissan/nissan-icon.svg",
    mahindra: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Mahindra_Auto_Logo.svg"
};

const Dashboard = ({ initialPart, carDetails, onBack }) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, RECORDING, PROCESSING, RESULT, TRAINING
    const [analysisResult, setAnalysisResult] = useState(null);
    const [trainingData, setTrainingData] = useState({ count: 0, classes: [] });
    const [isTrained, setIsTrained] = useState(false);
    const [carPart, setCarPart] = useState(initialPart || 'engine'); // engine, cabin, wheels, exhaust
    const [showShowrooms, setShowShowrooms] = useState(false);

    const fileInputRef = useRef(null);
    const analysisInputRef = useRef(null);

    const CAR_PARTS = [
        { id: 'engine', label: 'Engine Bay', icon: Activity },
        { id: 'cabin', label: 'Interior Cabin', icon: Mic },
        { id: 'wheels', label: 'Wheels/Brakes', icon: Activity },
        { id: 'exhaust', label: 'Exhaust', icon: UploadCloud }
    ];

    const startAnalysis = () => {
        setStatus('RECORDING');
    };

    const stopRecording = () => {
        setStatus('PROCESSING');

        setTimeout(() => {
            if (!classifier.isTrained) {
                setAnalysisResult({
                    diagnosis: "AI Not Trained",
                    confidence: "0%",
                    cost: "Please Upload Dataset",
                    severity: "healthy"
                });
            } else {
                // Mock prediction for Live Mic based on Context and Car Details
                const result = classifier.predictContext(carPart, carDetails);
                setAnalysisResult(result);
            }
            setStatus('RESULT');
        }, 2000);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setStatus('PROCESSING');

        try {
            const arrayBuffer = await file.arrayBuffer();
            // Pass carPart context and carDetails to analysis
            const result = await classifier.analyzeFile(arrayBuffer, carPart, carDetails);

            setTimeout(() => {
                setAnalysisResult(result);
                setStatus('RESULT');
            }, 1500);
        } catch (e) {
            console.error("Analysis failed", e);
            setStatus('IDLE');
        }
    };

    const reset = () => {
        setStatus('IDLE');
        setAnalysisResult(null);
    };

    const handleFolderSelect = async (event) => {
        const files = Array.from(event.target.files).filter(f => f.name.toLowerCase().endsWith('.wav'));
        if (files.length === 0) return;

        setStatus('TRAINING');

        setTimeout(async () => {
            const result = await classifier.train(files);
            setTrainingData(result);
            setIsTrained(true);
            setStatus('IDLE');
        }, 500);
    };

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${analysisResult?.severity === 'critical' ? 'shadow-[inset_0_0_100px_rgba(239,68,68,0.2)]' : ''}`}>

            {/* Hidden File Inputs */}
            <input
                type="file"
                ref={fileInputRef}
                webkitdirectory="true"
                multiple
                className="hidden"
                onChange={handleFolderSelect}
            />
            <input
                type="file"
                ref={analysisInputRef}
                accept="audio/*"
                className="hidden"
                onChange={handleFileUpload}
            />

            {/* Header */}
            <div className="absolute top-8 flex items-center gap-4 z-50">
                <h1 className="text-4xl font-orbitron text-electric-cyan tracking-widest uppercase glow-text flex flex-col items-start">
                    <span>SonicAuto <span className="text-white text-xs tracking-normal opacity-50 ml-2">v2.1</span></span>
                    {carDetails && (
                        <span className="text-sm text-white/60 font-inter tracking-normal normal-case">
                            Diagnosing: {carDetails.make} {carDetails.model}
                        </span>
                    )}
                </h1>

                <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-electric-cyan/20 rounded-lg text-xs font-orbitron text-electric-cyan transition-all"
                >
                    <Database size={16} />
                    {isTrained ? `TRAINED (${trainingData.count || 'PRE-LOADED'})` : "TRAIN AI MODEL"}
                </button>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-red-500/20 rounded-lg text-xs font-orbitron text-white/50 hover:text-red-500 transition-all"
                >
                    EXIT
                </button>
            </div>

            {/* Car Part Selector - Only show in IDLE */}
            <AnimatePresence>
                {status === 'IDLE' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-28 z-40 flex gap-4 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10"
                    >
                        {CAR_PARTS.map((part) => (
                            <button
                                key={part.id}
                                onClick={() => setCarPart(part.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${carPart === part.id
                                    ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan shadow-glow-cyan'
                                    : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="font-orbitron text-xs tracking-wider">{part.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Visualizer Core */}
            <div className="relative w-full max-w-4xl h-[400px] bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-glow-cyan overflow-hidden group mb-8 mt-24">

                <VisualizerCore isRecording={status === 'RECORDING'} isScanning={status === 'PROCESSING'} />

                <AnimatePresence>
                    {(status === 'PROCESSING' || status === 'TRAINING') && <ScannerOverlay isScanning={true} />}
                </AnimatePresence>

                <AnimatePresence>
                    {status === 'TRAINING' && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 bg-black/80 flex flex-col items-center justify-center font-mono text-electric-cyan"
                        >
                            <UploadCloud className="w-16 h-16 animate-bounce mb-4" />
                            <div className="text-xl tracking-widest">INGESTING DATASET...</div>
                            <div className="text-sm opacity-50 mt-2">EXTRACTING SPECTRAL FINGERPRINTS</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none gap-8">
                    {status === 'IDLE' && (
                        <>
                            {/* Live Scan Button */}
                            <button
                                onClick={startAnalysis}
                                className="pointer-events-auto flex flex-col items-center justify-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-electric-cyan/10 border border-electric-cyan flex items-center justify-center shadow-glow-cyan transition-all duration-300 group-hover:scale-110 group-hover:bg-electric-cyan/20">
                                    <Mic className="w-10 h-10 text-electric-cyan" />
                                </div>
                                <span className="mt-4 text-electric-cyan font-orbitron tracking-widest text-sm animate-pulse">
                                    LIVE SCAN
                                </span>
                            </button>

                            {/* Upload Scan Button */}
                            <button
                                onClick={() => analysisInputRef.current.click()}
                                className="pointer-events-auto flex flex-col items-center justify-center group"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shadow-glow-cyan transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                                    <UploadCloud className="w-8 h-8 text-white/70 group-hover:text-white" />
                                </div>
                                <span className="mt-4 text-white/70 font-orbitron tracking-widest text-xs group-hover:text-white">
                                    UPLOAD FILE
                                </span>
                            </button>
                        </>
                    )}

                    {status === 'RECORDING' && (
                        <button
                            onClick={stopRecording}
                            className="pointer-events-auto flex flex-col items-center justify-center group animate-pulse"
                        >
                            <div className="w-24 h-24 rounded-full bg-neon-red/10 border border-neon-red flex items-center justify-center shadow-glow-red transition-all duration-300 group-hover:scale-110 group-hover:bg-neon-red/20">
                                <Square className="w-8 h-8 text-neon-red fill-current" />
                            </div>
                            <span className="mt-4 text-neon-red font-orbitron tracking-widest text-sm">
                                STOP & ANALYZE
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {status === 'RESULT' && analysisResult && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-20">
                        <HUDCard
                            title="DIAGNOSIS"
                            value={analysisResult.diagnosis}
                            status={analysisResult.severity}
                            delay={0.1}
                        />
                        <HUDCard
                            title="CONFIDENCE"
                            value={analysisResult.confidence}
                            status={analysisResult.severity}
                            delay={0.3}
                        />
                        <HUDCard
                            title="EST. REPAIR COST"
                            value={analysisResult.cost}
                            status="neutral"
                            delay={0.5}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="col-span-1 md:col-span-3 flex flex-col items-center gap-4 mt-6"
                        >
                            {analysisResult.severity !== 'healthy' && (
                                <button
                                    onClick={() => setShowShowrooms(true)}
                                    className="px-8 py-4 bg-electric-cyan text-black font-orbitron font-bold rounded-xl shadow-lg shadow-electric-cyan/20 hover:shadow-electric-cyan/40 hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    <Search size={20} /> SEARCH NEARBY {carDetails?.make.toUpperCase()} SHOWROOM
                                </button>
                            )}
                            <button
                                onClick={reset}
                                className="px-8 py-3 bg-white/5 border border-white/20 hover:bg-white/10 rounded-full text-white font-orbitron tracking-widest transition-all"
                            >
                                NEW SCAN
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Showroom Modal */}
            <AnimatePresence>
                {showShowrooms && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-zinc-900/90 border border-electric-cyan/30 rounded-3xl overflow-hidden shadow-2xl shadow-electric-cyan/10"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-orbitron text-electric-cyan flex items-center gap-2">
                                        <MapPin className="text-electric-cyan" /> {carDetails?.make.toUpperCase()} AUTHORIZED SHOWROOMS
                                    </h2>
                                    <p className="text-white/40 text-sm font-inter mt-1">Found nearby service centers for your {carDetails?.model}</p>
                                </div>
                                <button
                                    onClick={() => setShowShowrooms(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Showroom List */}
                            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="grid gap-4">
                                    {showroomsData.showrooms
                                        .filter(s => s.brand.toLowerCase() === carDetails?.make.toLowerCase())
                                        .map((showroom) => (
                                            <div
                                                key={showroom.id}
                                                className="group p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-electric-cyan/50 hover:bg-electric-cyan/5 transition-all cursor-pointer flex gap-5"
                                            >
                                                {/* Brand Logo Container */}
                                                <div className="w-20 h-20 flex-shrink-0 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center p-3 group-hover:bg-white/10 transition-all overflow-hidden">
                                                    <img
                                                        src={BRAND_LOGOS[showroom.brand.toLowerCase()]}
                                                        alt={showroom.brand}
                                                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-orbitron text-white group-hover:text-electric-cyan transition-colors">
                                                                {showroom.name}
                                                            </h3>
                                                            <p className="text-white/40 text-sm mt-1 flex items-center gap-1">
                                                                <MapPin size={14} /> {showroom.address}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center gap-1 text-yellow-400 font-bold mb-1">
                                                                <Star size={16} fill="currentColor" /> {showroom.rating}
                                                            </div>
                                                            <div className="text-electric-cyan text-xs font-orbitron">{showroom.distance}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 hover:bg-white/10 transition-all">
                                                            <Phone size={14} /> {showroom.phone}
                                                        </button>
                                                        <button className="px-6 py-2 bg-electric-cyan text-black font-bold text-xs rounded-lg hover:scale-105 transition-all">
                                                            BOOK SERVICE
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {showroomsData.showrooms.filter(s => s.brand.toLowerCase() === carDetails?.make.toLowerCase()).length === 0 && (
                                        <div className="text-center py-10 opacity-50">
                                            <Search className="w-12 h-12 mx-auto mb-4" />
                                            <p className="font-orbitron">NO AUTHORIZED SHOWROOMS FOUND IN THIS AREA</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
