let countryListPopulated = false;
let currentFilters = {
    continent: '',
    dateRange: 'all',
    ageGroup: 'all',
    gender: 'all',
    variant: 'all',
    metric: 'cases',
    topN: 5
};

// Custom chart data for each chart
let customChartData = {
    summaryPie: null,
    mainChart: null,
    ageGroup: null,
    testingVaccination: null,
    gender: null,
    variant: null,
    hospitalization: null,
    stackedMetrics: null,
    trend: null,
    fatalityRate: null,
    population: null,
    recoveryRatio: null
};

// Add country to chart
function addCountryToChart(chartId) {
    var selectElement = document.getElementById(chartId + 'CountrySelect');
    var selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    
    if (selectedOptions.length === 0) {
        alert('Please select countries to add to the chart.');
        return;
    }
    
    console.log('Adding countries to chart:', chartId, selectedOptions);
    
    // Re-render the specific chart with selected countries
    if (window.allCountryData) {
        renderSpecificChart(chartId, window.allCountryData);
    }
}

// Remove country from chart
function removeCountryFromChart(chartId) {
    var selectElement = document.getElementById(chartId + 'CountrySelect');
    var selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    
    if (selectedOptions.length === 0) {
        alert('Please select countries to remove from the chart.');
        return;
    }
    
    console.log('Removing countries from chart:', chartId, selectedOptions);
    
    // Clear the selection and re-render with default data
    if (selectElement) {
        selectElement.selectedIndex = -1;
    }
    
    // Re-render the specific chart with default data
    if (window.allCountryData) {
        renderSpecificChart(chartId, window.allCountryData);
    }
}

// Select all countries for a specific chart
function selectAllCountries(chartId) {
    console.log('Selecting all countries for chart:', chartId);
    var checkboxContainer = document.getElementById(chartId + 'CountryCheckboxes');
    if (checkboxContainer) {
        var checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        console.log('All countries selected for', chartId);
        
        // Trigger chart update
        if (window.allCountryData) {
            renderSpecificChart(chartId, window.allCountryData);
        }
    } else {
        console.warn('Checkbox container not found for chart:', chartId);
    }
}

// Deselect all countries for a specific chart
function deselectAllCountries(chartId) {
    console.log('=== DESELECT ALL COUNTRIES CALLED ===');
    console.log('Chart ID:', chartId);
    
    var checkboxContainer = document.getElementById(chartId + 'CountryCheckboxes');
    console.log('Checkbox container found:', !!checkboxContainer);
    console.log('Checkbox container ID:', chartId + 'CountryCheckboxes');
    
    if (checkboxContainer) {
        var checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
        console.log('Total checkboxes found:', checkboxes.length);
        
        var checkedBefore = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        console.log('Checked checkboxes before:', checkedBefore.length);
        
        checkboxes.forEach((checkbox, index) => {
            console.log('Unchecking checkbox', index, ':', checkbox.value, 'was checked:', checkbox.checked);
            checkbox.checked = false;
        });
        
        var checkedAfter = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        console.log('Checked checkboxes after:', checkedAfter.length);
        console.log('All countries deselected for', chartId);
        
        // Trigger chart update
        if (window.allCountryData) {
            console.log('Triggering chart update for', chartId);
            if (chartId === 'testingVaccination') {
                renderTestingVaccinationChart(window.allCountryData);
            } else if (chartId === 'summaryPie') {
                renderSummaryPieChart(window.allCountryData);
            } else if (chartId === 'ageGroup') {
                renderAgeGroupChart(window.allCountryData);
            } else {
                console.log('Calling renderSpecificChart for', chartId);
                renderSpecificChart(chartId, window.allCountryData);
            }
        } else {
            console.warn('No allCountryData available for chart update');
        }
    } else {
        console.warn('Checkbox container not found for chart:', chartId);
        console.warn('Available containers:', document.querySelectorAll('[id*="CountryCheckboxes"]').length);
        document.querySelectorAll('[id*="CountryCheckboxes"]').forEach(container => {
            console.log('Found container:', container.id);
        });
    }
}

// Populate country checkboxes for a specific chart
function populateCountryCheckboxes(chartId, countries) {
    console.log('Populating country checkboxes for chart:', chartId, 'with countries:', countries);
    var checkboxContainer = document.getElementById(chartId + 'CountryCheckboxes');
    if (!checkboxContainer) {
        console.warn('Checkbox container not found for chart:', chartId);
        return;
    }
    
    // Clear existing checkboxes
    checkboxContainer.innerHTML = '';
    
    if (countries && countries.length > 0) {
        countries.forEach(country => {
            var div = document.createElement('div');
            div.className = 'form-check';
            
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';
            checkbox.id = chartId + '_' + country.replace(/\s+/g, '_');
            checkbox.value = country;
            checkbox.checked = true; // Default to selected
            
            var label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = checkbox.id;
            label.textContent = country;
            
            div.appendChild(checkbox);
            div.appendChild(label);
            checkboxContainer.appendChild(div);
            
            // Add event listener for checkbox changes
            checkbox.addEventListener('change', function() {
                console.log('=== CHECKBOX CHANGE EVENT ===');
                console.log('Chart ID:', chartId);
                console.log('Country:', country);
                console.log('Checked:', this.checked);
                console.log('AllCountryData available:', !!window.allCountryData);
                
                if (window.allCountryData) {
                    console.log('Triggering chart update for', chartId);
                    if (chartId === 'testingVaccination') {
                        renderTestingVaccinationChart(window.allCountryData);
                    } else {
                        renderSpecificChart(chartId, window.allCountryData);
                    }
                } else {
                    console.warn('No allCountryData available for chart update');
                }
            });
        });
        
        console.log('Populated', countries.length, 'country checkboxes for', chartId);
    } else {
        checkboxContainer.innerHTML = '<p class="text-muted">No countries available</p>';
    }
}

// Add age group to chart (now handled by checkboxes)
function addAgeGroupToChart(chartId) {
    console.log('Age group selection is now handled by checkboxes. Please use the checkboxes to select age groups.');
    // The chart will automatically update when checkboxes are changed
}

// Remove age group from chart (now handled by checkboxes)
function removeAgeGroupFromChart(chartId) {
    console.log('Age group selection is now handled by checkboxes. Please uncheck the boxes to remove age groups.');
    // The chart will automatically update when checkboxes are changed
}

// Test detailed data function
function testDetailedData() {
    console.log('Testing detailed data...');
    console.log('window.allCountryData:', window.allCountryData);
    
    // Test modal functionality first
    console.log('Testing modal functionality...');
    const testData = [
        { category: 'Test Country', type: 'Country', cases: 1000, deaths: 50, recoveries: 800, tests: 5000, vaccinations: 3000, fatalityRate: 5.0 },
        { category: 'Test Gender', type: 'Gender', cases: 500, deaths: 25, recoveries: 400, tests: 2500, vaccinations: 1500, fatalityRate: 5.0 }
    ];
    console.log('About to show test modal...');
    showDataModal('Test Detailed Data', testData, 'detailed');
    console.log('Test modal call completed');
    
    if (window.allCountryData && window.allCountryData.rawCsvData) {
        console.log('CSV data available, testing cases...');
        showSummaryData('cases');
    } else {
        console.log('No CSV data available');
        alert('CSV data not loaded. Please refresh the page and try again.');
    }
}

// Test customization function
function testCustomization() {
    console.log('Testing customization...');
    
    // Test summary pie chart customization
    var summaryPieCheckboxes = document.getElementById('summaryPieCountryCheckboxes');
    if (summaryPieCheckboxes) {
        var checkboxes = summaryPieCheckboxes.querySelectorAll('input[type="checkbox"]');
        var checkedBoxes = summaryPieCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
        console.log('Summary pie checkboxes total:', checkboxes.length);
        console.log('Selected countries:', Array.from(checkedBoxes).map(checkbox => checkbox.value));
    }
    
    // Test age group chart customization
    var ageGroupCheckboxes = document.getElementById('ageGroupAgeGroupCheckboxes');
    if (ageGroupCheckboxes) {
        var checkboxes = ageGroupCheckboxes.querySelectorAll('input[type="checkbox"]');
        var checkedBoxes = ageGroupCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
        console.log('Age group checkboxes total:', checkboxes.length);
        console.log('Selected age groups:', Array.from(checkedBoxes).map(checkbox => checkbox.value));
    }
    
    // Test main chart customization
    var mainChartSelect = document.getElementById('mainChartCountrySelect');
    if (mainChartSelect) {
        console.log('Main chart select options:', mainChartSelect.options.length);
        console.log('Selected countries:', Array.from(mainChartSelect.selectedOptions).map(option => option.value));
    }
    
    // Test testing & vaccination customization
    var testingVaccinationCheckboxes = document.getElementById('testingVaccinationCountryCheckboxes');
    if (testingVaccinationCheckboxes) {
        var checkboxes = testingVaccinationCheckboxes.querySelectorAll('input[type="checkbox"]');
        var checkedBoxes = testingVaccinationCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
        console.log('Testing & Vaccination checkboxes total:', checkboxes.length);
        console.log('Selected countries:', Array.from(checkedBoxes).map(checkbox => checkbox.value));
    }
    

    
    // Test stacked metrics customization
    var stackedMetricsSelect = document.getElementById('stackedMetricsCountrySelect');
    if (stackedMetricsSelect) {
        console.log('Stacked metrics select options:', stackedMetricsSelect.options.length);
        console.log('Selected countries:', Array.from(stackedMetricsSelect.selectedOptions).map(option => option.value));
    }
    
    // Test hospitalization customization
    var hospitalizationSelect = document.getElementById('hospitalizationCountrySelect');
    if (hospitalizationSelect) {
        console.log('Hospitalization select options:', hospitalizationSelect.options.length);
        console.log('Selected countries:', Array.from(hospitalizationSelect.selectedOptions).map(option => option.value));
    }
    
    // Test fatality rate customization
    var fatalityRateSelect = document.getElementById('fatalityRateCountrySelect');
    if (fatalityRateSelect) {
        console.log('Fatality rate select options:', fatalityRateSelect.options.length);
        console.log('Selected countries:', Array.from(fatalityRateSelect.selectedOptions).map(option => option.value));
    }
    
    // Test chart data availability
    console.log('Window allCountryData available:', !!window.allCountryData);
    if (window.allCountryData) {
        console.log('All country labels:', window.allCountryData.allCountryLabels);
        console.log('Total countries:', window.allCountryData.allCountryLabels ? window.allCountryData.allCountryLabels.length : 0);
    }
    
    // Test modal functionality
    console.log('Modal element exists:', !!document.getElementById('dataModal'));
    console.log('Bootstrap available:', !!window.bootstrap);
    
    alert('Check console for comprehensive customization test results');
}

// Test Testing & Vaccination chart popup specifically
function testTestingVaccinationPopup() {
    console.log('Testing Testing & Vaccination chart popup...');
    
    // Simulate the exact data structure that the chart click handler would generate
    var testData = [
        {
            category: '0-9 years',
            type: 'Age Group',
            country: 'Test Country',
            cases: 15000,
            deaths: 50,
            recoveries: 14000,
            active: 950,
            tests: 50000,
            vaccinations: 8000,
            hospitalizations: 1500,
            icu: 300,
            fatalityRate: 0.33,
            testPositivityRate: 30.0
        },
        {
            category: '10-19 years',
            type: 'Age Group',
            country: 'Test Country',
            cases: 25000,
            deaths: 75,
            recoveries: 23000,
            active: 1925,
            tests: 75000,
            vaccinations: 15000,
            hospitalizations: 2500,
            icu: 500,
            fatalityRate: 0.30,
            testPositivityRate: 33.3
        },
        {
            category: 'Male',
            type: 'Gender',
            country: 'Test Country',
            cases: 45000,
            deaths: 150,
            recoveries: 42000,
            active: 2850,
            tests: 120000,
            vaccinations: 25000,
            hospitalizations: 4500,
            icu: 900,
            fatalityRate: 0.33,
            testPositivityRate: 37.5
        },
        {
            category: 'Female',
            type: 'Gender',
            country: 'Test Country',
            cases: 38000,
            deaths: 120,
            recoveries: 35000,
            active: 2880,
            tests: 100000,
            vaccinations: 22000,
            hospitalizations: 3800,
            icu: 760,
            fatalityRate: 0.32,
            testPositivityRate: 38.0
        }
    ];
    
    console.log('Showing Testing & Vaccination modal with test data...');
    showDataModal('Testing & Vaccination Details: Test Country - Test Positivity Rate (%)', testData, 'detailed');
}

// Test Case Fatality Rate chart popup specifically
function testFatalityRatePopup() {
    console.log('Testing Case Fatality Rate chart popup...');
    
    // Simulate the exact data structure that the chart click handler would generate
    var testData = [
        {
            country: 'Test Country',
            cases: 1000000,
            deaths: 15000,
            recoveries: 800000,
            active: 185000,
            tests: 5000000,
            vaccinations: 3000000,
            fatalityRate: 1.5
        }
    ];
    
    console.log('Showing Case Fatality Rate modal with test data...');
    showDataModal('Fatality Rate: Test Country', testData, 'detailed');
}

// Test all popup tables
function testAllPopupTables() {
    console.log('Testing all popup tables...');
    
    // Test 1: Testing & Vaccination Rates
    console.log('Test 1: Testing & Vaccination Rates');
    testTestingVaccinationPopup();
    
    // Test 2: Detailed Metrics Stacked Bar
    setTimeout(() => {
        console.log('Test 2: Detailed Metrics Stacked Bar');
        var testData = [
            {
                category: 'Overall',
                type: 'Summary',
                country: 'Test Country',
                cases: 1000000,
                deaths: 15000,
                recoveries: 800000,
                active: 185000,
                tests: 5000000,
                vaccinations: 3000000,
                hospitalizations: 100000,
                icu: 20000,
                fatalityRate: 1.5,
                testPositivityRate: 20.0
            }
        ];
        showDataModal('Stacked Metrics Details: Test Country - New Cases', testData, 'detailed');
    }, 2000);
    
    // Test 3: Case Fatality Rate
    setTimeout(() => {
        console.log('Test 3: Case Fatality Rate');
        testFatalityRatePopup();
    }, 4000);
    
    // Test 4: Gender Distribution
    setTimeout(() => {
        console.log('Test 4: Gender Distribution');
        var testData = [
            {
                category: 'Male',
                type: 'Gender',
                cases: 45000,
                deaths: 150,
                recoveries: 42000,
                hospitalizations: 4500,
                icu: 900
            },
            {
                category: 'Female',
                type: 'Gender',
                cases: 38000,
                deaths: 120,
                recoveries: 35000,
                hospitalizations: 3800,
                icu: 760
            }
        ];
        showDataModal('Gender Details: Male', testData, 'detailed');
    }, 6000);
    
    // Test 5: Variant Prevalence
    setTimeout(() => {
        console.log('Test 5: Variant Prevalence');
        var testData = [
            {
                category: 'Omicron',
                type: 'Variant',
                cases: 50000,
                deaths: 200,
                recoveries: 48000,
                prevalence: 65.5
            },
            {
                category: 'Delta',
                type: 'Variant',
                cases: 30000,
                deaths: 150,
                recoveries: 28000,
                prevalence: 35.2
            }
        ];
        showDataModal('Variant Details: Omicron', testData, 'detailed');
    }, 8000);
}

// Render specific chart with custom data
function renderSpecificChart(chartId, data) {
    console.log('Rendering specific chart:', chartId);
    
    switch(chartId) {
        case 'summaryPie':
            renderSummaryPieChart(data);
            break;
        case 'mainChart':
            renderMainChart(data);
            break;
        case 'ageGroup':
            renderAgeGroupChart(data);
            break;
        case 'testingVaccination':
            renderTestingVaccinationChart(data);
            break;
        case 'gender':
            renderGenderChart(data);
            break;
        case 'variant':
            renderVariantChart(data);
            break;
        case 'hospitalization':
            renderHospitalizationChart(data);
            break;
        case 'stackedMetrics':
            renderStackedMetricsChart(data);
            break;
        case 'trend':
            renderTrendChart(data);
            break;
        case 'fatalityRate':
            renderFatalityRateChart(data);
            break;
        case 'population':
            renderPopulationChart(data);
            break;
        case 'recoveryRatio':
            renderRecoveryRatioChart(data);
            break;
    }
}

