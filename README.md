# 🌍 TraceCase - COVID-19 Analytics Dashboard

[![Java](https://img.shields.io/badge/Java-8+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.5.2-green.svg)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.2+-blue.svg)](https://maven.apache.org/)
[![Status](https://img.shields.io/badge/Status-Active-success.svg)](https://github.com/tarun/TraceCase)

A comprehensive **Spring Boot** application that provides real-time COVID-19 analytics and tracking capabilities with an interactive dashboard. This application aggregates data from multiple sources to deliver detailed insights into global pandemic statistics.

---

## 📊 Features

### 🎯 Core Functionality
- **Real-time Data Tracking**: Automatically fetches and updates COVID-19 data every 30 minutes
- **Global Coverage**: Tracks cases, deaths, recoveries, and vaccinations across all continents
- **Interactive Dashboard**: Modern, responsive web interface with dynamic charts and filters
- **Multi-dimensional Analytics**: View data by country, state/province, age group, gender, and variant

### 📈 Advanced Analytics
- **Comprehensive Metrics**: 
  - Total cases, deaths, recoveries, and active cases
  - New cases, deaths, and recoveries (daily changes)
  - Testing data and vaccination statistics
  - Hospitalization and ICU admission rates
  - Case fatality rates and test positivity rates

### 🎨 User Interface
- **Interactive Charts**: Dynamic visualizations using Chart.js
- **Advanced Filtering**: Filter by continent, date range, age group, gender, and variant
- **Search Functionality**: Quick country search with real-time results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Custom Presets**: Pre-configured filters for high-risk areas, vaccination focus, and testing analysis

### 🔧 Technical Features
- **Scheduled Data Updates**: Automatic data refresh every 30 minutes
- **RESTful API**: JSON endpoints for chart data and country-specific information
- **Error Handling**: Robust error handling with comprehensive logging
- **Performance Optimized**: Efficient data processing and caching mechanisms

## 🛠️ Technology Stack

- **Backend**: Java 8+, Spring Boot 2.5.2
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5.1.3
- **Charts**: Chart.js for interactive visualizations
- **Data Processing**: Apache Commons CSV
- **Build Tool**: Maven 3.2+
- **Template Engine**: Thymeleaf

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 8 or later
- **Maven**: Version 3.2 or later
- **IDE**: IntelliJ IDEA, Eclipse, or VS Code (recommended)
- **Git**: For cloning the repository

---

## 📸 Application Screenshots

**Dashboard Overview**

![Dashboard Overview](images/Dashboard%201.png)
![Charts and Filters](images/Dashboard%202.png)
![Pie and Donut Charts](images/Dashboard%203.png)
![Cases Overview and Demographics](images/Dashboard%204.png)
![Detailed Metrics and Trends](images/Dashboard%205.png)
![Export and Analysis Features](images/Dashboard%206.png)

---


## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/tarun/TraceCase.git
cd TraceCase
```

### 2. Build the Application
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

### 4. Access the Dashboard
Open your web browser and navigate to:
```
http://localhost:8090
```

## 📁 Project Structure

```
TraceCase/
├── src/
│   ├── main/
│   │   ├── java/com/company/coronavirustracker/
│   │   │   ├── controllers/
│   │   │   │   ├── HomeController.java          # Main dashboard controller
│   │   │   │   └── ChartDataController.java     # REST API for chart data
│   │   │   ├── models/
│   │   │   │   └── LocationStats.java           # Data model for COVID statistics
│   │   │   ├── services/
│   │   │   │   └── CoronaVirusDataService.java  # Data fetching and processing
│   │   │   └── CoronavirusTrackerApplication.java
│   │   └── resources/
│   │       ├── templates/
│   │       │   └── home.html                    # Main dashboard template
│   │       ├── static/
│   │       │   ├── js/
│   │       │   │   └── dashboard.js             # Frontend JavaScript
│   │       │   └── global_covid_data_enriched.csv
│   │       └── application.properties
│   └── test/
├── pom.xml                                      # Maven dependencies
├── README.md
├── enrich_covid_data.py                         # Python script for data enrichment
└── test_*.html                                  # Test HTML files for UI components
```

## 🔧 Configuration

### Application Properties
The application can be configured through `src/main/resources/application.properties`:

```properties
# Server configuration
server.port=8090

# Data source configuration
# The application uses enriched CSV data from local resources
```

### Data Sources
The application currently uses enriched COVID-19 data from:
- Local CSV files with comprehensive statistics (`global_covid_data_enriched.csv`)
- Support for multiple data formats and sources
- Automatic data validation and error handling
- Python data enrichment script for enhanced analytics

## 📊 API Endpoints

### Dashboard
- `GET /` - Main dashboard page
- `GET /states?country={country}` - Get state/province data for a specific country

### Chart Data API
- `GET /api/chart-data?continent={continent}` - Get chart data for visualization
  - Parameters:
    - `continent` (optional): Filter data by continent

### Response Format
```json
{
  "continents": ["Asia", "Europe", "North America", ...],
  "allCountryLabels": ["USA", "India", "Brazil", ...],
  "allCountryTotalCases": [50000000, 40000000, 30000000, ...],
  "totalCases": 200000000,
  "totalDeaths": 4000000,
  "totalRecoveries": 180000000,
  "totalActiveCases": 16000000
}
```

## 🎨 Dashboard Features

### Interactive Charts
- **Bar Charts**: Country-wise case comparisons
- **Line Charts**: Trend analysis over time
- **Pie Charts**: Distribution of cases by region
- **Customizable Views**: Toggle between different metrics and time periods

### Advanced Filtering
- **Geographic Filters**: Continent and country selection
- **Demographic Filters**: Age group and gender analysis
- **Temporal Filters**: Date range selection
- **Variant Analysis**: COVID-19 variant tracking
- **Metric Selection**: Cases, deaths, recoveries, tests, vaccinations

### Real-time Updates
- **Automatic Refresh**: Data updates every 30 minutes
- **Live Statistics**: Current global totals and trends
- **Alert System**: Notifications for significant changes

## 🧪 Testing

The project includes several test HTML files for UI component testing:
- `test_all_fixes.html` - Comprehensive UI testing
- `test_chart_fixes.html` - Chart functionality testing
- `test_modal_fixes.html` - Modal component testing
- `test_testing_vaccination.html` - Vaccination data testing
- `test_modal.html` - Modal interface testing

## 🤝 Contributing

We welcome contributions to improve the TraceCase COVID-19 Analytics Dashboard! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow Java coding conventions
- Add comprehensive tests for new features
- Update documentation for any API changes
- Ensure responsive design for mobile compatibility
- Test UI components using the provided test HTML files

## 🐛 Troubleshooting

### Common Issues

**Application won't start:**
- Ensure Java 8+ is installed and JAVA_HOME is set
- Check if port 8090 is available
- Verify all Maven dependencies are downloaded

**Data not loading:**
- Check internet connectivity for data fetching
- Verify CSV file paths in resources
- Review application logs for error messages

**Charts not displaying:**
- Ensure JavaScript is enabled in browser
- Check browser console for JavaScript errors
- Verify Chart.js library is loading correctly

**UI Component Issues:**
- Use the test HTML files to isolate and debug UI problems
- Check browser compatibility and responsive design

## 📈 Future Enhancements

- [ ] **Real-time Notifications**: Push notifications for significant changes
- [ ] **Mobile App**: Native mobile application development
- [ ] **Predictive Analytics**: Machine learning models for trend prediction
- [ ] **Geographic Visualization**: Interactive maps with case distribution
- [ ] **Export Functionality**: PDF/Excel report generation
- [ ] **Multi-language Support**: Internationalization for global users
- [ ] **API Rate Limiting**: Enhanced API security and performance
- [ ] **Data Validation**: Advanced data quality checks and validation
- [ ] **Enhanced Testing**: Automated UI testing and integration tests

## 🙏 Acknowledgments

- **Data Sources**: Johns Hopkins University CSSE COVID-19 Dataset
- **Frontend Libraries**: Bootstrap, Chart.js
- **Backend Framework**: Spring Boot
- **Community**: All contributors and users of this application

## 📞 Support

If you encounter any issues or have questions:

- **Issues**: [GitHub Issues](https://github.com/tarun/TraceCase/issues)
- **Documentation**: [Wiki](https://github.com/tarun/TraceCase/wiki)
- **Email**: tarun@example.com

---

**Note**: This application is for educational and informational purposes. Always refer to official health organizations for the most accurate and up-to-date COVID-19 information.

**Last Updated**: December 2024
**Developer**: Tarun
