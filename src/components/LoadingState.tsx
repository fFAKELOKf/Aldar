import { motion } from "motion/react";

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <div className="relative">
        {/* Pulsating orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, #8A2BE2 50%, transparent 100%)',
            boxShadow: '0 0 60px rgba(138, 43, 226, 0.8)',
          }}
        />

        {/* Magenta particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [
                Math.cos((i * Math.PI * 2) / 8) * 80,
                0,
              ],
              y: [
                Math.sin((i * Math.PI * 2) / 8) * 80,
                0,
              ],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeIn",
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor: '#FF00FF',
              boxShadow: '0 0 10px rgba(255, 0, 255, 0.8)',
              marginLeft: '-6px',
              marginTop: '-6px',
            }}
          />
        ))}

        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: '#FF00FF',
            borderStyle: 'dashed',
            opacity: 0.5,
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
        style={{ color: '#FFFFFF', fontSize: '18px' }}
      >
        Магия происходит... Алдар Косе уже в пути...
      </motion.p>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-4 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#8A2BE2' }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