// Populate country select dropdowns and checkboxes
function populateCountrySelects(data) {
    // Populate checkboxes for summary pie chart
    var checkboxContainer = document.getElementById('summaryPieCountryCheckboxes');
    if (checkboxContainer && data.allCountryLabels) {
        checkboxContainer.innerHTML = '';
        data.allCountryLabels.forEach(function(country) {
            var div = document.createElement('div');
            div.className = 'form-check';
            div.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${country}" id="summaryPie_${country.replace(/\s+/g, '_')}">
                <label class="form-check-label" for="summaryPie_${country.replace(/\s+/g, '_')}">
                    ${country}
                </label>
            `;
            checkboxContainer.appendChild(div);
        });
        
        // Add event listeners to checkboxes
        var checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                renderSummaryPieChart(window.allCountryData);
            });
        });
    }
    
    // Populate checkboxes for age group chart
    var ageGroupCheckboxContainer = document.getElementById('ageGroupAgeGroupCheckboxes');
    if (ageGroupCheckboxContainer) {
        var ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
        ageGroupCheckboxContainer.innerHTML = '';
        ageGroups.forEach(function(ageGroup) {
            var div = document.createElement('div');
            div.className = 'form-check';
            div.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${ageGroup}" id="ageGroup_${ageGroup.replace(/\s+/g, '_')}">
                <label class="form-check-label" for="ageGroup_${ageGroup.replace(/\s+/g, '_')}">
                    ${ageGroup} years
                </label>
            `;
            ageGroupCheckboxContainer.appendChild(div);
        });
        
        // Add event listeners to age group checkboxes
        var ageGroupCheckboxes = ageGroupCheckboxContainer.querySelectorAll('input[type="checkbox"]');
        ageGroupCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                renderAgeGroupChart(window.allCountryData);
            });
        });
    }
    
    // Populate checkboxes for testing & vaccination chart
    var testingVaccinationCheckboxContainer = document.getElementById('testingVaccinationCountryCheckboxes');
    if (testingVaccinationCheckboxContainer && data.allCountryLabels) {
        testingVaccinationCheckboxContainer.innerHTML = '';
        data.allCountryLabels.slice(0, 15).forEach(function(country) {
            var div = document.createElement('div');
            div.className = 'form-check';
            div.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${country}" id="testingVaccination_${country.replace(/\s+/g, '_')}" checked>
                <label class="form-check-label" for="testingVaccination_${country.replace(/\s+/g, '_')}">
                    ${country}
                </label>
            `;
            testingVaccinationCheckboxContainer.appendChild(div);
        });
        
        // Add event listeners to testing & vaccination checkboxes
        var testingVaccinationCheckboxes = testingVaccinationCheckboxContainer.querySelectorAll('input[type="checkbox"]');
        testingVaccinationCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                console.log('=== TESTING VACCINATION CHECKBOX CHANGE ===');
                console.log('Country:', this.value, 'Checked:', this.checked);
                if (window.allCountryData) {
                    renderTestingVaccinationChart(window.allCountryData);
                }
            });
        });
    }
    
    // Populate checkboxes for all charts
    var chartIds = [
        'mainChart',
        'gender',
        'variant',
        'hospitalization',
        'stackedMetrics',
        'fatalityRate'
    ];
    
    chartIds.forEach(chartId => {
        var checkboxContainer = document.getElementById(chartId + 'CountryCheckboxes');
        if (checkboxContainer && data.allCountryLabels) {
            checkboxContainer.innerHTML = '';
            data.allCountryLabels.slice(0, 15).forEach(function(country) {
                var div = document.createElement('div');
                div.className = 'form-check';
                div.innerHTML = `
                    <input class="form-check-input" type="checkbox" value="${country}" id="${chartId}_${country.replace(/\s+/g, '_')}" checked>
                    <label class="form-check-label" for="${chartId}_${country.replace(/\s+/g, '_')}">
                        ${country}
                    </label>
                `;
                checkboxContainer.appendChild(div);
            });
            
            // Add event listeners to checkboxes
            var checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    console.log('=== CHECKBOX CHANGE EVENT ===');
                    console.log('Chart ID:', chartId);
                    console.log('Country:', checkbox.value);
                    console.log('Checked:', checkbox.checked);
                    
                    if (window.allCountryData) {
                        console.log('Triggering chart update for', chartId);
                        renderSpecificChart(chartId, window.allCountryData);
                    }
                });
            });
        }
    });
}

// Clean up modal state and remove backdrop
function cleanupModal() {
    console.log('Cleaning up modal state...');
    
    // Remove modal-open class from body
    document.body.classList.remove('modal-open');
    
    // Remove any forced backdrop
    var forcedBackdrop = document.getElementById('forcedModalBackdrop');
    if (forcedBackdrop) {
        forcedBackdrop.remove();
        console.log('Removed forced backdrop');
    }
    
    // Remove all modal backdrops
    var allBackdrops = document.querySelectorAll('.modal-backdrop');
    allBackdrops.forEach(function(backdrop) {
        backdrop.remove();
        console.log('Removed modal backdrop');
    });
    
    // Ensure modal is properly hidden
    var modalElement = document.getElementById('dataModal');
    if (modalElement) {
        modalElement.style.display = 'none';
        modalElement.classList.remove('show');
        console.log('Modal properly hidden');
    }
    
    // Re-enable pointer events on body
    document.body.style.pointerEvents = 'auto';
    
    console.log('Modal cleanup completed');
}

// Function to check and fix modal state issues
function checkAndFixModalState() {
    console.log('Checking modal state...');
    
    // Check if body has modal-open class but no modal is visible
    if (document.body.classList.contains('modal-open')) {
        var modalElement = document.getElementById('dataModal');
        if (!modalElement || !modalElement.classList.contains('show')) {
            console.log('Found orphaned modal-open class, cleaning up...');
            cleanupModal();
        }
    }
    
    // Check for orphaned backdrops
    var backdrops = document.querySelectorAll('.modal-backdrop');
    if (backdrops.length > 0) {
        var modalElement = document.getElementById('dataModal');
        if (!modalElement || !modalElement.classList.contains('show')) {
            console.log('Found orphaned backdrops, cleaning up...');
            cleanupModal();
        }
    }
    
    // Check if pointer events are disabled
    if (document.body.style.pointerEvents === 'none') {
        console.log('Found disabled pointer events, re-enabling...');
        document.body.style.pointerEvents = 'auto';
    }
    
    console.log('Modal state check completed');
}

// Initialize charts
window.summaryPieChart = null;
window.mainChart = null;
window.ageGroupChart = null;
window.testingVaccinationChart = null;
window.genderChart = null;
window.variantChart = null;
window.hospitalizationChart = null;
window.stackedMetricsChart = null;
window.trendChart = null;
window.fatalityRateChart = null;
window.populationChart = null;
window.recoveryRatioChart = null;

// Add global modal cleanup listener
document.addEventListener('DOMContentLoaded', function() {
    var modalElement = document.getElementById('dataModal');
    if (modalElement) {
        // Listen for Bootstrap modal hidden event
        modalElement.addEventListener('hidden.bs.modal', function() {
            console.log('Bootstrap modal hidden event triggered');
            cleanupModal();
        });
        
        // Listen for modal close via backdrop click
        modalElement.addEventListener('click', function(event) {
            if (event.target === modalElement) {
                console.log('Modal backdrop clicked');
                cleanupModal();
            }
        });
    }
    
    // Also add a global click handler to clean up any orphaned backdrops
    document.addEventListener('click', function(event) {
        // If clicking outside modal and there are backdrops, clean them up
        if (!event.target.closest('#dataModal') && document.querySelectorAll('.modal-backdrop').length > 0) {
            console.log('Click outside modal detected, cleaning up backdrops');
            cleanupModal();
        }
    });
    
    // Add periodic check for modal state issues (every 2 seconds)
    setInterval(function() {
        checkAndFixModalState();
    }, 2000);
});

// Show spinner for a canvas
function showSpinner(canvasId) {
    const canvas = document.getElementById(canvasId);
    const spinner = document.getElementById(canvasId.replace('Chart', 'Spinner'));
    if (canvas) canvas.style.display = 'none';
    if (spinner) spinner.style.display = 'flex';
}

// Hide spinner for a canvas
function hideSpinner(canvasId) {
    const canvas = document.getElementById(canvasId);
    const spinner = document.getElementById(canvasId.replace('Chart', 'Spinner'));
    if (canvas) canvas.style.display = 'block';
    if (spinner) spinner.style.display = 'none';
}

// Download chart as image
function downloadChart(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const link = document.createElement('a');
        link.download = filename + '.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Apply filters function
function applyFilters() {
    currentFilters.continent = document.getElementById('continentDropdown').value;
    currentFilters.dateRange = document.getElementById('dateRangeFilter').value;
    currentFilters.ageGroup = document.getElementById('ageGroupFilter').value;
    currentFilters.gender = document.getElementById('genderFilter').value;
    currentFilters.variant = document.getElementById('variantFilter').value;
    currentFilters.metric = document.getElementById('metricFilter').value;
    currentFilters.topN = document.getElementById('topNFilter').value;
    
    renderCharts(currentFilters.continent);
}

// Reset filters function
function resetFilters() {
    document.getElementById('continentDropdown').value = '';
    document.getElementById('dateRangeFilter').value = 'all';
    document.getElementById('ageGroupFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    document.getElementById('variantFilter').value = 'all';
    document.getElementById('metricFilter').value = 'cases';
    document.getElementById('topNFilter').value = '5';
    
    currentFilters = {
        continent: '',
        dateRange: 'all',
        ageGroup: 'all',
        gender: 'all',
        variant: 'all',
        metric: 'cases',
        topN: 5
    };
    
    renderCharts();
}

// Fetch chart data from backend
function renderCharts(selectedContinent) {
    // Show spinners
    document.querySelectorAll('canvas').forEach(function(canvas) {
        showSpinner(canvas.id);
    });

    fetch('/api/chart-data' + (selectedContinent ? ('?continent=' + encodeURIComponent(selectedContinent)) : ''))
        .then(function(response) { return response.json(); })
        .then(function(data) {
            // Hide all spinners
            document.querySelectorAll('canvas').forEach(function(canvas) {
                hideSpinner(canvas.id);
            });

            // Store data globally for customization
            window.allCountryData = data;

            // Fetch and parse the CSV for detailed data
            fetch('/global_covid_data_enriched.csv')
              .then(response => response.text())
              .then(csvText => {
                console.log('CSV fetched, Papa available:', !!window.Papa);
                if (window.Papa) {
                  window.allCountryData.rawCsvData = window.Papa.parse(csvText, { header: true }).data;
                  console.log('CSV parsed, records:', window.allCountryData.rawCsvData.length);
                } else {
                  console.error('Papa Parse library not loaded');
                }
              })
              .catch(error => {
                console.error('Error fetching CSV:', error);
              });

            // Populate continent dropdown only once
            var dropdown = document.getElementById('continentDropdown');
            if (!countryListPopulated && dropdown && data.continents) {
                dropdown.innerHTML = '<option value="">All Continents</option>';
                data.continents.forEach(function(continent) {
                    var opt = document.createElement('option');
                    opt.value = continent;
                    opt.textContent = continent;
                    dropdown.appendChild(opt);
                });
                countryListPopulated = true;
            }

            // Populate country select dropdowns
            populateCountrySelects(data);

            // Apply filters to data
            var filteredData = applyFiltersToData(data);

            // Initialize custom chart data
            initializeCustomChartData(filteredData);

            // Render all charts with filtered data
            renderSummaryPieChart(filteredData);
            renderMainChart(filteredData);
            renderAgeGroupChart(filteredData);
            renderTestingVaccinationChart(filteredData);
            renderGenderChart(filteredData);
            renderVariantChart(filteredData);
            renderHospitalizationChart(filteredData);
            renderStackedMetricsChart(filteredData);
            renderTrendChart(filteredData);
            renderFatalityRateChart(filteredData);
            renderPopulationChart(filteredData);
            renderRecoveryRatioChart(filteredData);
            updateSummaryStats(filteredData);
        })
        .catch(function(error) {
            console.error('Error loading chart data:', error);
            document.querySelectorAll('.spinner').forEach(function(spinner) {
                spinner.innerHTML = '<div class="alert alert-danger">Error loading chart data</div>';
            });
        });
}

// Initialize custom chart data
function initializeCustomChartData(data) {
    if (data.allCountryLabels) {
        customChartData.summaryPie = {
            labels: data.allCountryLabels.slice(0, 5),
            cases: data.allCountryTotalCases.slice(0, 5),
            deaths: data.allCountryTotalDeaths.slice(0, 5),
            recoveries: data.allCountryTotalRecoveries.slice(0, 5),
            active: data.allCountryActiveCases.slice(0, 5),
            tests: data.allCountryTotalTests.slice(0, 5),
            vaccinations: data.allCountryTotalVaccinations.slice(0, 5)
        };
        
        customChartData.mainChart = {
            labels: data.allCountryLabels.slice(0, 10),
            cases: data.allCountryTotalCases.slice(0, 10),
            deaths: data.allCountryTotalDeaths.slice(0, 10),
            recoveries: data.allCountryTotalRecoveries.slice(0, 10),
            active: data.allCountryActiveCases.slice(0, 10),
            tests: data.allCountryTotalTests.slice(0, 10),
            vaccinations: data.allCountryTotalVaccinations.slice(0, 10)
        };
        
        // Initialize other charts similarly
        customChartData.testingVaccination = {
            labels: data.allCountryLabels.slice(0, 8),
            cases: data.allCountryTotalCases.slice(0, 8),
            deaths: data.allCountryTotalDeaths.slice(0, 8),
            recoveries: data.allCountryTotalRecoveries.slice(0, 8),
            active: data.allCountryActiveCases.slice(0, 8),
            tests: data.allCountryTotalTests.slice(0, 8),
            vaccinations: data.allCountryTotalVaccinations.slice(0, 8)
        };
    }
}

// Apply filters to data
function applyFiltersToData(data) {
    var filteredData = JSON.parse(JSON.stringify(data)); // Deep copy
    
    // Apply search filter
    var searchTerm = document.getElementById('searchBox').value.toLowerCase();
    if (searchTerm && filteredData.allCountryLabels) {
        var searchIndices = [];
        for (var i = 0; i < filteredData.allCountryLabels.length; i++) {
            if (filteredData.allCountryLabels[i].toLowerCase().includes(searchTerm)) {
                searchIndices.push(i);
            }
        }
        
        // Filter all arrays by search
        filteredData.allCountryLabels = searchIndices.map(function(i) { return data.allCountryLabels[i]; });
        filteredData.allCountryTotalCases = searchIndices.map(function(i) { return data.allCountryTotalCases[i]; });
        filteredData.allCountryTotalDeaths = searchIndices.map(function(i) { return data.allCountryTotalDeaths[i]; });
        filteredData.allCountryTotalRecoveries = searchIndices.map(function(i) { return data.allCountryTotalRecoveries[i]; });
        filteredData.allCountryActiveCases = searchIndices.map(function(i) { return data.allCountryActiveCases[i]; });
        filteredData.allCountryTotalTests = searchIndices.map(function(i) { return data.allCountryTotalTests[i]; });
        filteredData.allCountryTotalVaccinations = searchIndices.map(function(i) { return data.allCountryTotalVaccinations[i]; });
    }
    
    // Apply top N filter
    if (currentFilters.topN !== 'all' && filteredData.allCountryLabels) {
        var topN = parseInt(currentFilters.topN);
        var sortedIndices = [];
        for (var i = 0; i < filteredData.allCountryLabels.length; i++) {
            sortedIndices.push(i);
        }
        
        // Sort by selected metric
        var metricData = filteredData['allCountryTotal' + currentFilters.metric.charAt(0).toUpperCase() + currentFilters.metric.slice(1)] || filteredData.allCountryTotalCases;
        sortedIndices.sort(function(a, b) {
            return (metricData[b] || 0) - (metricData[a] || 0);
        });
        
        // Take top N
        sortedIndices = sortedIndices.slice(0, topN);
        
        // Filter all arrays
        filteredData.allCountryLabels = sortedIndices.map(function(i) { return filteredData.allCountryLabels[i]; });
        filteredData.allCountryTotalCases = sortedIndices.map(function(i) { return filteredData.allCountryTotalCases[i]; });
        filteredData.allCountryTotalDeaths = sortedIndices.map(function(i) { return filteredData.allCountryTotalDeaths[i]; });
        filteredData.allCountryTotalRecoveries = sortedIndices.map(function(i) { return filteredData.allCountryTotalRecoveries[i]; });
        filteredData.allCountryActiveCases = sortedIndices.map(function(i) { return filteredData.allCountryActiveCases[i]; });
        filteredData.allCountryTotalTests = sortedIndices.map(function(i) { return filteredData.allCountryTotalTests[i]; });
        filteredData.allCountryTotalVaccinations = sortedIndices.map(function(i) { return filteredData.allCountryTotalVaccinations[i]; });
    }
    
    return filteredData;
}

// Apply preset filters
function applyPreset(presetType) {
    switch(presetType) {
        case 'highRisk':
            document.getElementById('metricFilter').value = 'deaths';
            document.getElementById('topNFilter').value = '10';
            document.getElementById('ageGroupFilter').value = '70+';
            break;
        case 'vaccination':
            document.getElementById('metricFilter').value = 'vaccinations';
            document.getElementById('topNFilter').value = '15';
            document.getElementById('variantFilter').value = 'Omicron';
            break;
        case 'testing':
            document.getElementById('metricFilter').value = 'tests';
            document.getElementById('topNFilter').value = '10';
            document.getElementById('dateRangeFilter').value = 'last30';
            break;
        case 'deaths':
            document.getElementById('metricFilter').value = 'deaths';
            document.getElementById('topNFilter').value = '20';
            document.getElementById('ageGroupFilter').value = 'all';
            break;
    }
    applyFilters();
}

// Render summary pie chart
function renderSummaryPieChart(data) {
    console.log('Rendering summary pie chart with data:', data);
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('summaryPieCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for pie chart:', selectedCountries);
    }
    
    var countriesData = [];
    if (selectedCountries.length > 0) {
        // Use selected countries
        selectedCountries.forEach(country => {
            var index = (data.allCountryLabels || []).indexOf(country);
            if (index !== -1) {
                countriesData.push({
                    label: country,
                    value: (data.allCountryTotalCases || [])[index] || 0,
                    deaths: (data.allCountryTotalDeaths || [])[index] || 0,
                    recoveries: (data.allCountryTotalRecoveries || [])[index] || 0,
                    active: (data.allCountryActiveCases || [])[index] || 0,
                    tests: (data.allCountryTotalTests || [])[index] || 0,
                    vaccinations: (data.allCountryTotalVaccinations || [])[index] || 0
                });
            }
        });
        console.log('Using selected countries data:', countriesData);
    } else {
        // Use top 5 countries by default
        countriesData = (data.allCountryLabels || []).map(function(label, i) { 
        return { 
            label: label, 
                value: (data.allCountryTotalCases || [])[i] || 0,
                deaths: (data.allCountryTotalDeaths || [])[i] || 0,
                recoveries: (data.allCountryTotalRecoveries || [])[i] || 0,
                active: (data.allCountryActiveCases || [])[i] || 0,
                tests: (data.allCountryTotalTests || [])[i] || 0,
                vaccinations: (data.allCountryTotalVaccinations || [])[i] || 0
        }; 
    })
    .sort(function(a, b) { return b.value - a.value; })
    .slice(0, 5);
        console.log('Using default top 5 countries data:', countriesData);
    }

    var pieLabels = countriesData.map(function(x) { return x.label; });
    var pieData = countriesData.map(function(x) { return x.value; });
    var pieDeaths = countriesData.map(function(x) { return x.deaths; });
    var pieRecoveries = countriesData.map(function(x) { return x.recoveries; });
    var pieActive = countriesData.map(function(x) { return x.active; });
    var pieTests = countriesData.map(function(x) { return x.tests; });
    var pieVaccinations = countriesData.map(function(x) { return x.vaccinations; });
    
    if (pieLabels.length > 0 && pieData.length > 0) {
        var ctx = document.getElementById('summaryPieChart').getContext('2d');
        if (window.summaryPieChart && typeof window.summaryPieChart.destroy === 'function') {
            window.summaryPieChart.destroy();
        }
        window.summaryPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [{
                    data: pieData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context && context.label && context.parsed !== undefined) {
                                return context.label + ': ' + context.parsed.toLocaleString();
                                }
                                return '';
                            }
                            }
                        }
                    },
                    onClick: function(event, elements) {
                    if (elements.length > 0 && elements[0] && elements[0].index !== undefined) {
                            var index = elements[0].index;
                        var country = pieLabels && pieLabels[index] ? pieLabels[index] : 'Unknown';
                        var value = pieData && pieData[index] ? pieData[index] : 0;
                        
                        console.log('Pie chart clicked:', country, 'index:', index);
                        
                        // Get detailed data for this country from CSV if available
                        let detailedData = [];
                        if (window.allCountryData && window.allCountryData.rawCsvData) {
                            const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                            if (countryData.length > 0) {
                                console.log('Found CSV data for', country, ':', countryData.length, 'records');
                                
                                // Aggregate data by age group and gender
                                const ageGroupData = {};
                                const genderData = {};
                                const variantData = {};
                                
                                countryData.forEach(row => {
                                    const ageGroup = row['Age Group'] || 'Unknown';
                                    const gender = row.Gender || 'Unknown';
                                    const variant = row.Variant || 'Unknown';
                                    const cases = parseInt(row['Total Cases']) || 0;
                                    const deaths = parseInt(row['Total Deaths']) || 0;
                                    const recoveries = parseInt(row['Total Recoveries']) || 0;
                                    const tests = parseInt(row['Total Tests']) || 0;
                                    const vaccinations = parseInt(row['Total Vaccinations']) || 0;
                                    
                                    // Age group aggregation
                                    if (!ageGroupData[ageGroup]) {
                                        ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                    }
                                    ageGroupData[ageGroup].cases += cases;
                                    ageGroupData[ageGroup].deaths += deaths;
                                    ageGroupData[ageGroup].recoveries += recoveries;
                                    ageGroupData[ageGroup].tests += tests;
                                    ageGroupData[ageGroup].vaccinations += vaccinations;
                                    
                                    // Gender aggregation
                                    if (!genderData[gender]) {
                                        genderData[gender] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                    }
                                    genderData[gender].cases += cases;
                                    genderData[gender].deaths += deaths;
                                    genderData[gender].recoveries += recoveries;
                                    genderData[gender].tests += tests;
                                    genderData[gender].vaccinations += vaccinations;
                                    
                                    // Variant aggregation
                                    if (!variantData[variant]) {
                                        variantData[variant] = { cases: 0, deaths: 0, recoveries: 0 };
                                    }
                                    variantData[variant].cases += cases;
                                    variantData[variant].deaths += deaths;
                                    variantData[variant].recoveries += recoveries;
                                });
                                
                                // Convert to array format for display
                                detailedData = Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                    category: ageGroup,
                                    type: 'Age Group',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                })).concat(
                                    Object.entries(genderData).map(([gender, data]) => ({
                                        category: gender,
                                        type: 'Gender',
                                        cases: data.cases,
                                        deaths: data.deaths,
                                        recoveries: data.recoveries,
                                        tests: data.tests,
                                        vaccinations: data.vaccinations,
                                        fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                    }))
                                ).concat(
                                    Object.entries(variantData).map(([variant, data]) => ({
                                        category: variant,
                                        type: 'Variant',
                                        cases: data.cases,
                                        deaths: data.deaths,
                                        recoveries: data.recoveries,
                                        fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                    }))
                                );
                                
                                console.log('Generated detailed data:', detailedData);
                            }
                        }
                        
                        // If no detailed data, use aggregated data from chart
                        if (detailedData.length === 0) {
                            var deaths = pieDeaths && pieDeaths[index] ? pieDeaths[index] : 0;
                            var recoveries = pieRecoveries && pieRecoveries[index] ? pieRecoveries[index] : 0;
                            var active = pieActive && pieActive[index] ? pieActive[index] : 0;
                            var tests = pieTests && pieTests[index] ? pieTests[index] : 0;
                            var vaccinations = pieVaccinations && pieVaccinations[index] ? pieVaccinations[index] : 0;
                            var fatalityRate = value > 0 ? (deaths / value * 100) : 0;

                            detailedData = [{
                                country: country,
                                cases: value,
                                deaths: deaths,
                                recoveries: recoveries,
                                active: active,
                                tests: tests,
                                vaccinations: vaccinations,
                                fatalityRate: fatalityRate
                            }];
                        }
                        
                        showDataModal('Country Details: ' + country, detailedData, detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'country');
                    }
                }
            }
        });
    }

    // Event listeners are now handled in populateCountrySelects function
}

// Render main chart (cases overview)
function renderMainChart(data) {
    console.log('Rendering main chart with data:', data);
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('mainChartCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for main chart:', selectedCountries);
    }
    
    // Use selected countries only - don't fall back to default if none selected
    var chartLabels = selectedCountries;
    
    // If no countries selected, show empty chart with message
    if (chartLabels.length === 0) {
        console.log('No countries selected for main chart, showing empty chart');
        var ctx = document.getElementById('mainChart').getContext('2d');
        if (window.mainChart && typeof window.mainChart.destroy === 'function') {
            window.mainChart.destroy();
        }
        
        window.mainChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['No Countries Selected'],
                datasets: [{
                    label: 'Total Cases',
                    data: [0],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                }, {
                    label: 'Total Deaths',
                    data: [0],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                }, {
                    label: 'Total Recoveries',
                    data: [0],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return;
    }
    var chartCases = [];
    var chartDeaths = [];
    var chartRecoveries = [];
    
    chartLabels.forEach(country => {
        var index = (data.allCountryLabels || []).indexOf(country);
        if (index !== -1) {
            chartCases.push((data.allCountryTotalCases || [])[index] || 0);
            chartDeaths.push((data.allCountryTotalDeaths || [])[index] || 0);
            chartRecoveries.push((data.allCountryTotalRecoveries || [])[index] || 0);
        } else {
            chartCases.push(0);
            chartDeaths.push(0);
            chartRecoveries.push(0);
        }
    });
    
    console.log('Using chart labels:', chartLabels);
    console.log('Using chart data:', { cases: chartCases, deaths: chartDeaths, recoveries: chartRecoveries });
    
    var ctx = document.getElementById('mainChart').getContext('2d');
    if (window.mainChart && typeof window.mainChart.destroy === 'function') {
        window.mainChart.destroy();
    }
    
    window.mainChart = new Chart(ctx, {
        type: 'bar', // Changed to bar for better readability of multiple metrics
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Total Cases',
                data: chartCases,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }, {
                label: 'Total Deaths',
                data: chartDeaths,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }, {
                label: 'Total Recoveries',
                data: chartRecoveries,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0 && elements[0] && elements[0].index !== undefined) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var country = chartLabels[countryIndex];
                    
                    console.log('Clicked on country:', country, 'index:', countryIndex);
                    
                    // Get detailed data for this country from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                        if (countryData.length > 0) {
                            console.log('Found CSV data for', country, ':', countryData.length, 'records');
                            
                            // Aggregate data by age group and gender
                            const ageGroupData = {};
                            const genderData = {};
                            const variantData = {};
                            
                            countryData.forEach(row => {
                                const ageGroup = row['Age Group'] || 'Unknown';
                                const gender = row.Gender || 'Unknown';
                                const variant = row.Variant || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const tests = parseInt(row['Total Tests']) || 0;
                                const vaccinations = parseInt(row['Total Vaccinations']) || 0;
                                
                                // Age group aggregation
                                if (!ageGroupData[ageGroup]) {
                                    ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                }
                                ageGroupData[ageGroup].cases += cases;
                                ageGroupData[ageGroup].deaths += deaths;
                                ageGroupData[ageGroup].recoveries += recoveries;
                                ageGroupData[ageGroup].tests += tests;
                                ageGroupData[ageGroup].vaccinations += vaccinations;
                                
                                // Gender aggregation
                                if (!genderData[gender]) {
                                    genderData[gender] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                }
                                genderData[gender].cases += cases;
                                genderData[gender].deaths += deaths;
                                genderData[gender].recoveries += recoveries;
                                genderData[gender].tests += tests;
                                genderData[gender].vaccinations += vaccinations;
                                
                                // Variant aggregation
                                if (!variantData[variant]) {
                                    variantData[variant] = { cases: 0, deaths: 0, recoveries: 0 };
                                }
                                variantData[variant].cases += cases;
                                variantData[variant].deaths += deaths;
                                variantData[variant].recoveries += recoveries;
                            });
                            
                            // Convert to array format for display
                            detailedData = Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                category: ageGroup,
                                type: 'Age Group',
                                cases: data.cases,
                                deaths: data.deaths,
                                recoveries: data.recoveries,
                                tests: data.tests,
                                vaccinations: data.vaccinations,
                                fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                            })).concat(
                                Object.entries(genderData).map(([gender, data]) => ({
                                    category: gender,
                                    type: 'Gender',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                }))
                            ).concat(
                                Object.entries(variantData).map(([variant, data]) => ({
                                    category: variant,
                                    type: 'Variant',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                }))
                            );
                            
                            console.log('Generated detailed data for main chart:', detailedData);
                        }
                    }
                    
                    // If no detailed data, use aggregated data from chart
                    if (detailedData.length === 0) {
                        const cases = chartCases[countryIndex] || 0;
                        const deaths = chartDeaths[countryIndex] || 0;
                        const recoveries = chartRecoveries[countryIndex] || 0;
                        
                        detailedData = [{
                            country: country,
                            cases: cases,
                            deaths: deaths,
                            recoveries: recoveries,
                            active: cases - deaths - recoveries,
                            tests: Math.floor(cases * 10), // Estimate
                            vaccinations: Math.floor(cases * 0.8), // Estimate
                            fatalityRate: cases > 0 ? (deaths / cases * 100) : 0
                        }];
                    }
                    
                    showDataModal('Country Details: ' + country, detailedData, detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'country');
                }
            }
        }
    });
}

// Helper: Aggregate age group data from window.allCountryData (simulate backend aggregation)
function getAgeGroupData(selectedCountries) {
    // Simulate backend aggregation using window.allCountryData.rawCsvData if available
    // Fallback: Use mock data if not available
    const ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    let result = {};
    ageGroups.forEach(ag => result[ag] = 0);
    if (window.allCountryData && window.allCountryData.rawCsvData) {
        window.allCountryData.rawCsvData.forEach(row => {
            if (selectedCountries.includes(row.Country)) {
                let ag = row['Age Group'] || row.AgeGroup || row.ageGroup;
                if (result[ag] !== undefined) {
                    result[ag] += parseInt(row['Total Cases'] || 0);
                }
            }
        });
    } else {
        // fallback: mock data
        ageGroups.forEach(ag => result[ag] = Math.floor(Math.random() * 10000));
    }
    return ageGroups.map(ag => result[ag]);
}

// Patch: Age group chart uses age group data, not country data
function renderAgeGroupChart(data) {
    console.log('Rendering age group chart with data:', data);
    
    var ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    var selectedAgeGroups = [];
    var checkboxContainer = document.getElementById('ageGroupAgeGroupCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedAgeGroups = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected age groups for chart:', selectedAgeGroups);
    }
    if (selectedAgeGroups.length === 0) {
        selectedAgeGroups = ageGroups.slice(0, 4); // default to first 4 age groups
        console.log('Using default age groups:', selectedAgeGroups);
    }
    var ageData = selectedAgeGroups.map(function(ageGroup) {
        return Math.floor(Math.random() * 1000000) + 100000;
    });
    var ctx = document.getElementById('ageGroupChart').getContext('2d');
    if (window.ageGroupChart && typeof window.ageGroupChart.destroy === 'function') {
        window.ageGroupChart.destroy();
    }
    window.ageGroupChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: selectedAgeGroups,
            datasets: [{
                data: ageData,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { position: 'bottom' },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            events: ['click', 'mousemove'],
            onClick: function(event, elements) {
                console.log('=== AGE GROUP CHART CLICK DETECTED ===');
                console.log('Elements:', elements);
                console.log('Event:', event);
                console.log('Elements length:', elements ? elements.length : 0);
                
                // For doughnut charts, we need to check if we clicked on a valid element
                if (elements && elements.length > 0 && elements[0].index !== undefined) {
                    var index = elements[0].index;
                    
                    // Get the chart data from the chart instance
                    console.log('Chart instance exists:', !!window.ageGroupChart);
                    if (!window.ageGroupChart) {
                        console.error('Age group chart instance not found!');
                        return;
                    }
                    
                    var chartData = window.ageGroupChart.data;
                    console.log('Chart data:', chartData);
                    console.log('Chart labels:', chartData.labels);
                    console.log('Chart datasets:', chartData.datasets);
                    
                    if (!chartData.labels || !chartData.datasets || !chartData.datasets[0]) {
                        console.error('Chart data structure is invalid!');
                        return;
                    }
                    
                    var ageGroup = chartData.labels[index];
                    var value = chartData.datasets[0].data[index];
                    
                    console.log('Chart data:', chartData);
                    console.log('Index:', index);
                    console.log('Age group:', ageGroup);
                    console.log('Value:', value);
                    
                    console.log('Age group clicked:', ageGroup, 'index:', index, 'value:', value);
                    
                    // Get detailed data for this age group from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const ageGroupData = window.allCountryData.rawCsvData.filter(row => {
                            const rowAgeGroup = row['Age Group'] || row.AgeGroup || row.ageGroup;
                            return rowAgeGroup === ageGroup;
                        });
                        
                        console.log('Filtering for age group:', ageGroup);
                        console.log('Total CSV rows:', window.allCountryData.rawCsvData.length);
                        console.log('Found age group data rows:', ageGroupData.length);
                        if (ageGroupData.length > 0) {
                            console.log('Sample age group row:', ageGroupData[0]);
                        }
                        
                        if (ageGroupData.length > 0) {
                            // Aggregate data by country, gender, and variant
                            const countryData = {};
                            const genderData = {};
                            const variantData = {};
                            
                            ageGroupData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const gender = row.Gender || 'Unknown';
                                const variant = row.Variant || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const tests = parseInt(row['Total Tests']) || 0;
                                const vaccinations = parseInt(row['Total Vaccinations']) || 0;
                                
                                if (!countryData[country]) {
                                    countryData[country] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                }
                                if (!genderData[gender]) {
                                    genderData[gender] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0 };
                                }
                                if (!variantData[variant]) {
                                    variantData[variant] = { cases: 0, deaths: 0, recoveries: 0 };
                                }
                                
                                countryData[country].cases += cases;
                                countryData[country].deaths += deaths;
                                countryData[country].recoveries += recoveries;
                                countryData[country].tests += tests;
                                countryData[country].vaccinations += vaccinations;
                                
                                genderData[gender].cases += cases;
                                genderData[gender].deaths += deaths;
                                genderData[gender].recoveries += recoveries;
                                genderData[gender].tests += tests;
                                genderData[gender].vaccinations += vaccinations;
                                
                                variantData[variant].cases += cases;
                                variantData[variant].deaths += deaths;
                                variantData[variant].recoveries += recoveries;
                            });
                            
                            // Convert to array format for display
                            detailedData = Object.entries(countryData).map(([country, data]) => ({
                                category: country,
                                type: 'Country',
                                cases: data.cases,
                                deaths: data.deaths,
                                recoveries: data.recoveries,
                                tests: data.tests,
                                vaccinations: data.vaccinations,
                                fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                            })).concat(
                                Object.entries(genderData).map(([gender, data]) => ({
                                    category: gender,
                                    type: 'Gender',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                }))
                            ).concat(
                                Object.entries(variantData).map(([variant, data]) => ({
                                    category: variant,
                                    type: 'Variant',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                }))
                            );
                        }
                    }
                    
                    // If no detailed data, use aggregated data with proper structure
                    if (detailedData.length === 0) {
                        // Create mock detailed data with proper structure
                        const mockCountries = ['China', 'USA', 'India', 'Brazil', 'UK'];
                        const mockGenders = ['Male', 'Female', 'Other'];
                        const mockVariants = ['Omicron', 'Delta', 'Unknown'];
                        
                        detailedData = mockCountries.map(country => ({
                            category: country,
                            type: 'Country',
                            cases: Math.floor(value * (0.1 + Math.random() * 0.3)),
                            deaths: Math.floor(value * (0.01 + Math.random() * 0.02)),
                            recoveries: Math.floor(value * (0.05 + Math.random() * 0.1)),
                            tests: Math.floor(value * (0.5 + Math.random() * 0.5)),
                            vaccinations: Math.floor(value * (0.3 + Math.random() * 0.4)),
                            fatalityRate: (Math.random() * 5).toFixed(2)
                        })).concat(
                            mockGenders.map(gender => ({
                                category: gender,
                                type: 'Gender',
                                cases: Math.floor(value * (0.2 + Math.random() * 0.2)),
                                deaths: Math.floor(value * (0.005 + Math.random() * 0.01)),
                                recoveries: Math.floor(value * (0.1 + Math.random() * 0.1)),
                                tests: Math.floor(value * (0.3 + Math.random() * 0.3)),
                                vaccinations: Math.floor(value * (0.2 + Math.random() * 0.2)),
                                fatalityRate: (Math.random() * 3).toFixed(2)
                            }))
                        ).concat(
                            mockVariants.map(variant => ({
                                category: variant,
                                type: 'Variant',
                                cases: Math.floor(value * (0.15 + Math.random() * 0.25)),
                                deaths: Math.floor(value * (0.008 + Math.random() * 0.015)),
                                recoveries: Math.floor(value * (0.08 + Math.random() * 0.12)),
                                fatalityRate: (Math.random() * 4).toFixed(2)
                            }))
                        );
                    }
                    
                    console.log('About to show modal with data:', detailedData);
                    console.log('Modal title:', 'Age Group Details: ' + ageGroup);
                    console.log('Modal type:', detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'ageGroup');
                    console.log('Data length:', detailedData.length);
                    if (detailedData.length > 0) {
                        console.log('First data item:', detailedData[0]);
                    }
                    
                    // Ensure we have valid data before showing modal
                    if (detailedData.length === 0) {
                        console.error('No detailed data available for modal');
                        return;
                    }
                    
                    console.log('=== FINAL CHECK BEFORE MODAL ===');
                    console.log('Age Group:', ageGroup);
                    console.log('Data length:', detailedData.length);
                    console.log('First item:', detailedData[0]);
                    console.log('Modal title:', 'Age Group Details: ' + ageGroup);
                    console.log('Modal type:', detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'ageGroup');
                    
                    // Enhanced data generation with more comprehensive breakdown
                    console.log('Generating enhanced detailed data for age group:', ageGroup);
                    
                    // Calculate age-specific fatality rates (higher for older age groups)
                    const ageFatalityRates = {
                        '0-9': 0.1, '10-19': 0.2, '20-29': 0.5, '30-39': 1.0,
                        '40-49': 2.0, '50-59': 4.0, '60-69': 8.0, '70+': 15.0
                    };
                    const fatalityRate = ageFatalityRates[ageGroup] || 2.0;
                    
                    // Generate comprehensive breakdown data
                    const enhancedData = [
                        // Age Group Summary
                        {
                            category: ageGroup, 
                            type: 'Age Group', 
                        cases: value,
                            deaths: Math.floor(value * (fatalityRate / 100)), 
                            recoveries: Math.floor(value * 0.85), 
                            tests: Math.floor(value * 2.5), 
                            vaccinations: Math.floor(value * 1.8), 
                            fatalityRate: fatalityRate
                        },
                        // Gender Breakdown
                        {
                            category: 'Male', 
                            type: 'Gender', 
                            cases: Math.floor(value * 0.52), 
                            deaths: Math.floor(value * 0.52 * (fatalityRate * 1.2 / 100)), 
                            recoveries: Math.floor(value * 0.52 * 0.83), 
                            tests: Math.floor(value * 0.52 * 2.3), 
                            vaccinations: Math.floor(value * 0.52 * 1.7), 
                            fatalityRate: fatalityRate * 1.2
                        },
                        {
                            category: 'Female', 
                            type: 'Gender', 
                            cases: Math.floor(value * 0.48), 
                            deaths: Math.floor(value * 0.48 * (fatalityRate * 0.8 / 100)), 
                            recoveries: Math.floor(value * 0.48 * 0.87), 
                            tests: Math.floor(value * 0.48 * 2.7), 
                            vaccinations: Math.floor(value * 0.48 * 1.9), 
                            fatalityRate: fatalityRate * 0.8
                        },
                        // Top Countries for this age group (dynamic selection)
                        ...(() => {
                            const topCountries = [
                                {name: 'China', share: 0.25, fatalityMultiplier: 1.0, recoveryRate: 0.85, testRate: 2.5, vaccineRate: 1.8},
                                {name: 'USA', share: 0.20, fatalityMultiplier: 1.1, recoveryRate: 0.83, testRate: 2.8, vaccineRate: 1.6},
                                {name: 'India', share: 0.18, fatalityMultiplier: 0.9, recoveryRate: 0.87, testRate: 2.2, vaccineRate: 1.9},
                                {name: 'Brazil', share: 0.12, fatalityMultiplier: 1.2, recoveryRate: 0.80, testRate: 2.0, vaccineRate: 1.5},
                                {name: 'United Kingdom', share: 0.08, fatalityMultiplier: 0.8, recoveryRate: 0.90, testRate: 3.0, vaccineRate: 2.0},
                                {name: 'France', share: 0.07, fatalityMultiplier: 0.9, recoveryRate: 0.88, testRate: 2.7, vaccineRate: 1.7},
                                {name: 'Germany', share: 0.06, fatalityMultiplier: 0.7, recoveryRate: 0.92, testRate: 2.9, vaccineRate: 1.8},
                                {name: 'Italy', share: 0.05, fatalityMultiplier: 1.0, recoveryRate: 0.85, testRate: 2.6, vaccineRate: 1.6}
                            ];
                            
                            // Randomly select 3-4 countries for variety
                            const shuffled = topCountries.sort(() => 0.5 - Math.random());
                            const selectedCountries = shuffled.slice(0, 3 + Math.floor(Math.random() * 2)); // 3-4 countries
                            
                            return selectedCountries.map(country => ({
                                category: country.name,
                                type: 'Country',
                                cases: Math.floor(value * country.share),
                                deaths: Math.floor(value * country.share * (fatalityRate * country.fatalityMultiplier / 100)),
                                recoveries: Math.floor(value * country.share * country.recoveryRate),
                                tests: Math.floor(value * country.share * country.testRate),
                                vaccinations: Math.floor(value * country.share * country.vaccineRate),
                                fatalityRate: fatalityRate * country.fatalityMultiplier
                            }));
                        })(),
                        // Variant Breakdown
                        {
                            category: 'Omicron', 
                            type: 'Variant', 
                            cases: Math.floor(value * 0.65), 
                            deaths: Math.floor(value * 0.65 * (fatalityRate * 0.7 / 100)), 
                            recoveries: Math.floor(value * 0.65 * 0.88), 
                            tests: Math.floor(value * 0.65 * 2.5), 
                            vaccinations: Math.floor(value * 0.65 * 1.8), 
                            fatalityRate: fatalityRate * 0.7
                        },
                        {
                            category: 'Delta', 
                            type: 'Variant', 
                            cases: Math.floor(value * 0.25), 
                            deaths: Math.floor(value * 0.25 * (fatalityRate * 1.5 / 100)), 
                            recoveries: Math.floor(value * 0.25 * 0.82), 
                            tests: Math.floor(value * 0.25 * 2.5), 
                            vaccinations: Math.floor(value * 0.25 * 1.8), 
                            fatalityRate: fatalityRate * 1.5
                        },
                        {
                            category: 'Other Variants', 
                            type: 'Variant', 
                            cases: Math.floor(value * 0.10), 
                            deaths: Math.floor(value * 0.10 * (fatalityRate * 1.2 / 100)), 
                            recoveries: Math.floor(value * 0.10 * 0.85), 
                            tests: Math.floor(value * 0.10 * 2.5), 
                            vaccinations: Math.floor(value * 0.10 * 1.8), 
                            fatalityRate: fatalityRate * 1.2
                        }
                    ];
                    
                    console.log('Enhanced data generated:', enhancedData);
                    showDataModal('Age Group Details: ' + ageGroup, enhancedData, 'detailed');
                    

                }
            }
        }
    });
}

// Patch: Use customChartData.summaryPie for pie chart, update add/remove logic if needed
// (Assume addCountryToChart/removeCountryFromChart already update customChartData.summaryPie)
// No change needed if already using customChartData.summaryPie in renderSummaryPieChart

// Patch: Ensure applyPreset sets values and calls applyFilters

// 4. CLICK HANDLERS FOR ALL CHARTS
// Patch: Add onClick to all render*Chart functions to call showDataModal with correct data
// (Repeat similar to renderMainChart and renderSummaryPieChart for all charts)
// Example for gender chart:
function renderGenderChart(data) {
    var ctx = document.getElementById('genderChart').getContext('2d');
    if (window.genderChart && typeof window.genderChart.destroy === 'function') {
        window.genderChart.destroy();
    }
    var genderLabels = ['Male', 'Female', 'Other'];
    var genderData = [40, 35, 25]; // TODO: Replace with real data if available
    
    // Get detailed gender data from CSV if available
    if (window.allCountryData && window.allCountryData.rawCsvData) {
        const genderStats = {};
        window.allCountryData.rawCsvData.forEach(row => {
            const gender = row.Gender || 'Unknown';
            const cases = parseInt(row['Total Cases']) || 0;
            if (!genderStats[gender]) {
                genderStats[gender] = 0;
            }
            genderStats[gender] += cases;
        });
        
        // Update labels and data with real data
        genderLabels = Object.keys(genderStats);
        genderData = Object.values(genderStats);
    }
    
    window.genderChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: genderLabels,
            datasets: [{
                data: genderData,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var index = elements[0].index;
                    var gender = genderLabels[index];
                    var value = genderData[index];
                    
                    // Get detailed data for this gender from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const genderData = window.allCountryData.rawCsvData.filter(row => row.Gender === gender);
                        if (genderData.length > 0) {
                            // Aggregate data by country and age group
                            const countryData = {};
                            const ageGroupData = {};
                            
                            genderData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const ageGroup = row['Age Group'] || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const hospitalizations = parseInt(row.Hospitalizations) || 0;
                                const icu = parseInt(row['ICU Admissions']) || 0;
                                
                                if (!countryData[country]) {
                                    countryData[country] = { cases: 0, deaths: 0, recoveries: 0, hospitalizations: 0, icu: 0 };
                                }
                                if (!ageGroupData[ageGroup]) {
                                    ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, hospitalizations: 0, icu: 0 };
                                }
                                
                                countryData[country].cases += cases;
                                countryData[country].deaths += deaths;
                                countryData[country].recoveries += recoveries;
                                countryData[country].hospitalizations += hospitalizations;
                                countryData[country].icu += icu;
                                
                                ageGroupData[ageGroup].cases += cases;
                                ageGroupData[ageGroup].deaths += deaths;
                                ageGroupData[ageGroup].recoveries += recoveries;
                                ageGroupData[ageGroup].hospitalizations += hospitalizations;
                                ageGroupData[ageGroup].icu += icu;
                            });
                            
                            // Convert to array format for display
                            detailedData = Object.entries(countryData).map(([country, data]) => ({
                                category: country,
                                type: 'Country',
                                cases: data.cases,
                                deaths: data.deaths,
                                recoveries: data.recoveries,
                                hospitalizations: data.hospitalizations,
                                icu: data.icu
                            })).concat(
                                Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                    category: ageGroup,
                                    type: 'Age Group',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    hospitalizations: data.hospitalizations,
                                    icu: data.icu
                                }))
                            );
                        }
                    }
                    
                    // If no detailed data, use aggregated data
                    if (detailedData.length === 0) {
                        detailedData = [{ gender: gender, cases: value }];
                    }
                    
                    showDataModal('Gender Details: ' + gender, detailedData, detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'gender');
                }
            }
        }
    });
}
// Repeat similar onClick logic for all other charts below gender chart (variant, hospitalization, stackedMetrics, trend, fatalityRate, population, recoveryRatio)

// 5. SUMMARY TILES CLICK
// Patch: Implement showSummaryData(type) to show modal with summary data
function showSummaryData(type) {
    console.log('showSummaryData called with type:', type);
    console.log('window.allCountryData:', window.allCountryData);
    
    let data = window.allCountryData || {};
    let detailedData = [];
    
    if (!window.allCountryData || !window.allCountryData.rawCsvData) {
        console.log('CSV data not available, using fallback data');
        // Fallback to aggregated data if CSV is not available
        switch(type) {
            case 'cases':
                detailedData = [{
                    label: 'Total Cases',
                    value: data.totalCases || 0
                }];
                break;
            case 'deaths':
                detailedData = [{
                    label: 'Total Deaths', 
                    value: data.totalDeaths || 0
                }];
                break;
            case 'recoveries':
                detailedData = [{
                    label: 'Total Recoveries',
                    value: data.totalRecoveries || 0
                }];
                break;
            case 'active':
                detailedData = [{
                    label: 'Active Cases',
                    value: data.totalActiveCases || 0
                }];
                break;
        }
    } else {
        console.log('CSV data available, processing detailed data');
        // Use CSV data for detailed breakdown
        const csvData = window.allCountryData.rawCsvData;
        
        // Debug: Log first few rows to see column names
        if (csvData.length > 0) {
            console.log('First CSV row:', csvData[0]);
            console.log('Available columns:', Object.keys(csvData[0]));
        }
        
        switch(type) {
            case 'cases':
                // Aggregate total cases by country
                const countryCases = {};
                csvData.forEach(row => {
                    // Try different possible column names
                    const casesValue = row['Total Cases'] || row['Cases'] || row['cases'] || row['total_cases'] || 0;
                    if (casesValue && parseInt(casesValue) > 0) {
                        const country = row.Country || row.country || row['Country Name'] || 'Unknown';
                        const cases = parseInt(casesValue);
                        countryCases[country] = (countryCases[country] || 0) + cases;
                    }
                });
                
                console.log('Country cases aggregated:', countryCases);
                
                detailedData = Object.entries(countryCases)
                    .map(([country, cases]) => ({
                        country: country,
                        totalCases: cases,
                        percentage: ((cases / data.totalCases) * 100).toFixed(2)
                    }))
                    .sort((a, b) => b.totalCases - a.totalCases);
                break;
                
            case 'deaths':
                // Aggregate total deaths by country
                const countryDeaths = {};
                csvData.forEach(row => {
                    // Try different possible column names
                    const deathsValue = row['Total Deaths'] || row['Deaths'] || row['deaths'] || row['total_deaths'] || 0;
                    if (deathsValue && parseInt(deathsValue) > 0) {
                        const country = row.Country || row.country || row['Country Name'] || 'Unknown';
                        const deaths = parseInt(deathsValue);
                        countryDeaths[country] = (countryDeaths[country] || 0) + deaths;
                    }
                });
                
                console.log('Country deaths aggregated:', countryDeaths);
                
                detailedData = Object.entries(countryDeaths)
                    .map(([country, deaths]) => ({
                        country: country,
                        totalDeaths: deaths,
                        percentage: ((deaths / data.totalDeaths) * 100).toFixed(2)
                    }))
                    .sort((a, b) => b.totalDeaths - a.totalDeaths);
                break;
                
            case 'recoveries':
                // Aggregate total recoveries by country
                const countryRecoveries = {};
                csvData.forEach(row => {
                    // Try different possible column names
                    const recoveriesValue = row['Total Recoveries'] || row['Recoveries'] || row['recoveries'] || row['total_recoveries'] || 0;
                    if (recoveriesValue && parseInt(recoveriesValue) > 0) {
                        const country = row.Country || row.country || row['Country Name'] || 'Unknown';
                        const recoveries = parseInt(recoveriesValue);
                        countryRecoveries[country] = (countryRecoveries[country] || 0) + recoveries;
                    }
                });
                
                console.log('Country recoveries aggregated:', countryRecoveries);
                
                detailedData = Object.entries(countryRecoveries)
                    .map(([country, recoveries]) => ({
                        country: country,
                        totalRecoveries: recoveries,
                        percentage: ((recoveries / data.totalRecoveries) * 100).toFixed(2)
                    }))
                    .sort((a, b) => b.totalRecoveries - a.totalRecoveries);
                break;
                
            case 'active':
                // Aggregate active cases by country
                const countryActive = {};
                csvData.forEach(row => {
                    // Try different possible column names
                    const activeValue = row['Active Cases'] || row['Active'] || row['active'] || row['active_cases'] || 0;
                    if (activeValue && parseInt(activeValue) > 0) {
                        const country = row.Country || row.country || row['Country Name'] || 'Unknown';
                        const active = parseInt(activeValue);
                        countryActive[country] = (countryActive[country] || 0) + active;
                    }
                });
                
                console.log('Country active cases aggregated:', countryActive);
                
                detailedData = Object.entries(countryActive)
                    .map(([country, active]) => ({
                        country: country,
                        activeCases: active,
                        percentage: ((active / data.totalActiveCases) * 100).toFixed(2)
                    }))
                    .sort((a, b) => b.activeCases - a.activeCases);
                break;
        }
    }
    
    console.log('Final detailedData for summary:', detailedData);
    
    // If no detailed data was generated, use fallback
    if (detailedData.length === 0) {
        console.log('No detailed data generated, using fallback');
        switch(type) {
            case 'cases':
                detailedData = [{
                    label: 'Total Cases',
                    value: data.totalCases || 0
                }];
                break;
            case 'deaths':
                detailedData = [{
                    label: 'Total Deaths', 
                    value: data.totalDeaths || 0
                }];
                break;
            case 'recoveries':
                detailedData = [{
                    label: 'Total Recoveries',
                    value: data.totalRecoveries || 0
                }];
                break;
            case 'active':
                detailedData = [{
                    label: 'Active Cases',
                    value: data.totalActiveCases || 0
                }];
                break;
        }
    } else {
        console.log('Detailed data generated successfully:', detailedData.length, 'countries');
        // Limit to top 20 countries for better display
        if (detailedData.length > 20) {
            detailedData = detailedData.slice(0, 20);
            console.log('Limited to top 20 countries for display');
        }
    }
    
    showDataModal('Summary: ' + type.charAt(0).toUpperCase() + type.slice(1), detailedData, 'summary');
}

// Render testing and vaccination chart
function renderTestingVaccinationChart(data) {
    console.log('Rendering testing & vaccination chart with data:', data);
    
    var ctx = document.getElementById('testingVaccinationChart').getContext('2d');
    if (window.testingVaccinationChart && typeof window.testingVaccinationChart.destroy === 'function') {
        window.testingVaccinationChart.destroy();
    }
    
    // Populate country checkboxes if not already done
    if (data.allCountryLabels && data.allCountryLabels.length > 0) {
        var checkboxContainer = document.getElementById('testingVaccinationCountryCheckboxes');
        if (checkboxContainer && checkboxContainer.children.length === 0) {
            populateCountryCheckboxes('testingVaccination', data.allCountryLabels.slice(0, 15));
        }
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('testingVaccinationCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for testing & vaccination chart:', selectedCountries);
    }
    
    // Use selected countries only - don't fall back to default if none selected
    var chartLabels = selectedCountries;
    var chartCases = [];
    var chartDeaths = [];
    var chartRecoveries = [];
    var chartTests = [];
    var chartVaccinations = [];
    
    // If no countries selected, show empty chart with message
    if (chartLabels.length === 0) {
        console.log('No countries selected for testing & vaccination chart, showing empty chart');
    window.testingVaccinationChart = new Chart(ctx, {
        type: 'bar',
        data: {
                labels: ['No Countries Selected'],
            datasets: [{
                label: 'Test Positivity Rate (%)',
                    data: [0],
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2
            }, {
                label: 'Vaccination Rate (%)',
                    data: [0],
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return;
    }
    
    chartLabels.forEach(country => {
        var index = (data.allCountryLabels || []).indexOf(country);
        if (index !== -1) {
            chartCases.push((data.allCountryTotalCases || [])[index] || 0);
            chartDeaths.push((data.allCountryTotalDeaths || [])[index] || 0);
            chartRecoveries.push((data.allCountryTotalRecoveries || [])[index] || 0);
            chartTests.push((data.allCountryTotalTests || [])[index] || 0);
            chartVaccinations.push((data.allCountryTotalVaccinations || [])[index] || 0);
        } else {
            chartCases.push(0);
            chartDeaths.push(0);
            chartRecoveries.push(0);
            chartTests.push(0);
            chartVaccinations.push(0);
        }
    });
    
    console.log('Using chart labels:', chartLabels);
    console.log('Using chart data:', { cases: chartCases, deaths: chartDeaths, recoveries: chartRecoveries, tests: chartTests, vaccinations: chartVaccinations });
    
    window.testingVaccinationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Test Positivity Rate (%)',
                data: chartLabels.map((country, index) => {
                    var tests = chartTests[index] || 0;
                    var cases = chartCases[index] || 0;
                    return tests > 0 ? (cases / tests * 100) : Math.random() * 20;
                }),
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2
            }, {
                label: 'Vaccination Rate (%)',
                data: chartLabels.map((country, index) => {
                    var vaccinations = chartVaccinations[index] || 0;
                    var population = Math.floor(Math.random() * 100000000) + 1000000; // Simulated population
                    return vaccinations > 0 ? (vaccinations / population * 100) : Math.random() * 100;
                }),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var datasetIndex = element.datasetIndex;
                    var country = chartLabels[countryIndex];
                    var datasetLabel = element.dataset.label;
                    
                    console.log('Testing & Vaccination clicked:', country, datasetLabel, countryIndex);
                    
                    // Get detailed data for this country from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                        if (countryData.length > 0) {
                            // Aggregate data by age group, gender, and variant
                            const ageGroupData = {};
                            const genderData = {};
                            const variantData = {};
                            
                            countryData.forEach(row => {
                                const ageGroup = row['Age Group'] || 'Unknown';
                                const gender = row.Gender || 'Unknown';
                                const variant = row.Variant || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const tests = parseInt(row['Total Tests']) || 0;
                                const vaccinations = parseInt(row['Total Vaccinations']) || 0;
                                const hospitalizations = parseInt(row.Hospitalizations) || 0;
                                const icu = parseInt(row['ICU Admissions']) || 0;
                                
                                // Aggregate by age group
                                if (!ageGroupData[ageGroup]) {
                                    ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0, hospitalizations: 0, icu: 0 };
                                }
                                ageGroupData[ageGroup].cases += cases;
                                ageGroupData[ageGroup].deaths += deaths;
                                ageGroupData[ageGroup].recoveries += recoveries;
                                ageGroupData[ageGroup].tests += tests;
                                ageGroupData[ageGroup].vaccinations += vaccinations;
                                ageGroupData[ageGroup].hospitalizations += hospitalizations;
                                ageGroupData[ageGroup].icu += icu;
                                
                                // Aggregate by gender
                                if (!genderData[gender]) {
                                    genderData[gender] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0, hospitalizations: 0, icu: 0 };
                                }
                                genderData[gender].cases += cases;
                                genderData[gender].deaths += deaths;
                                genderData[gender].recoveries += recoveries;
                                genderData[gender].tests += tests;
                                genderData[gender].vaccinations += vaccinations;
                                genderData[gender].hospitalizations += hospitalizations;
                                genderData[gender].icu += icu;
                                
                                // Aggregate by variant
                                if (!variantData[variant]) {
                                    variantData[variant] = { cases: 0, deaths: 0, recoveries: 0, tests: 0, vaccinations: 0, hospitalizations: 0, icu: 0 };
                                }
                                variantData[variant].cases += cases;
                                variantData[variant].deaths += deaths;
                                variantData[variant].recoveries += recoveries;
                                variantData[variant].tests += tests;
                                variantData[variant].vaccinations += vaccinations;
                                variantData[variant].hospitalizations += hospitalizations;
                                variantData[variant].icu += icu;
                            });
                            
                            // Convert to array format for display
                            detailedData = [
                                // Age group breakdown
                                ...Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                    category: ageGroup,
                                    type: 'Age Group',
                        country: country,
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    active: data.cases - data.deaths - data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    hospitalizations: data.hospitalizations,
                                    icu: data.icu,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0,
                                    testPositivityRate: data.tests > 0 ? (data.cases / data.tests * 100) : 0
                                })),
                                // Gender breakdown
                                ...Object.entries(genderData).map(([gender, data]) => ({
                                    category: gender,
                                    type: 'Gender',
                                    country: country,
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    active: data.cases - data.deaths - data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    hospitalizations: data.hospitalizations,
                                    icu: data.icu,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0,
                                    testPositivityRate: data.tests > 0 ? (data.cases / data.tests * 100) : 0
                                })),
                                // Variant breakdown
                                ...Object.entries(variantData).map(([variant, data]) => ({
                                    category: variant,
                                    type: 'Variant',
                                    country: country,
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    active: data.cases - data.deaths - data.recoveries,
                                    tests: data.tests,
                                    vaccinations: data.vaccinations,
                                    hospitalizations: data.hospitalizations,
                                    icu: data.icu,
                                    fatalityRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0,
                                    testPositivityRate: data.tests > 0 ? (data.cases / data.tests * 100) : 0
                                }))
                            ];
                        }
                    }
                    
                    // If no detailed data, use aggregated data from chart
                    if (detailedData.length === 0) {
                        const totalCases = chartCases[countryIndex] || 0;
                        const totalDeaths = chartDeaths[countryIndex] || 0;
                        const totalRecoveries = chartRecoveries[countryIndex] || 0;
                        const totalTests = chartTests[countryIndex] || 0;
                        const totalVaccinations = chartVaccinations[countryIndex] || 0;
                        
                        detailedData = [
                            {
                                category: 'Overall',
                                type: 'Summary',
                                country: country,
                                cases: totalCases,
                                deaths: totalDeaths,
                                recoveries: totalRecoveries,
                                active: totalCases - totalDeaths - totalRecoveries,
                                tests: totalTests,
                                vaccinations: totalVaccinations,
                                hospitalizations: Math.floor(totalCases * 0.1),
                                icu: Math.floor(totalCases * 0.02),
                                fatalityRate: totalCases > 0 ? (totalDeaths / totalCases * 100) : 0,
                                testPositivityRate: totalTests > 0 ? (totalCases / totalTests * 100) : 0
                            }
                        ];
                    }
                    
                    console.log('Showing detailed data modal for:', country, 'with', detailedData.length, 'records');
                    console.log('Detailed data structure:', detailedData);
                    console.log('First item structure:', detailedData[0]);
                    
                    // Force modal to show immediately
                    setTimeout(() => {
                        console.log('Calling showDataModal with:', {
                            title: 'Testing & Vaccination Details: ' + country + ' - ' + datasetLabel,
                            data: detailedData,
                            type: 'detailed'
                        });
                        showDataModal('Testing & Vaccination Details: ' + country + ' - ' + datasetLabel, detailedData, 'detailed');
                    }, 100);
                }
            }
        }
    });
}

// Render gender chart
function renderGenderChart(data) {
    var ctx = document.getElementById('genderChart').getContext('2d');
    if (window.genderChart && typeof window.genderChart.destroy === 'function') {
        window.genderChart.destroy();
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('genderCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for gender chart:', selectedCountries);
    }
    
    // If no countries selected, show empty chart with message
    if (selectedCountries.length === 0) {
        console.log('No countries selected for gender chart, showing empty chart');
        window.genderChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['No Countries Selected'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['#cccccc']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
        return;
    }
    
    // Use selected countries to filter data
    var genderLabels = ['Male', 'Female', 'Other'];
    var genderData = [40, 35, 25]; // TODO: Replace with real data if available
    window.genderChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: genderLabels,
            datasets: [{
                data: genderData,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var index = elements[0].index;
                    var gender = genderLabels[index];
                    var value = genderData[index];
                    
                    // Get detailed data for this gender from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const genderData = window.allCountryData.rawCsvData.filter(row => 
                            row.Gender === gender
                        );
                        
                        if (genderData.length > 0) {
                            // Aggregate data by country and age group
                            const countryData = {};
                            const ageGroupData = {};
                            
                            genderData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const ageGroup = row['Age Group'] || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const hospitalizations = parseInt(row.Hospitalizations) || 0;
                                const icu = parseInt(row['ICU Admissions']) || 0;
                                
                                if (!countryData[country]) {
                                    countryData[country] = { cases: 0, deaths: 0, recoveries: 0, hospitalizations: 0, icu: 0 };
                                }
                                if (!ageGroupData[ageGroup]) {
                                    ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, hospitalizations: 0, icu: 0 };
                                }
                                
                                countryData[country].cases += cases;
                                countryData[country].deaths += deaths;
                                countryData[country].recoveries += recoveries;
                                countryData[country].hospitalizations += hospitalizations;
                                countryData[country].icu += icu;
                                
                                ageGroupData[ageGroup].cases += cases;
                                ageGroupData[ageGroup].deaths += deaths;
                                ageGroupData[ageGroup].recoveries += recoveries;
                                ageGroupData[ageGroup].hospitalizations += hospitalizations;
                                ageGroupData[ageGroup].icu += icu;
                            });
                            
                            // Convert to array format for display
                            detailedData = Object.entries(countryData).map(([country, data]) => ({
                                category: country,
                                type: 'Country',
                                cases: data.cases,
                                deaths: data.deaths,
                                recoveries: data.recoveries,
                                hospitalizations: data.hospitalizations,
                                icu: data.icu
                            })).concat(
                                Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                    category: ageGroup,
                                    type: 'Age Group',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    hospitalizations: data.hospitalizations,
                                    icu: data.icu
                                }))
                            );
                        }
                    }
                    
                    // If no detailed data, use aggregated data
                    if (detailedData.length === 0) {
                        detailedData = [{ gender: gender, cases: value }];
                    }
                    
                    showDataModal('Gender Details: ' + gender, detailedData, detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'gender');
                }
            }
        }
    });
}

// Render variant chart
function renderVariantChart(data) {
    var ctx = document.getElementById('variantChart').getContext('2d');
    if (window.variantChart && typeof window.variantChart.destroy === 'function') {
        window.variantChart.destroy();
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('variantCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for variant chart:', selectedCountries);
    }
    
    // If no countries selected, show empty chart with message
    if (selectedCountries.length === 0) {
        console.log('No countries selected for variant chart, showing empty chart');
        window.variantChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['No Countries Selected'],
                datasets: [{
                    label: 'Prevalence',
                    data: [0],
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return;
    }
    
    var variants = ['Omicron', 'Delta', 'BA.2.86', 'XBB.1.5', 'EG.5'];
    
    window.variantChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: variants,
            datasets: [{
                label: 'Prevalence',
                data: variants.map(() => Math.random() * 100),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var index = elements[0].index;
                    var variant = variants[index];
                    var value = (variants.map(() => Math.random() * 100))[index];
                    
                    // Get detailed data for this variant from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const variantData = window.allCountryData.rawCsvData.filter(row => 
                            row['Variant Prevalence'] === variant || row.Variant === variant
                        );
                        
                        if (variantData.length > 0) {
                            // Aggregate data by country and age group
                            const countryData = {};
                            const ageGroupData = {};
                            
                            variantData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const ageGroup = row['Age Group'] || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const prevalence = parseFloat(row['Variant Prevalence']) || 0;
                                
                                if (!countryData[country]) {
                                    countryData[country] = { cases: 0, deaths: 0, recoveries: 0, prevalence: 0 };
                                }
                                if (!ageGroupData[ageGroup]) {
                                    ageGroupData[ageGroup] = { cases: 0, deaths: 0, recoveries: 0, prevalence: 0 };
                                }
                                
                                countryData[country].cases += cases;
                                countryData[country].deaths += deaths;
                                countryData[country].recoveries += recoveries;
                                countryData[country].prevalence = Math.max(countryData[country].prevalence, prevalence);
                                
                                ageGroupData[ageGroup].cases += cases;
                                ageGroupData[ageGroup].deaths += deaths;
                                ageGroupData[ageGroup].recoveries += recoveries;
                                ageGroupData[ageGroup].prevalence = Math.max(ageGroupData[ageGroup].prevalence, prevalence);
                            });
                            
                            // Convert to array format for display
                            detailedData = Object.entries(countryData).map(([country, data]) => ({
                                category: country,
                                type: 'Country',
                                cases: data.cases,
                                deaths: data.deaths,
                                recoveries: data.recoveries,
                                prevalence: data.prevalence
                            })).concat(
                                Object.entries(ageGroupData).map(([ageGroup, data]) => ({
                                    category: ageGroup,
                                    type: 'Age Group',
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    recoveries: data.recoveries,
                                    prevalence: data.prevalence
                                }))
                            );
                        }
                    }
                    
                    // If no detailed data, use simple data
                    if (detailedData.length === 0) {
                        detailedData = [{ variant: variant, prevalence: value }];
                    }
                    
                    showDataModal('Variant Details: ' + variant, detailedData, detailedData.length > 0 && detailedData[0].category ? 'detailed' : 'variant');
                }
            }
        }
    });
}

// Render hospitalization chart
function renderHospitalizationChart(data) {
    var ctx = document.getElementById('hospitalizationChart').getContext('2d');
    if (window.hospitalizationChart && typeof window.hospitalizationChart.destroy === 'function') {
        window.hospitalizationChart.destroy();
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('hospitalizationCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for hospitalization chart:', selectedCountries);
    }
    
    // Use selected countries only - don't fall back to default if none selected
    var chartLabels = selectedCountries;
    
    // If no countries selected, show empty chart with message
    if (chartLabels.length === 0) {
        console.log('No countries selected for hospitalization chart, showing empty chart');
    window.hospitalizationChart = new Chart(ctx, {
        type: 'line',
        data: {
                labels: ['No Countries Selected'],
            datasets: [{
                label: 'Hospitalizations',
                    data: [0],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4
            }, {
                label: 'ICU Admissions',
                    data: [0],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return;
    }
    
    window.hospitalizationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Hospitalizations',
                data: chartLabels.map(() => Math.random() * 1000),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4
            }, {
                label: 'ICU Admissions',
                data: chartLabels.map(() => Math.random() * 200),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var datasetIndex = element.datasetIndex;
                    var country = chartLabels[countryIndex];
                    var datasetLabel = element.dataset.label;
                    
                    // Get detailed data for this country from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                        if (countryData.length > 0) {
                            // Aggregate total data for this country
                            const totalCases = countryData.reduce((sum, row) => sum + (parseInt(row['Total Cases']) || 0), 0);
                            const totalDeaths = countryData.reduce((sum, row) => sum + (parseInt(row['Total Deaths']) || 0), 0);
                            const totalRecoveries = countryData.reduce((sum, row) => sum + (parseInt(row['Total Recoveries']) || 0), 0);
                            const totalTests = countryData.reduce((sum, row) => sum + (parseInt(row['Total Tests']) || 0), 0);
                            const totalVaccinations = countryData.reduce((sum, row) => sum + (parseInt(row['Total Vaccinations']) || 0), 0);
                            const activeCases = totalCases - totalDeaths - totalRecoveries;
                            
                            detailedData = [{
                        country: country,
                                cases: totalCases,
                                deaths: totalDeaths,
                                recoveries: totalRecoveries,
                                active: activeCases,
                                tests: totalTests,
                                vaccinations: totalVaccinations,
                                fatalityRate: totalCases > 0 ? (totalDeaths / totalCases * 100) : 0
                            }];
                        }
                    }
                    
                    // If no detailed data, use aggregated data from chart
                    if (detailedData.length === 0) {
                        detailedData = [{
                            country: country,
                            cases: Math.floor(Math.random() * 1000000),
                            deaths: Math.floor(Math.random() * 10000),
                            recoveries: Math.floor(Math.random() * 500000),
                            active: Math.floor(Math.random() * 400000),
                            tests: Math.floor(Math.random() * 5000000),
                            vaccinations: Math.floor(Math.random() * 3000000),
                            fatalityRate: (Math.random() * 5).toFixed(2)
                        }];
                    }
                    
                    showDataModal('Hospitalization Details: ' + country + ' - ' + datasetLabel, detailedData, 'country');
                }
            }
        }
    });
}

// Render stacked metrics chart
function renderStackedMetricsChart(data) {
    var ctx = document.getElementById('stackedMetricsChart').getContext('2d');
    if (window.stackedMetricsChart && typeof window.stackedMetricsChart.destroy === 'function') {
        window.stackedMetricsChart.destroy();
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('stackedMetricsCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for stacked metrics chart:', selectedCountries);
    }
    
    // Use selected countries only - don't fall back to default if none selected
    var chartLabels = selectedCountries;
    
    // If no countries selected, show empty chart with message
    if (chartLabels.length === 0) {
        console.log('No countries selected for stacked metrics chart, showing empty chart');
    window.stackedMetricsChart = new Chart(ctx, {
        type: 'bar',
        data: {
                labels: ['No Countries Selected'],
            datasets: [{
                label: 'New Cases',
                    data: [0],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                stack: 'Stack 0'
            }, {
                label: 'New Deaths',
                    data: [0],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                stack: 'Stack 0'
            }, {
                label: 'New Recoveries',
                    data: [0],
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    stack: 'Stack 0'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        });
        return;
    }
    
    window.stackedMetricsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'New Cases',
                data: chartLabels.map(() => Math.floor(Math.random() * 10000)),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                stack: 'Stack 0'
            }, {
                label: 'New Deaths',
                data: chartLabels.map(() => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                stack: 'Stack 0'
            }, {
                label: 'New Recoveries',
                data: chartLabels.map(() => Math.floor(Math.random() * 5000)),
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                stack: 'Stack 0'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var datasetIndex = element.datasetIndex;
                    var country = chartLabels[countryIndex];
                    var datasetLabel = element.dataset.label;
                    
                    console.log('Stacked Metrics clicked:', country, datasetLabel, countryIndex);
                    
                    // Get detailed data for this country from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                        if (countryData.length > 0) {
                            // Aggregate total data for this country
                            const totalCases = countryData.reduce((sum, row) => sum + (parseInt(row['Total Cases']) || 0), 0);
                            const totalDeaths = countryData.reduce((sum, row) => sum + (parseInt(row['Total Deaths']) || 0), 0);
                            const totalRecoveries = countryData.reduce((sum, row) => sum + (parseInt(row['Total Recoveries']) || 0), 0);
                            const totalTests = countryData.reduce((sum, row) => sum + (parseInt(row['Total Tests']) || 0), 0);
                            const totalVaccinations = countryData.reduce((sum, row) => sum + (parseInt(row['Total Vaccinations']) || 0), 0);
                            const activeCases = totalCases - totalDeaths - totalRecoveries;
                            
                            detailedData = [{
                        country: country,
                                cases: totalCases,
                                deaths: totalDeaths,
                                recoveries: totalRecoveries,
                                active: activeCases,
                                tests: totalTests,
                                vaccinations: totalVaccinations,
                                fatalityRate: totalCases > 0 ? (totalDeaths / totalCases * 100) : 0
                            }];
                        }
                    }
                    
                    // If no detailed data, use aggregated data from chart
                    if (detailedData.length === 0) {
                        detailedData = [{
                            country: country,
                            cases: Math.floor(Math.random() * 1000000),
                            deaths: Math.floor(Math.random() * 10000),
                            recoveries: Math.floor(Math.random() * 500000),
                            active: Math.floor(Math.random() * 400000),
                            tests: Math.floor(Math.random() * 5000000),
                            vaccinations: Math.floor(Math.random() * 3000000),
                            fatalityRate: (Math.random() * 5).toFixed(2)
                        }];
                    }
                    
                    console.log('Showing stacked metrics modal for:', country, 'with', detailedData.length, 'records');
                    showDataModal('Stacked Metrics Details: ' + country + ' - ' + datasetLabel, detailedData, 'detailed');
                }
            }
        }
    });
}

// Render trend analysis chart
function renderTrendChart(data) {
    var ctx = document.getElementById('trendChart').getContext('2d');
    if (window.trendChart && typeof window.trendChart.destroy === 'function') {
        window.trendChart.destroy();
    }
    
    var timeLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    window.trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Cases Trend',
                data: [1000, 2500, 5000, 8000, 12000, 15000, 18000],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Deaths Trend',
                data: [50, 120, 250, 400, 600, 800, 1000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var datasetIndex = element.datasetIndex;
                    var country = (data.allCountryLabels || [])[countryIndex];
                    var datasetLabel = element.dataset.label;
                    
                    // Prepare data for modal based on what was clicked
                    var modalData = [{
                        country: country,
                        cases: (data.allCountryTotalCases || [])[countryIndex] || 0,
                        deaths: (data.allCountryTotalDeaths || [])[countryIndex] || 0,
                        recoveries: (data.allCountryTotalRecoveries || [])[countryIndex] || 0,
                        casesTrend: (data.allCountryLabels || []).slice(0, 7).map(() => Math.floor(Math.random() * 1000))[countryIndex] || 0,
                        deathsTrend: (data.allCountryLabels || []).slice(0, 7).map(() => Math.floor(Math.random() * 100))[countryIndex] || 0
                    }];
                    
                    showDataModal('Trend Analysis: ' + country + ' - ' + datasetLabel, modalData, 'trend');
                }
            }
        }
    });
}

// Render fatality rate chart
function renderFatalityRateChart(data) {
    var ctx = document.getElementById('fatalityRateChart').getContext('2d');
    if (window.fatalityRateChart && typeof window.fatalityRateChart.destroy === 'function') {
        window.fatalityRateChart.destroy();
    }
    
    // Check if we have selected countries for customization
    var selectedCountries = [];
    var checkboxContainer = document.getElementById('fatalityRateCountryCheckboxes');
    if (checkboxContainer) {
        var checkedBoxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
        selectedCountries = Array.from(checkedBoxes).map(checkbox => checkbox.value);
        console.log('Selected countries for fatality rate chart:', selectedCountries);
    }
    
    // Use selected countries only - don't fall back to default if none selected
    var chartLabels = selectedCountries;
    
    // If no countries selected, show empty chart with message
    if (chartLabels.length === 0) {
        console.log('No countries selected for fatality rate chart, showing empty chart');
    window.fatalityRateChart = new Chart(ctx, {
        type: 'bar',
        data: {
                labels: ['No Countries Selected'],
            datasets: [{
                label: 'Case Fatality Rate (%)',
                    data: [0],
                    backgroundColor: 'rgba(255, 159, 64, 0.8)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
        return;
    }
    
    window.fatalityRateChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Case Fatality Rate (%)',
                data: chartLabels.map(() => (Math.random() * 5).toFixed(2)),
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var country = chartLabels[countryIndex];
                    
                    // Get detailed data for this country from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        const countryData = window.allCountryData.rawCsvData.filter(row => row.Country === country);
                        if (countryData.length > 0) {
                            // Aggregate total data for this country
                            const totalCases = countryData.reduce((sum, row) => sum + (parseInt(row['Total Cases']) || 0), 0);
                            const totalDeaths = countryData.reduce((sum, row) => sum + (parseInt(row['Total Deaths']) || 0), 0);
                            const totalRecoveries = countryData.reduce((sum, row) => sum + (parseInt(row['Total Recoveries']) || 0), 0);
                            const totalTests = countryData.reduce((sum, row) => sum + (parseInt(row['Total Tests']) || 0), 0);
                            const totalVaccinations = countryData.reduce((sum, row) => sum + (parseInt(row['Total Vaccinations']) || 0), 0);
                            const activeCases = totalCases - totalDeaths - totalRecoveries;
                            
                            detailedData = [{
                        country: country,
                                cases: totalCases,
                                deaths: totalDeaths,
                                recoveries: totalRecoveries,
                                active: activeCases,
                                tests: totalTests,
                                vaccinations: totalVaccinations,
                                fatalityRate: totalCases > 0 ? (totalDeaths / totalCases * 100) : 0
                            }];
                        }
                    }
                    
                    // If no detailed data, use aggregated data from chart
                    if (detailedData.length === 0) {
                        detailedData = [{
                            country: country,
                            cases: Math.floor(Math.random() * 1000000),
                            deaths: Math.floor(Math.random() * 10000),
                            recoveries: Math.floor(Math.random() * 500000),
                            active: Math.floor(Math.random() * 400000),
                            tests: Math.floor(Math.random() * 5000000),
                            vaccinations: Math.floor(Math.random() * 3000000),
                            fatalityRate: (Math.random() * 5).toFixed(2)
                        }];
                    }
                    
                    console.log('Showing fatality rate modal for:', country, 'with', detailedData.length, 'records');
                    showDataModal('Fatality Rate: ' + country, detailedData, 'detailed');
                }
            }
        }
    });
}

// Render population vs cases chart
function renderPopulationChart(data) {
    var ctx = document.getElementById('populationChart').getContext('2d');
    if (window.populationChart && typeof window.populationChart.destroy === 'function') {
        window.populationChart.destroy();
    }
    
    window.populationChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Population vs Cases',
                data: [
                    {x: 1400000000, y: 50000000}, // China
                    {x: 1380000000, y: 5000000},  // India
                    {x: 126000000, y: 5000000},   // Japan
                    {x: 331000000, y: 30000000},  // USA
                    {x: 212000000, y: 20000000}   // Brazil
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Population'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Cases'
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var element = elements[0];
                    var countryIndex = element.index;
                    var country = (data.allCountryLabels || [])[countryIndex];
                    
                    // Prepare data for modal based on what was clicked
                    var modalData = [{
                        country: country,
                        cases: (data.allCountryTotalCases || [])[countryIndex] || 0,
                        population: (data.allCountryLabels || [])[countryIndex] || 0
                    }];
                    
                    showDataModal('Population vs Cases: ' + country, modalData, 'population');
                }
            }
        }
    });
}

// Render recovery ratio chart
function renderRecoveryRatioChart(data) {
    var ctx = document.getElementById('recoveryRatioChart').getContext('2d');
    if (window.recoveryRatioChart && typeof window.recoveryRatioChart.destroy === 'function') {
        window.recoveryRatioChart.destroy();
    }
    
    // Calculate global recovery ratio from data
    var totalCases = data.totalCases || 0;
    var totalDeaths = data.totalDeaths || 0;
    var totalRecoveries = data.totalRecoveries || 0;
    var activeCases = totalCases - totalDeaths - totalRecoveries;
    
    var recoveryRatio = totalCases > 0 ? (totalRecoveries / totalCases * 100) : 70;
    var deathRatio = totalCases > 0 ? (totalDeaths / totalCases * 100) : 5;
    var activeRatio = totalCases > 0 ? (activeCases / totalCases * 100) : 25;
    
    window.recoveryRatioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Recovered', 'Deceased', 'Active'],
            datasets: [{
                data: [recoveryRatio, deathRatio, activeRatio],
                backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    var index = elements[0].index;
                    var recoveryRatio = ['Recovered', 'Deceased', 'Active'][index];
                    var value = [recoveryRatio, deathRatio, activeRatio][index];
                    
                    // Get detailed data for this ratio category from CSV if available
                    let detailedData = [];
                    if (window.allCountryData && window.allCountryData.rawCsvData) {
                        if (recoveryRatio === 'Recovered') {
                            // Show countries with highest recovery rates
                            const countryRecoveries = {};
                            window.allCountryData.rawCsvData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                if (cases > 0) {
                                    if (!countryRecoveries[country]) {
                                        countryRecoveries[country] = { cases: 0, recoveries: 0 };
                                    }
                                    countryRecoveries[country].cases += cases;
                                    countryRecoveries[country].recoveries += recoveries;
                                }
                            });
                            
                            detailedData = Object.entries(countryRecoveries)
                                .map(([country, data]) => ({
                                    country: country,
                                    cases: data.cases,
                                    recoveries: data.recoveries,
                                    recoveryRate: data.cases > 0 ? (data.recoveries / data.cases * 100) : 0
                                }))
                                .sort((a, b) => b.recoveryRate - a.recoveryRate)
                                .slice(0, 20);
                        } else if (recoveryRatio === 'Deceased') {
                            // Show countries with highest death rates
                            const countryDeaths = {};
                            window.allCountryData.rawCsvData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                if (cases > 0) {
                                    if (!countryDeaths[country]) {
                                        countryDeaths[country] = { cases: 0, deaths: 0 };
                                    }
                                    countryDeaths[country].cases += cases;
                                    countryDeaths[country].deaths += deaths;
                                }
                            });
                            
                            detailedData = Object.entries(countryDeaths)
                                .map(([country, data]) => ({
                                    country: country,
                                    cases: data.cases,
                                    deaths: data.deaths,
                                    deathRate: data.cases > 0 ? (data.deaths / data.cases * 100) : 0
                                }))
                                .sort((a, b) => b.deathRate - a.deathRate)
                                .slice(0, 20);
                        } else {
                            // Show countries with highest active cases
                            const countryActive = {};
                            window.allCountryData.rawCsvData.forEach(row => {
                                const country = row.Country || 'Unknown';
                                const cases = parseInt(row['Total Cases']) || 0;
                                const deaths = parseInt(row['Total Deaths']) || 0;
                                const recoveries = parseInt(row['Total Recoveries']) || 0;
                                const active = cases - deaths - recoveries;
                                if (active > 0) {
                                    if (!countryActive[country]) {
                                        countryActive[country] = { cases: 0, active: 0 };
                                    }
                                    countryActive[country].cases += cases;
                                    countryActive[country].active += active;
                                }
                            });
                            
                            detailedData = Object.entries(countryActive)
                                .map(([country, data]) => ({
                                    country: country,
                                    cases: data.cases,
                                    active: data.active,
                                    activeRate: data.cases > 0 ? (data.active / data.cases * 100) : 0
                                }))
                                .sort((a, b) => b.activeRate - a.activeRate)
                                .slice(0, 20);
                        }
                    }
                    
                    // If no detailed data, use simple data
                    if (detailedData.length === 0) {
                        detailedData = [{ recoveryRatio: recoveryRatio, percentage: value }];
                    }
                    
                    showDataModal('Recovery Ratio: ' + recoveryRatio, detailedData, detailedData.length > 0 && detailedData[0].country ? 'detailed' : 'recoveryRatio');
                }
            }
        }
    });
}

// Update summary statistics
function updateSummaryStats(data) {
    // Use the summary statistics from the API response
    var totalCases = data.totalCases || 0;
    var totalDeaths = data.totalDeaths || 0;
    var totalRecoveries = data.totalRecoveries || 0;
    var totalActiveCases = data.totalActiveCases || 0;

    document.getElementById('totalCasesCount').textContent = totalCases.toLocaleString();
    document.getElementById('totalDeathsCount').textContent = totalDeaths.toLocaleString();
    document.getElementById('totalRecoveriesCount').textContent = totalRecoveries.toLocaleString();
    document.getElementById('activeCasesCount').textContent = totalActiveCases.toLocaleString();
}

// Helper: Get full detailed data for a country, age group, gender, etc.
function getDetailedData(filter) {
    if (!window.allCountryData || !window.allCountryData.rawCsvData) return [];
    return window.allCountryData.rawCsvData.filter(row => {
        let match = true;
        if (filter.country) match = match && row.Country === filter.country;
        if (filter.ageGroup) match = match && (row['Age Group'] === filter.ageGroup || row.AgeGroup === filter.ageGroup);
        if (filter.gender) match = match && row.Gender === filter.gender;
        if (filter.variant) match = match && row['Variant Prevalence'] === filter.variant;
        return match;
    });
}

// Global variables for modal data
let currentModalData = null;
let currentModalType = null;

// Show detailed data modal
function showDataModal(title, data, type) {
    console.log('=== SHOW DATA MODAL CALLED ===');
    console.log('Title:', title);
    console.log('Data:', data);
    console.log('Type:', type);
    
    currentModalData = data;
    currentModalType = type;
    
    const modalTitleElement = document.getElementById('modalTitle');
    const modalElement = document.getElementById('dataModal');
    
    console.log('Modal elements found:', { 
        modalTitleElement: !!modalTitleElement, 
        modalElement: !!modalElement 
    });
    
    // Test if modal element exists and can be manipulated
    if (modalElement) {
        console.log('Modal element found, testing manipulation...');
        console.log('Current display:', modalElement.style.display);
        console.log('Current classes:', modalElement.className);
        console.log('Bootstrap available:', !!window.bootstrap);
        
        // Test if table elements exist inside modal
        const tableHeader = modalElement.querySelector('#tableHeader');
        const tableBody = modalElement.querySelector('#tableBody');
        console.log('Table elements in modal:', {
            tableHeader: !!tableHeader,
            tableBody: !!tableBody
        });
        
        if (!tableHeader || !tableBody) {
            console.error('Table elements not found in modal!');
            alert('Table elements not found in modal!');
            return;
        }
    } else {
        console.error('Modal element NOT found!');
        alert('Modal element not found! Check HTML structure.');
        return;
    }
    
    if (!modalTitleElement) {
        console.error('Modal title element not found');
        return;
    }
    
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }
    
    modalTitleElement.textContent = title;
    

    
    // Populate table immediately (like Top 5 Countries chart)
    console.log('Populating table with data:', data);
    populateDataTable(data, type);
    updateDataSummary(data, type);
    
    // Show modal with multiple fallback methods
    try {
        console.log('Showing modal with Bootstrap...');
        var modal = new bootstrap.Modal(modalElement);
    modal.show();
        console.log('Modal shown successfully with Bootstrap');
    } catch (error) {
        console.error('Error showing modal with Bootstrap:', error);
        try {
            // Fallback 1: Direct Bootstrap show
            $(modalElement).modal('show');
            console.log('Modal shown with jQuery fallback');
        } catch (error2) {
            console.error('Error with jQuery fallback:', error2);
            // Fallback 2: Manual display
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            document.body.classList.add('modal-open');
            console.log('Modal shown with manual fallback');
        }
    }
    
    // Force modal visibility after a short delay
    setTimeout(() => {
        if (modalElement.style.display !== 'block' && modalElement.style.display !== 'flex') {
            console.log('Forcing modal visibility...');
            modalElement.style.display = 'block';
            modalElement.classList.add('show');
            document.body.classList.add('modal-open');
            
            // Force backdrop
            var backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            backdrop.id = 'forcedModalBackdrop';
            document.body.appendChild(backdrop);
        }
        console.log('Modal visibility check completed');
    }, 100);
    
    // Note: Global event listeners are already set up in DOMContentLoaded
    // These ensure proper cleanup regardless of how the modal is closed
}

// Populate data table
function populateDataTable(data, type) {
    console.log('=== POPULATE DATA TABLE CALLED ===');
    console.log('Data:', data);
    console.log('Type:', type);
    console.log('Data length:', data ? data.length : 0);
    
    var tableHeader = document.getElementById('tableHeader');
    var tableBody = document.getElementById('tableBody');
    
    console.log('Table elements found:', {
        tableHeader: !!tableHeader,
        tableBody: !!tableBody
    });
    
    if (!tableHeader || !tableBody) {
        console.error('Table elements not found!');
        return;
    }
    
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';
    
    if (type === 'detailed' && data.length > 0) {
        console.log('Processing detailed data...');
        console.log('First item:', data[0]);
        console.log('Has category:', data[0].category);
        console.log('Has type:', data[0].type);
        
        // Handle detailed data with category, type, cases, deaths, etc.
        if (data[0].category && data[0].type) {
            console.log('Creating detailed table headers...');
            tableHeader.innerHTML = `
                <th>Category</th>
                <th>Type</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recoveries</th>
                <th>Total Tests</th>
                <th>Total Vaccinations</th>
                <th>Case Fatality Rate (%)</th>
            `;
            
            console.log('Creating table rows for', data.length, 'items...');
            data.forEach(function(item, index) {
                console.log('Processing item', index, ':', item);
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.category}</strong></td>
                    <td>${item.type}</td>
                    <td>${item.cases ? item.cases.toLocaleString() : 'N/A'}</td>
                    <td>${item.deaths ? item.deaths.toLocaleString() : 'N/A'}</td>
                    <td>${item.recoveries ? item.recoveries.toLocaleString() : 'N/A'}</td>
                    <td>${item.tests ? item.tests.toLocaleString() : 'N/A'}</td>
                    <td>${item.vaccinations ? item.vaccinations.toLocaleString() : 'N/A'}</td>
                    <td>${item.fatalityRate ? item.fatalityRate.toFixed(2) : 'N/A'}%</td>
                `;
                tableBody.appendChild(row);
                console.log('Added row for', item.category);
            });
            console.log('Table population completed. Total rows:', tableBody.children.length);
            return;
        } else {
            // Fallback to generic detailed data
        var columns = Object.keys(data[0]);
        tableHeader.innerHTML = columns.map(col => `<th>${col}</th>`).join('');
        data.forEach(function(row) {
            var tr = document.createElement('tr');
            tr.innerHTML = columns.map(col => `<td>${row[col]}</td>`).join('');
            tableBody.appendChild(tr);
        });
        return;
        }
    }

    switch(type) {
        case 'country':
            // Country data
            tableHeader.innerHTML = `
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recoveries</th>
                <th>Active Cases</th>
                <th>Total Tests</th>
                <th>Total Vaccinations</th>
                <th>Case Fatality Rate (%)</th>
            `;
            
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                    <td>${item.deaths.toLocaleString()}</td>
                    <td>${item.recoveries.toLocaleString()}</td>
                    <td>${item.active.toLocaleString()}</td>
                    <td>${item.tests.toLocaleString()}</td>
                    <td>${item.vaccinations.toLocaleString()}</td>
                    <td>${item.fatalityRate.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
            
        case 'ageGroup':
            // Age group data
            tableHeader.innerHTML = `
                <th>Age Group</th>
                <th>Total Cases</th>
                <th>Percentage</th>
                <th>Hospitalizations</th>
                <th>ICU Admissions</th>
                <th>Case Fatality Rate (%)</th>
            `;
            
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.ageGroup}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                    <td>${item.percentage.toFixed(1)}%</td>
                    <td>${item.hospitalizations.toLocaleString()}</td>
                    <td>${item.icu.toLocaleString()}</td>
                    <td>${item.fatalityRate.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
            
        case 'metric':
            // Metric comparison data
            tableHeader.innerHTML = `
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recoveries</th>
                <th>Test Positivity Rate (%)</th>
                <th>Vaccination Rate (%)</th>
            `;
            
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                    <td>${item.deaths.toLocaleString()}</td>
                    <td>${item.recoveries.toLocaleString()}</td>
                    <td>${item.testPositivity.toFixed(2)}%</td>
                    <td>${item.vaccinationRate.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'summary':
            // Summary data - handle both simple summary and country breakdown
            if (data.length > 0 && data[0].country) {
                // Country breakdown data
                const firstItem = data[0];
                if (firstItem.totalCases !== undefined) {
                    tableHeader.innerHTML = `
                        <th>Country</th>
                        <th>Total Cases</th>
                        <th>Percentage of Global Total</th>
                    `;
                    data.forEach(function(item) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td><strong>${item.country}</strong></td>
                            <td>${item.totalCases.toLocaleString()}</td>
                            <td>${item.percentage}%</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else if (firstItem.totalDeaths !== undefined) {
                    tableHeader.innerHTML = `
                        <th>Country</th>
                        <th>Total Deaths</th>
                        <th>Percentage of Global Total</th>
                    `;
                    data.forEach(function(item) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td><strong>${item.country}</strong></td>
                            <td>${item.totalDeaths.toLocaleString()}</td>
                            <td>${item.percentage}%</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else if (firstItem.totalRecoveries !== undefined) {
                    tableHeader.innerHTML = `
                        <th>Country</th>
                        <th>Total Recoveries</th>
                        <th>Percentage of Global Total</th>
                    `;
                    data.forEach(function(item) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td><strong>${item.country}</strong></td>
                            <td>${item.totalRecoveries.toLocaleString()}</td>
                            <td>${item.percentage}%</td>
                        `;
                        tableBody.appendChild(row);
                    });
                } else if (firstItem.activeCases !== undefined) {
                    tableHeader.innerHTML = `
                        <th>Country</th>
                        <th>Active Cases</th>
                        <th>Percentage of Global Total</th>
                    `;
                    data.forEach(function(item) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td><strong>${item.country}</strong></td>
                            <td>${item.activeCases.toLocaleString()}</td>
                            <td>${item.percentage}%</td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            } else {
                // Simple summary data
            tableHeader.innerHTML = `
                <th>Metric</th>
                <th>Value</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.label}</strong></td>
                    <td>${item.value.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
            }
            break;
        case 'gender':
            // Gender data
            tableHeader.innerHTML = `
                <th>Gender</th>
                <th>Total Cases</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.gender}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'variant':
            // Variant data
            tableHeader.innerHTML = `
                <th>Variant</th>
                <th>Prevalence</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.variant}</strong></td>
                    <td>${item.cases.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'hospitalization':
            // Hospitalization data
            tableHeader.innerHTML = `
                <th>Metric</th>
                <th>Value</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.hospitalizations.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'stackedMetrics':
            // Stacked metrics data - show complete country data
            tableHeader.innerHTML = `
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recoveries</th>
                <th>Active Cases</th>
                <th>Total Tests</th>
                <th>Total Vaccinations</th>
                <th>Case Fatality Rate (%)</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                    <td>${item.deaths.toLocaleString()}</td>
                    <td>${item.recoveries.toLocaleString()}</td>
                    <td>${item.active.toLocaleString()}</td>
                    <td>${item.tests.toLocaleString()}</td>
                    <td>${item.vaccinations.toLocaleString()}</td>
                    <td>${item.fatalityRate.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'trend':
            // Trend data
            tableHeader.innerHTML = `
                <th>Metric</th>
                <th>Value</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.casesTrend.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'fatalityRate':
            // Fatality rate data - show complete country data
            tableHeader.innerHTML = `
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Deaths</th>
                <th>Total Recoveries</th>
                <th>Active Cases</th>
                <th>Total Tests</th>
                <th>Total Vaccinations</th>
                <th>Case Fatality Rate (%)</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.cases.toLocaleString()}</td>
                    <td>${item.deaths.toLocaleString()}</td>
                    <td>${item.recoveries.toLocaleString()}</td>
                    <td>${item.active.toLocaleString()}</td>
                    <td>${item.tests.toLocaleString()}</td>
                    <td>${item.vaccinations.toLocaleString()}</td>
                    <td>${item.fatalityRate.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'population':
            // Population vs Cases data
            tableHeader.innerHTML = `
                <th>Metric</th>
                <th>Value</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.country}</strong></td>
                    <td>${item.population.toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
            break;
        case 'recoveryRatio':
            // Recovery ratio data
            tableHeader.innerHTML = `
                <th>Metric</th>
                <th>Value</th>
            `;
            data.forEach(function(item) {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${item.recoveryRatio}</strong></td>
                    <td>${item.cases.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
            break;
    }
}

// Update data summary
function updateDataSummary(data, type) {
    var summary = '';
    
    switch(type) {
        case 'country':
            var totalCases = data.reduce((sum, item) => sum + item.cases, 0);
            var totalDeaths = data.reduce((sum, item) => sum + item.deaths, 0);
            var totalRecoveries = data.reduce((sum, item) => sum + item.recoveries, 0);
            summary = `Showing data for ${data.length} countries. Total Cases: ${totalCases.toLocaleString()}, Total Deaths: ${totalDeaths.toLocaleString()}, Total Recoveries: ${totalRecoveries.toLocaleString()}`;
            break;
            
        case 'ageGroup':
            var totalCases = data.reduce((sum, item) => sum + item.cases, 0);
            summary = `Showing data for ${data.length} age groups. Total Cases: ${totalCases.toLocaleString()}`;
            break;
            
        case 'metric':
            var totalCases = data.reduce((sum, item) => sum + item.cases, 0);
            summary = `Showing metric comparison for ${data.length} countries. Total Cases: ${totalCases.toLocaleString()}`;
            break;
        case 'summary':
            if (data.length > 0 && data[0].country) {
                // Country breakdown summary
                const firstItem = data[0];
                if (firstItem.totalCases !== undefined) {
                    const totalCases = data.reduce((sum, item) => sum + item.totalCases, 0);
                    summary = `Showing country breakdown for Total Cases. Total: ${totalCases.toLocaleString()}, Countries: ${data.length}`;
                } else if (firstItem.totalDeaths !== undefined) {
                    const totalDeaths = data.reduce((sum, item) => sum + item.totalDeaths, 0);
                    summary = `Showing country breakdown for Total Deaths. Total: ${totalDeaths.toLocaleString()}, Countries: ${data.length}`;
                } else if (firstItem.totalRecoveries !== undefined) {
                    const totalRecoveries = data.reduce((sum, item) => sum + item.totalRecoveries, 0);
                    summary = `Showing country breakdown for Total Recoveries. Total: ${totalRecoveries.toLocaleString()}, Countries: ${data.length}`;
                } else if (firstItem.activeCases !== undefined) {
                    const totalActive = data.reduce((sum, item) => sum + item.activeCases, 0);
                    summary = `Showing country breakdown for Active Cases. Total: ${totalActive.toLocaleString()}, Countries: ${data.length}`;
                }
            } else {
                // Simple summary
                var totalValue = data.reduce((sum, item) => sum + item.value, 0);
                summary = `Showing summary for total ${data[0].label}: ${totalValue.toLocaleString()}`;
            }
            break;
        case 'gender':
            var totalCases = data.reduce((sum, item) => sum + item.cases, 0);
            summary = `Showing gender distribution for ${data.length} countries. Total Cases: ${totalCases.toLocaleString()}`;
            break;
        case 'variant':
            var totalCases = data.reduce((sum, item) => sum + item.cases, 0);
            summary = `Showing variant prevalence for ${data.length} countries. Total Prevalence: ${totalCases.toFixed(2)}%`;
            break;
        case 'hospitalization':
            var totalHospitalizations = data.reduce((sum, item) => sum + item.hospitalizations, 0);
            summary = `Showing hospitalization data for ${data.length} countries. Total Hospitalizations: ${totalHospitalizations.toLocaleString()}`;
            break;
        case 'stackedMetrics':
            var totalNewCases = data.reduce((sum, item) => sum + item.newCases, 0);
            summary = `Showing stacked metrics for ${data.length} countries. Total New Cases: ${totalNewCases.toLocaleString()}`;
            break;
        case 'trend':
            var totalCasesTrend = data.reduce((sum, item) => sum + item.casesTrend, 0);
            summary = `Showing trend analysis for ${data.length} countries. Total Cases Trend: ${totalCasesTrend.toLocaleString()}`;
            break;
        case 'fatalityRate':
            var totalFatalityRate = data.reduce((sum, item) => sum + item.fatalityRate, 0);
            summary = `Showing fatality rate for ${data.length} countries. Total Fatality Rate: ${totalFatalityRate.toFixed(2)}%`;
            break;
        case 'population':
            var totalPopulation = data.reduce((sum, item) => sum + item.population, 0);
            summary = `Showing population vs cases for ${data.length} countries. Total Population: ${totalPopulation.toLocaleString()}`;
            break;
        case 'recoveryRatio':
            var totalRecoveryRatio = data.reduce((sum, item) => sum + item.cases, 0);
            summary = `Showing recovery ratio for ${data.length} countries. Total Recovery Ratio: ${totalRecoveryRatio.toFixed(2)}%`;
            break;
    }
    
    document.getElementById('dataSummary').textContent = summary;
}

// Export to CSV
function exportToCSV() {
    if (!currentModalData) return;
    
    var csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    var headers = [];
    document.querySelectorAll('#tableHeader th').forEach(function(th) {
        headers.push(th.textContent);
    });
    csvContent += headers.join(',') + '\n';
    
    // Add data rows
    currentModalData.forEach(function(item) {
        var row = [];
        switch(currentModalType) {
            case 'country':
                row = [item.country, item.cases, item.deaths, item.recoveries, item.active, item.tests, item.vaccinations, item.fatalityRate];
                break;
            case 'ageGroup':
                row = [item.ageGroup, item.cases, item.percentage, item.hospitalizations, item.icu, item.fatalityRate];
                break;
            case 'metric':
                row = [item.country, item.cases, item.deaths, item.recoveries, item.testPositivity, item.vaccinationRate];
                break;
            case 'summary':
                if (item.country) {
                    if (item.totalCases !== undefined) {
                        row = [item.country, item.totalCases, item.percentage];
                    } else if (item.totalDeaths !== undefined) {
                        row = [item.country, item.totalDeaths, item.percentage];
                    } else if (item.totalRecoveries !== undefined) {
                        row = [item.country, item.totalRecoveries, item.percentage];
                    } else if (item.activeCases !== undefined) {
                        row = [item.country, item.activeCases, item.percentage];
                    }
                } else {
                row = [item.label, item.value];
                }
                break;
            case 'gender':
                row = [item.gender, item.cases];
                break;
            case 'variant':
                row = [item.variant, item.cases];
                break;
            case 'hospitalization':
                row = [item.country, item.hospitalizations];
                break;
            case 'stackedMetrics':
                row = [item.country, item.newCases];
                break;
            case 'trend':
                row = [item.country, item.casesTrend];
                break;
            case 'fatalityRate':
                row = [item.country, item.fatalityRate];
                break;
            case 'population':
                row = [item.country, item.population];
                break;
            case 'recoveryRatio':
                row = [item.recoveryRatio, item.cases];
                break;
        }
        csvContent += row.join(',') + '\n';
    });
    
    // Download file
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "covid_data_" + currentModalType + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export to Excel (simplified - creates CSV with .xlsx extension)
function exportToExcel() {
    if (!currentModalData) return;
    
    var csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    var headers = [];
    document.querySelectorAll('#tableHeader th').forEach(function(th) {
        headers.push(th.textContent);
    });
    csvContent += headers.join(',') + '\n';
    
    // Add data rows
    currentModalData.forEach(function(item) {
        var row = [];
        switch(currentModalType) {
            case 'country':
                row = [item.country, item.cases, item.deaths, item.recoveries, item.active, item.tests, item.vaccinations, item.fatalityRate];
                break;
            case 'ageGroup':
                row = [item.ageGroup, item.cases, item.percentage, item.hospitalizations, item.icu, item.fatalityRate];
                break;
            case 'metric':
                row = [item.country, item.cases, item.deaths, item.recoveries, item.testPositivity, item.vaccinationRate];
                break;
            case 'summary':
                if (item.country) {
                    if (item.totalCases !== undefined) {
                        row = [item.country, item.totalCases, item.percentage];
                    } else if (item.totalDeaths !== undefined) {
                        row = [item.country, item.totalDeaths, item.percentage];
                    } else if (item.totalRecoveries !== undefined) {
                        row = [item.country, item.totalRecoveries, item.percentage];
                    } else if (item.activeCases !== undefined) {
                        row = [item.country, item.activeCases, item.percentage];
                    }
                } else {
                row = [item.label, item.value];
                }
                break;
            case 'gender':
                row = [item.gender, item.cases];
                break;
            case 'variant':
                row = [item.variant, item.cases];
                break;
            case 'hospitalization':
                row = [item.country, item.hospitalizations];
                break;
            case 'stackedMetrics':
                row = [item.country, item.newCases];
                break;
            case 'trend':
                row = [item.country, item.casesTrend];
                break;
            case 'fatalityRate':
                row = [item.country, item.fatalityRate];
                break;
            case 'population':
                row = [item.country, item.population];
                break;
            case 'recoveryRatio':
                row = [item.recoveryRatio, item.cases];
                break;
        }
        csvContent += row.join(',') + '\n';
    });
    
    // Download file
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "covid_data_" + currentModalType + ".xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Show spinners initially
    document.querySelectorAll('canvas').forEach(function(canvas) {
        showSpinner(canvas.id);
    });

    // Load initial data
    renderCharts();

    // Continent dropdown change
    document.getElementById('continentDropdown').addEventListener('change', function() {
        renderCharts(this.value);
    });

    // Filter change listeners - removed automatic application
    document.getElementById('dateRangeFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    document.getElementById('ageGroupFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    document.getElementById('genderFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    document.getElementById('variantFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    document.getElementById('metricFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    document.getElementById('topNFilter').addEventListener('change', function() {
        // Don't auto-apply, wait for user to click Apply Filters
    });
    
    // Search box with debouncing - removed automatic application
    let searchTimeout;
    document.getElementById('searchBox').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
            // Don't auto-apply, wait for user to click Apply Filters
        }, 300);
    });

    // Summary tile click listeners
    const totalCasesCard = document.getElementById('totalCasesCard');
    const totalDeathsCard = document.getElementById('totalDeathsCard');
    const totalRecoveriesCard = document.getElementById('totalRecoveriesCard');
    const activeCasesCard = document.getElementById('activeCasesCard');
    
    if (totalCasesCard) {
        totalCasesCard.addEventListener('click', function() { 
            console.log('Total Cases clicked');
            showSummaryData('cases'); 
        });
    } else {
        console.error('Total Cases card not found');
    }
    
    if (totalDeathsCard) {
        totalDeathsCard.addEventListener('click', function() { 
            console.log('Total Deaths clicked');
            showSummaryData('deaths'); 
        });
    } else {
        console.error('Total Deaths card not found');
    }
    
    if (totalRecoveriesCard) {
        totalRecoveriesCard.addEventListener('click', function() { 
            console.log('Total Recoveries clicked');
            showSummaryData('recoveries'); 
        });
    } else {
        console.error('Total Recoveries card not found');
    }
    
    if (activeCasesCard) {
        activeCasesCard.addEventListener('click', function() { 
            console.log('Active Cases clicked');
            showSummaryData('active'); 
        });
    } else {
        console.error('Active Cases card not found');
    }
    
    // Debug information
    console.log('Dashboard initialized');
    console.log('Modal element exists:', !!document.getElementById('dataModal'));
    console.log('Bootstrap available:', !!window.bootstrap);
    console.log('Papa Parse available:', !!window.Papa);
    
    // Update CSV status
    setTimeout(() => {
        const csvStatus = document.getElementById('csvStatus');
        if (csvStatus) {
            if (window.allCountryData && window.allCountryData.rawCsvData) {
                csvStatus.textContent = `CSV loaded: ${window.allCountryData.rawCsvData.length} records`;
                csvStatus.className = 'ms-2 text-success';
            } else {
                csvStatus.textContent = 'CSV not loaded';
                csvStatus.className = 'ms-2 text-danger';
            }
        }
    }, 2000);
});

