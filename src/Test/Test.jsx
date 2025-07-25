import { useState, useEffect, useCallback } from "react";
import "./Test.css";
import { Button, Grid, Toolbar, IconButton, Drawer, Switch, Typography, FormGroup, List, Box, Tooltip, } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import MapViewer from "./MapViewer";

const drawerWidth = 254;


function LayoutIcon(props) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2711 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.6299 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z" />
        </svg>
    );
}

function Test() {

     useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
  }, []);

    const [open, setOpen] = useState(true);
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState(0);
    const [states, setStates] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(0);
    const [disabledStateFilter, setDisableStateFilter] = useState(true);
    const [commodityTypes, setCommodityTypes] = useState([]);
    const [selectedCommodityTypeId, setSelectedCommodityTypeId] = useState("");
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
    const [filters, setFilters] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState(null); // New state for applied filters
    const [geojsonData, setGeojsonData] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState({
        region: true,
        dataType: false,
        analysis: false,
        commodity: false,
        scenario: false,
        risk: false,
        impact: false,
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

    const apiUrl = process.env.REACT_APP_API_URL;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleSidebarToggle = (sidebar) => {
        setIsSidebarOpen((prev) => {
            const newState = {
                region: false,
                dataType: false,
                analysis: false,
                commodity: false,
                scenario: false,
                risk: false,
                impact: false,
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
                setter(data);
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message || `Error loading ${endpoint}`,
                });
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

    // Fetch risks dynamically based on selected commodity
    useEffect(() => {
        if (selectedCommodityId) {
            fetchData(`lkp/specific/risks?commodity_id=${selectedCommodityId}`, setRisks);
        } else {
            setRisks([]);
            setSelectedRiskId("");
        }
    }, [selectedCommodityId, fetchData]);

    useEffect(() => {
        if (selectedCommodityTypeId) {
            const filtered = commodities.filter(
                (commodity) => +commodity.commodity_type_id === +selectedCommodityTypeId && commodity.status
            );
            setFilteredCommodities(filtered);
        } else {
            setFilteredCommodities(commodities.filter((commodity) => commodity.status));
        }
    }, [selectedCommodityTypeId, commodities]);

    useEffect(() => {
        const admin_level = selectedStateId !== 0 ? "state" : selectedCountryId !== 0 ? "country" : "total";
        const admin_level_id = selectedStateId !== 0 ? selectedStateId : selectedCountryId !== 0 ? selectedCountryId : null;
        fetchGeojson(admin_level, admin_level_id);
    }, [selectedCountryId, selectedStateId, fetchGeojson]);

    const getStates = async (countryId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/lkp/locations/states?country_id=${countryId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const { success, data } = await response.json();
            if (!success) throw new Error("Error loading states");
            setStates(data);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Error loading states",
            });
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
        } else {
            setStates([]);
            setDisableStateFilter(true);
        }
    };

    const handleStateChange = (event) => {
        setSelectedStateId(event.target.value);
    };

    const handleCommodityTypeChange = (event) => {
        setSelectedCommodityTypeId(event.target.value);
        setSelectedCommodityId("");
    };

    const handleCommodityChange = (event) => {
        setSelectedCommodityId(event.target.value);
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
    };

    const handleImpactChange = (event) => {
        setSelectedImpactId(event.target.value);
    };

    const handleSaveFilters = async () => {
        const admin_level = selectedStateId !== 0 ? "state" : selectedCountryId !== 0 ? "country" : "total";
        const admin_level_id = selectedStateId !== 0 ? selectedStateId : selectedCountryId !== 0 ? selectedCountryId : null;

        const newFilters = {
            analysis_scope_id: selectedScopeId || null,
            visualization_scale_id: selectedScaleId || null,
            commodity_id: selectedCommodityId || null,
            data_source_id: selectedDataSourceId || null,
            climate_scenario_id: selectedScenarioId || null,
            layer_type: selectedImpactId ? "impact" : selectedRiskId ? "risk" : "commodity",
            risk_id: +selectedRiskId || null,
            impact_id: +selectedImpactId || null,
            adaptation_id: null,
            admin_level,
            admin_level_id,
            geojson: geojsonData?.geojson,
            bbox: geojsonData?.bbox,
            region: geojsonData?.region,
        };

        setFilters(newFilters);
        setAppliedFilters(newFilters); // Update applied filters only on save
    };

    const handleClearFilters = () => {
        Swal.fire({
            title: "Clear All Filters?",
            text: "This will reset all filter selections. Continue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectedCountryId(0);
                setSelectedStateId(0);
                setDisableStateFilter(true);
                setStates([]);
                setSelectedCommodityTypeId("");
                setSelectedCommodityId("");
                setSelectedScopeId("");
                setSelectedScaleId("");
                setSelectedScenarioId("");
                setSelectedDataSourceId("");
                setSelectedRiskId("");
                setSelectedImpactId("");
                setFilters(null);
                setAppliedFilters(null);
                setGeojsonData(null);
            }
        });
    };

    return (
        <div>
            <Box sx={{ display: "flex", marginTop: "86px" }}>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        width: open ? drawerWidth : 60,
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
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ ml: 2 }}>
                                    <LayoutIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        {open && (
                            <Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "16px", marginRight: "16px" }}>
                                    <Box>
                                        <h3 className="filterText"> {!isLoading ? "Filters" : "Loading..."}</h3>
                                    </Box>
                                    <Box>
                                        <Button className="clearText" onClick={handleClearFilters} disabled={isLoading}>
                                            Clear All
                                        </Button>
                                        <Tooltip title="Apply your filter selections to the map">
                                            <Button className="saveFilters" onClick={handleSaveFilters} disabled={isLoading}>
                                                Apply Filters
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        <div className="card" style={{ height: "72.4vh", overflowY: "scroll", overflowX: "hidden", border: "0px", scrollbarWidth: "none" }} >
                            < div className="card-body p-0">
                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
                                    <ListSubheader component="div" id="nested-list-subheader"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("region")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#409BF6">
                                                <path
                                                    d="M9.99996 18.3333C9.80551 18.3333 9.63885 18.2778 9.49996 18.1667C9.36107 18.0555 9.2569 17.9097 9.18746 17.7292C8.92357 16.9514 8.59024 16.2222 8.18746 15.5417C7.79857 14.8611 7.24996 14.0625 6.54163 13.1458C5.83329 12.2292 5.2569 11.3542 4.81246 10.5208C4.3819 9.68749 4.16663 8.68054 4.16663 7.49999C4.16663 5.87499 4.72913 4.49999 5.85413 3.37499C6.99301 2.2361 8.37496 1.66666 9.99996 1.66666C11.625 1.66666 13 2.2361 14.125 3.37499C15.2638 4.49999 15.8333 5.87499 15.8333 7.49999C15.8333 8.76388 15.5902 9.81943 15.1041 10.6667C14.6319 11.5 14.0833 12.3264 13.4583 13.1458C12.7083 14.1458 12.1388 14.9792 11.75 15.6458C11.375 16.2986 11.0625 16.993 10.8125 17.7292C10.743 17.9236 10.6319 18.0764 10.4791 18.1875C10.3402 18.2847 10.1805 18.3333 9.99996 18.3333ZM9.99996 9.58332C10.5833 9.58332 11.0763 9.38193 11.4791 8.97916C11.8819 8.57638 12.0833 8.08332 12.0833 7.49999C12.0833 6.91666 11.8819 6.4236 11.4791 6.02082C11.0763 5.61805 10.5833 5.41666 9.99996 5.41666C9.41663 5.41666 8.92357 5.61805 8.52079 6.02082C8.11801 6.4236 7.91663 6.91666 7.91663 7.49999C7.91663 8.08332 8.11801 8.57638 8.52079 8.97916C8.92357 9.38193 9.41663 9.58332 9.99996 9.58332Z"
                                                    fill="#409BF6"
                                                />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Region</FormLabel>} />
                                        {isSidebarOpen.region ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.region} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="card w-100 bg-transparent border-0 text-start">
                                                <div className="card-body">
                                                    <FormControl>
                                                        <br />
                                                        <Select
                                                            value={selectedCountryId}
                                                            onChange={handleCountryChange}
                                                            displayEmpty
                                                            inputProps={{ "aria-label": "Country" }}
                                                            disabled={isLoading}
                                                        >
                                                            <MenuItem value={0}>South Asia</MenuItem>
                                                            {countries.map((a) => (
                                                                <MenuItem key={a.country_id} value={a.country_id} disabled={!a.status}>
                                                                    {a.country}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <br />
                                                        <Select
                                                            value={selectedStateId}
                                                            onChange={handleStateChange}
                                                            displayEmpty
                                                            inputProps={{ "aria-label": "State" }}
                                                            disabled={disabledStateFilter || isLoading}
                                                        >
                                                            <MenuItem value={0}>State/Province</MenuItem>
                                                            {states.map((a) => (
                                                                <MenuItem key={a.state_id} value={a.state_id}>
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

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader1">
                                    <ListSubheader component="div" id="nested-list-subheader1"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("dataType")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/datatype.png" alt="Data Type" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Data Type</FormLabel>} />
                                        {isSidebarOpen.dataType ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.dataType} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {commodityTypes.map((type) => (
                                                    <FormControlLabel
                                                        key={type.commodity_type_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedCommodityTypeId === +type.commodity_type_id}
                                                                onChange={() => handleCommodityTypeChange({ target: { value: type.commodity_type_id } })}
                                                                disabled={!type.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <img src={`/images/filter-${type.commodity_type.toLowerCase()}.png`} alt={type.commodity_type} height={20} />
                                                                <FormLabel>{type.commodity_type}</FormLabel>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader2">
                                    <ListSubheader component="div" id="nested-list-subheader2"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("analysis")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/analysis.png" alt="Analysis & Scale" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Analysis & Scale</FormLabel>} />
                                        {isSidebarOpen.analysis ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.analysis} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                                <FormLabel>Select analysis scope</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {analysisScopes.map((scope) => (
                                                    <FormControlLabel
                                                        key={scope.scope_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedScopeId === +scope.scope_id}
                                                                onChange={() => handleScopeChange({ target: { value: scope.scope_id } })}
                                                                disabled={!scope.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={scope.scope}
                                                    />
                                                ))}
                                            </FormGroup>
                                            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                                                <FormLabel>Select visualization scale</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {visualizationScales.map((scale) => (
                                                    <FormControlLabel
                                                        key={scale.scale_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedScaleId === +scale.scale_id}
                                                                onChange={() => handleScaleChange({ target: { value: scale.scale_id } })}
                                                                disabled={!scale.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={scale.scale}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader3">
                                    <ListSubheader component="div" id="nested-list-subheader3"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("commodity")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/commodity.png" alt="Commodity" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Commodity</FormLabel>} />
                                        {isSidebarOpen.commodity ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.commodity} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {filteredCommodities.map((commodity) => (
                                                    <FormControlLabel
                                                        key={commodity.commodity_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedCommodityId === +commodity.commodity_id}
                                                                onChange={() => handleCommodityChange({ target: { value: commodity.commodity_id } })}
                                                                disabled={!commodity.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={commodity.commodity}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader4">
                                    <ListSubheader component="div" id="nested-list-subheader4"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("scenario")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/scenario.png" alt="Scenario" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Scenario & Data Source</FormLabel>} />
                                        {isSidebarOpen.scenario ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.scenario} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                                <FormLabel>Select data source</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {dataSources.map((source) => (
                                                    <FormControlLabel
                                                        key={source.data_source_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedDataSourceId === +source.data_source_id}
                                                                onChange={() => handleDataSourceChange({ target: { value: source.data_source_id } })}
                                                                disabled={!source.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={source.source}
                                                    />
                                                ))}
                                            </FormGroup>
                                            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                                                <FormLabel>Select climate scenario</FormLabel>
                                            </Typography>
                                            <FormGroup>
                                                {climateScenarios.map((scenario) => (
                                                    <FormControlLabel
                                                        key={scenario.scenario_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedScenarioId === +scenario.scenario_id}
                                                                onChange={() => handleScenarioChange({ target: { value: scenario.scenario_id } })}
                                                                disabled={!scenario.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={scenario.scenario}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader5">
                                    <ListSubheader component="div" id="nested-list-subheader5"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("risk")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/risk.png" alt="Risk" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Risk</FormLabel>} />
                                        {isSidebarOpen.risk ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.risk} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {risks.map((risk) => (
                                                    <FormControlLabel
                                                        key={risk.risk_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedRiskId === +risk.risk_id}
                                                                onChange={() => handleRiskChange({ target: { value: risk.risk_id } })}
                                                                disabled={!risk.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={risk.risk}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>

                                <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader6">
                                    <ListSubheader component="div" id="nested-list-subheader6"></ListSubheader>
                                    <ListItemButton onClick={() => handleSidebarToggle("impact")} disabled={isLoading}>
                                        <ListItemIcon>
                                            <img src="/images/impact.png" alt="Impact" />
                                        </ListItemIcon>
                                        <ListItemText primary={<FormLabel>Impact</FormLabel>} />
                                        {isSidebarOpen.impact ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isSidebarOpen.impact} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ px: 2 }}>
                                            <FormGroup>
                                                {impacts.map((impact) => (
                                                    <FormControlLabel
                                                        key={impact.impact_id}
                                                        control={
                                                            <Switch
                                                                checked={+selectedImpactId === +impact.impact_id}
                                                                onChange={() => handleImpactChange({ target: { value: impact.impact_id } })}
                                                                disabled={!impact.status || isLoading}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={impact.impact}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                        </div>
                    </List>
                </Drawer>

                <Box component="main" className="main" sx={{ flexGrow: 1, height: "calc(100vh - 88px)" }}>
                    <Grid container sx={{ height: "100%" }}>
                        <Grid item xs={12}>
                            <MapViewer drawerOpen={open} filters={appliedFilters} geojsonData={geojsonData} apiUrl={apiUrl} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div >
    );
}

export default Test;