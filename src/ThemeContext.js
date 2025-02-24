import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContext = React.createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = React.useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: { default: "#1b1f23", paper: "#25292e" },
                text: { primary: "#e0e0e0" },
                primary: { main: "#81c784" },
                success: { main: "#4caf50", contrastText: "#fff" },
              }
            : {
                background: { default: "#fff", paper: "#fff" },
                text: { primary: "#333333" },
              }),
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.style.setProperty("--webkit-scrollbar-track", "#1b1f23");
      root.style.setProperty("--webkit-scrollbar-thumb", "#bbbfc4");
      root.style.setProperty("--webkit-scrollbar-thumbhover", "#f1f1f1");

      /* Styles for the data catalog page */
      root.style.setProperty("--card-filter-light", "#25292e");
      root.style.setProperty("--background-default-light", "#1b1f23");
      root.style.setProperty("--card-title-light", "#e0e0e0");
      root.style.setProperty("--container-border-light", "#444");
      root.style.setProperty("--container-shadow-light", "0 4px 8px rgba(255, 255, 255, 0.2)")
      root.style.setProperty("--container-hover-light", "#b3b3b3");
      root.style.setProperty("--card-footer-light", "rgba(27, 31, 35, 0.8)")
      root.style.setProperty("--tag-background-light", "rgba(102, 204, 102, 0.8)");
      root.style.setProperty("--tag-text-light", "#333333");
      root.style.setProperty("--button-background-light", "rgba(102, 204, 102, 0.8)");
      root.style.setProperty("--button-text-light", "#333333");
      root.style.setProperty("--grouped-button-bgcolor", "#627a6b");
      root.style.setProperty("--grouped-button-color", "black");
      root.style.setProperty("--grouped-button-boxshadow", "0px 4px 6px rgba(0, 0, 0, 0.4)");
      root.style.setProperty("--grouped-button-arrow", "6px solid #627a6b; ");

      /*Styles for the buttons on the map layers */
      root.style.setProperty("--zoom-extenty-background", "rgba(50, 50, 50, 1)");

      /* Styles for usecasestyle.css */
      root.style.setProperty("--usecase-tab-bgcolor", "#387530");
      root.style.setProperty("--usecase-carousel-bgcolor", "#2a2a2a");
      root.style.setProperty("--usecase-textarea-bgcolor", "#2f6742"); /*1f4d32*/
      root.style.setProperty("--usecase-textarea-color", "white");
      root.style.setProperty("--usecase-textarea-boxshadow", "0 4px 8px rgba(0, 0, 0, 0.3)");
      root.style.setProperty("--usecase-imagearea-bgcolor", "black");
      root.style.setProperty("--usecase-imagearea-boxshadow", "0 4px 8px rgba(0, 0, 0, 0.3)");
      root.style.setProperty("--usecase-button-bgcolor", "#333333");
      root.style.setProperty("--usecase-button-color", "#ffffff");

    } else {

      root.style.setProperty("--webkit-scrollbar-track", "#f1f1f1");
      root.style.setProperty("--webkit-scrollbar-thumb", "#aaaaaa");
      root.style.setProperty("--webkit-scrollbar-thumbhover", "#888888");
      
      /* Styles for the data catalog page */
      root.style.setProperty("--card-filter-light", "#f3f3f3");
      root.style.setProperty("--background-default-light", "#fff");
      root.style.setProperty("--card-title-light", "#333");
      root.style.setProperty("--container-border-light", "#ddd");
      root.style.setProperty("--container-shadow-light", "0 4px 8px rgba(0, 0, 0, 0.2)");
      root.style.setProperty("--container-hover-light", "#b9b9b9");
      root.style.setProperty("--card-footer-light", "rgba(255, 255, 255, 0.8)")
      root.style.setProperty("--tag-background-light", "rgba(75, 160, 70, 0.8)");
      root.style.setProperty("--tag-text-light", "#fff");
      root.style.setProperty("--button-background-light", "rgba(75, 160, 70, 0.8)");
      root.style.setProperty("--button-text-light", "#fff");
      root.style.setProperty("--grouped-button-bgcolor", "#8e918f");
      root.style.setProperty("--grouped-button-color", "white");
      root.style.setProperty("--grouped-button-boxshadow", "0px 4px 6px rgba(0, 0, 0, 0.2)");
      root.style.setProperty("--grouped-button-arrow", "6px solid #8e918f")

      /*Styles for the buttons on the map layers */
      root.style.setProperty("--zoom-extenty-background", "rgba(255, 255, 255, 1)");

      /* Styles for usecasestyle.css */
      root.style.setProperty("--usecase-tab-bgcolor", "#4ba046");
      root.style.setProperty("--usecase-carousel-bgcolor", "#f4f4f4");
      root.style.setProperty("--usecase-textarea-bgcolor", "#ddf0db");
      root.style.setProperty("--usecase-textarea-color", "black");
      root.style.setProperty("--usecase-textarea-boxshadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--usecase-imagearea-bgcolor", "white");
      root.style.setProperty("--usecase-imagearea-boxshadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
      root.style.setProperty("--usecase-button-bgcolor", "#ffffff");
      root.style.setProperty("--usecase-button-color", "#333333");

    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
