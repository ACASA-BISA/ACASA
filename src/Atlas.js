$(window).on("load", () => {
    let atlasObj = new Atlas();
    atlasObj.init();
});


class Atlas{
    constructor(){
        this.cookieObject = getCookies(document.cookie);
        this.lookupSheet = "atlas_layer_lookup.xlsx";
        this.map = null;
        this.mapId = "atlas-map";
        this.mapServerHost = "http://34.204.66.237:8080";
        this.mapLegend = $("div#atlas-map-legend");
        this.streetLayerTilesUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
        this.btnScreenshot = $("div.downloapMapData")
        // Common
        this.commonEmptyOption = `<option value="0">---------</option>\n`;
        this.rasterLayer = null;
        this.rasterLayerLegend = null;
        // Locations
        this.countryList = [];
        this.filterCountry = $("select#filter-country");
        this.filterState = $("select#filter-state");
        this.chosenCountryId = null;
        this.chosenCountryObj = null;
        this.chosenCountry = null;
        this.chosenStateId = null;
        this.chosenState = null;
        this.locationLabel = $("span#location-label");
        this.fitGeojsonData = null;
        this.countriesGeoData = null;
        this.statesGeoData = null;
        this.districtsGeoData = null;
        // Commodities
        this.commodityList = [];
        this.chosenCommodity = null;
        this.chosenCommodityId = null;
        this.filterCommodity = $("div#filter-commodity");
        this.commodityLabel = $("div#commodity-label");
        // Risks
        this.fullRiskList = [];
        this.riskList = [];
        this.chosenRisk = null;
        this.chosenRiskId = null;
        this.filterRisk = $("div#filter-risk");
        this.riskLabel = $("div#risk-label");
        // Adaptation Options (Solutions)
        this.fullSolutionList = [];
        this.solutionList = [];
        this.chosenSolution = null;
        this.chosenSolutionId = null;
        this.filterSolution = $("div#filter-solution");
        this.solutionLabel = $("div#solution-label")
        // Adaptation Analytics
        this.fullAnalyticsList = [];
        this.analyticsList = [];
        this.chosenAnalytics = null;
        this.chosenAnalyticsId = null;
        this.filterAnalytics = $("div#filter-analytics");
        this.analyticsLabel = $("div#analytics-label");

        // Solutions data
        this.currentRasterType = "commodity";
        this.solutionsDataIndex = [
            {
                "commodity_id": 1,
                "commodity_solutions_file": "solutions_data_rice.csv",
                "items": [
                    {"field": "DSR%", "color": "darkgreen", "name": "DSR"},
                    {"field": "PrWtrMng", "color": "darkgreen", "name": "Precision water management"},
                    {"field": "DroughtTlSeed%", "color": "darkgreen", "name": "Drought tolerant seeds"},
                    {"field": "Insu%", "color": "darkgreen", "name": "Crop insurance"},
                ],
            },
            // add other commodities here ...
        ];
        this.chosenSolutionsIndexItem = null;
        this.currentSolutionData = [];
        // popup graph
        this.popupContainer = $("div#container-polygon-popup");
        this.popupGraphId = "polygon-popup";
        this.closePopupContainer = $("button#close-polygon-popup");
    }

    init = () => {
        
        this.closePopupContainer.on("click", () => this.popupContainer.hide());
        // d3.select("body").append("svg")
        //     .attr("width", 0)
        //     .attr("height", 0)
        //     .append("defs")
        //     .append("filter")
        //     .attr("id", "drop-shadow")
        //     .attr("height", "150%")
        //     .append("feDropShadow")
        //     .attr("dx", 2.5)
        //     .attr("dy", 2.5)
        //     .attr("stdDeviation", 1);
        if (this.map != undefined || this.map != null) {this.map.remove(); this.map.off();}
        this.mapContainer = L.DomUtil.get(this.mapId);
        if (this.mapContainer != null) this.mapContainer._leaflet_id = null;
        this.map = L.map(this.mapId, {fullscreenControl: true});
        this.streetLayer = L.tileLayer(this.streetLayerTilesUrl, {attribution: null, zoomSnap: 0.1, opacity: 1/3, transparency: 'true'});
        this.streetLayer.addTo(this.map);
        this.map.setView([20.5937, 78.9629], 5);
        this.loadData();
    }


