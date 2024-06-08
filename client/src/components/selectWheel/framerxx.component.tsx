// Import necessary libraries
import React, { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion, AnimatePresence } from "framer-motion";

// Define the component
const NumberWheel: React.FC = () => {
  const [selectedNumber, setSelectedNumber] = useState(5);

  const handleIncrement = () => {
    setSelectedNumber(prev => (prev < 10 ? prev + 1 : 10));
  };

  const handleDecrement = () => {
    setSelectedNumber(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <IconButton onClick={handleIncrement}>
        <ArrowUpwardIcon />
      </IconButton>
      <Box height={100} display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
        <AnimatePresence>
          <motion.div
            key={selectedNumber}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ position: "absolute" }}
          >
            <Typography variant="h3">{selectedNumber}</Typography>
          </motion.div>
          {selectedNumber > 1 && (
            <motion.div
              key={selectedNumber - 1}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 0.5, y: 50 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ position: "absolute" }}
            >
              <Typography variant="h4">{selectedNumber - 1}</Typography>
            </motion.div>
          )}
          {selectedNumber < 10 && (
            <motion.div
              key={selectedNumber + 1}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 0.5, y: -50 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ position: "absolute" }}
            >
              <Typography variant="h4">{selectedNumber + 1}</Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <IconButton onClick={handleDecrement}>
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
  );
};

export default NumberWheel;
