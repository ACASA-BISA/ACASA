import { useEffect } from "react";

const Translate = () => {
  const googleTranslateElementInit = () => {
    try {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,fr,hi,bn,ta,ne,si,ur,dz,ps", // Add languages as needed
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
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
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
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
      .goog-te-gadget-simple {
        border-radius: 20px !important; 
        overflow: hidden;
        background-color: #ccc !important; 
        color: white !important;
        font-weight: bold !important; 
      }
      .goog-te-gadget-simple .goog-te-menu-value {
        border-radius: 20px !important;
        background-color: #ccc !important; 
        color: white !important; 
        font-weight: bold !important; 
      }
      .goog-te-gadget-simple .goog-te-menu-value span {
        border-radius: 20px !important;
        background-color: #ccc !important; 
        color: white !important;
        font-weight: bold !important; 
      }
      .goog-logo-link {
        display: none !important;
      }
      .goog-te-gadget .goog-te-combo {
        margin-left: 0;
        color: white !important;
        font-weight: bold !important;
      }
        .goog-te-combo option {
        color: black !important;
      }
      .goog-te-banner-frame {
        height: 40px !important; 
        background-color: red !important;
      }
      .goog-te-banner-frame .goog-te-banner-content {
        padding: 0 !important; 
        line-height: 40px !important; 
        font-size: 16px !important; 
        color: white !important; 
      }
    `;
    document.head.appendChild(style);
  }, []); 

  return <div id="google_translate_element" style={{marginRight:'10px'}}></div>;
};

export default Translate;