    loadData = () => {
        this.loadExcelFile(`data/${this.lookupSheet}`)
        .then(layerLookup => {
            [this.countryList, this.commodityList, this.fullRiskList, this.fullSolutionList, this.fullAnalyticsList] 
                = this.excelToArray(layerLookup, "country", "commodity", "risk", "adaptation_solution", "adaptation_analytics");
            this.fillCountryOptions();
            this.fillCommodityOptions();
        })
        .then(this.enableCommodityOptions)
        .then(() => {
            // Based on the selected commodity, fill options for risk, solution and analytics
            this.fillRiskOptions();
            this.fillSolutionOptions();
            this.fillAnalyticsOptions();
        })
        .then(this.enableScreenshot)
        .then(() => {
            // check initial cookies, if not set then check first option in each
            this.filterCountry.val(this.cookieObject.countryId || 0).trigger("change");
            $(`input[name="radio-commodity"][value="${this.cookieObject.commodityId || 1}"]`).prop("checked", true).trigger("change");
            let commodityParentCheckboxId = $(`input[name="radio-commodity"]:checked`).data("parent-id");
            $(`input[name="checkbox-commodity-group"][data-id="${commodityParentCheckboxId}"]`).prop("checked", true).trigger("change");
            $(`input[name="checkbox-commodity-group"]:not([data-id="${commodityParentCheckboxId}"])`).prop("checked", false).trigger("change");
        })
        .catch(err => {
            console.error(err);
            alert("Unable to load data, please check")
        })
        .finally(this.stopWaiting)
    }

    enableScreenshot = () => {
        this.btnScreenshot.on('click', () => {
            this.startWaiting()
            this.map.invalidateSize();
            const mapContainer = this.map.getContainer();
            const options = {
                quality: 1,
                width: mapContainer.offsetWidth,
                height: mapContainer.offsetHeight
            };
            domtoimage.toJpeg(mapContainer, options)
            .then(dataUrl => {
                const img = new Image();
                img.src = dataUrl;
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'screenshot.jpeg';
                link.click();
            })
            .catch(function (error) {
                console.error('Screenshot capture error: ', error);
            })
            .finally(this.stopWaiting)
        });
    }


