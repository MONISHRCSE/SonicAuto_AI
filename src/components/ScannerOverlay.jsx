import { motion } from 'framer-motion';

const ScannerOverlay = ({ isScanning }) => {
    if (!isScanning) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[url('https://assets.codepen.io/142997/grid.png')] opacity-20" />

            {/* Scan Line */}
            <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-1 bg-electric-cyan shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            />

            {/* Decoding Text Effect */}
            <div className="absolute top-4 left-4 font-mono text-xs text-electric-cyan/80 flex flex-col space-y-1">
                <DecodingText text="SYSTEM_DIAGNOSTIC_INITIATED..." />
                <DecodingText text="ANALYZING_FREQUENCIES..." delay={0.5} />
                <DecodingText text="COMPARING_ACOUSTIC_SIGNATURES..." delay={1.2} />
            </div>
        </div>
    );
};

const DecodingText = ({ text, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.1 }}
        >
            {text}
        </motion.div>
    )
}

export default ScannerOverlay;
