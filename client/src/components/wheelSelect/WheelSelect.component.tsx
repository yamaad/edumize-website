import { IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { SkeletonWrapper } from "components/skeletonWrapper/SkeletonWrapper.component";
import { AnimatePresence, PanInfo, motion } from "framer-motion";

//--------------
// interfaces
//--------------
interface WheelSelectProps {
  valueRange: number[] | string[];
  onValueChange: (value: number | string) => void;
  renderTrigger: any[];
}
//---------------
// component
//---------------
const WheelSelect = ({ valueRange, onValueChange, renderTrigger }: WheelSelectProps) => {
  //---------------
  // local states
  //---------------
  const [selectedValueIndex, setSelectedValueIndex] = useState<number>(0);
  const [previousValueIndex, setPreviousValueIndex] = useState<number>(0);

  //---------------
  // handlers
  //---------------

  const handleOnArrowUp = () => {
    if (selectedValueIndex === 0) return;
    setSelectedValueIndex(prev => prev - 1);
  };
  const handleOnArrowDown = () => {
    if (selectedValueIndex === valueRange.length - 1) return;
    setSelectedValueIndex(prev => prev + 1);
  };
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 5) handleOnArrowUp();
    if (info.offset.y < -5) handleOnArrowDown();
  };

  //---------------
  // trigger
  //---------------
  useEffect(() => {
    onValueChange(valueRange[selectedValueIndex]);
  }, [selectedValueIndex]);
  useEffect(() => {
    setPreviousValueIndex(selectedValueIndex);
  }, [selectedValueIndex]);

  useEffect(() => {
    setSelectedValueIndex(0);
    onValueChange(valueRange[0]);
  }, [...renderTrigger]);

  return (
    <SkeletonWrapper condition={valueRange.length} width={"100%"}>
      <Stack alignItems={"center"} bgcolor={"content.0"} sx={{ borderRadius: 2, py: 1 }}>
        <IconButton
          color="secondary"
          sx={{ height: 40, width: 40, backgroundColor: "rgba(255, 255, 255, 0.5)", zIndex: 1 }}
          onClick={handleOnArrowUp}
          disabled={selectedValueIndex === 0}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: "90px" }} />
        </IconButton>
        <motion.div drag="y" dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }} dragElastic={0.1} onDragEnd={handleDrag}>
          <Stack height={"90px"} alignItems={"center"}>
            <AnimatePresence>
              {selectedValueIndex > 0 && (
                <motion.div
                  key={selectedValueIndex - 1}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 0.1, y: -20 }}
                  transition={{ duration: 0.1 }}
                  style={{ position: "absolute" }}
                >
                  <Typography variant="h1" color="primary.900">
                    {valueRange[selectedValueIndex - 1]}
                  </Typography>
                </motion.div>
              )}
              <motion.div
                key={selectedValueIndex}
                initial={{ opacity: 0, y: selectedValueIndex > previousValueIndex ? 60 : -20 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.1, type: "spring", stiffness: 100 }}
              >
                <Typography variant="h1" color="primary.900">
                  {valueRange[selectedValueIndex]}
                </Typography>
              </motion.div>

              {selectedValueIndex < valueRange.length - 1 && (
                <motion.div
                  key={selectedValueIndex + 1}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 0.1, y: 60 }}
                  transition={{ duration: 0.1 }}
                  style={{ position: "absolute" }}
                >
                  <Typography variant="h1" color="primary.900">
                    {valueRange[selectedValueIndex + 1]}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Stack>
        </motion.div>
        <IconButton
          color="secondary"
          sx={{ height: 40, width: 40, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          onClick={handleOnArrowDown}
          disabled={selectedValueIndex === valueRange.length - 1}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: "90px" }} />
        </IconButton>
      </Stack>
    </SkeletonWrapper>
  );
};
export { WheelSelect };
