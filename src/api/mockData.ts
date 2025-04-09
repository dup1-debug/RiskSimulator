
export interface RiskData {
  id: string;
  name: string;
  current_ebitda: number;
  target_ebitda: number;
  risk_level: 'Low' | 'Medium' | 'High';
  monte_carlo_simulation: MonteCarloData;
  key_drivers: KeyDriverData[];
  kpis: KpiData[];
}

export interface MonteCarloData {
  bins: number[];
  frequencies: number[];
  target_value: number;
}

export interface KeyDriverData {
  name: string;
  deviation_from_plan: number;
  deviation_from_target: number;
}

export interface KpiData {
  name: string;
  dubai_holdings: number;
  industry_average: number;
  minimum_value: number;
  maximum_value: number;
}

// Mock data for each business segment
const mockData: Record<string, RiskData> = {
  "real_estate": {
    id: "real_estate",
    name: "Real Estate",
    current_ebitda: 250000,
    target_ebitda: 245000,
    risk_level: "High",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [50, 100, 200, 300, 350, 250, 150, 50],
      target_value: 85
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 3, deviation_from_target: 5 },
      { name: "Revenue Growth", deviation_from_plan: 12, deviation_from_target: 17 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 8, deviation_from_target: 9 },
      { name: "EBITDA Margin", deviation_from_plan: 5, deviation_from_target: 21 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 824, industry_average: 934, minimum_value: 613, maximum_value: 1167.5 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.2, industry_average: 0.42, minimum_value: 0.15, maximum_value: 0.525 },
      { name: "Revenue", dubai_holdings: 987, industry_average: 1042, minimum_value: 740.25, maximum_value: 1302.5 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.27, industry_average: 0.39, minimum_value: 0.2025, maximum_value: 0.4875 },
      { name: "EBITDA Margin", dubai_holdings: 0.83, industry_average: 0.792, minimum_value: 0.549, maximum_value: 1.075 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.112, industry_average: 0.023, minimum_value: 0.01725, maximum_value: 0.14 }
    ]
  },
  "investment": {
    id: "investment",
    name: "Investment",
    current_ebitda: 230000,
    target_ebitda: 230000,
    risk_level: "Low",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [30, 80, 180, 320, 380, 280, 120, 40],
      target_value: 82
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 2, deviation_from_target: 3 },
      { name: "Revenue Growth", deviation_from_plan: 8, deviation_from_target: 10 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 5, deviation_from_target: 7 },
      { name: "EBITDA Margin", deviation_from_plan: 3, deviation_from_target: 12 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 850, industry_average: 920, minimum_value: 650, maximum_value: 1150 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.18, industry_average: 0.38, minimum_value: 0.14, maximum_value: 0.48 },
      { name: "Revenue", dubai_holdings: 965, industry_average: 1020, minimum_value: 765, maximum_value: 1275 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.25, industry_average: 0.36, minimum_value: 0.19, maximum_value: 0.45 },
      { name: "EBITDA Margin", dubai_holdings: 0.88, industry_average: 0.81, minimum_value: 0.57, maximum_value: 1.1 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.105, industry_average: 0.021, minimum_value: 0.016, maximum_value: 0.13 }
    ]
  },
  "entertainment": {
    id: "entertainment",
    name: "Entertainment",
    current_ebitda: 230000,
    target_ebitda: 235000,
    risk_level: "Medium",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [40, 90, 190, 310, 370, 270, 130, 50],
      target_value: 83
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 4, deviation_from_target: 6 },
      { name: "Revenue Growth", deviation_from_plan: 10, deviation_from_target: 14 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 7, deviation_from_target: 9 },
      { name: "EBITDA Margin", deviation_from_plan: 6, deviation_from_target: 18 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 835, industry_average: 927, minimum_value: 630, maximum_value: 1160 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.21, industry_average: 0.40, minimum_value: 0.16, maximum_value: 0.51 },
      { name: "Revenue", dubai_holdings: 975, industry_average: 1030, minimum_value: 755, maximum_value: 1290 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.28, industry_average: 0.38, minimum_value: 0.21, maximum_value: 0.47 },
      { name: "EBITDA Margin", dubai_holdings: 0.85, industry_average: 0.80, minimum_value: 0.56, maximum_value: 1.09 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.110, industry_average: 0.022, minimum_value: 0.017, maximum_value: 0.137 }
    ]
  },
  "land_estate": {
    id: "land_estate",
    name: "Land Estate",
    current_ebitda: 240000,
    target_ebitda: 240000,
    risk_level: "High",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [55, 105, 205, 305, 355, 255, 155, 55],
      target_value: 86
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 5, deviation_from_target: 7 },
      { name: "Revenue Growth", deviation_from_plan: 13, deviation_from_target: 18 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 9, deviation_from_target: 10 },
      { name: "EBITDA Margin", deviation_from_plan: 7, deviation_from_target: 22 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 820, industry_average: 930, minimum_value: 610, maximum_value: 1165 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.22, industry_average: 0.43, minimum_value: 0.16, maximum_value: 0.53 },
      { name: "Revenue", dubai_holdings: 990, industry_average: 1045, minimum_value: 745, maximum_value: 1305 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.29, industry_average: 0.40, minimum_value: 0.21, maximum_value: 0.49 },
      { name: "EBITDA Margin", dubai_holdings: 0.82, industry_average: 0.79, minimum_value: 0.55, maximum_value: 1.07 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.115, industry_average: 0.024, minimum_value: 0.018, maximum_value: 0.142 }
    ]
  },
  "asset_management": {
    id: "asset_management",
    name: "Asset Management",
    current_ebitda: 240000,
    target_ebitda: 240000,
    risk_level: "High",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [60, 110, 210, 310, 360, 260, 160, 60],
      target_value: 87
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 6, deviation_from_target: 8 },
      { name: "Revenue Growth", deviation_from_plan: 14, deviation_from_target: 19 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 9, deviation_from_target: 11 },
      { name: "EBITDA Margin", deviation_from_plan: 8, deviation_from_target: 23 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 815, industry_average: 925, minimum_value: 605, maximum_value: 1160 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.23, industry_average: 0.44, minimum_value: 0.17, maximum_value: 0.54 },
      { name: "Revenue", dubai_holdings: 985, industry_average: 1040, minimum_value: 740, maximum_value: 1300 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.30, industry_average: 0.41, minimum_value: 0.22, maximum_value: 0.50 },
      { name: "EBITDA Margin", dubai_holdings: 0.81, industry_average: 0.78, minimum_value: 0.54, maximum_value: 1.06 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.118, industry_average: 0.025, minimum_value: 0.019, maximum_value: 0.145 }
    ]
  },
  "community_management": {
    id: "community_management",
    name: "Community Management",
    current_ebitda: 240000,
    target_ebitda: 240000,
    risk_level: "High",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [65, 115, 215, 315, 365, 265, 165, 65],
      target_value: 88
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 7, deviation_from_target: 9 },
      { name: "Revenue Growth", deviation_from_plan: 15, deviation_from_target: 20 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 10, deviation_from_target: 12 },
      { name: "EBITDA Margin", deviation_from_plan: 9, deviation_from_target: 24 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 810, industry_average: 920, minimum_value: 600, maximum_value: 1155 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.24, industry_average: 0.45, minimum_value: 0.18, maximum_value: 0.55 },
      { name: "Revenue", dubai_holdings: 980, industry_average: 1035, minimum_value: 735, maximum_value: 1295 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.31, industry_average: 0.42, minimum_value: 0.23, maximum_value: 0.51 },
      { name: "EBITDA Margin", dubai_holdings: 0.80, industry_average: 0.77, minimum_value: 0.53, maximum_value: 1.05 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.12, industry_average: 0.026, minimum_value: 0.02, maximum_value: 0.15 }
    ]
  },
  "hospitality": {
    id: "hospitality",
    name: "Hospitality",
    current_ebitda: 235000,
    target_ebitda: 238000,
    risk_level: "Medium",
    monte_carlo_simulation: {
      bins: [55, 60, 65, 70, 75, 80, 85, 90],
      frequencies: [45, 95, 195, 305, 365, 265, 135, 55],
      target_value: 84
    },
    key_drivers: [
      { name: "Revenue", deviation_from_plan: 4.5, deviation_from_target: 6.5 },
      { name: "Revenue Growth", deviation_from_plan: 11, deviation_from_target: 15 },
      { name: "EBITDA Margin Growth", deviation_from_plan: 7.5, deviation_from_target: 9.5 },
      { name: "EBITDA Margin", deviation_from_plan: 6.5, deviation_from_target: 19 }
    ],
    kpis: [
      { name: "EBITDA", dubai_holdings: 830, industry_average: 925, minimum_value: 625, maximum_value: 1156 },
      { name: "EBITDA Growth (vs. last qtr)", dubai_holdings: 0.215, industry_average: 0.41, minimum_value: 0.165, maximum_value: 0.52 },
      { name: "Revenue", dubai_holdings: 978, industry_average: 1032, minimum_value: 750, maximum_value: 1292 },
      { name: "Revenue Growth (vs. last qtr)", dubai_holdings: 0.285, industry_average: 0.39, minimum_value: 0.215, maximum_value: 0.485 },
      { name: "EBITDA Margin", dubai_holdings: 0.84, industry_average: 0.795, minimum_value: 0.555, maximum_value: 1.08 },
      { name: "EBITDA Margin Growth (vs. last qtr)", dubai_holdings: 0.114, industry_average: 0.0225, minimum_value: 0.0175, maximum_value: 0.14 }
    ]
  }
};

export default mockData;

export const getRiskDataById = (id: string): RiskData | undefined => {
  return mockData[id];
};

export const getAllRiskData = (): RiskData[] => {
  return Object.values(mockData);
};
