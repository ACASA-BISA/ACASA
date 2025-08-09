import "./App.css"; // Importing the main CSS file for styling the App component
import * as React from "react"; // Importing React for creating the component
import ResponsiveAppBar from "./Appbar"; // Importing the ResponsiveAppBar component
import "./ScrollBar.css"; // Importing an additional CSS file for custom scrollbar styling
import { ThemeContext, ThemeProviderWrapper } from "./ThemeContext";
import BrowserCheck from "./BrowserCheck";

function App() {
    // The main App component
    return (
        <div className="App">
            {/* Render the ResponsiveAppBar component */}
            <BrowserCheck />
            <ThemeProviderWrapper>
                <ResponsiveAppBar></ResponsiveAppBar>
            </ThemeProviderWrapper>
        </div>
    );
}

export default App; // Exporting the App component as the default export
