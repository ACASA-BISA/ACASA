import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'; // For arearange support
import Exporting from 'highcharts/modules/exporting'; // Optional, for exporting

const AnalyticsPage = () => {
    const [chartData, setChartData] = useState(null);
    const [years, setYears] = useState([]);
    const [yMin, setYMin] = useState(0);
    const [yMax, setYMax] = useState(40);

    // Load Highcharts modules on component mount
    // useEffect(() => {
    //     HighchartsMore(Highcharts);
    //     Exporting(Highcharts);
    // }, []); // Empty dependency array ensures it runs once on mount

    useEffect(() => {
        // Fetch and parse CSV data
        fetch('/Annual_Tasmax_By_State_Model.csv')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(csvText => {
                // Custom CSV parsing
                const lines = csvText.trim().split('\n');
                const headers = lines[0].split(',').map(header => header.trim());
                const data = lines.slice(1).map(line => {
                    const values = line.split(',').map(value => value.trim());
                    const row = {};
                    headers.forEach((header, index) => {
                        row[header] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
                    });
                    return row;
                });

                // Filter for West Bengal (case-insensitive)
                const westBengalData = data.filter(row => row.State.toLowerCase() === 'west bengal');

                if (westBengalData.length === 0) {
                    console.error('No data found for West Bengal');
                    setChartData(null);
                    return;
                }

                // Extract unique years
                const years = [...new Set(westBengalData.map(row => row.Year))].sort((a, b) => a - b);
                console.log('Years:', years);
                console.log('Min Year:', Math.min(...years));

                // Process data by scenario year-wise
                const processScenarioData = (scenario) => {
                    const scenarioData = westBengalData.filter(row => row.Scenario === scenario);
                    const yearlyData = {};
                    scenarioData.forEach(row => {
                        const year = row.Year;
                        if (!yearlyData[year]) yearlyData[year] = [];
                        yearlyData[year].push(row.Tmax_C);
                    });

                    const meanData = years.map(year =>
                        yearlyData[year] && yearlyData[year].length > 0
                            ? yearlyData[year].reduce((a, b) => a + b, 0) / yearlyData[year].length
                            : null
                    );
                    const spreadMin = years.map(year =>
                        yearlyData[year] && yearlyData[year].length > 0
                            ? Math.min(...yearlyData[year])
                            : null
                    );
                    const spreadMax = years.map(year =>
                        yearlyData[year] && yearlyData[year].length > 0
                            ? Math.max(...yearlyData[year])
                            : null
                    );

                    return { meanData, spreadMin, spreadMax };
                };

                const historical = processScenarioData('historical');
                const ssp245 = processScenarioData('SSP245');
                const ssp585 = processScenarioData('SSP585');

                // Calculate dynamic Y-axis range
                const allValues = [
                    ...historical.spreadMin.filter(v => v !== null),
                    ...historical.spreadMax.filter(v => v !== null),
                    ...ssp245.spreadMin.filter(v => v !== null),
                    ...ssp245.spreadMax.filter(v => v !== null),
                    ...ssp585.spreadMin.filter(v => v !== null),
                    ...ssp585.spreadMax.filter(v => v !== null),
                    ...historical.meanData.filter(v => v !== null),
                    ...ssp245.meanData.filter(v => v !== null),
                    ...ssp585.meanData.filter(v => v !== null),
                ];
                const yMin = Math.min(...allValues) - 1 || 0;
                const yMax = Math.max(...allValues) + 1 || 40;

                // Prepare chart data for Highcharts
                const chartSeries = [
                    // Historical Spread
                    {
                        type: 'arearange',
                        name: 'Historical Spread (Low-High)',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1), // x-axis as timestamp
                            historical.spreadMin[index] || null,
                            historical.spreadMax[index] || null
                        ]).filter(d => d[1] !== null && d[2] !== null),
                        color: 'rgba(0, 0, 0, 0.3)',
                        fillOpacity: 0.3,
                        lineWidth: 0,
                        zIndex: 0,
                        showInLegend: true,
                    },
                    // Historical Mean
                    {
                        type: 'line',
                        name: 'Historical Mean',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            historical.meanData[index]
                        ]).filter(d => d[1] !== null),
                        color: 'black',
                        lineWidth: 2,
                        zIndex: 1,
                        showInLegend: true,
                    },
                    // SSP245 Spread
                    {
                        type: 'arearange',
                        name: 'SSP245 Spread (Low-High)',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            ssp245.spreadMin[index] || null,
                            ssp245.spreadMax[index] || null
                        ]).filter(d => d[1] !== null && d[2] !== null),
                        color: 'rgba(0, 102, 204, 0.3)',
                        fillOpacity: 0.3,
                        lineWidth: 0,
                        zIndex: 0,
                        showInLegend: true,
                    },
                    // SSP245 Mean
                    {
                        type: 'line',
                        name: 'SSP245 Mean',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            ssp245.meanData[index]
                        ]).filter(d => d[1] !== null),
                        color: 'blue',
                        lineWidth: 2,
                        zIndex: 1,
                        showInLegend: true,
                    },
                    // SSP585 Spread
                    {
                        type: 'arearange',
                        name: 'SSP585 Spread (Low-High)',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            ssp585.spreadMin[index] || null,
                            ssp585.spreadMax[index] || null
                        ]).filter(d => d[1] !== null && d[2] !== null),
                        color: 'rgba(255, 102, 102, 0.3)',
                        fillOpacity: 0.3,
                        lineWidth: 0,
                        zIndex: 0,
                        showInLegend: true,
                    },
                    // SSP585 Mean
                    {
                        type: 'line',
                        name: 'SSP585 Mean',
                        data: years.map((year, index) => [
                            Date.UTC(year, 0, 1),
                            ssp585.meanData[index]
                        ]).filter(d => d[1] !== null),
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
            })
            .catch(error => {
                console.error('Error fetching CSV:', error);
            });
    }, []);

    useEffect(() => {
        if (!chartData) return;

        const chartDiv = document.getElementById('tmaxChart');
        const legendDiv = document.getElementById('tmaxChart-legend');

        if (chartDiv) chartDiv.innerHTML = '';
        if (legendDiv) legendDiv.innerHTML = '';

        if (chartData.length) {
            Highcharts.chart('tmaxChart', {
                title: { text: 'Annual Mean Tmax for West Bengal' },
                credits: { enabled: false },
                exporting: { enabled: false },
                legend: { enabled: true },
                xAxis: {
                    type: 'datetime',
                    title: { text: 'Year' },
                    plotLines: [{
                        color: 'black',
                        width: 1,
                        value: Date.UTC(2015, 0, 1), // Baseline year
                    }],
                    min: Date.UTC(Math.min(...years), 0, 1),
                    max: Date.UTC(Math.max(...years), 0, 1),
                },
                yAxis: {
                    title: { text: 'Annual Tmax (°C)' },
                    min: yMin, // Dynamic min based on data
                    max: yMax, // Dynamic max based on data
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
                        turboThreshold: 0, // Allow large datasets
                    },
                },
                // Enable zooming
                zoomType: 'xy', // Zoom on both axes
                resetZoomButton: {
                    theme: {
                        display: 'block', // Show reset zoom button
                    },
                },
                series: chartData,
            });

            // Custom legend
            if (legendDiv) {
                const lineSeries = chartData.filter(s => s.type === 'line');
                const arearangeSeries = chartData.filter(s => s.type === 'arearange');
                const createLegendHTML = (series, shapeStyle) => `
          <div class="text-center">
            ${series.map(s => `
              <span class="mx-3" style="color: black; display: inline-block;">
                <div style="${shapeStyle(s.color)} display: inline-block; vertical-align: middle;"></div>
                ${s.name}
              </span>
            `).join('')}
          </div>
        `;
                const lineStyle = color => `background-color: ${color}; width: 10px; height: 2px;`;
                const areaStyle = color => `background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;`;

                if (lineSeries.length) legendDiv.innerHTML += createLegendHTML(lineSeries, lineStyle);
                if (arearangeSeries.length) legendDiv.innerHTML += createLegendHTML(arearangeSeries, areaStyle);
            }
        } else {
            if (chartDiv) chartDiv.innerHTML = '<div class="mt-5 text-center">No data available</div>';
        }
    }, [chartData, years, yMin, yMax]); // Add dependencies

    return (
        <div className="p-3 mt-2" style={{ marginTop: "120px" }}>
            <div className="row">
                <div className="col-12">
                    <p>
                        This chart visualizes the Annual Mean Tmax for West Bengal, showing historical data and future projections under different scenarios.
                    </p>
                </div>
                <hr />
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card outlook-card border-0 mt-1 mb-5">
                        <div className="card-body">
                            <div id="tmaxChart" className="mt-5" style={{ height: '55vh', width: '100%' }}></div>
                            <div id="tmaxChart-legend" className="mt-2" style={{ width: '100%', textAlign: 'center' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;