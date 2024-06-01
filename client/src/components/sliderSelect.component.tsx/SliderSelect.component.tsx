import { IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";

//--------------
// interfaces
//--------------
interface SliderSelectProps {
  valueRange: number[] | string[];
  onIndexChange: (index: number) => void;
  renderTrigger?: any;
}
//---------------
// component
//---------------
const SliderSelect = ({ valueRange, onIndexChange, renderTrigger }: SliderSelectProps) => {
  //---------------
  // local states
  //---------------
  const [selectedValueIndex, setSelectedValueIndex] = useState<number>(0);

  //---------------
  // trigger
  //---------------
  useEffect(() => {
    setSelectedValueIndex(0);
  }, [renderTrigger]);

  //---------------
  // handlers
  //---------------
  const handleOnArrowUp = () => {
    if (selectedValueIndex === 0) return;
    onIndexChange(selectedValueIndex - 1);
    setSelectedValueIndex(prev => prev - 1);
  };
  const handleOnArrowDown = () => {
    if (selectedValueIndex === valueRange.length - 1) return;
    onIndexChange(selectedValueIndex + 1);
    setSelectedValueIndex(prev => prev + 1);
  };

  return (
    <>
      {!!valueRange.length && (
        <Stack alignItems={"center"} sx={{ backgroundColor: "primary.100", borderRadius: 2, py: 1 }}>
          <IconButton color="secondary" sx={{ height: 40, width: 40 }} onClick={handleOnArrowUp} disabled={selectedValueIndex === 0}>
            <KeyboardArrowUpIcon sx={{ fontSize: "60px" }} />
          </IconButton>
          <Typography variant="h6" color="primary.900">
            {valueRange[selectedValueIndex]}
          </Typography>
          <IconButton
            color="secondary"
            sx={{ height: 40, width: 40 }}
            onClick={handleOnArrowDown}
            disabled={selectedValueIndex === valueRange.length - 1}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: "60px" }} />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
export { SliderSelect };