    // COMMODITIES
    fillCommodityOptions = () => {
        let groups = this.uqArray(this.commodityList.map(a => a.group));
        let commodityFilterHtml = groups.map((a, i) => {
            let commodityItemsHtml = 
                this.commodityList.filter(b => b.group == a)
                .map(b => {
                    let optionDisability = b.status ? "" : "disabled"
                    let optionDataAttrs = b.status ? `data-workspace="${b.workspace}" data-layer="${b.layer}" data-status="${b.status}" data-label="${b.label}"` : "";
                    return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-0 ms-1">
                        <input type="radio" name="radio-commodity" class="form-check-input" 
                            id="commodity-${b.id}" value="${b.id}" ${optionDisability} ${optionDataAttrs}
                            data-parent-id="${i}">
                        <label class="form-check-label" for="commodity-${b.id}">${b.label}</label>
                    </div>`
                }).join("\n");
            return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-0 ms-0">
                <input type="checkbox" name="checkbox-commodity-group" class="form-check-input" id="commodity-group-${i}" data-id="${i}">
                <label class="form-check-label" for="commodity-group-${i}">${a}</label>
                <div id="commodity-list-${i}" style="display: none">${commodityItemsHtml}</div>
            </div>`;
        }).join("\n");
        this.filterCommodity.empty().html(commodityFilterHtml);
    }

    enableCommodityOptions = () => {
        $("input[type='checkbox'][name='checkbox-commodity-group']").on('change', e => {
            let currentGroup = $(e.currentTarget);
            let commodityGroupItems = $(`div#commodity-list-${currentGroup.data("id")}`);
            currentGroup.prop('checked') ? commodityGroupItems.show() : commodityGroupItems.hide();
        });
        $("input[type='checkbox'][name='checkbox-commodity-group']:first").prop("checked", true).trigger("change");
        $("input[type='radio'][name='radio-commodity']").on("change", e => {
            let currentItem = $(e.currentTarget);
            this.chosenCommodityId = parseInt(currentItem.val());
            document.cookie = `commodityId=${this.chosenCommodityId}`;
            this.chosenCommodity = this.commodityList.find(b => b.id == this.chosenCommodityId).label;
            this.commodityLabel.empty().html(`<b>${this.chosenCommodity}</b>`)
            // filter the other layers based on selected commodity
            this.riskList = this.fullRiskList.filter(a => a.commodity_id == this.chosenCommodityId);
            this.solutionList = this.fullSolutionList.filter(a => a.commodity_id == this.chosenCommodityId);
            this.analyticsList = this.fullAnalyticsList.filter(a => a.commodity_id == this.chosenCommodityId);
            this.plotRasterLayer(currentItem.data("workspace"), currentItem.data("layer"));
            this.currentRasterType = "commodity";
            this.loadCommoditySolutions();
            // Remove other commodity associated labels if they are present
            this.riskLabel.empty();
            this.solutionLabel.empty();
            this.analyticsLabel.empty();
            // Refill options and bind respective events within
            this.fillRiskOptions();
            this.fillSolutionOptions();
            this.fillAnalyticsOptions();
        });
        $("input[type='radio'][name='radio-commodity']:first").prop("checked", true).trigger("change");
    }

    loadCommoditySolutions = () => {
        this.chosenSolutionsIndexItem = this.solutionsDataIndex.find(a => a.commodity_id == this.chosenCommodityId);
        if(this.chosenSolutionsIndexItem){
            let csvFile = this.chosenSolutionsIndexItem.commodity_solutions_file
            this.loadCSVData(`data/${csvFile}`)
            .then(solutionsCSVData => this.currentSolutionData = this.csvToArray(solutionsCSVData))
            .catch(err => {
                alert("Unable to load country's boundaries");
                console.error(err);
            })
            .finally(this.stopWaiting)
        }
    }

    // RISKS
    fillRiskOptions = () => {
        if(this.riskList.length){
            let types = this.uqArray(this.riskList.map(a => a.type));
            let riskFilterHtml = types.map((a, i) => {
                let group1Items = this.uqArray(this.riskList.filter(b => b.type == a).map(b => b.group1));
                let group1ItemsHtml = group1Items.map((b, j) => {
                    // ungrouped risks
                    let ungroup2Items = this.riskList.filter(c => c.group1 == b && c.type == a && !c.group2);
                    let ungroup2ItemsHtml = "";
                    if(ungroup2Items.length){
                        ungroup2ItemsHtml = ungroup2Items.map(c => {
                            let optionDisability = c.status ? "" : "disabled";
                            let optionDataAttrs = c.status ? `data-workspace="${c.workspace}" data-layer="${c.layer}" data-status="${c.status}" data-label="${c.label}"` : "";
                            return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-1 ms-2">
                                <input type="radio" name="radio-risk" class="form-check-input" 
                                    id="risk-${c.id}" value="${c.id}" ${optionDisability} ${optionDataAttrs} />
                                <label class="form-check-label" for="risk-${c.id}">${c.label}</label>
                            </div>`;
                        }).join("\n")
                    }
                    // grouped risks
                    let group2Items = this.riskList.filter(c => c.group1 == b && c.type == a && c.group2);
                    let group2ItemsHtml = "";
                    if(group2Items.length){
                        let group2s = this.uqArray(group2Items.map(c => c.group2));
                        group2ItemsHtml = group2s.map((c, k) => {
                            let items = group2Items.filter(d => d.group2 == c);
                            let risksUnderGroup2Html = items.map(d => {
                                let optionDisability = d.status ? "" : "disabled";
                                let optionDataAttrs = d.status ? `data-workspace="${d.workspace}" data-layer="${d.layer}" data-status="${d.status}" data-label="${d.label}"` : "";
                                return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-1 ms-3">
                                    <input type="radio" name="radio-risk" class="form-check-input"
                                        id="risk-${d.id}" value="${d.id}" ${optionDisability} ${optionDataAttrs} />
                                    <label class="form-check-label" for="risk-${d.id}">${d.label}</label>
                                </div>`;
                            }).join("\n");
                            return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-1 ms-2">
                                <input type="checkbox" name="checkbox-risk-group2" class="form-check-input" id="risk-${k}-${j}-${i}" data-id="${k}-${j}-${i}" />
                                <label class="form-check-label" for="risk-${k}-${j}-${i}">${c}</label>
                                <div id="risk-list-${k}-${j}-${i}" style="display: none;">${risksUnderGroup2Html}</div>
                            </div>`;
                        }).join("\n");
                    }
                    return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-1 ms-1">
                        <input type="checkbox" name="checkbox-risk-group1" class="form-check-input" id="risk-${j}-${i}" data-id="${j}-${i}" />
                        <label class="form-check-label" for="risk-${j}-${i}">${b}</label>
                        <div id="risk-list-${j}-${i}" style="display: none;">${ungroup2ItemsHtml + group2ItemsHtml}</div>
                    </div>`;
                }).join("\n");
                return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-1 ms-0">
                    <input type="checkbox" name="checkbox-risk-type" class="form-check-input" id="risk-${i}" data-id="${i}"/>
                    <label class="form-check-label" for="risk-${i}">${a}</label>
                    <div id="risk-list-${i}" style="display: none;">${group1ItemsHtml}</div>
                </div>`;
            }).join("\n");
            this.filterRisk.empty().html(riskFilterHtml);
            setTimeout(this.enableRiskOptions, 100);
        } else{
            this.filterRisk.empty().html(`<span class="sub-text-head mt-5">
                Options currently unavailable for ${this.chosenCommodity}
            </span>`);
        }
    }

    enableRiskOptions = () => {
        // Risk type
        $("input[type='checkbox'][name='checkbox-risk-type']").on('click', e => {
            let currentGroup = $(e.currentTarget);
            let riskTypeItems = $(`div#risk-list-${currentGroup.data("id")}`);
            currentGroup.prop('checked') ? riskTypeItems.show() : riskTypeItems.hide(); 
        });
        // Group 1
        $("input[type='checkbox'][name='checkbox-risk-group1']").on('click', e => {
            let currentGroup = $(e.currentTarget);
            let riskGroup1Items = $(`div#risk-list-${currentGroup.data("id")}`);
            currentGroup.prop('checked') ? riskGroup1Items.show() : riskGroup1Items.hide(); 
        });
        // Group 2
        $("input[type='checkbox'][name='checkbox-risk-group2']").on('click', e => {
            let currentGroup = $(e.currentTarget);
            let riskGroup2Items = $(`div#risk-list-${currentGroup.data("id")}`);
            currentGroup.prop('checked') ? riskGroup2Items.show() : riskGroup2Items.hide(); 
        });
        // Main layers
        $("input[type='radio'][name='radio-risk']").on("change", e => {
            let currentItem = $(e.currentTarget);
            this.chosenRiskId = parseInt(currentItem.val());
            this.chosenRisk = this.riskList.find(b => b.id == this.chosenRiskId).label;
            let chosenRiskType = this.riskList.find(b => b.id == this.chosenRiskId).type;
            this.riskLabel.empty().html(`<b>${this.chosenRisk} (${chosenRiskType})</b>`);
            this.plotRasterLayer(currentItem.data("workspace"), currentItem.data("layer"));
            // Uncheck other options
            this.currentRasterType = "risk";
            $("input[type='radio'][name='radio-solution']:checked").prop("checked", false);
            this.solutionLabel.empty();
            $("input[type='radio'][name='radio-analytics']:checked").prop("checked", false);
            this.analyticsLabel.empty();
            // hide other containers
            $("div.variable-label-container#risk-label-container").show();
            $("div.variable-label-container:not(#risk-label-container)").hide();
        });
    }

    // SOLUTIONS
    fillSolutionOptions = () => {
        if(this.solutionList.length){
            let groups = this.uqArray(this.solutionList.map(a => a.group));
            let solutionFilterHtml = groups.map((a, i) => {
                let solutionItemsHtml = this.solutionList.filter(b => b.group == a).map(b => {
                    let optionDisability = b.status ? "" : "disabled"
                    let optionDataAttrs = b.status ? `data-workspace="${b.workspace}" data-layer="${b.layer}" data-status="${b.status}" data-label="${b.label}"` : "";
                    return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-0 ms-1">
                        <input type="radio" name="radio-solution" class="form-check-input" 
                            id="solution-${b.id}" value="${b.id}" ${optionDisability} ${optionDataAttrs} />
                        <label class="form-check-label" for="solution-${b.id}">${b.label}</label>
                    </div>`;
                }).join("\n");
                return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-0 ms-0">
                    <input type="checkbox" name="checkbox-solution-group" class="form-check-input" id="solution-group-${i}" data-id="${i}">
                    <label class="form-check-label" for="solution-group-${i}">${a}</label>
                    <div id="solution-list-${i}" style="display: none">${solutionItemsHtml}</div>
                </div>`;
            }).join("\n");
            this.filterSolution.empty().html(solutionFilterHtml);
            setTimeout(this.enableSolutionOptions, 100);
        } else{
            this.filterSolution.empty().html(`<span class="sub-text-head mt-5">
                Options currently unavailable for ${this.chosenCommodity}
            </span>`);
        }
    }

    enableSolutionOptions = () => {
        // Group
        $("input[type='checkbox'][name='checkbox-solution-group']").on('change', e => {
            let currentGroup = $(e.currentTarget);
            let solutionGroupItems = $(`div#solution-list-${currentGroup.data("id")}`);
            currentGroup.prop('checked') ? solutionGroupItems.show() : solutionGroupItems.hide();
        });
        // Main Layer
        $("input[type='radio'][name='radio-solution']").on("change", e => {
            // Uncheck other options
            this.currentRasterType = "solution";
            $("input[type='radio'][name='radio-risk']:checked").prop("checked", false);
            this.riskLabel.empty();
            $("input[type='radio'][name='radio-analytics']:checked").prop("checked", false);
            this.analyticsLabel.empty();
            // update label and plot layer
            let currentItem = $(e.currentTarget);
            this.chosenSolutionId = parseInt(currentItem.val());
            this.chosenSolution = this.solutionList.find(b => b.id == this.chosenSolutionId).label;
            let analyticsDescription = this.solutionList.find(b => b.id == this.chosenSolutionId).description;
            this.solutionLabel.empty().html(`
                <b>${this.chosenSolution}</b>
                <div><br/>${analyticsDescription}</div>
            `);
            this.plotRasterLayer(currentItem.data("workspace"), currentItem.data("layer"));
            // hide other containers
            $("div.variable-label-container#solution-label-container").show();
            $("div.variable-label-container:not(#solution-label-container)").hide();
        });
    }


    // ANALYTICS
    fillAnalyticsOptions = () => {
        if(this.analyticsList.length){  
            let refShortcut = `
                <div class="col-sm-12 col-md-6 col-lg-6 mt-0 ms-0">
                    <a class="download-link" href="./assets/data/HeuristicModel.pdf" target="_blank" role="link">
                        <h4 class="sub-text-head">Heuristic Model</h4>
                    </a>
                </div>
            `;

            let analyticsFilterHtml =  `<div class="col-sm-12 col-md-6 col-lg-6 mt-0 ms-0">
                <h4 class="sub-text-head">Data</a></hd>
            </div>\n`
            + this.analyticsList.map(a => {
                let optionDisability = a.status ? "" : "disabled"
                let optionDataAttrs = a.status ? `data-workspace="${a.workspace}" data-layer="${a.layer}" data-status="${a.status}" data-label="${a.label}"` : "";
                return `<div class="col-sm-12 col-md-6 col-lg-6 form-check form-switch mt-0 ms-1">
                    <input type="radio" name="radio-analytics" class="form-check-input" 
                        id="analytics-${a.id}" value="${a.id}" ${optionDisability} ${optionDataAttrs} />
                    <label class="form-check-label" for="analytics-${a.id}">${a.label}</label>
                </div>`;
            }).join("\n");
            this.filterAnalytics.empty().html(refShortcut + analyticsFilterHtml);
            setTimeout(this.enableAnalyticsOptions, 100);
        } else{
            this.filterAnalytics.empty().html(`<span class="sub-text-head mt-5">
                Options currently unavailable for ${this.chosenCommodity}
            </span>`);
        }
    }

    enableAnalyticsOptions = () => {
        $("input[type='radio'][name='radio-analytics']").on("change", e => {
            // Uncheck other options
            this.currentRasterType = "analytics";
            $("input[type='radio'][name='radio-risk']:checked").prop("checked", false);
            this.riskLabel.empty();
            $("input[type='radio'][name='radio-solution']:checked").prop("checked", false);
            this.solutionLabel.empty();
            // update labels and plot layer
            let currentItem = $(e.currentTarget);
            this.chosenAnalyticsId = parseInt(currentItem.val());
            this.chosenAnalytics = this.analyticsList.find(b => b.id == this.chosenAnalyticsId).label;
            this.analyticsLabel.empty().html(`<b>${this.chosenAnalytics}</b><br/>`);
            this.plotRasterLayer(currentItem.data("workspace"), currentItem.data("layer"));
            // hide other containers
            $("div.variable-label-container#analytics-label-container").show();
            $("div.variable-label-container:not(#analytics-label-container)").hide();
        });
    }

    // MAIN RASTER LAYER
    plotRasterLayer = (workspace, layer) => {
        let mapServerBaseUrl = `${this.mapServerHost}/geoserver/${workspace}`;
        let baseWMSUrl = `${mapServerBaseUrl}/wms`;
        let baseWMSLegendUrl = `${mapServerBaseUrl}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${workspace}:${layer}`;
        if(this.rasterLayer !== null) this.map.removeLayer(this.rasterLayer);
        if(this.rasterLayerLegend !== null) this.map.removeControl(this.rasterLayerLegend);
        this.rasterLayer = L.tileLayer.betterWms(baseWMSUrl, {
            layers: `${layer}`,
            transparent: true,
            format: 'image/png',
            opacity: 0.85,
        });
        this.map.addLayer(this.rasterLayer);
        this.mapLegend.empty().html(`<img src="${baseWMSLegendUrl}" />`);
    }
    

    // LOCATIONS: Country:State > State:District
    fillCountryOptions = () => {
        let filterCountryHtml = this.countryList.filter(a => a.status).map(a => `<option value="${a.id}">${a.label}</option>`).join("\n");
        this.filterCountry.empty().html(filterCountryHtml);
        this.filterCountry.unbind("change").on("change", () => {
            this.chosenCountryId = parseInt(this.filterCountry.val());
            this.chosenCountryObj = this.countryList.find(a => a.id == this.chosenCountryId);
            document.cookie = `countryId=${this.chosenCountryId || 0}`;
            this.onCountryChange();
        });
    }

    fillStateOptions = () => {
        if(this.chosenCountryId){
            this.filterState.empty();
            let filterStateHtml = this.statesGeoData.features
                            .map(a => a.properties)
                            .map(a => `<option value="${a.S_CODE}">${a.S_NAME}</option>`).join("\n");
            this.filterState.empty().html(this.commonEmptyOption + filterStateHtml)
        } else this.filterState.empty().html(this.commonEmptyOption);
    }

    enableStateChange = () => {
        if(this.chosenCountryId) this.filterState.unbind("change").on("change", () => this.onStateChange(parseInt(this.filterState.val())))
        else this.filterState.unbind("change");
    }

    onCountryChange = () => {
        this.locationLabel.empty().html(`<b>${this.chosenCountryObj.label}</b>`);
        let [countriesMapFile, statesMapFile] = [this.chosenCountryObj.outline_map, this.chosenCountryObj.states_map];
        this.chosenState = null;
        this.chosenStateId=null;
        if(!this.chosenCountryId){
            this.loadVectorFile(countriesMapFile)
            .then(topoData => this.countriesGeoData = topojson.feature(topoData, topoData.objects.collection))
            .then(() => {
                this.plotCountries();
                this.fitGeojsonData = L.geoJson(this.countriesGeoData, {}).getBounds();
                this.map.fitBounds(this.fitGeojsonData);
            })
            .then(this.fillStateOptions)
            .then(this.enableStateChange)
            .catch(err => { alert("Unable to load South Asia's country level boundaries"); console.error(err);})
            .finally(() => this.stopWaiting())
        } else{
            this.loadVectorFile(statesMapFile)
            .then(topoData => {
                this.statesGeoData = topojson.feature(topoData, topoData.objects.collection)
            })
            .then(() => {
                this.plotStates();
                this.fitGeojsonData = L.geoJson(this.statesGeoData, {}).getBounds();
                this.map.fitBounds(this.fitGeojsonData)
            })
            .then(this.fillStateOptions)
            .then(this.enableStateChange)
            .catch(err => {alert(`Unable to load ${this.chosenCountryObj.label}'s state level boundaries`); console.error(err);})
            .finally(() => this.stopWaiting())
        }        
    }

    onStateChange = (chosenStateId) => {
        this.chosenStateId = chosenStateId;
        if(this.chosenStateId){
            this.chosenState = this.statesGeoData.features.map(a => a.properties).find(a => a.S_CODE == chosenStateId)?.S_NAME;            
            this.locationLabel.empty().html(`<b>${this.chosenState}, ${this.chosenCountryObj.label}</b>`);
            this.loadVectorFile(this.chosenCountryObj.districts_map)
            .then(topoData => {
                this.districtsGeoData = topojson.feature(topoData, topoData.objects.collection);
                this.districtsGeoData.features = this.districtsGeoData.features.filter(a => a.properties.S_CODE == this.chosenStateId);
            })
            .then(() => {
                this.plotDistricts(chosenStateId);
                this.fitGeojsonData = L.geoJson(this.districtsGeoData, {}).getBounds();
                this.map.fitBounds(this.fitGeojsonData)
            })
            .catch(err => {alert(`Unable to load ${this.chosenCountryObj.label}'s district level boundaries`); console.error(err);})
            .finally(() => this.stopWaiting())
        } else{
            this.chosenState = null;
            this.locationLabel.empty().html(`<b>${this.chosenCountryObj.label}</b>`);
            this.loadVectorFile(this.chosenCountryObj.states_map)
            .then(topoData => {
                this.statesGeoData = topojson.feature(topoData, topoData.objects.collection)
            })
            .then(() => {
                this.plotStates();
                this.fitGeojsonData = L.geoJson(this.statesGeoData, {}).getBounds();
                this.map.fitBounds(this.fitGeojsonData)
            })
            .catch(err => {alert(`Unable to load ${this.chosenCountryObj.label}'s state level boundaries`); console.error(err);})
            .finally(() => this.stopWaiting());
        }
    }

    removeSvgAll = () => {
        this.map.eachLayer(l => {
            if (l.options.id && l.options.id.indexOf(`countries`) === 0) this.map.removeLayer(l);
            if (l.options.id && l.options.id.indexOf(`states`) === 0) this.map.removeLayer(l);
            if (l.options.id && l.options.id.indexOf(`districts`) === 0) this.map.removeLayer(l);
        });
    }

    plotCountries = () => {
        // Plot all country boundaries of South Asia
        this.removeSvgAll();
        let tooltip;
        let geoDataFeatures = this.countriesGeoData.features;
        let polygons = L.d3SvgOverlay((selection, projection) => {
            let pScale = projection.scale;
            let locationGroup = selection.selectAll("path").data(geoDataFeatures);
            locationGroup.enter()
                .append("path")
                .attr("d", d => projection.pathFromGeojson(d))
                .attr("class", `countries-polygon`)
                .attr("id", d => `country_${d.properties.C2_CODE}`)
                .attr("style", "z-index:10000;pointer-events:visiblePainted !important")
                .attr("stroke", "black")
                .attr("stroke-width", "0.5px")
                .attr("fill", "transparent")
                .attr("fill-opacity", 0.25)
                .on("mouseover", (e, d) => {
                    d3.select(`country_${d.properties.C2_CODE}`).attr("cursor", "pointer");
                    let tooltipContent = `${d.properties.C_NAME}`;
                    tooltip = projection.layer.bindTooltip(tooltipContent).openTooltip(
                        L.latLng(projection.layerPointToLatLng(projection.pathFromGeojson.centroid(d)))
                    );
                })
                .on("mouseleave", (e, d) => tooltip?.closeTooltip())
                // .style("filter", "url(#drop-shadow)");
            locationGroup.transition().duration(10).attr("stroke-width", `${0.5/pScale}px`);
        }, {"id": `countries`})
        polygons.addTo(this.map);
    }

    plotStates = () => {
        // Plot all states of the selected country
        this.removeSvgAll();
        let tooltip;
        let geoDataFeatures = this.statesGeoData.features;
        let polygons = L.d3SvgOverlay((selection, projection) => {
            let pScale = projection.scale;
            let locationGroup = selection.selectAll("path").data(geoDataFeatures);
            locationGroup.enter()
                .append("path")
                .attr("d", d => projection.pathFromGeojson(d))
                .attr("class", `states-polygon`)
                .attr("id", d => `state_${d.properties.S_CODE}`)
                .attr("style", "z-index:10000;pointer-events:visiblePainted !important")
                .attr("stroke", "black")
                .attr("stroke-width", "0.5px")
                .attr("fill", "transparent")
                .attr("fill-opacity", 0.25)
                .on("mouseover", (e, d) => {
                    d3.select(`state_${d.properties.S_CODE}`).attr("cursor", "pointer");
                    let tooltipContent = `${d.properties.S_NAME}`;
                    tooltip = projection.layer.bindTooltip(tooltipContent).openTooltip(
                        L.latLng(projection.layerPointToLatLng(projection.pathFromGeojson.centroid(d)))
                    );
                })
                .on("mouseleave", (e, d) => tooltip?.closeTooltip())
                // .style("filter", "url(#drop-shadow)");
            locationGroup.transition().duration(10).attr("stroke-width", `${0.5/pScale}px`);
        }, {"id": `states`})
        polygons.addTo(this.map);
    }

    plotDistricts = () => {
        this.removeSvgAll();
        let tooltip;
        let geoDataFeatures = this.districtsGeoData.features;
        let polygons = L.d3SvgOverlay((selection, projection) => {
            let pScale = projection.scale;
            let locationGroup = selection.selectAll("path").data(geoDataFeatures);
            locationGroup.enter()
                .append("path")
                .attr("d", d => projection.pathFromGeojson(d))
                .attr("class", `districts-polygon`)
                .attr("id", d => `district_${d.properties.CN_DT_Code}`)
                .attr("style", "z-index:10000;pointer-events:visiblePainted !important")
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("fill", "transparent")
                .attr("fill-opacity", 0.25)
                .on("mouseover", (e, d) => {
                    d3.select(`district_${d.properties.CN_DT_Code}`).attr("cursor", "pointer");
                    let tooltipContent = `${d.properties.D_NAME}, ${d.properties.S_NAME}`;
                    tooltip = projection.layer.bindTooltip(tooltipContent).openTooltip(
                        L.latLng(projection.layerPointToLatLng(projection.pathFromGeojson.centroid(d)))
                    );
                })
                .on("mouseleave", (e, d) => tooltip?.closeTooltip())
                .on("click", (e, d) => {
                    debugger;
                    if(this.currentRasterType == "solution" && this.chosenSolutionsIndexItem){
                        this.showSolutionVisual(e, d);
                        debugger
                    }
                })
                // .style("filter", "url(#drop-shadow)");
                
            locationGroup.transition().duration(10).attr("stroke-width", `${1/pScale}px`);
        }, {"id": `districts`})
        polygons.addTo(this.map);
    }

    showSolutionVisual = (e, d) => {
        debugger;
        let dataPoint = this.currentSolutionData.find(a => a.CN_DT_Code == d.properties.CN_DT_Code);
        let fieldsForChart = this.chosenSolutionsIndexItem.items.map(a => a.field);
        let chartData = fieldsForChart.map(a => {
            let prop = this.chosenSolutionsIndexItem.items.find(b => b.field == a);
            return {"name": prop.name, "color": prop.color, "y": dataPoint[a]};
        });

        let someValuesAvailable = chartData.map(a => a.y).some(Boolean);
        if(someValuesAvailable){
            let names = chartData.map(item => item.name);
            Highcharts.chart(this.popupGraphId, {
                chart: {type: 'column', backgroundColor: "transparent"},
                credits: {enabled: false},
                title: {text: null},
                subtitle: {
                    text: `Solution suitability for percentage of area | ${d.properties.D_NAME}, ${d.properties.S_NAME}`, 
                    style: {color: '#000', size: '8px'},
                },
                xAxis: {categories: names, labels: {style: {color: '#000'},}, gridLineWidth: 0},
                yAxis: {title: {text: null, style: {color: '#000'}}, labels: {style: {color: '#000'},}, gridLineWidth: 0},
                legend: {enabled: false},
                plotOptions: {colorByPoint: true},
                series: [
                    {
                        name: "Suitability for percentage of area",
                        data: chartData,
                    }
                ]
            });
            this.popupContainer.show();
        } else{
            $(`div#${this.popupGraphId}`).empty().html(`<div class="my-5">
                Data not available for ${d.properties.D_NAME}, ${d.properties.S_NAME}
            </div>`);
            this.popupContainer.show();
        }
    }



    loadVectorFile = (fileName) =>  new Promise((resolve, reject) => {
        $.ajax({
            "type": "GET",
            "url": `./assets/vector_maps/${fileName}`,
            "beforeSend": () => this.startWaiting(),
            "success": response => resolve(JSON.parse(response)),
            "error": err => reject(err)
        });
    });

    excelToArray = (file, ...sheets) => {
        let wb = XLSX.read(file, {type: 'binary'});
        return sheets.map(sheet => {
            let rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, raw: false });
            let header = rows[0];
            let body = rows.slice(1,);
            let data = body.map(a => {
                let result = {};
                header.forEach((b, i) => result[b] = ["NULL", undefined, null].includes(a[i]) ? null : (isNaN(a[i]) ? a[i].replace(/\"/g, "") : this.num(a[i])));
                return result;
            });
            return data;
        })
    }

    loadExcelFile = (fileName) => new Promise((resolve, reject) => {
        this.startWaiting()
        fetch(`./assets/${fileName}`).then(res => res.blob()).then(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const bstr= e.target.result;
                resolve(bstr)
            }
            reader.readAsBinaryString(file);
        }).catch(err => reject(err))
    });

    csvToArray = (csvText) => {
        let wb = XLSX.read(csvText, {type:"binary"});
        let rows = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1, {header:1, raw:false});
        let header = rows[0];
        let body = rows.slice(1,);
        let data = body.map(a => {
            let result = {};
            header.forEach((b, i) => result[b] = ["", undefined, null].includes(a[i]) ? null : (isNaN(a[i]) ? a[i].replace(/\"/g, "") : this.num(a[i])));
            return result;
        });
        return data;
    }

    loadCSVData = (fileName) => new Promise((resolve, reject) => {
        $.ajax({
            "type": "GET",
            "url": `./assets/${fileName}`,
            "beforeSend": () => this.startWaiting(),
            "success": response => resolve(response),
            "error": err => reject(err)
        });
    });

    uqArray = (arr) => [...new Set(arr)];
    sumArray = (arr) => arr.reduce((a, b) => a + b, 0);
    num = (val) => !isNaN(val) ? parseFloat(val) : 0;

    startWaiting = () => {
        let loadingIcon = `<div class="text-center"><div class="fa-3x mb-1"><i class="fa fa-spinner fa-pulse" aria-hidden="true"></i></div><span>Loading</span></div>`;
        $("#loading-modal-container").empty().html(loadingIcon);
        $('#loading-modal').modal('show');
    }

    stopWaiting = () => {
        $("#loading-modal-container").empty();
        $("#loading-modal").modal("hide");
    }
}
