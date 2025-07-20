package com.company.coronavirustracker.services;

import com.company.coronavirustracker.models.LocationStats;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
/**
 * constructor
 */
public class CoronaVirusDataService {

    private  static  String VIRUS_DATA_URL= "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv" ;
    private static final Logger logger = LoggerFactory.getLogger(CoronaVirusDataService.class);
    private static final String CONFIRMED_DATA_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
    private static final String LOCAL_ENRICHED_CSV = "src/main/resources/static/global_covid_data_enriched.csv";

    private List<LocationStats> allStats = new ArrayList<>();

    public List<LocationStats> getAllStats() {
        return allStats;
    }

    @PostConstruct
    @Scheduled(cron = "0 0/30 * * * *") // every 30 minutes
    public void fetchVirusData() {
        try {
            List<LocationStats> newStats = fetchDataFromLocalCsv(LOCAL_ENRICHED_CSV);
            if (newStats.isEmpty()) {
                logger.error("Local enriched CSV is empty! Keeping previous data.");
            } else {
                this.allStats = newStats;
                logger.info("Fetched {} records for dashboard from local enriched CSV.", newStats.size());
            }
        } catch (Exception e) {
            logger.error("Error fetching or parsing COVID-19 data from local CSV: ", e);
        }
    }

    private List<LocationStats> fetchDataFromLocalCsv(String filePath) throws IOException {
        List<LocationStats> stats = new ArrayList<>();
        try (CSVParser parser = CSVParser.parse(
                new java.io.File(filePath),
                StandardCharsets.UTF_8,
                CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
            for (CSVRecord record : parser) {
                try {
                    LocationStats locationStat = new LocationStats();
                    
                    // Basic location info
                    locationStat.setState(record.get("Region"));
                    locationStat.setCountry(record.get("Country"));
                    locationStat.setCity(record.get("City"));
                    
                    // Cases data
                    int latestCases = 0, newCases = 0;
                    try {
                        latestCases = Integer.parseInt(record.get("Total Cases"));
                        newCases = Integer.parseInt(record.get("New Cases"));
                    } catch (Exception ignore) {}
                    locationStat.setLatestTotalCases(latestCases);
                    locationStat.setDiffFromPrevDay(newCases);
                    locationStat.setNewCases(newCases);
                    
                    // Deaths data
                    int totalDeaths = 0, newDeaths = 0;
                    try {
                        totalDeaths = Integer.parseInt(record.get("Total Deaths"));
                        newDeaths = Integer.parseInt(record.get("New Deaths"));
                    } catch (Exception ignore) {}
                    locationStat.setTotalDeaths(totalDeaths);
                    locationStat.setNewDeaths(newDeaths);
                    
                    // Recoveries data
                    int totalRecoveries = 0, newRecoveries = 0;
                    try {
                        totalRecoveries = Integer.parseInt(record.get("Total Recoveries"));
                        newRecoveries = Integer.parseInt(record.get("New Recoveries"));
                    } catch (Exception ignore) {}
                    locationStat.setTotalRecoveries(totalRecoveries);
                    locationStat.setNewRecoveries(newRecoveries);
                    
                    // Active cases
                    int activeCases = 0;
                    try {
                        activeCases = Integer.parseInt(record.get("Active Cases"));
                    } catch (Exception ignore) {}
                    locationStat.setActiveCases(activeCases);
                    
                    // Testing data
                    int totalTests = 0, newTests = 0;
                    try {
                        totalTests = Integer.parseInt(record.get("Total Tests"));
                        newTests = Integer.parseInt(record.get("New Tests"));
                    } catch (Exception ignore) {}
                    locationStat.setTotalTests(totalTests);
                    locationStat.setNewTests(newTests);
                    
                    // Vaccination data
                    int totalVaccinations = 0, newVaccinations = 0;
                    try {
                        totalVaccinations = Integer.parseInt(record.get("Total Vaccinations"));
                        newVaccinations = Integer.parseInt(record.get("New Vaccinations"));
                    } catch (Exception ignore) {}
                    locationStat.setTotalVaccinations(totalVaccinations);
                    locationStat.setNewVaccinations(newVaccinations);
                    
                    // Demographics
                    locationStat.setAgeGroup(record.get("Age Group"));
                    locationStat.setGender(record.get("Gender"));
                    
                    // Medical data
                    int hospitalizations = 0, icuAdmissions = 0;
                    try {
                        hospitalizations = Integer.parseInt(record.get("Hospitalizations"));
                        icuAdmissions = Integer.parseInt(record.get("ICU Admissions"));
                    } catch (Exception ignore) {}
                    locationStat.setHospitalizations(hospitalizations);
                    locationStat.setIcuAdmissions(icuAdmissions);
                    
                    // Rates
                    double caseFatalityRate = 0.0, testPositivityRate = 0.0, vaccinationRate = 0.0;
                    try {
                        caseFatalityRate = Double.parseDouble(record.get("Case Fatality Rate (%)"));
                        testPositivityRate = Double.parseDouble(record.get("Test Positivity Rate (%)"));
                        vaccinationRate = Double.parseDouble(record.get("Vaccination Rate (%)"));
                    } catch (Exception ignore) {}
                    locationStat.setCaseFatalityRate(caseFatalityRate);
                    locationStat.setTestPositivityRate(testPositivityRate);
                    locationStat.setVaccinationRate(vaccinationRate);
                    
                    // Geographic data
                    double latitude = 0.0, longitude = 0.0;
                    try {
                        latitude = Double.parseDouble(record.get("Latitude"));
                        longitude = Double.parseDouble(record.get("Longitude"));
                    } catch (Exception ignore) {}
                    locationStat.setLatitude(latitude);
                    locationStat.setLongitude(longitude);
                    
                    // Other data
                    locationStat.setVariantPrevalence(record.get("Variant Prevalence"));
                    
                    long population = 0;
                    try {
                        population = Long.parseLong(record.get("Population"));
                    } catch (Exception ignore) {}
                    locationStat.setPopulation(population);
                    
                    stats.add(locationStat);
                } catch (Exception e) {
                    logger.warn("Skipping malformed CSV record: {}", record.toString());
                }
            }
        }
        logger.info("Loaded {} records from local enriched CSV.", stats.size());
        return stats;
    }

    // Static country-to-continent mapping (partial, extend as needed)
    private static final java.util.Map<String, String> COUNTRY_TO_CONTINENT = java.util.Map.ofEntries(
        java.util.Map.entry("India", "Asia"),
        java.util.Map.entry("China", "Asia"),
        java.util.Map.entry("Japan", "Asia"),
        java.util.Map.entry("USA", "North America"),
        java.util.Map.entry("United States", "North America"),
        java.util.Map.entry("Canada", "North America"),
        java.util.Map.entry("Brazil", "South America"),
        java.util.Map.entry("Argentina", "South America"),
        java.util.Map.entry("UK", "Europe"),
        java.util.Map.entry("United Kingdom", "Europe"),
        java.util.Map.entry("France", "Europe"),
        java.util.Map.entry("Germany", "Europe"),
        java.util.Map.entry("Italy", "Europe"),
        java.util.Map.entry("Spain", "Europe"),
        java.util.Map.entry("Russia", "Europe"),
        java.util.Map.entry("Australia", "Oceania"),
        java.util.Map.entry("South Africa", "Africa"),
        java.util.Map.entry("Egypt", "Africa"),
        java.util.Map.entry("Nigeria", "Africa"),
        java.util.Map.entry("Antarctica", "Antarctica")
        // ... add more as needed ...
    );

    // Get all available continents from loaded stats
    public java.util.Set<String> getAllContinents() {
        java.util.Set<String> continents = new java.util.TreeSet<>();
        for (LocationStats stat : allStats) {
            String country = stat.getCountry();
            String continent = COUNTRY_TO_CONTINENT.get(country);
            if (continent != null) continents.add(continent);
        }
        return continents;
    }

    // Get stats for a given continent
    public java.util.List<LocationStats> getStatsForContinent(String continent) {
        java.util.List<LocationStats> filtered = new java.util.ArrayList<>();
        for (LocationStats stat : allStats) {
            String country = stat.getCountry();
            String c = COUNTRY_TO_CONTINENT.get(country);
            if (continent.equals(c)) filtered.add(stat);
        }
        return filtered;
    }
}
