import { motion } from 'framer-motion';

const HoverGlow = ({
  children,
  scale = 1.03,
  glowColor = 'rgba(147, 51, 234, 0.3)', // purple glow
  className = '',
  ...props
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        boxShadow: `0 0 30px ${glowColor}`,
      }}
      whileTap={{ scale: scale * 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default HoverGlow;