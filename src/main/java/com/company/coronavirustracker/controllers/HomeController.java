package com.company.coronavirustracker.controllers;

import com.company.coronavirustracker.models.LocationStats;
import com.company.coronavirustracker.services.CoronaVirusDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Controller

public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    CoronaVirusDataService coronaVirusDataService;
    @GetMapping("/")
    public String home(Model model) throws JsonProcessingException {
        List<LocationStats> allStats = coronaVirusDataService.getAllStats();
        if (allStats == null) allStats = new java.util.ArrayList<>();
        if (allStats.isEmpty()) logger.warn("No stats data available for dashboard!");
        int totalReportedCases = allStats.stream().mapToInt(stats -> stats.getLatestTotalCases()).sum();
        int totalNewCases = allStats.stream().mapToInt(stats -> stats.getDiffFromPrevDay()).sum();
        model.addAttribute("locationStats", allStats);
        model.addAttribute("totalReportedCases", totalReportedCases);
        model.addAttribute("totalNewCases", totalNewCases);

        // Country list for dropdown
        java.util.Set<String> countrySet = new java.util.TreeSet<>();
        for (LocationStats stat : allStats) countrySet.add(stat.getCountry());
        model.addAttribute("countryList", countrySet);

        // Country-wise aggregation for all countries (preserve order)
        Map<String, Integer> countryCases = new LinkedHashMap<>();
        Map<String, Integer> countryNewCases = new LinkedHashMap<>();
        for (LocationStats stat : allStats) {
            countryCases.put(stat.getCountry(), countryCases.getOrDefault(stat.getCountry(), 0) + stat.getLatestTotalCases());
            countryNewCases.put(stat.getCountry(), countryNewCases.getOrDefault(stat.getCountry(), 0) + stat.getDiffFromPrevDay());
        }
        List<String> allCountryLabels = new java.util.ArrayList<>(countryCases.keySet());
        List<Integer> allCountryTotalCases = new java.util.ArrayList<>();
        List<Integer> allCountryNewCases = new java.util.ArrayList<>();
        for (String country : allCountryLabels) {
            allCountryTotalCases.add(countryCases.get(country));
            allCountryNewCases.add(countryNewCases.get(country));
        }
        logger.info("allCountryLabels size: {} sample: {}", allCountryLabels.size(), allCountryLabels.size() > 0 ? allCountryLabels.subList(0, Math.min(5, allCountryLabels.size())) : "empty");
        logger.info("allCountryTotalCases size: {} sample: {}", allCountryTotalCases.size(), allCountryTotalCases.size() > 0 ? allCountryTotalCases.subList(0, Math.min(5, allCountryTotalCases.size())) : "empty");
        ObjectMapper mapper = new ObjectMapper();
        model.addAttribute("allCountryLabels", mapper.writeValueAsString(allCountryLabels));
        model.addAttribute("allCountryTotalCases", mapper.writeValueAsString(allCountryTotalCases));
        model.addAttribute("allCountryNewCases", mapper.writeValueAsString(allCountryNewCases));

        // State-wise aggregation for a selected country (default: US)
        String selectedCountry = "US";
        List<LocationStats> stateStats = allStats.stream()
                .filter(stat -> selectedCountry.equals(stat.getCountry()))
                .collect(java.util.stream.Collectors.toList());
        List<String> stateLabels = new java.util.ArrayList<>();
        List<Integer> stateTotalCases = new java.util.ArrayList<>();
        List<Integer> stateNewCases = new java.util.ArrayList<>();
        for (LocationStats stat : stateStats) {
            stateLabels.add(stat.getState());
            stateTotalCases.add(stat.getLatestTotalCases());
            stateNewCases.add(stat.getDiffFromPrevDay());
        }
        model.addAttribute("stateLabels", mapper.writeValueAsString(stateLabels));
        model.addAttribute("stateTotalCases", mapper.writeValueAsString(stateTotalCases));
        model.addAttribute("stateNewCases", mapper.writeValueAsString(stateNewCases));

        // (Optional) Time series data can be added here in the future

        return "home";
    }

    // REST endpoint for AJAX: get state data for a selected country
    @GetMapping("/states")
    @ResponseBody
    public String getStatesForCountry(@RequestParam("country") String country) throws JsonProcessingException {
        List<LocationStats> allStats = coronaVirusDataService.getAllStats();
        if (allStats == null) allStats = new java.util.ArrayList<>();
        List<LocationStats> stateStats = allStats.stream()
                .filter(stat -> country.equals(stat.getCountry()))
                .collect(java.util.stream.Collectors.toList());
        java.util.List<String> stateLabels = new java.util.ArrayList<>();
        java.util.List<Integer> stateTotalCases = new java.util.ArrayList<>();
        java.util.List<Integer> stateNewCases = new java.util.ArrayList<>();
        for (LocationStats stat : stateStats) {
            stateLabels.add(stat.getState());
            stateTotalCases.add(stat.getLatestTotalCases());
            stateNewCases.add(stat.getDiffFromPrevDay());
        }
        java.util.Map<String, Object> result = new java.util.HashMap<>();
        result.put("stateLabels", stateLabels);
        result.put("stateTotalCases", stateTotalCases);
        result.put("stateNewCases", stateNewCases);
        return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(result);
    }
}
