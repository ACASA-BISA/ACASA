import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import ResponsiveAppBar from "./Appbar";
import "./ScrollBar.css";
import { ThemeProviderWrapper } from "./ThemeContext";
import BrowserCheck from "./BrowserCheck";
import Home from "./Home";
import Test from "./Test/Test";
import TestHome from "./Test/TestHome";
import UseCases from "./Test/UseCases";
import AnalyticsPage from "./Test/AnalyticsPage";
import DrawerMapShow from "./DrawerMapShow";
import Feedback1 from "./Feedback";
import ScrollToTop from "./scrolltop";
import DataGlance from "./Test/DataGlance";
import AdaptationDataGlance from "./Test/AdaptationDataGlance";

// Initialize Google Analytics
ReactGA.initialize("G-KE0VBWC68L");

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [validCountries, setValidCountries] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch valid countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${apiUrl}/lkp/locations/countries`);
        const data = await response.json();
        if (data.success) {
          const activeCountries = data.data
            .filter((country) => country.status)
            .map((country) => country.country.toLowerCase());
          setValidCountries(activeCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Track page views and validate country in URL
  useEffect(() => {
    const path = location.hash ? location.hash.replace(/^#\/?/, "") : location.pathname.replace(/^\//, "");
    const pathSegments = path.split("/");
    const urlCountry = pathSegments[0] && !["home", "dashboard", "dataglance", "access", "usecases", "resources", "about", "feedback", "analytics", "hazardglance", "adaptationglance", "future", "comparison", "summary", "timeline", "adaptation", "adaptation2", "adaptationataglance", "hazardataglance"].includes(pathSegments[0]) ? pathSegments[0] : null;

    // Redirect if country is invalid
    if (urlCountry && !validCountries.includes(urlCountry.toLowerCase())) {
      const newPath = pathSegments.slice(1).join("/") || "home";
      navigate(`/${newPath}`, { replace: true });
    }

    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search + location.hash });
  }, [location, validCountries, navigate]);

  return (
    <div className="App">
      <BrowserCheck />
      <ThemeProviderWrapper>
        <ResponsiveAppBar validCountries={validCountries} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<TestHome />} />
          {validCountries.map((country) => (
            <Route key={`${country}-home`} path={`/${country}/home`} element={<TestHome />} />
          ))}
          <Route path="/about" element={<DrawerMapShow activeBar="about" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-about`} path={`/${country}/about`} element={<DrawerMapShow activeBar="about" />} />
          ))}
          <Route path="/dashboard" element={<Test />} />
          {validCountries.map((country) => (
            <Route key={`${country}-dashboard`} path={`/${country}/dashboard`} element={<Test />} />
          ))}
          <Route path="/adaptationataglance" element={<DrawerMapShow activeBar="analytics" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-adaptationataglance`} path={`/${country}/adaptationataglance`} element={<DrawerMapShow activeBar="analytics" />} />
          ))}
          <Route path="/access" element={<DrawerMapShow activeBar="access" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-access`} path={`/${country}/access`} element={<DrawerMapShow activeBar="access" />} />
          ))}
          <Route path="/resources" element={<DrawerMapShow activeBar="resources" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-resources`} path={`/${country}/resources`} element={<DrawerMapShow activeBar="resources" />} />
          ))}
          <Route path="/usecases" element={<UseCases />} />
          {validCountries.map((country) => (
            <Route key={`${country}-usecases`} path={`/${country}/usecases`} element={<UseCases />} />
          ))}
          <Route path="/guide" element={<DrawerMapShow activeBar="guide" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-guide`} path={`/${country}/guide`} element={<DrawerMapShow activeBar="guide" />} />
          ))}
          <Route path="/hazardataglance" element={<DrawerMapShow activeBar="hazards" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-hazardataglance`} path={`/${country}/hazardataglance`} element={<DrawerMapShow activeBar="hazards" />} />
          ))}
          <Route path="/future" element={<DrawerMapShow activeBar="future2" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-future`} path={`/${country}/future`} element={<DrawerMapShow activeBar="future2" />} />
          ))}
          <Route path="/comparison" element={<DrawerMapShow activeBar="comparison" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-comparison`} path={`/${country}/comparison`} element={<DrawerMapShow activeBar="comparison" />} />
          ))}
          <Route path="/summary" element={<DrawerMapShow activeBar="summary" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-summary`} path={`/${country}/summary`} element={<DrawerMapShow activeBar="summary" />} />
          ))}
          <Route path="/timeline" element={<DrawerMapShow activeBar="timeline" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-timeline`} path={`/${country}/timeline`} element={<DrawerMapShow activeBar="timeline" />} />
          ))}
          <Route path="/adaptation" element={<DrawerMapShow activeBar="adaptation" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-adaptation`} path={`/${country}/adaptation`} element={<DrawerMapShow activeBar="adaptation" />} />
          ))}
          <Route path="/adaptation2" element={<DrawerMapShow activeBar="adaptation2" />} />
          {validCountries.map((country) => (
            <Route key={`${country}-adaptation2`} path={`/${country}/adaptation2`} element={<DrawerMapShow activeBar="adaptation2" />} />
          ))}
          <Route path="/feedback" element={<Feedback1 />} />
          {validCountries.map((country) => (
            <Route key={`${country}-feedback`} path={`/${country}/feedback`} element={<Feedback1 />} />
          ))}
          <Route path="/analytics" element={<AnalyticsPage />} />
          {validCountries.map((country) => (
            <Route key={`${country}-analytics`} path={`/${country}/analytics`} element={<AnalyticsPage />} />
          ))}
          <Route path="/hazardglance" element={<DataGlance />} />
          {validCountries.map((country) => (
            <Route key={`${country}-hazardglance`} path={`/${country}/hazardglance`} element={<DataGlance />} />
          ))}
          <Route path="/adaptationglance" element={<AdaptationDataGlance />} />
          {validCountries.map((country) => (
            <Route key={`${country}-adaptationglance`} path={`/${country}/adaptationglance`} element={<AdaptationDataGlance />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
        <ScrollToTop />
      </ThemeProviderWrapper>
    </div>
  );
}

export default App;