import { motion } from "framer-motion";

const Loader = () => {
  const dotVariants = {
    animate: {
      y: [0, -10, 0],
    },
  };
  return (
    <div className="flex items-center justify-center gap-2 py-10">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-3 w-3 rounded-full bg-gray-600"
          variants={dotVariants}
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export default Loader