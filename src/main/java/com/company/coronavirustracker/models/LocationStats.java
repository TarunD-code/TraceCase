package com.company.coronavirustracker.models;

public class LocationStats {

    private String state;
    private String country;
    private String city;
    private int latestTotalCases;
    private int diffFromPrevDay;
    private int newCases;
    private int totalDeaths;
    private int newDeaths;
    private int totalRecoveries;
    private int newRecoveries;
    private int activeCases;
    private int totalTests;
    private int newTests;
    private int totalVaccinations;
    private int newVaccinations;
    private String ageGroup;
    private String gender;
    private int hospitalizations;
    private int icuAdmissions;
    private double caseFatalityRate;
    private double testPositivityRate;
    private double vaccinationRate;
    private double latitude;
    private double longitude;
    private String variantPrevalence;
    private long population;

    // Existing getters and setters
    public int getDiffFromPrevDay() {
        return diffFromPrevDay;
    }

    public void setDiffFromPrevDay(int diffFromPrevDay) {
        this.diffFromPrevDay = diffFromPrevDay;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getLatestTotalCases() {
        return latestTotalCases;
    }

    public void setLatestTotalCases(int latestTotalCases) {
        this.latestTotalCases = latestTotalCases;
    }

    // New getters and setters
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getNewCases() {
        return newCases;
    }

    public void setNewCases(int newCases) {
        this.newCases = newCases;
    }

    public int getTotalDeaths() {
        return totalDeaths;
    }

    public void setTotalDeaths(int totalDeaths) {
        this.totalDeaths = totalDeaths;
    }

    public int getNewDeaths() {
        return newDeaths;
    }

    public void setNewDeaths(int newDeaths) {
        this.newDeaths = newDeaths;
    }

    public int getTotalRecoveries() {
        return totalRecoveries;
    }

    public void setTotalRecoveries(int totalRecoveries) {
        this.totalRecoveries = totalRecoveries;
    }

    public int getNewRecoveries() {
        return newRecoveries;
    }

    public void setNewRecoveries(int newRecoveries) {
        this.newRecoveries = newRecoveries;
    }

    public int getActiveCases() {
        return activeCases;
    }

    public void setActiveCases(int activeCases) {
        this.activeCases = activeCases;
    }

    public int getTotalTests() {
        return totalTests;
    }

    public void setTotalTests(int totalTests) {
        this.totalTests = totalTests;
    }

    public int getNewTests() {
        return newTests;
    }

    public void setNewTests(int newTests) {
        this.newTests = newTests;
    }

    public int getTotalVaccinations() {
        return totalVaccinations;
    }

    public void setTotalVaccinations(int totalVaccinations) {
        this.totalVaccinations = totalVaccinations;
    }

    public int getNewVaccinations() {
        return newVaccinations;
    }

    public void setNewVaccinations(int newVaccinations) {
        this.newVaccinations = newVaccinations;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getHospitalizations() {
        return hospitalizations;
    }

    public void setHospitalizations(int hospitalizations) {
        this.hospitalizations = hospitalizations;
    }

    public int getIcuAdmissions() {
        return icuAdmissions;
    }

    public void setIcuAdmissions(int icuAdmissions) {
        this.icuAdmissions = icuAdmissions;
    }

    public double getCaseFatalityRate() {
        return caseFatalityRate;
    }

    public void setCaseFatalityRate(double caseFatalityRate) {
        this.caseFatalityRate = caseFatalityRate;
    }

    public double getTestPositivityRate() {
        return testPositivityRate;
    }

    public void setTestPositivityRate(double testPositivityRate) {
        this.testPositivityRate = testPositivityRate;
    }

    public double getVaccinationRate() {
        return vaccinationRate;
    }

    public void setVaccinationRate(double vaccinationRate) {
        this.vaccinationRate = vaccinationRate;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getVariantPrevalence() {
        return variantPrevalence;
    }

    public void setVariantPrevalence(String variantPrevalence) {
        this.variantPrevalence = variantPrevalence;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    @Override
    public String toString() {
        return "LocationStats{" +
                "state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", latestTotalCases=" + latestTotalCases +
                ", totalDeaths=" + totalDeaths +
                ", totalRecoveries=" + totalRecoveries +
                ", activeCases=" + activeCases +
                '}';
    }
}
