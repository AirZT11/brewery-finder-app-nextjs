import { FC, useMemo } from "react"
import { motion } from "framer-motion"
import { Box } from "@chakra-ui/react"
import dynamic from "next/dynamic"

interface BubbleProps {
  size: number
  delay: number
  duration: number
  x: number
}

// Seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const Bubble: FC<BubbleProps> = ({ size, delay, duration, x }) => {
  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-100vh",
        opacity: [0, 0.5, 0],
        scale: [1, 1.2, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(2px)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.9)",
        zIndex: 1,
      }}
    />
  )
}

const BeerBubblesContent: FC = () => {
  // Generate consistent bubbles using useMemo and seeded random
  const bubbles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => {
      const seed = i + 1 // Use index as seed for consistency
      return {
        size: seededRandom(seed) * 10 + 5, // Random size between 5 and 15
        delay: seededRandom(seed + 1) * 5, // Random delay between 0 and 5 seconds
        duration: seededRandom(seed + 2) * 5 + 5, // Random duration between 5 and 10 seconds
        x: seededRandom(seed + 3) * 100, // Random x position between 0 and 100%
      }
    })
  }, []) // Empty dependency array ensures values are generated only once

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="none"
      zIndex={999}
      overflow="hidden"
      // bg="background.100"
    >
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
    </Box>
  )
}

// Export a client-side only version of the component
const BeerBubbles = dynamic(() => Promise.resolve(BeerBubblesContent), {
  ssr: false,
})

export default BeerBubbles
