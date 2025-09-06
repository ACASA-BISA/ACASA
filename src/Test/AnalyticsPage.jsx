import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsMoreModule from 'highcharts/highcharts-more';
import ExportingModule from 'highcharts/modules/exporting';

// Initialize Highcharts modules
const HighchartsMore = HighchartsMoreModule.default || HighchartsMoreModule;
const Exporting = ExportingModule.default || ExportingModule;

if (typeof Highcharts === 'object') {
    try {
        HighchartsMore(Highcharts);
        Exporting(Highcharts);
    } catch (error) {
        // console.error('Error initializing Highcharts modules:', error);
    }
} else {
    console.error('Highcharts core library not loaded');
}

const AnalyticsPage = ({ filters }) => {
    const [chartData, setChartData] = useState(null);
    const [years, setYears] = useState([]);
    const [yMin, setYMin] = useState(null); // Initialize as null
    const [yMax, setYMax] = useState(null); // Initialize as null
    const [analyticsParamId, setAnalyticsParamId] = useState(2);
    const [parameterName, setParameterName] = useState('Minimum Temperature');
    const [location, setLocation] = useState('');
    const [units, setUnits] = useState('°C');
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const payload = {
                    admin_level: filters?.admin_level || 'total',
                    admin_level_id: filters?.admin_level_id || null,
                    analytics_param_id: analyticsParamId,
                };
                const response = await fetch(`${apiUrl}/analytics/climate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const { success, data } = await response.json();
                if (!success || !data || !data.chart_data) {
                    throw new Error('Invalid API response');
                }

                const { chart_data, location, parameter, units } = data;

                setLocation(location);
                setParameterName(parameter);
                setUnits(units);

                const years = [...new Set(chart_data.map(row => row.year))].sort((a, b) => a - b);
                if (years.length === 0) {
                    console.error('No years found in data');
                    setChartData(null);
                    return;
                }

                const processScenarioData = (scenario) => {
                    const scenarioData = chart_data.filter(row => row.scenario.toLowerCase() === scenario.toLowerCase());
                    const meanData = years.map(year => {
                        const row = scenarioData.find(r => r.year === year);
                        return row ? row.mean : null;
                    });
                    const spreadMin = years.map(year => {
                        const row = scenarioData.find(r => r.year === year);
                        return row ? row.min : null;
                    });
                    const spreadMax = years.map(year => {
                        const row = scenarioData.find(r => r.year === year);
                        return row ? row.max : null;
                    });
                    return { meanData, spreadMin, spreadMax };
                };

                const historical = processScenarioData('historical');
                const ssp245 = processScenarioData('SSP245');
                const ssp585 = processScenarioData('SSP585');

                // Calculate yMin and yMax only for non-Precipitation parameters
                let yMin = null;
                let yMax = null;
                if (analyticsParamId !== 1) { // Skip for Precipitation
                    const allValues = [
                        ...ssp245.spreadMin.filter(v => v !== null),
                        ...ssp245.spreadMax.filter(v => v !== null),
                        ...ssp585.spreadMin.filter(v => v !== null),
                        ...ssp585.spreadMax.filter(v => v !== null),
                        ...historical.meanData.filter(v => v !== null),
                        ...ssp245.meanData.filter(v => v !== null),
                        ...ssp585.meanData.filter(v => v !== null),
                    ];
                    yMin = allValues.length > 0 ? Math.min(...allValues) - 1 : 0;
                    yMax = allValues.length > 0 ? Math.max(...allValues) + 1 : 40;
                }

                const chartSeries = [
                    {
                        type: 'line',
                        name: 'Historical Mean',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            historical.meanData[index],
                        ]).filter(d => d[1] !== null),
                        color: 'black',
                        lineWidth: 2,
                        zIndex: 1,
                        showInLegend: true,
                    },
                    {
                        type: 'arearange',
                        name: 'SSP 2-4.5 Spread (Low-High)',
                        data: years.map((year, index) => {
                            if (year < 2015) return null;
                            return [
                                Date.UTC(year, 0, 1),
                                ssp245.spreadMin[index] || null,
                                ssp245.spreadMax[index] || null,
                            ];
                        }).filter(d => d !== null && d[1] !== null && d[2] !== null),
                        color: 'rgba(0, 102, 204, 0.3)',
                        fillOpacity: 0.3,
                        lineWidth: 0,
                        zIndex: 0,
                        showInLegend: true,
                    },
                    {
                        type: 'line',
                        name: 'SSP 2-4.5 Mean',
                        data: years.map((year, index) => {
                            if (year < 2015) return null;
                            return [
                                Date.UTC(year, 0, 1),
                                ssp245.meanData[index],
                            ];
                        }).filter(d => d !== null && d[1] !== null),
                        color: 'blue',
                        lineWidth: 2,
                        zIndex: 1,
                        showInLegend: true,
                    },
                    {
                        type: 'arearange',
                        name: 'SSP 5-8.5 Spread (Low-High)',
                        data: years.map((year, index) => {
                            if (year < 2015) return null;
                            return [
                                Date.UTC(year, 0, 1),
                                ssp585.spreadMin[index] || null,
                                ssp585.spreadMax[index] || null,
                            ];
                        }).filter(d => d !== null && d[1] !== null && d[2] !== null),
                        color: 'rgba(255, 102, 102, 0.3)',
                        fillOpacity: 0.3,
                        lineWidth: 0,
                        zIndex: 0,
                        showInLegend: true,
                    },
                    {
                        type: 'line',
                        name: 'SSP 5-8.5 Mean',
                        data: years.map((year, index) => {
                            if (year < 2015) return null;
                            return [
                                Date.UTC(year, 0, 1),
                                ssp585.meanData[index],
                            ];
                        }).filter(d => d !== null && d[1] !== null),
                        color: 'red',
                        lineWidth: 2,
                        zIndex: 1,
                        showInLegend: true,
                    },
                ];

                setChartData(chartSeries);
                setYears(years);
                setYMin(yMin);
                setYMax(yMax);
            } catch (error) {
                console.error('Error fetching API data:', error);
                setChartData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiUrl, analyticsParamId, filters]);

    useEffect(() => {
        if (!chartData || isLoading) return;

        const chartDiv = document.getElementById('tmaxChart');

        if (chartDiv) chartDiv.innerHTML = '';

        if (chartData.length) {
            Highcharts.chart('tmaxChart', {
                chart: {
                    width: 450,
                    height: 450,
                },
                title: { text: `Annual Mean ${parameterName} for ${location}` },
                credits: { enabled: false },
                exporting: { enabled: false },
                legend: { enabled: true },
                xAxis: {
                    type: 'datetime',
                    title: { text: 'Year' },
                    plotLines: [{
                        color: 'black',
                        width: 1,
                        value: Date.UTC(2015, 0, 1),
                    }],
                    min: Date.UTC(Math.min(...years), 0, 1),
                    max: Date.UTC(Math.max(...years), 0, 1),
                },
                yAxis: {
                    title: { text: `${parameterName} (${units})` },
                    // Conditionally set min and max only if defined (not for Precipitation)
                    ...(yMin !== null && { min: yMin }),
                    ...(yMax !== null && { max: yMax }),
                    tickInterval: yMin !== null ? 3 : null, // Use tickInterval only for manual scaling
                },
                tooltip: { shared: true, valueDecimals: 2 },
                plotOptions: {
                    arearange: {
                        marker: { enabled: false },
                        states: { hover: { enabled: false } },
                        events: { legendItemClick: () => false },
                    },
                    line: {
                        marker: { enabled: false },
                        states: { hover: { enabled: false } },
                        events: { legendItemClick: () => false },
                    },
                    series: {
                        turboThreshold: 0,
                    },
                },
                zoomType: 'xy',
                resetZoomButton: {
                    theme: {
                        display: 'block',
                    },
                },
                series: chartData,
            });
        } else {
            if (chartDiv) chartDiv.innerHTML = '<div class="mt-5 text-center">No data available</div>';
        }
    }, [chartData, years, yMin, yMax, parameterName, location, units, isLoading]);

    const handleParamChange = (event) => {
        const paramId = parseInt(event.target.value, 10);
        setAnalyticsParamId(paramId);
        const paramNames = {
            1: 'Precipitation',
            2: 'Maximum Temperature',
            3: 'Minimum Temperature',
        };
        setParameterName(paramNames[paramId] || 'Unknown Parameter');
    };

    return (
        <div className="p-3 mt-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label
                    htmlFor="analytics-param"
                    style={{ fontSize: '13px', fontWeight: 'bold' }}
                >
                    Climate Projections for:
                </label>
                <select
                    id="analytics-param"
                    name="analytics_param_id"
                    value={analyticsParamId}
                    onChange={handleParamChange}
                    style={{
                        fontSize: '12px',
                        height: '24px',
                        minWidth: '105px',
                        backgroundColor: '#EBF7E9',
                        border: 'none',
                        padding: '0 24px 0 8px',
                        zIndex: 1600,
                        appearance: 'auto',
                    }}
                >
                    <option value="1">Precipitation</option>
                    <option value="2">Tmax</option>
                    <option value="3">Tmin</option>
                </select>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card outlook-card border-0 mt-1 mb-5">
                        <div
                            className="card-body"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '470px',
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <div
                                    id="tmaxChart"
                                    style={{ width: '450px', height: '450px' }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;