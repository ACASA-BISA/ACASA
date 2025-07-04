import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const SleekTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} arrow enterDelay={100} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#ffffff",
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 8,
    boxShadow: theme.shadows[3],
    maxWidth: 240,
    lineHeight: 1.4,
    fontWeight: 400,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.mode === "dark" ? "#2c2c2c" : "#ffffff",
  },
}));

export default SleekTooltip;