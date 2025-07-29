import { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

// Define supported languages (sync with App.js)
const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "bn", label: "Bengali", flag: "🇧🇩" },
  { code: "ta", label: "Tamil", flag: "🇮🇳" },
  { code: "ne", label: "Nepali", flag: "🇳🇵" },
  { code: "si", label: "Sinhala", flag: "🇱🇰" },
  { code: "ur", label: "Urdu", flag: "🇵🇰" },
  { code: "dz", label: "Dzongkha", flag: "🇧🇹" },
  { code: "ps", label: "Pashto", flag: "🇦🇫" },
  { code: "zh-CN", label: "Chinese (Simplified)", flag: "🇨🇳" },
];

const Translate = () => {
  const [language, setLanguage] = useState("en");
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [useDefaultWidget, setUseDefaultWidget] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const location = useLocation();

  // Initialize Google Translate
  const googleTranslateElementInit = () => {
    try {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,fr,hi,bn,ta,ne,si,ur,dz,ps,es,zh-CN",
          },
          "google_translate_element"
        );
        console.log("Google Translate initialized successfully");
        setIsTranslateLoaded(true);
        setScriptError(false);
        setUseDefaultWidget(false);
      } else {
        console.error("Google Translate API not fully loaded");
        setScriptError(true);
        setUseDefaultWidget(true);
      }
    } catch (error) {
      console.error("Error initializing Google Translate: ", error);
      setScriptError(true);
      setUseDefaultWidget(true);
    }
  };

  // Load script and apply CSS
  useEffect(() => {
    // Apply CSS immediately
    let style = document.querySelector("#translate-styles");
    if (!style) {
      style = document.createElement("style");
      style.id = "translate-styles";
      style.innerHTML = `
        .goog-te-banner-frame.skiptranslate,
        .skiptranslate iframe,
        iframe[id*=":container"],
        iframe[class*="skiptranslate"],
        iframe[title*="Google Translate"] {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          border: none !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
        }
        body {
          top: 0 !important;
        }
        .goog-logo-link,
        .goog-te-gadget-icon {
          display: none !important;
        }
        .goog-te-gadget > div > span {
          display: none !important;
        }
        .goog-te-combo {
          display: block;
          visibility: hidden;
        }
        #google_translate_element:not(.default-widget) {
          display: block !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        .default-widget {
          max-width: 140px;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    }

    // MutationObserver to hide iframes dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "IFRAME" && (node.className.includes("skiptranslate") || node.id.includes(":container"))) {
            node.style.display = "none";
            node.style.width = "0";
            node.style.height = "0";
            node.style.border = "none";
            node.style.position = "absolute";
            node.style.left = "-9999px";
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Load script
    const loadScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const addScript = document.createElement("script");
        addScript.id = "google-translate-script";
        addScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        addScript.async = true;
        addScript.onload = () => {
          console.log("Google Translate script loaded");
          const pollInterval = setInterval(() => {
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
              clearInterval(pollInterval);
              googleTranslateElementInit();
            }
          }, 100);
          setTimeout(() => {
            clearInterval(pollInterval);
            if (!isTranslateLoaded) {
              console.warn("Google Translate API not loaded after timeout");
              setScriptError(true);
              setUseDefaultWidget(true);
            }
          }, 30000); // 30 seconds
        };
        addScript.onerror = () => {
          console.error("Failed to load Google Translate script");
          setScriptError(true);
          setUseDefaultWidget(true);
        };
        document.body.appendChild(addScript);
      }
    };

    loadScript();
    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      observer.disconnect();
      if (document.querySelector("#google-translate-script")) {
        document.querySelector("#google-translate-script").remove();
      }
      delete window.googleTranslateElementInit;
    };
  }, [location.pathname]); // Reinitialize on route change

  // Sync Material-UI Select with Google Translate
  useEffect(() => {
    if (isTranslateLoaded && !useDefaultWidget) {
      const checkLanguage = () => {
        const select = document.querySelector(".goog-te-combo");
        if (select && select.value && select.value !== language) {
          console.log(`Syncing language to: ${select.value}`);
          setLanguage(select.value);
        }
      };
      const interval = setInterval(checkLanguage, 500);
      return () => clearInterval(interval);
    }
  }, [isTranslateLoaded, language, useDefaultWidget]);

  // Handle language change
  const handleChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);

    if (!isTranslateLoaded) {
      console.warn("Google Translate not loaded, queuing: ", newLang);
      return;
    }

    if (useDefaultWidget) {
      console.log("Using default widget, custom change ignored");
      return;
    }

    const attemptLanguageChange = (attempts = 40, delay = 1000) => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        console.log(`Changing language to: ${newLang}`);
        select.value = newLang;
        const changeEvent = new Event("change", { bubbles: true });
        select.dispatchEvent(changeEvent);
        setTimeout(() => {
          const translated = document.querySelector("[lang='" + newLang + "']") || document.body.innerText.includes("Translated by Google");
          if (translated) {
            console.log("Translation applied successfully");
          } else if (attempts > 0) {
            console.warn(`Translation not applied, retrying... (${attempts} left)`);
            setTimeout(() => attemptLanguageChange(attempts - 1, delay), delay);
          } else {
            console.warn("Translation not applied after retries, keeping custom UI");
          }
        }, 2000);
      } else if (attempts > 0) {
        console.warn(`Google Translate dropdown not found, retrying... (${attempts} left)`);
        setTimeout(() => attemptLanguageChange(attempts - 1, delay), delay);
      } else {
        console.warn("Google Translate dropdown not found after retries, keeping custom UI");
      }
    };

    attemptLanguageChange();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", maxWidth: 140, mx: 1 }}>
      {!useDefaultWidget ? (
        <FormControl size="small" disabled={!isTranslateLoaded || scriptError}>
          <Select
            value={language}
            onChange={handleChange}
            displayEmpty
            renderValue={(value) => {
              const selectedLang = languages.find((lang) => lang.code === value);
              return (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {selectedLang ? (
                    <>
                      <span style={{ fontSize: "18px" }}>{selectedLang.flag}</span>
                      {selectedLang.label}
                    </>
                  ) : (
                    "Language"
                  )}
                </Typography>
              );
            }}
            sx={{
              maxWidth: 140,
              minWidth: 120,
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              "& .MuiSelect-select": {
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
              },
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#6200ea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6200ea",
                borderWidth: "1px",
              },
              ".MuiMenu-paper": {
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxHeight: "250px",
                maxWidth: 140,
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                },
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                value={lang.code}
                sx={{
                  fontSize: "14px",
                  padding: "6px 10px",
                  maxWidth: 140,
                  "&:hover": {
                    backgroundColor: "#f3e5f5",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#ede7f6",
                    "&:hover": {
                      backgroundColor: "#f3e5f5",
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 400,
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{lang.flag}</span>
                  {lang.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <div
          id="google_translate_element"
          className="default-widget"
          style={{
            margin: "0 8px 0 0",
            display: "inline-block",
            whiteSpace: "nowrap",
            maxWidth: 140,
            overflow: "hidden",
          }}
        />
      )}
      <div id="google_translate_element" style={{ display: "block", visibility: "hidden", width: 0, height: 0, overflow: "hidden" }} />
      {scriptError && (
        <Typography
          color="error"
          sx={{
            ml: 1,
            fontSize: "12px",
            maxWidth: 100,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: useDefaultWidget ? "block" : "none",
          }}
        >
          Translation unavailable
        </Typography>
      )}
    </Box>
  );
};

export default Translate;