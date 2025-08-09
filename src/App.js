import "./App.css";
import * as React from "react";
import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
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

// Initialize Google Analytics
ReactGA.initialize("G-KE0VBWC68L");

function App() {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return (
    <div className="App">
      <BrowserCheck />
      <ThemeProviderWrapper>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<TestHome />} />
          <Route path="/:country/home" element={<TestHome />} />
          <Route path="/about" element={<DrawerMapShow activeBar="about" />} />
          <Route path="/:country/about" element={<DrawerMapShow activeBar="about" />} />
          <Route path="/dashboard" element={<Test />} />
          <Route path="/:country/dashboard" element={<Test />} />
          <Route path="/adaptationataglance" element={<DrawerMapShow activeBar="analytics" />} />
          <Route path="/:country/adaptationataglance" element={<DrawerMapShow activeBar="analytics" />} />
          <Route path="/access" element={<DrawerMapShow activeBar="access" />} />
          <Route path="/:country/access" element={<DrawerMapShow activeBar="access" />} />
          <Route path="/resources" element={<DrawerMapShow activeBar="resources" />} />
          <Route path="/:country/resources" element={<DrawerMapShow activeBar="resources" />} />
          <Route path="/usecases" element={<UseCases />} />
          <Route path="/:country/usecases" element={<UseCases />} />
          <Route path="/guide" element={<DrawerMapShow activeBar="guide" />} />
          <Route path="/:country/guide" element={<DrawerMapShow activeBar="guide" />} />
          <Route path="/hazardataglance" element={<DrawerMapShow activeBar="hazards" />} />
          <Route path="/:country/hazardataglance" element={<DrawerMapShow activeBar="hazards" />} />
          <Route path="/future" element={<DrawerMapShow activeBar="future2" />} />
          <Route path="/:country/future" element={<DrawerMapShow activeBar="future2" />} />
          <Route path="/comparison" element={<DrawerMapShow activeBar="comparison" />} />
          <Route path="/:country/comparison" element={<DrawerMapShow activeBar="comparison" />} />
          <Route path="/summary" element={<DrawerMapShow activeBar="summary" />} />
          <Route path="/:country/summary" element={<DrawerMapShow activeBar="summary" />} />
          <Route path="/timeline" element={<DrawerMapShow activeBar="timeline" />} />
          <Route path="/:country/timeline" element={<DrawerMapShow activeBar="timeline" />} />
          <Route path="/adaptation" element={<DrawerMapShow activeBar="adaptation" />} />
          <Route path="/:country/adaptation" element={<DrawerMapShow activeBar="adaptation" />} />
          <Route path="/adaptation2" element={<DrawerMapShow activeBar="adaptation2" />} />
          <Route path="/:country/adaptation2" element={<DrawerMapShow activeBar="adaptation2" />} />
          <Route path="/feedback" element={<Feedback1 />} />
          <Route path="/:country/feedback" element={<Feedback1 />} />
          <Route path="/:country/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <ScrollToTop />
      </ThemeProviderWrapper>
    </div>
  );
}

export default App;