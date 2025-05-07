if (exploreType === "Regional") {
    if (activeOpt !== "") {
      opt = 333;
      let urlstr = "xyz.tif";

      if (activeScenario === "baseline") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
      } else if (activeScenario === "ssp245") {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
      } else {
        urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Suitability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
      }

      if (checkcrop2() === false) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Baseline_CHC_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/SSP245_CHC_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/SSP585_CHC_" + activeCrop + "_" + optcode[activeOpt] + ".tif";
        }
      }
      if (activeOptLayer["Scalability"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Scalability_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 222;
      }
      if (activeOptLayer["Gender"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Gender_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 777;
      }
      if (activeOptLayer["Female labourer suitability"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Labour_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Labour_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Labour_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 777;
      }
      if (activeOptLayer["Female cultivator suitability"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Cultivator_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Cultivator_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Cultivator_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 777;
      }
      if (activeOptLayer["Yield"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Yield_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 222;
      }
      if (activeOptLayer["Economic"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/Baseline/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_baseline.tif";
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Economic_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
        }
        opt = 222;
      }
      if (activeOptLayer["Adaptation Benefits"]) {
        if (activeScenario === "baseline") {
          urlstr = "./Impact/" + activeCrop + "_Productivity_" + activeScenario + ".tif";
          opt = 222;
        } else if (activeScenario === "ssp245") {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP245/Adaptation_" + activeCrop + "_" + optcode[activeOpt] + "_ssp245.tif";
          opt = 444;
        } else {
          urlstr = "./Adap/" + activeCrop + "/" + modelName + "/SSP585/Adaptation_" + activeCrop + "_" + optcode[activeOpt] + "_ssp585.tif";
          opt = 444;
        }
      }
      //console.log(urlstr);
      //console.log(activeOptLayer);
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({ sources: [{ url: urlstr }], sourceOptions: { allowFullFile: true } });
    } else if (CurrRisk !== "") {
      opt = 3;
      let urlstr = "xyz.tif";
      let district_n = "";
      let district_prefix = "";
      if (activeScale === "District Level") {
        district_n = "District/";
        district_prefix = "District_";
      }
      if (activeScale === "State Level") {
        district_n = "State/";
        district_prefix = "District_";
      }
      if (activeScenario === "baseline") {
        //urlstr = "./Hazards/" + activeCrop + "/Baseline/" + district_n + "ZZ_" + hazardname[CurrRisk] + ".tif";
        //if (checkcrop2() === false) {
        urlstr = "./Hazards/" + "Regional" + "/" + modelName + "/" + district_n + "Baseline/" + `${district_prefix}Baseline_${modelName}_Regional_${hazardname[CurrRisk]}` + ".tif";
        //}
      } else {
        if (displayLayer === "Absolute Change") {
          opt = 102;
          urlstr = "./Hazards/" + activeCrop + "/" + activeScenario.toUpperCase() + "/" + district_n + "Abs_ZZ_" + hazardname[CurrRisk] + ".tif";
        } else if (displayLayer === "Percentage Change") {
          opt = 102;
          urlstr = "./Hazards/" + activeCrop + "/Percentage Change/" + activeScenario.toUpperCase() + "/" + district_n + "Cat_ZZ_" + hazardname[CurrRisk] + ".tif";
        } else {
          //urlstr = "./Hazards/" + activeCrop + "/" + activeScenario.toUpperCase() + "/" + district_n + "ZZ_" + hazardname[CurrRisk] + ".tif";
          //if (checkcrop2() === false) {
          urlstr =
            "./Hazards/" +
            "Regional" +
            "/" +
            modelName +
            "/" +
            district_n +
            activeScenario.toUpperCase() +
            "/" +
            `${district_prefix}${activeScenario.toUpperCase()}_${modelName}_Regional_${hazardname[CurrRisk]}` +
            ".tif";
          //}
        }
      }
      /* if(CurrRisk==='Hazard Index'){
        opt=4;
        urlstr = "./Hazard_index/"+activeCrop+".tif";
      } */
      /* if (CurrRisk === "Flood") {
        opt = 99;
      } */
      /* if (CurrRisk === "Seasonal Rainfall" || CurrRisk === "Maximum Temperature" || CurrRisk === "Minimum Temperature") {
        opt = 4;
        urlstr = "./BaseClimate/" + hazardname[CurrRisk] + ".tif";
      } */
      /* if (checkcrop2() === false) {
        opt = 101;
      } */
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({
        sources: [{ url: urlstr }],
        sourceOptions: { allowFullFile: true },
      });
    } else if (activeImpact["Productivity"] || activeImpact["Value of Production"] || activeImpact["Resilience"]) {
      let urlstr = "xyz.tif";
      opt = 555;
      if (activeImpact["Productivity"]) {
        urlstr = "./Impact/" + activeCrop + "_Productivity_" + activeScenario + ".tif";
      } else if (activeImpact["Resilience"]) {
        urlstr = "./Impact/" + activeCrop + "_CV_" + activeScenario + ".tif";
        opt = 666;
      } else {
        urlstr = "./Impact/" + activeCrop + "_VOP_" + activeScenario + ".tif";
      }
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({
        sources: [{ url: urlstr }],
        sourceOptions: { allowFullFile: true },
      });
    } else {
      let urlstr = "./Crop Masks/Extent/" + activeCrop + ".tif";
      settiffFilePath(urlstr);
      source1 = new GeoTIFF({
        sources: [{ url: urlstr }],
        sourceOptions: { allowFullFile: true },
      });
    }

    source1.on("change", function () {
      const state = source1.getState();
      if (state === "error") {
        setmsource(true);
      } else if (state === "ready") {
        setmsource(false);
      }
    });
  }