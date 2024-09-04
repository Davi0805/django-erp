import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
  colorprogressstat,
  textcolor,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("data received " + progress);
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
{/*           <ProgressCircle
            progress={progress}
            colorprogress={`${colorprogressstat}`}
          /> */}
          <CircularProgress variant="determinate" sx={{color: colors.blueAccent[500],
          }} value={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: `${textcolor}` }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: `${textcolor}` }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
