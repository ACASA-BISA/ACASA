import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Test.css";
import { Button, Grid, Toolbar, IconButton, Drawer, Switch, Typography, FormGroup, List, Box, Tooltip, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, FormControlLabel, FormControl, FormLabel, MenuItem, Select, } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Swal from "sweetalert2";
import MapViewer from "./MapViewer";

const drawerWidth = 254;

function Test() {
    useEffect(() => {
        document.documentElement.style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
    }, []);

    const { country } = useParams();
    const [open, setOpen] = useState(true);
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState(0);
    const [showCountrySelect, setShowCountrySelect] = useState(true);
    const [states, setStates] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(0);
    const [disabledStateFilter, setDisableStateFilter] = useState(true);
    const [commodityTypes, setCommodityTypes] = useState([]);
    const [selectedCommodityTypeId, setSelectedCommodityTypeId] = useState(1); // Default to Crops
    const [commodities, setCommodities] = useState([]);
    const [filteredCommodities, setFilteredCommodities] = useState([]);
    const [selectedCommodityId, setSelectedCommodityId] = useState("");
    const [analysisScopes, setAnalysisScopes] = useState([]);
    const [selectedScopeId, setSelectedScopeId] = useState("");
    const [visualizationScales, setVisualizationScales] = useState([]);
    const [selectedScaleId, setSelectedScaleId] = useState("");
    const [climateScenarios, setClimateScenarios] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState("");
    const [dataSources, setDataSources] = useState([]);
    const [selectedDataSourceId, setSelectedDataSourceId] = useState("");
    const [risks, setRisks] = useState([]);
    const [selectedRiskId, setSelectedRiskId] = useState("");
    const [impacts, setImpacts] = useState([]);
    const [selectedImpactId, setSelectedImpactId] = useState("");
    const [adaptations, setAdaptations] = useState([]);
    const [selectedAdaptationId, setSelectedAdaptationId] = useState("");
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [geojsonData, setGeojsonData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState({
        region: true,
        dataType: false,
        analysis: false,
        commodity: false,
        scenario: false,
        risk: false,
        impact: false,
        adaptation: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const toggleDrawer = () => {
        setOpen((prevOpen) => {
            const newOpen = !prevOpen;
            if (!newOpen) {
                setIsSidebarOpen({
                    region: false,
                    dataType: false,
                    analysis: false,
                    commodity: false,
                    scenario: false,
                    risk: false,
                    impact: false,
                    adaptation: false,
                });
            }
            return newOpen;
        });
    };

    const handleSidebarToggle = (sidebar) => {
        setOpen(true);
        setIsSidebarOpen((prev) => {
            const newState = {
                region: false,
                dataType: false,
                analysis: false,
                commodity: false,
                scenario: false,
                risk: false,
                impact: false,
                adaptation: false,
            };
            newState[sidebar] = !prev[sidebar];
            return newState;
        });
    };

    const fetchData = useCallback(
        async (endpoint, setter, params = "") => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiUrl}/${endpoint}${params}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const { success, data } = await response.json();
                if (!success) throw new Error(`API error: ${endpoint}`);
                setter(data || []);
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || `Error loading ${endpoint}`,
                });
                setter([]);
            } finally {
                setIsLoading(false);
            }
        },
        [apiUrl]
    );

    const fetchGeojson = useCallback(
        async (admin_level, admin_level_id) => {
            setIsLoading(true);
            try {
                const geojsonRes = await fetch(`${apiUrl}/layers/geojson`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        admin_level,
                        admin_level_id,
                    }),
                });
                if (!geojsonRes.ok) throw new Error(`GeoJSON error! Status: ${geojsonRes.status}`);
                const geojsonData = await geojsonRes.json();
                if (!geojsonData.success || !geojsonData.data) {
                    throw new Error("No valid GeoJSON data returned");
                }
                setGeojsonData(geojsonData.data);
            } catch (err) {
                console.error("Error fetching GeoJSON:", err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || "Failed to load GeoJSON data.",
                });
                setGeojsonData(null);
            } finally {
                setIsLoading(false);
            }
        },
        [apiUrl]
    );

    useEffect(() => {
        fetchData("lkp/locations/countries", setCountries);
        fetchData("lkp/common/commodity_types", setCommodityTypes);
        fetchData("lkp/common/commodities", setCommodities);
        fetchData("lkp/common/analysis_scopes", setAnalysisScopes);
        fetchData("lkp/common/visualization_scales", setVisualizationScales);
        fetchData("lkp/common/climate_scenarios", setClimateScenarios);
        fetchData("lkp/common/data_sources", setDataSources);
        fetchData("lkp/specific/impacts", setImpacts);
    }, [fetchData]);

    useEffect(() => {
        if (selectedCommodityId && selectedCommodityTypeId === 1) {
            fetchData(
                `lkp/specific/adaptations?commodity_id=${selectedCommodityId}&commodity_type_id=1`,
                setAdaptations
            );
            fetchData(`lkp/specific/risks?commodity_id=${selectedCommodityId}`, setRisks);
        } else if (selectedCommodityId) {
            fetchData(`lkp/specific/risks?commodity_id=${selectedCommodityId}`, setRisks);
            setAdaptations([]);
            setSelectedAdaptationId("");
        } else {
            setAdaptations([]);
            setSelectedAdaptationId("");
            setRisks([]);
            setSelectedRiskId("");
        }
    }, [selectedCommodityId, selectedCommodityTypeId, fetchData]);

    useEffect(() => {
        if (countries.length > 0) {
            let countryId = 0;
            let admin_level = "total";
            let admin_level_id = null;
            let showSelect = true;

            if (country) {
                const countryName = country.toLowerCase().replace(/[-_]/g, " ");
                const matchedCountry = countries.find(
                    (c) =>
                        c.country.toLowerCase().replace(/\s+/g, "") ===
                        countryName.replace(/\s+/g, "") && c.status
                );
                if (matchedCountry) {
                    countryId = matchedCountry.country_id;
                    admin_level = "country";
                    admin_level_id = matchedCountry.country_id;
                    setSelectedCountryId(countryId);
                    getStates(countryId);
                    setDisableStateFilter(false);
                    showSelect = false;
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Invalid Country",
                        text: `Country "${country}" not found or inactive. Defaulting to South Asia.`,
                    });
                    setSelectedCountryId(0);
                    setDisableStateFilter(true);
                    setStates([]);
                    showSelect = true;
                }
            }
            setShowCountrySelect(showSelect);
            fetchGeojson(admin_level, admin_level_id);
        }
    }, [countries, country, fetchGeojson]);

    useEffect(() => {
        if (commodityTypes.length > 0 && !selectedCommodityTypeId) {
            setSelectedCommodityTypeId(commodityTypes[0].commodity_type_id);
        }
    }, [commodityTypes, selectedCommodityTypeId]);

    useEffect(() => {
        if (analysisScopes.length > 0 && !selectedScopeId) {
            setSelectedScopeId(analysisScopes[0].scope_id);
        }
    }, [analysisScopes, selectedScopeId]);

    useEffect(() => {
        if (visualizationScales.length > 0 && !selectedScaleId) {
            setSelectedScaleId(visualizationScales[0].scale_id);
        }
    }, [visualizationScales, selectedScaleId]);

    useEffect(() => {
        if (dataSources.length > 0 && !selectedDataSourceId) {
            setSelectedDataSourceId(dataSources[0].data_source_id);
        }
    }, [dataSources, selectedDataSourceId]);

    useEffect(() => {
        if (climateScenarios.length > 0 && !selectedScenarioId) {
            setSelectedScenarioId(climateScenarios[climateScenarios.length - 1].scenario_id);
        }
    }, [climateScenarios, selectedScenarioId]);

    useEffect(() => {
        if (selectedCommodityTypeId && commodities.length > 0) {
            const filtered = commodities.filter(
                (commodity) =>
                    +commodity.commodity_type_id === +selectedCommodityTypeId && commodity.status
            );
            setFilteredCommodities(filtered);
            if (filtered.length > 0 && (!selectedCommodityId || !filtered.some(c => +c.commodity_id === +selectedCommodityId))) {
                setSelectedCommodityId(filtered[0].commodity_id);
            }
        } else {
            const activeCommodities = commodities.filter((c) => c.status);
            setFilteredCommodities(activeCommodities);
            if (activeCommodities.length > 0 && (!selectedCommodityId || !activeCommodities.some(c => +c.commodity_id === +selectedCommodityId))) {
                setSelectedCommodityId(activeCommodities[0].commodity_id);
            }
        }
    }, [selectedCommodityTypeId, commodities, selectedCommodityId]);

    const areMandatoryFiltersSelected = () => {
        return (
            selectedScopeId &&
            selectedScaleId &&
            selectedDataSourceId &&
            selectedScenarioId &&
            selectedCommodityId &&
            geojsonData &&
            !isLoading &&
            countries.length > 0 &&
            commodityTypes.length > 0 &&
            commodities.length > 0 &&
            analysisScopes.length > 0 &&
            visualizationScales.length > 0 &&
            climateScenarios.length > 0 &&
            dataSources.length > 0 &&
            impacts.length > 0
        );
    };

    const updateFilters = useCallback(() => {
        if (!areMandatoryFiltersSelected()) {
            console.warn("Required data not fully loaded, skipping filter update.");
            return;
        }

        if (
            (selectedRiskId || selectedImpactId || selectedAdaptationId) &&
            !selectedCommodityId
        ) {
            Swal.fire({
                icon: "error",
                title: "Missing Commodity",
                text: "Please select a commodity when selecting a risk, impact, or adaptation.",
            });
            return;
        }

        let layer_type = "commodity";
        if (selectedRiskId) layer_type = "risk";
        else if (selectedImpactId) layer_type = "impact";
        else if (selectedAdaptationId && selectedCommodityTypeId === 1) layer_type = "adaptation";
        else if (selectedAdaptationId) layer_type = "adaptation";

        const admin_level =
            selectedStateId !== 0 ? "state" : selectedCountryId !== 0 ? "country" : "total";
        const admin_level_id =
            selectedStateId !== 0 ? selectedStateId : selectedCountryId !== 0 ? selectedCountryId : null;

        const newFilters = {
            analysis_scope_id: +selectedScopeId || null,
            visualization_scale_id: +selectedScaleId || null,
            commodity_id: +selectedCommodityId || null,
            commodity_type_id: +selectedCommodityTypeId || null,
            data_source_id: +selectedDataSourceId || null,
            climate_scenario_id: +selectedScenarioId || null,
            layer_type,
            risk_id: layer_type === "risk" ? +selectedRiskId : null,
            impact_id: layer_type === "impact" ? +selectedImpactId : null,
            adaptation_id: layer_type === "adaptation" ? +selectedAdaptationId || null : null,
            admin_level,
            admin_level_id,
            geojson: geojsonData?.geojson,
            bbox: geojsonData?.bbox,
            region: geojsonData?.region,
            countries: countries || [],
            commodityTypes: commodityTypes || [],
            commodities: commodities || [],
            analysisScopes: analysisScopes || [],
            visualizationScales: visualizationScales || [],
            climateScenarios: climateScenarios || [],
            dataSources: dataSources || [],
            impacts: impacts || [],
            adaptations: adaptations || [],
            states: states || [],
            risks: risks || [],
        };

        setAppliedFilters(newFilters);
    }, [
        selectedScopeId,
        selectedScaleId,
        selectedDataSourceId,
        selectedScenarioId,
        selectedCountryId,
        selectedStateId,
        selectedCommodityTypeId,
        selectedCommodityId,
        selectedRiskId,
        selectedImpactId,
        selectedAdaptationId,
        geojsonData,
        isLoading,
        countries,
        commodityTypes,
        commodities,
        analysisScopes,
        visualizationScales,
        climateScenarios,
        dataSources,
        impacts,
        adaptations,
        states,
        risks,
    ]);

    // Consolidated useEffect for updating filters
    useEffect(() => {
        if (areMandatoryFiltersSelected() && !isLoading) {
            updateFilters();
        }
    }, [
        selectedScopeId,
        selectedScaleId,
        selectedDataSourceId,
        selectedScenarioId,
        selectedCountryId,
        selectedStateId,
        selectedCommodityTypeId,
        selectedCommodityId,
        selectedRiskId,
        selectedImpactId,
        selectedAdaptationId,
        geojsonData,
        isLoading,
        updateFilters,
    ]);

    const getStates = async (countryId) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${apiUrl}/lkp/locations/states?country_id=${countryId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const { success, data } = await response.json();
            if (!success) throw new Error("Error loading states");
            setStates(data || []);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Error loading states",
            });
            setStates([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        setSelectedCountryId(countryId);
        setSelectedStateId(0);
        if (countryId !== 0) {
            getStates(countryId);
            setDisableStateFilter(false);
            fetchGeojson("country", countryId);
        } else {
            setStates([]);
            setDisableStateFilter(true);
            fetchGeojson("total", null);
        }
    };

    const handleStateChange = (event) => {
        const stateId = event.target.value;
        setSelectedStateId(stateId);
        if (stateId !== 0) {
            fetchGeojson("state", stateId);
        } else {
            fetchGeojson("country", selectedCountryId);
        }
    };

    const handleCommodityTypeChange = (event) => {
        const newCommodityTypeId = event.target.value;
        setSelectedCommodityTypeId(newCommodityTypeId);
        setSelectedCommodityId("");
        setSelectedAdaptationId("");
        setSelectedRiskId("");
        setSelectedImpactId("");
    };

    const handleCommodityChange = (event) => {
        const newCommodityId = event.target.value;
        setSelectedCommodityId(newCommodityId);
        setSelectedAdaptationId("");
        setSelectedRiskId("");
        setSelectedImpactId("");
    };

    const handleScopeChange = (event) => {
        setSelectedScopeId(event.target.value);
    };

    const handleScaleChange = (event) => {
        setSelectedScaleId(event.target.value);
    };

    const handleScenarioChange = (event) => {
        setSelectedScenarioId(event.target.value);
    };

    const handleDataSourceChange = (event) => {
        setSelectedDataSourceId(event.target.value);
    };

    const handleRiskChange = (event) => {
        setSelectedRiskId(event.target.value);
        if (event.target.value) {
            setSelectedImpactId("");
            setSelectedAdaptationId("");
        }
    };

    const handleImpactChange = (event) => {
        setSelectedImpactId(event.target.value);
        if (event.target.value) {
            setSelectedRiskId("");
            setSelectedAdaptationId("");
        }
    };

    const handleAdaptationChange = (event) => {
        setSelectedAdaptationId(event.target.value);
        if (event.target.value) {
            setSelectedRiskId("");
            setSelectedImpactId("");
        }
    };

    const groupedAdaptations = adaptations.reduce((acc, adaptation) => {
        const groupKey = adaptation.group_id ? adaptation.group : "Other";
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(adaptation);
        return acc;
    }, {});

    const getListItemStyle = (category) => ({
        backgroundColor:
            (category === "risk" && selectedRiskId) ||
                (category === "impact" && selectedImpactId) ||
                (category === "adaptation" && selectedAdaptationId)
                ? "#e3f2fd"
                : "inherit",
    });

    return (
        <div>
            <Box sx={{ display: "flex", marginTop: "86px" }}>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: open ? drawerWidth : 50,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: open ? drawerWidth : 50,
                            transition: "width 0.3s",
                            overflowX: "hidden",
                            overflowY: "hidden",
                        },
                    }}
                >
                    <Toolbar />
                    <List style={{ marginTop: "14px" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <IconButton
                                    color="inherit"
                                    edge="start"
                                    onClick={toggleDrawer}
                                    sx={{ ml: 2 }}
                                >
                                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                        <div
                            className="card"
                            style={{
                                height: "72.4vh",
                                overflowY: "scroll",
                                overflowX: "hidden",
                                border: "0px",
                                scrollbarWidth: "none",
                            }}
                        >
                            <div className="card-body p-0">
                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListSubheader component="div" id="nested-list-subheader"></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("region")}
                                        disabled={isLoading}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/location.svg" alt="" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Region</FormLabel>}
                                        />
                                        {isSidebarOpen.region ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.region}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body">
                                                    <FormControl>
                                                        {showCountrySelect ? (
                                                            <>
                                                                <br />
                                                                <Select
                                                                    className="customSelect"
                                                                    value={selectedCountryId}
                                                                    onChange={handleCountryChange}
                                                                    displayEmpty
                                                                    inputProps={{ "aria-label": "Country" }}
                                                                    disabled={isLoading}
                                                                    style={{ margin: "0 0 15px 0" }}
                                                                >
                                                                    <MenuItem className="customMenuItem" value={0}>
                                                                        South Asia
                                                                    </MenuItem>
                                                                    {countries.map((a) => (
                                                                        <MenuItem
                                                                            className="customMenuItem"
                                                                            key={a.country_id}
                                                                            value={a.country_id}
                                                                            disabled={!a.status}
                                                                        >
                                                                            {a.country}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </>
                                                        ) : (
                                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                                <FormLabel className="formLabel">
                                                                    Country:{" "}
                                                                    {countries.find(
                                                                        (c) => c.country_id === selectedCountryId
                                                                    )?.country || "South Asia"}
                                                                </FormLabel>
                                                            </Typography>
                                                        )}
                                                        <Select
                                                            className="customSelect"
                                                            value={selectedStateId}
                                                            onChange={handleStateChange}
                                                            displayEmpty
                                                            inputProps={{ "aria-label": "State" }}
                                                            disabled={disabledStateFilter || isLoading}
                                                        >
                                                            <MenuItem className="customMenuItem" value={0}>
                                                                State/Province
                                                            </MenuItem>
                                                            {states.map((a) => (
                                                                <MenuItem
                                                                    className="customMenuItem"
                                                                    key={a.state_id}
                                                                    value={a.state_id}
                                                                >
                                                                    {a.state}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader1"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader1"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("dataType")}
                                        disabled={isLoading}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/datatype.svg" alt="Data Type" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Data Type</FormLabel>}
                                        />
                                        {isSidebarOpen.dataType ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.dataType}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup row sx={{ flexWrap: "nowrap", gap: 2 }}>
                                                {commodityTypes.map((type) => (
                                                    <FormControlLabel
                                                        key={type.commodity_type_id}
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    +selectedCommodityTypeId ===
                                                                    +type.commodity_type_id
                                                                }
                                                                onChange={() =>
                                                                    handleCommodityTypeChange({
                                                                        target: { value: type.commodity_type_id },
                                                                    })
                                                                }
                                                                disabled={!type.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <FormLabel className="label-list">
                                                                    {type.commodity_type}
                                                                </FormLabel>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader2"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader2"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("analysis")}
                                        disabled={isLoading}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/analysis.svg" alt="Analysis & Scale" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <FormLabel className="formLabel">Analysis & Scale</FormLabel>
                                            }
                                        />
                                        {isSidebarOpen.analysis ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.analysis}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ mt: 2, mb: 1, textAlign: "left" }}
                                            >
                                                <FormLabel className="formLabel">
                                                    Select analysis scope
                                                </FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {analysisScopes.map((scope) => (
                                                    <FormControlLabel
                                                        key={scope.scope_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedScopeId === +scope.scope_id}
                                                                onChange={() =>
                                                                    handleScopeChange({
                                                                        target: { value: scope.scope_id },
                                                                    })
                                                                }
                                                                disabled={!scope.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {scope.scope}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>

                                            <Typography
                                                variant="subtitle2"
                                                sx={{ mt: 3, mb: 1, textAlign: "left" }}
                                            >
                                                <FormLabel className="formLabel">
                                                    Select visualization scale
                                                </FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {visualizationScales.map((scale) => (
                                                    <FormControlLabel
                                                        key={scale.scale_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedScaleId === +scale.scale_id}
                                                                onChange={() =>
                                                                    handleScaleChange({
                                                                        target: { value: scale.scale_id },
                                                                    })
                                                                }
                                                                disabled={!scale.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {scale.scale}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader3"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader3"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("commodity")}
                                        disabled={isLoading}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/commodity.svg" alt="Commodity" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Commodity</FormLabel>}
                                        />
                                        {isSidebarOpen.commodity ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.commodity}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {filteredCommodities.map((commodity) => (
                                                    <FormControlLabel
                                                        key={commodity.commodity_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedCommodityId === +commodity.commodity_id}
                                                                onChange={() =>
                                                                    handleCommodityChange({
                                                                        target: { value: commodity.commodity_id },
                                                                    })
                                                                }
                                                                disabled={!commodity.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {commodity.commodity}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader4"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader4"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("scenario")}
                                        disabled={isLoading}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/scenario.svg" alt="Scenario" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Scenario </FormLabel>}
                                        />
                                        {isSidebarOpen.scenario ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.scenario}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ mt: 2, mb: 1, textAlign: "left" }}
                                            >
                                                <FormLabel className="formLabel">Select data source</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {dataSources.map((source) => (
                                                    <FormControlLabel
                                                        key={source.data_source_id}
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    +selectedDataSourceId === +source.data_source_id
                                                                }
                                                                onChange={() =>
                                                                    handleDataSourceChange({
                                                                        target: { value: source.data_source_id },
                                                                    })
                                                                }
                                                                disabled={!source.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {source.source}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ mt: 3, mb: 1, textAlign: "left" }}
                                            >
                                                <FormLabel className="formLabel">
                                                    Select climate scenario
                                                </FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {climateScenarios.map((scenario) => (
                                                    <FormControlLabel
                                                        key={scenario.scenario_id}
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    +selectedScenarioId === +scenario.scenario_id
                                                                }
                                                                onChange={() =>
                                                                    handleScenarioChange({
                                                                        target: { value: scenario.scenario_id },
                                                                    })
                                                                }
                                                                disabled={!scenario.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {scenario.scenario}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader5"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader5"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("risk")}
                                        disabled={isLoading || !selectedCommodityId}
                                        sx={getListItemStyle("risk")}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/risk.svg" alt="Risk" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Risk</FormLabel>}
                                        />
                                        {isSidebarOpen.risk ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.risk}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {risks.map((risk) => (
                                                    <FormControlLabel
                                                        key={risk.risk_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedRiskId === +risk.risk_id}
                                                                onChange={() =>
                                                                    handleRiskChange({
                                                                        target: { value: risk.risk_id },
                                                                    })
                                                                }
                                                                disabled={!risk.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {risk.risk}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List
                                    className="listMenu"
                                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader6"
                                >
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader6"
                                    ></ListSubheader>
                                    <ListItemButton
                                        onClick={() => handleSidebarToggle("impact")}
                                        disabled={isLoading || !selectedCommodityId}
                                        sx={getListItemStyle("impact")}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 35,
                                                color: "rgba(0, 0, 0, 0.54)",
                                                flexShrink: 0,
                                                display: "inline-flex",
                                            }}
                                        >
                                            <img src="/images/impact.svg" alt="Impact" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<FormLabel className="formLabel">Impact</FormLabel>}
                                        />
                                        {isSidebarOpen.impact ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse
                                        in={isSidebarOpen.impact}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {impacts.map((impact) => (
                                                    <FormControlLabel
                                                        key={impact.impact_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedImpactId === +impact.impact_id}
                                                                onChange={() =>
                                                                    handleImpactChange({
                                                                        target: { value: impact.impact_id },
                                                                    })
                                                                }
                                                                disabled={!impact.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <span
                                                                style={{
                                                                    fontFamily: "Poppins",
                                                                    fontSize: "10px",
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    lineHeight: "normal",
                                                                }}
                                                            >
                                                                {impact.impact}
                                                            </span>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                {selectedCommodityTypeId === 1 && (
                                    <List
                                        className="listMenu"
                                        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader7"
                                    >
                                        <ListSubheader
                                            component="div"
                                            id="nested-list-subheader7"
                                        ></ListSubheader>
                                        <ListItemButton
                                            onClick={() => handleSidebarToggle("adaptation")}
                                            disabled={isLoading || !selectedCommodityId}
                                            sx={getListItemStyle("adaptation")}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 35,
                                                    color: "rgba(0, 0, 0, 0.54)",
                                                    flexShrink: 0,
                                                    display: "inline-flex",
                                                }}
                                            >
                                                <img src="/images/option.svg" alt="Adaptation" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<FormLabel className="formLabel">Adaptation</FormLabel>}
                                            />
                                            {isSidebarOpen.adaptation ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse
                                            in={isSidebarOpen.adaptation}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List component="div" disablePadding sx={{ px: 2 }}>
                                                {Object.entries(groupedAdaptations).map(([group, items]) => (
                                                    <div key={group}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ mt: 2, mb: 1, textAlign: "left" }}
                                                        >
                                                            <FormLabel className="formLabel">{group}</FormLabel>
                                                        </Typography>
                                                        <FormGroup>
                                                            {items.map((adaptation) => (
                                                                <FormControlLabel
                                                                    key={adaptation.adaptation_id}
                                                                    control={
                                                                        <Switch
                                                                            checked={
                                                                                +selectedAdaptationId ===
                                                                                +adaptation.adaptation_id
                                                                            }
                                                                            onChange={() =>
                                                                                handleAdaptationChange({
                                                                                    target: {
                                                                                        value: adaptation.adaptation_id,
                                                                                    },
                                                                                })
                                                                            }
                                                                            disabled={!adaptation.status || isLoading}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={
                                                                        <span
                                                                            style={{
                                                                                fontFamily: "Poppins",
                                                                                fontSize: "10px",
                                                                                fontStyle: "normal",
                                                                                fontWeight: 500,
                                                                                lineHeight: "normal",
                                                                            }}
                                                                        >
                                                                            {adaptation.adaptation}
                                                                        </span>
                                                                    }
                                                                />
                                                            ))}
                                                        </FormGroup>
                                                    </div>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </List>
                                )}
                            </div>
                        </div>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    className="main"
                    sx={{ flexGrow: 1, height: "calc(100vh - 88px)" }}
                >
                    <Grid container sx={{ height: "100%" }}>
                        <Grid item xs={12}>
                            <MapViewer
                                drawerOpen={open}
                                filters={appliedFilters}
                                adaptations={adaptations}
                                selectedAdaptationId={selectedAdaptationId}
                                setSelectedAdaptationId={setSelectedAdaptationId}
                                selectedRiskId={selectedRiskId}
                                setSelectedRiskId={setSelectedRiskId}
                                selectedImpactId={selectedImpactId}
                                setSelectedImpactId={setSelectedImpactId}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default Test;