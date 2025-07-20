import pandas as pd
import numpy as np
import random
from datetime import datetime
import sys

# File paths
USER_CSV = 'src/main/resources/global_covid_data_sample.csv'
JHU_CSV = 'johns_hopkins_global_confirmed.csv'
OUTPUT_CSV = 'src/main/resources/global_covid_data_enriched.csv'

# Load user data
user_df = pd.read_csv(USER_CSV)

# Load JHU data and extract unique locations
jhu_df = pd.read_csv(JHU_CSV)
# JHU: Province/State,Country/Region,Lat,Long,...
jhu_locations = jhu_df[['Province/State', 'Country/Region', 'Lat', 'Long']].drop_duplicates()
jhu_locations = jhu_locations.rename(columns={'Province/State': 'Region', 'Country/Region': 'Country', 'Lat': 'Latitude', 'Long': 'Longitude'})

# Helper: plausible random value generators
AGE_GROUPS = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70+']
GENDERS = ['Male', 'Female', 'Other']
VARIANTS = ['Omicron', 'Delta', 'BA.2.86', 'XBB.1.5', 'EG.5']

# For each location in JHU, ensure at least one row exists in user data for the latest date
latest_date = user_df['Date'].max()
user_locations = user_df[['Country', 'Region', 'City', 'Latitude', 'Longitude']].drop_duplicates()

# For JHU, treat empty Region as country-level
jhu_locations['Region'] = jhu_locations['Region'].fillna('')

# Find missing locations
def location_key(row):
    return (row['Country'], row['Region'], row['Latitude'], row['Longitude'])
user_keys = set(user_locations.apply(location_key, axis=1))
jhu_keys = set(jhu_locations.apply(location_key, axis=1))
missing_keys = jhu_keys - user_keys

# Generate plausible random data for missing locations
new_rows = []
for key in missing_keys:
    country, region, lat, lon = key
    # Random city name (if region present, use as city, else blank)
    city = region if region else ''
    # Random plausible values
    pop = random.randint(10000, 100000000)
    total_cases = random.randint(0, int(pop * 0.2))
    new_cases = random.randint(0, min(1000, total_cases))
    total_deaths = random.randint(0, int(total_cases * 0.05))
    new_deaths = random.randint(0, min(50, total_deaths))
    total_recoveries = random.randint(0, total_cases)
    new_recoveries = random.randint(0, min(500, total_recoveries))
    active_cases = total_cases - total_deaths - total_recoveries
    new_tests = random.randint(0, 10000)
    total_tests = total_cases * random.randint(2, 10)
    new_vacc = random.randint(0, 10000)
    total_vacc = int(pop * random.uniform(0.2, 0.95))
    age_group = random.choice(AGE_GROUPS)
    gender = random.choice(GENDERS)
    hospitalizations = random.randint(0, max(1, int(total_cases * 0.1)))
    icu = random.randint(0, max(1, int(hospitalizations * 0.2)))
    cfr = round((total_deaths / total_cases * 100) if total_cases else 0, 2)
    tpr = round((new_cases / new_tests * 100) if new_tests else 0, 2)
    vacc_rate = round((total_vacc / pop * 100) if pop else 0, 2)
    variant = random.choice(VARIANTS)
    row = {
        'Date': latest_date,
        'Country': country,
        'Region': region,
        'City': city,
        'New Cases': new_cases,
        'Total Cases': total_cases,
        'New Deaths': new_deaths,
        'Total Deaths': total_deaths,
        'New Recoveries': new_recoveries,
        'Total Recoveries': total_recoveries,
        'Active Cases': active_cases,
        'New Tests': new_tests,
        'Total Tests': total_tests,
        'New Vaccinations': new_vacc,
        'Total Vaccinations': total_vacc,
        'Age Group': age_group,
        'Gender': gender,
        'Hospitalizations': hospitalizations,
        'ICU Admissions': icu,
        'Case Fatality Rate (%)': cfr,
        'Test Positivity Rate (%)': tpr,
        'Vaccination Rate (%)': vacc_rate,
        'Latitude': lat,
        'Longitude': lon,
        'Variant Prevalence': variant,
        'Population': pop
    }
    new_rows.append(row)

# Get number of extra rows from command-line argument (default 300)
try:
    extra_rows = int(sys.argv[1])
except (IndexError, ValueError):
    extra_rows = 300

