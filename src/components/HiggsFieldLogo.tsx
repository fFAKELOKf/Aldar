import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function HiggsFieldLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Sparkles className="w-6 h-6" style={{ color: '#8A2BE2' }} />
      </motion.div>
      <span
        style={{
          color: '#FFFFFF',
          fontSize: '20px',
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      >
        HIGGSFIELD
      </span>
    </motion.div>
  );
}
