import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./usecasestyle.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "0px 20px",
  margin: "0px 2px",
  border: "0px solid rgba(117, 117, 117, 0.986)",
  borderRadius: "5px",
  backgroundColor: "#4ba046",
  color: "#fff",
  minHeight: "40px",
  cursor: "pointer",
  "&:hover": { backgroundColor: "#c4ecc2", color: "#111" },
  "&.active": { backgroundColor: "#c4ecc2", color: "#111" },
}));

const ButtonBar = [
  {
    key: "keyGov",
    header: "Government",
  },
  {
    key: "keyIns",
    header: "Insurance & Reinsurance Industry",
  },
  {
    key: "keyAgi",
    header: "Agri-Food Industry",
  },
  {
    key: "keyMul",
    header: "Multilateral Agencies",
  },
  {
    key: "keyDon",
    header: "Donor Agencies",
  },
];

const ButtonEffect = ({ activeTab, onTabClick }) => {
  return (
    <Box
      sx={{
        marginTop: "100px",
        textAlign: "left",
        display: { xs: "none", md: "block" },
      }}
    >
      <div className="tabs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            width: "100%",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          {ButtonBar.map((bttns, index) => (
            <Box
              key={bttns.key}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyledButton
                className={activeTab === index ? "active" : ""}
                onClick={() => onTabClick(index)}
              >
                <strong>{bttns.header}</strong>
              </StyledButton>
            </Box>
          ))}
        </Box>
      </div>
    </Box>
  );
};