# Generate extra random rows
def generate_random_row(date):
    country = random.choice(jhu_locations['Country'].values)
    region = random.choice(jhu_locations['Region'].values)
    lat = random.uniform(-90, 90)
    lon = random.uniform(-180, 180)
    city = region if region else ''
    pop = random.randint(10000, 100000000)
    total_cases = random.randint(0, int(pop * 0.2))
    new_cases = random.randint(0, min(1000, total_cases))
    total_deaths = random.randint(0, int(total_cases * 0.05))
    new_deaths = random.randint(0, min(50, total_deaths))
    total_recoveries = random.randint(0, total_cases)
    new_recoveries = random.randint(0, min(500, total_recoveries))
    active_cases = total_cases - total_deaths - total_recoveries
    new_tests = random.randint(0, 10000)
    total_tests = total_cases * random.randint(2, 10)
    new_vacc = random.randint(0, 10000)
    total_vacc = int(pop * random.uniform(0.2, 0.95))
    age_group = random.choice(AGE_GROUPS)
    gender = random.choice(GENDERS)
    hospitalizations = random.randint(0, max(1, int(total_cases * 0.1)))
    icu = random.randint(0, max(1, int(hospitalizations * 0.2)))
    cfr = round((total_deaths / total_cases * 100) if total_cases else 0, 2)
    tpr = round((new_cases / new_tests * 100) if new_tests else 0, 2)
    vacc_rate = round((total_vacc / pop * 100) if pop else 0, 2)
    variant = random.choice(VARIANTS)
    return {
        'Date': date,
        'Country': country,
        'Region': region,
        'City': city,
        'New Cases': new_cases,
        'Total Cases': total_cases,
        'New Deaths': new_deaths,
        'Total Deaths': total_deaths,
        'New Recoveries': new_recoveries,
        'Total Recoveries': total_recoveries,
        'Active Cases': active_cases,
        'New Tests': new_tests,
        'Total Tests': total_tests,
        'New Vaccinations': new_vacc,
        'Total Vaccinations': total_vacc,
        'Age Group': age_group,
        'Gender': gender,
        'Hospitalizations': hospitalizations,
        'ICU Admissions': icu,
        'Case Fatality Rate (%)': cfr,
        'Test Positivity Rate (%)': tpr,
        'Vaccination Rate (%)': vacc_rate,
        'Latitude': lat,
        'Longitude': lon,
        'Variant Prevalence': variant,
        'Population': pop
    }

# Generate and append extra random rows
for _ in range(extra_rows):
    new_rows.append(generate_random_row(latest_date))

# Fill missing/zero fields in user data with plausible random values
user_df_filled = user_df.copy()
for col in user_df.columns:
    if user_df[col].dtype == object or col in ['Date', 'Country', 'Region', 'City', 'Age Group', 'Gender', 'Variant Prevalence']:
        continue
    # Fill NaN or zero with plausible random values
    mask = (user_df_filled[col].isna()) | (user_df_filled[col] == 0)
    if mask.any():
        if 'Cases' in col:
            user_df_filled.loc[mask, col] = np.random.randint(1, 1000, size=mask.sum())
        elif 'Deaths' in col:
            user_df_filled.loc[mask, col] = np.random.randint(0, 50, size=mask.sum())
        elif 'Recoveries' in col:
            user_df_filled.loc[mask, col] = np.random.randint(0, 1000, size=mask.sum())
        elif 'Tests' in col:
            user_df_filled.loc[mask, col] = np.random.randint(10, 10000, size=mask.sum())
        elif 'Vaccinations' in col:
            user_df_filled.loc[mask, col] = np.random.randint(10, 10000, size=mask.sum())
        elif 'Hospitalizations' in col:
            user_df_filled.loc[mask, col] = np.random.randint(0, 100, size=mask.sum())
        elif 'ICU' in col:
            user_df_filled.loc[mask, col] = np.random.randint(0, 20, size=mask.sum())
        elif 'Rate' in col:
            user_df_filled.loc[mask, col] = np.round(np.random.uniform(0, 100, size=mask.sum()), 2)
        elif col == 'Population':
            user_df_filled.loc[mask, col] = np.random.randint(10000, 100000000, size=mask.sum())
        else:
            user_df_filled.loc[mask, col] = 1

# Combine enriched user data and new rows
final_df = pd.concat([user_df_filled, pd.DataFrame(new_rows)], ignore_index=True)

# Save to output
final_df.to_csv(OUTPUT_CSV, index=False)

print(f"Enriched data written to {OUTPUT_CSV} with {len(final_df)} rows.") 