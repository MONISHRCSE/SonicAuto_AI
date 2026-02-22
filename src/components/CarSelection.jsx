
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, ChevronLeft, ArrowRight, Settings, Wrench, CheckCircle } from 'lucide-react';

import toyotaLogo from '../../Logos/toyota.png';
import hondaLogo from '../../Logos/Honda.png';
import fordLogo from '../../Logos/ford.png';
import bmwLogo from '../../Logos/BMW.png';
import mercedesLogo from '../../Logos/Mercedes.png';
import audiLogo from '../../Logos/audi.png';
import hyundaiLogo from '../../Logos/Hyundai.png';
import nissanLogo from '../../Logos/nissan.png';
import mahindraLogo from '../../Logos/mahindra.png';

const MANUFACTURERS = [
    { id: 'toyota', name: 'Toyota', logo: toyotaLogo, models: ['Camry', 'Corolla', 'RAV4', 'Highlander'] },
    { id: 'honda', name: 'Honda', logo: hondaLogo, models: ['Civic', 'Accord', 'CR-V', 'Pilot'] },
    { id: 'ford', name: 'Ford', logo: fordLogo, models: ['F-150', 'Mustang', 'Explorer', 'Escape'] },
    { id: 'bmw', name: 'BMW', logo: bmwLogo, models: ['3 Series', '5 Series', 'X3', 'X5'] },
    { id: 'mercedes', name: 'Mercedes', logo: mercedesLogo, models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
    { id: 'audi', name: 'Audi', logo: audiLogo, models: ['A4', 'A6', 'Q5', 'Q7'] },
    { id: 'hyundai', name: 'Hyundai', logo: hyundaiLogo, models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'] },
    { id: 'nissan', name: 'Nissan', logo: nissanLogo, models: ['Altima', 'Sentra', 'Rogue', 'Pathfinder'] },
    { id: 'mahindra', name: 'Mahindra', logo: mahindraLogo, models: ['Thar', 'Scorpio-N', 'XUV700', 'Bolero'] },
];

const CAR_PARTS = [
    { id: 'engine', label: 'Engine Bay', desc: 'Turbo, Timing, Knocking' },
    { id: 'cabin', label: 'Interior Cabin', desc: 'Fans, Rattles, Leaks' },
    { id: 'wheels', label: 'Wheels & Brakes', desc: 'Bearings, Pads, Rotors' },
    { id: 'exhaust', label: 'Exhaust System', desc: 'Leaks, Rattles, Muffler' }
];

const CarSelection = ({ onComplete }) => {
    const [step, setStep] = useState(1); // 1: Make, 2: Model, 3: Part
    const [make, setMake] = useState(null);
    const [model, setModel] = useState(null);
    const [part, setPart] = useState(null);

    const handleNext = () => {
        if (step === 1 && make) setStep(2);
        else if (step === 2 && model) setStep(3);
        else if (step === 3 && part) {
            onComplete({ make: make.name, model, part: part.id });
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    {step > 1 ? (
                        <button onClick={handleBack} className="flex items-center gap-2 text-white/50 hover:text-electric-cyan transition-colors">
                            <ChevronLeft size={20} /> BACK
                        </button>
                    ) : <div />}

                    <div className="flex gap-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-electric-cyan shadow-glow-cyan' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                        >
                            <h2 className="text-3xl font-orbitron text-white mb-6">SELECT MANUFACTURER</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {MANUFACTURERS.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => { setMake(m); setStep(2); }}
                                        className={`p-6 rounded-xl border flex flex-col items-center gap-4 transition-all group ${make?.id === m.id
                                            ? 'bg-electric-cyan/20 border-electric-cyan text-white shadow-glow-cyan'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]'
                                            }`}
                                    >
                                        <div className={`w-16 h-12 flex items-center justify-center p-1 overflow-hidden`}>
                                            <img
                                                src={m.logo}
                                                alt={m.name}
                                                className={`max-w-full max-h-full object-contain transition-all duration-300 ${make?.id === m.id ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'}`}
                                                onError={(e) => {
                                                    // Fallback to text if image fails
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                            />
                                            <div className="hidden">
                                                <Car className={`w-8 h-8 ${make?.id === m.id ? 'text-electric-cyan' : 'text-white/40 group-hover:text-white'}`} />
                                            </div>
                                        </div>
                                        <span className="font-orbitron tracking-wider text-[10px] sm:text-xs">{m.name}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                        >
                            <h2 className="text-3xl font-orbitron text-white mb-6">SELECT MODEL <span className="text-electric-cyan text-xl ml-2">({make?.name})</span></h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {make?.models.map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => { setModel(m); setStep(3); }}
                                        className={`p-6 rounded-xl border flex flex-col items-center gap-4 transition-all group ${model === m
                                            ? 'bg-electric-cyan/20 border-electric-cyan text-white shadow-glow-cyan'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]'
                                            }`}
                                    >
                                        <Settings className={`w-8 h-8 ${model === m ? 'text-electric-cyan' : 'text-white/40 group-hover:text-white'}`} />
                                        <span className="font-orbitron tracking-wider">{m}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                        >
                            <h2 className="text-3xl font-orbitron text-white mb-6">SELECT COMPONENT TO ANALYZE</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CAR_PARTS.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setPart(p)}
                                        className={`p-6 rounded-xl border flex items-center justify-between transition-all group ${part?.id === p.id
                                            ? 'bg-electric-cyan/20 border-electric-cyan text-white shadow-glow-cyan'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02]'
                                            }`}
                                    >
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="font-orbitron tracking-wider text-lg">{p.label}</span>
                                            <span className="text-white/40 text-sm font-inter">{p.desc}</span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${part?.id === p.id
                                            ? 'border-electric-cyan bg-electric-cyan text-black'
                                            : 'border-white/20 text-transparent'
                                            }`}>
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleNext}
                                    disabled={!part}
                                    className="px-8 py-4 bg-electric-cyan text-black font-orbitron font-bold rounded-xl shadow-lg shadow-electric-cyan/20 hover:shadow-electric-cyan/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                >
                                    INITIALIZE DIAGNOSTICS <Wrench className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CarSelection;
