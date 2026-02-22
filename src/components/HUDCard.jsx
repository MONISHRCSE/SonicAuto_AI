import { motion } from 'framer-motion';

const HUDCard = ({ title, value, status = 'neutral', delay = 0 }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'critical': return 'text-neon-red shadow-glow-red border-neon-red/30';
            case 'healthy': return 'text-electric-cyan shadow-glow-cyan border-electric-cyan/30';
            default: return 'text-white border-white/10';
        }
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: delay
            }}
            className={`relative p-6 rounded-xl bg-white/5 backdrop-blur-xl border ${getStatusColor()} flex flex-col items-center justify-center min-w-[200px]`}
        >
            <div className="text-white/40 text-xs font-orbitron tracking-[0.2em] mb-2 uppercase">{title}</div>
            <div className={`text-4xl font-bold font-mono ${status === 'critical' ? 'text-neon-red drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-electric-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]'}`}>
                {value}
            </div>
        </motion.div>
    );
};

export default HUDCard;
