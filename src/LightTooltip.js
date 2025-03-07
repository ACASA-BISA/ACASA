import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#f5f5f5" : "#616161",
    color: theme.palette.mode === "dark" ? "#212121" : "rgba(255, 255, 255, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    maxWidth: 250,
  },
  [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.mode === "dark" ? "#f5f5f5" : "#616161",
    },
}));

export default LightTooltip;
