import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({
  progress = "0.75",
  size = "40",
  colorprogress,
  textcolor,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 20%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.grey[200]} ${angle}deg 360deg),
            ${colorprogress}`,
        borderRadius: "50%",
        boxShadow: "1",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
