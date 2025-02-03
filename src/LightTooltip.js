import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "rgba(255, 255, 255, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    maxWidth: 250,
  },
}));

export default LightTooltip;
