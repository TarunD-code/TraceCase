package com.company.coronavirustracker.controllers;

import com.company.coronavirustracker.models.LocationStats;
import com.company.coronavirustracker.services.CoronaVirusDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class ChartDataController {
    @Autowired
    CoronaVirusDataService coronaVirusDataService;

    @GetMapping("/api/chart-data")
    public Map<String, Object> getChartData(@RequestParam(value = "continent", required = false) String selectedContinent) {
        Map<String, Object> result = new HashMap<>();
        // Always return the list of available continents
        result.put("continents", coronaVirusDataService.getAllContinents());
        List<LocationStats> stats;
        if (selectedContinent != null && !selectedContinent.isEmpty()) {
            stats = coronaVirusDataService.getStatsForContinent(selectedContinent);
        } else {
            stats = coronaVirusDataService.getAllStats();
        }
        
        // Country-wise aggregation for the selected continent
        Map<String, Long> countryCases = new LinkedHashMap<>();
        Map<String, Long> countryNewCases = new LinkedHashMap<>();
        Map<String, Long> countryDeaths = new LinkedHashMap<>();
        Map<String, Long> countryNewDeaths = new LinkedHashMap<>();
        Map<String, Long> countryRecoveries = new LinkedHashMap<>();
        Map<String, Long> countryNewRecoveries = new LinkedHashMap<>();
        Map<String, Long> countryActiveCases = new LinkedHashMap<>();
        Map<String, Long> countryTests = new LinkedHashMap<>();
        Map<String, Long> countryVaccinations = new LinkedHashMap<>();
        
        for (LocationStats stat : stats) {
            String country = stat.getCountry();
            countryCases.put(country, countryCases.getOrDefault(country, 0L) + stat.getLatestTotalCases());
            countryNewCases.put(country, countryNewCases.getOrDefault(country, 0L) + stat.getDiffFromPrevDay());
            countryDeaths.put(country, countryDeaths.getOrDefault(country, 0L) + stat.getTotalDeaths());
            countryNewDeaths.put(country, countryNewDeaths.getOrDefault(country, 0L) + stat.getNewDeaths());
            countryRecoveries.put(country, countryRecoveries.getOrDefault(country, 0L) + stat.getTotalRecoveries());
            countryNewRecoveries.put(country, countryNewRecoveries.getOrDefault(country, 0L) + stat.getNewRecoveries());
            countryActiveCases.put(country, countryActiveCases.getOrDefault(country, 0L) + stat.getActiveCases());
            countryTests.put(country, countryTests.getOrDefault(country, 0L) + stat.getTotalTests());
            countryVaccinations.put(country, countryVaccinations.getOrDefault(country, 0L) + stat.getTotalVaccinations());
        }
        
        List<String> allCountryLabels = new ArrayList<>(countryCases.keySet());
        List<Long> allCountryTotalCases = new ArrayList<>();
        List<Long> allCountryNewCases = new ArrayList<>();
        List<Long> allCountryTotalDeaths = new ArrayList<>();
        List<Long> allCountryNewDeaths = new ArrayList<>();
        List<Long> allCountryTotalRecoveries = new ArrayList<>();
        List<Long> allCountryNewRecoveries = new ArrayList<>();
        List<Long> allCountryActiveCases = new ArrayList<>();
        List<Long> allCountryTotalTests = new ArrayList<>();
        List<Long> allCountryTotalVaccinations = new ArrayList<>();
        
        for (String country : allCountryLabels) {
            allCountryTotalCases.add(countryCases.get(country));
            allCountryNewCases.add(countryNewCases.get(country));
            allCountryTotalDeaths.add(countryDeaths.get(country));
            allCountryNewDeaths.add(countryNewDeaths.get(country));
            allCountryTotalRecoveries.add(countryRecoveries.get(country));
            allCountryNewRecoveries.add(countryNewRecoveries.get(country));
            allCountryActiveCases.add(countryActiveCases.get(country));
            allCountryTotalTests.add(countryTests.get(country));
            allCountryTotalVaccinations.add(countryVaccinations.get(country));
        }
        
        // Calculate global totals for summary statistics
        long totalCases = allCountryTotalCases.stream().mapToLong(Long::longValue).sum();
        long totalDeaths = allCountryTotalDeaths.stream().mapToLong(Long::longValue).sum();
        long totalRecoveries = allCountryTotalRecoveries.stream().mapToLong(Long::longValue).sum();
        long totalActiveCases = allCountryActiveCases.stream().mapToLong(Long::longValue).sum();
        
        // No state/province breakdown for continent view (can be extended)
        result.put("allCountryLabels", allCountryLabels);
        result.put("allCountryTotalCases", allCountryTotalCases);
        result.put("allCountryNewCases", allCountryNewCases);
        result.put("allCountryTotalDeaths", allCountryTotalDeaths);
        result.put("allCountryNewDeaths", allCountryNewDeaths);
        result.put("allCountryTotalRecoveries", allCountryTotalRecoveries);
        result.put("allCountryNewRecoveries", allCountryNewRecoveries);
        result.put("allCountryActiveCases", allCountryActiveCases);
        result.put("allCountryTotalTests", allCountryTotalTests);
        result.put("allCountryTotalVaccinations", allCountryTotalVaccinations);
        
        // Summary statistics
        result.put("totalCases", totalCases);
        result.put("totalDeaths", totalDeaths);
        result.put("totalRecoveries", totalRecoveries);
        result.put("totalActiveCases", totalActiveCases);
        
        result.put("stateLabels", new ArrayList<>());
        result.put("stateTotalCases", new ArrayList<>());
        result.put("stateNewCases", new ArrayList<>());
        return result;
    }
} 