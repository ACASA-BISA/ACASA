import { useEffect } from "react";

const Translate = () => {
  const googleTranslateElementInit = () => {
    try {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,fr,hi,bn,ta,ne,si,ur,dz,ps,es,zh-CN", // Add languages as needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    } catch (error) {
      console.error("Google Translate script not loaded correctly: ", error);
    }
  };

  useEffect(() => {
    if (!document.querySelector("#google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);
    }

    window.googleTranslateElementInit = googleTranslateElementInit;

    //  script loaded
    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);

  // CSS - hide the Google Translate widget bar
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
        border: none !important;
      }
      body {
        top: 0 !important;
      }
      .goog-te-gadget-icon {
        display: none !important;
      }
      /* Customize the Translate button appearance */
      .goog-te-gadget-simple {
        border-radius: 8px !important;
        background-color: #ccc !important; /* Change background */
        color: white !important; /* Text color */
        font-size: 12px !important; /* Smaller font size */
        padding: 4px 4px !important; /* Reduce padding */
        height: 8px !important;
        display: inline-flex !important;
        align-items: center !important;
      }

      /* Dropdown box styling */
      .goog-te-combo {
        height: 10px !important; /* Adjust dropdown height */
        font-size: 12px !important; /* Adjust dropdown font size */
        color: #333 !important; /* Text color inside dropdown */
        border: 1px solid #ccc !important;
        border-radius: 4px !important;
      }
      .goog-logo-link {
        display: none !important;
      }
      
    `;
    document.head.appendChild(style);
  }, []);

  return <div id="google_translate_element" style={{ margin: "0px", marginRight: "10px" }}></div>;
};

export default Translate;