const Usecase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="carousel-container" style={{ marginBottom: "20px" }}>
      <ButtonEffect activeTab={activeTab} onTabClick={handleTabClick} />
      <Carousel
        selectedItem={activeTab}
        onChange={(index) => setActiveTab(index)}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        stopOnHover={true}
      >
        <div className="carousel-slide">
          <div className="text-area">
            <h2>Government perspective</h2>
            <p>
              ACASA is a vital tool for the government to enhance climate
              resilience, boost agricultural productivity, and ensure
              sustainable rural development.
            </p>
            <ol className="spaced-list">
              <li>
              The Atlas provides data and analysis to support 
              &nbsp;<strong>evidence-based policymaking</strong> for climate-resilient agriculture and strategic resource allocation.
              </li>
              <li>
              Integrated climate forecasts and historical data can<strong> enhance early warning systems</strong>,
               aiding in<strong> disaster preparedness</strong> and mitigation to protect agriculture and rural communities.
              </li>
              <li>
                Localised climate and agricultural data in Atlas can <strong>improve farmer advisory services</strong>, 
                enabling <strong>adaptive farming</strong> techniques to enhance resilience and productivity.
              </li>
              <li>
              The Atlas identifies sustainable practices and <strong>resilient farming methods</strong>,
               supporting rural livelihoods, climate-resilient infrastructure, and economic growth in rural areas.
              </li>
            </ol>
          </div>
          <div className="image-area">
            <img src="farm1.png" alt="Government" />
          </div>
        </div>

        <div className="carousel-slide">
          <div className="text-area">
            <h2 marginTop="-20px">Insurance industry perspective</h2>
            <p>
              The Atlas will support agri-insurance agencies to develop
              well-rounded crop insurance for small-scale producers that is
              dynamic and has sufficient resolution at village level.
            </p>
            <ol className="spaced-list">
              <li>
                The Atlas could propose a{" "}
                <strong>uniform insurance unit framework</strong> to mitigate
                fundamental risks within each unit.
              </li>
              <li>
                Enhancing <strong>risk quantification</strong> and
                identification to boost <strong>insurance penetration</strong>{" "}
                from current levels (28-30%) to 40-50%, potentially lowering
                premiums by 25% with increased penetration.
              </li>
              <li>
                Implementing a <strong>parametric mechanism&nbsp;</strong>for
                insurance claims could improve efficiency, triggered only by
                specific conditions rather than random samples.
              </li>
              <li>
                Utilizing crop growth simulation models alongside{" "}
                <strong>reinsurance crop models</strong> can improve pricing
                accuracy and <strong>dynamic forecasting.</strong>
              </li>
            </ol>
          </div>
          <div className="image-area">
            <img src="farm2.jpg" alt="Insurance Industry" />
          </div>
        </div>

        <div className="carousel-slide">
          <div className="text-area">
            <h2>Agri-food industry perspective</h2>
            <p>
              ACASA is committed to ensuring sustainable agri-food industry and
              inclusive supply chains by promoting:
            </p>
            <ol className="spaced-list">
              <li>
                Collaboration with farmers for sustainable practices and&nbsp;
                <strong>equitable supply chains,</strong> ensuring{" "}
                <strong>quality</strong> through stringent controls.
              </li>
              <li>
                <strong>Enhancement of productivity</strong> by addressing
                challenges of small land holdings and low yields with high-yield
                crop varieties and advanced farming technologies.
              </li>
              <li>
                Promote <strong>climate-resilient agriculture</strong> through
                drought-resistant crops, water-saving irrigation, and soil
                conservation techniques to adapt to climate change.
              </li>
              <li>
                Encourage <strong>decarbonisation</strong> through adoption of
                renewable energy sources like solar, biogas, and biomass to
                reduce the carbon footprint.
              </li>
            </ol>
          </div>
          <div className="image-area">
            <img src="farm4.jpg" alt="AgriFood Industry" />
          </div>
        </div>

        <div className="carousel-slide">
          <div className="text-area">
            <h2>Multi-lateral agencies perspective</h2>
            <p>
              ACASA will provide multi-lateral agencies with strategic data
              insights and directions for adaptation investments in South Asia
              and facilitate more effective project design and planning.
            </p>
            <ol className="spaced-list">
              <li>
                Agencies can systematically <strong>integrate</strong> ACASA
                adaptation&nbsp;
                <strong>recommendations</strong> in their{" "}
                <strong>planning process</strong> to align with Paris agreement
                goals.
              </li>
              <li>
                Data will support agencies to focus on{" "}
                <strong>targeted investments</strong> such as climate-resilient
                food systems, landscapes, and livelihoods especially in regions
                that show high level of adaptation benefits.
              </li>
              <li>
                Multi-lateral agencies can tap{" "}
                <strong>downstream investment opportunities</strong> that can
                benefit from the information generated by ACASA across countries
                and sectors.
              </li>
              <li>
                ACASA serves as an innovative tool for agencies as they
                constantly seek information and expertise on{" "}
                <strong>improving the effectiveness and impact</strong> of their
                initiatives.
              </li>
            </ol>
          </div>
          <div className="image-area">
            <img src="farm3.jpg" alt="Multilateral Agencies" />
          </div>
        </div>

        <div className="carousel-slide">
          <div className="text-area">
            <h2>Donor agencies</h2>
            <p>
              Donors can utilise ACASA to prioritise climate-smart agriculture
              projects benefitting small-scale farmers, pastoralists, and
              promote adaptation strategies that are sound in gender
              considerations, thus maximising the impact of intervention.
            </p>
            <ol className="spaced-list">
              <li>
                Donors can utilise the Atlas to ensure targeted climate
                adaptation for <strong>underserved areas</strong> and{" "}
                <strong>vulnerable populations.</strong>
              </li>
              <li>
                Through <strong>quantitative</strong> and{" "}
                <strong>semi-quantitative risk assessment</strong> data, donors
                can prioritise impactful projects to mitigate climate risks and
                build adaptation capacity.
              </li>
              <li>
                The Atlas includes gender-disaggregated data and specific
                recommendations for{" "}
                <strong>gender-intentional adaptation,</strong> guiding donors
                to promote equity in climate adaptation.
              </li>
              <li>
                The Atlas provides{" "}
                <strong>accessible and actionable data</strong> through
                user-friendly tables and maps, for informed resource allocation
                and structured interventions.
              </li>
            </ol>
          </div>
          <div className="image-area">
            <img src="farm5.jpg" alt="Donor Agencies" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Usecase;
