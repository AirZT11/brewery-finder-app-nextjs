import { Box, Spinner } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"

interface LoadingOverlayProps {
  isLoading: boolean
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Box
        position="absolute"
        left="0"
        right="0"
        top="0"
        bottom="0"
        // // m="auto"
        h="full"
        w="full"
        bg="black"
        opacity=".3"
        // transition="200ms ease-in-out"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    </motion.div>
  )
}

export default LoadingOverlay
