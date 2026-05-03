import { motion } from 'framer-motion';

const TextReveal = ({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  wordByWord = false,
  ...props
}) => {
  if (wordByWord) {
    const words = text.split(' ');

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    };

    const wordVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };

    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...props}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Default fade + slide up
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      {...props}
    >
      {text}
    </motion.div>
  );
};

export default TextReveal;