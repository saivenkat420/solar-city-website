export interface Inverter {
  brand: string;
  modelName: string;
  capacity: string;
  technology: string;
  warranty: string;
  application: string;
  features?: string[];
}

export const microtek_inverters: Inverter[] = [
  {
    brand: "Microtek",
    modelName: "Solar PCU 1235/12V",
    capacity: "935VA",
    technology: "PWM, Pure Sine Wave",
    warranty: "2 Years",
    application: "Small Homes, Shops",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Microtek",
    modelName: "Hi-End PWM PCU 4050/48V",
    capacity: "3.5kVA",
    technology: "PWM, Pure Sine Wave",
    warranty: "2 Years",
    application: "Medium Homes, Offices",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Microtek",
    modelName: "Hi-End PWM PCU 2550/24V",
    capacity: "2.25kVA",
    technology: "PWM, Pure Sine Wave",
    warranty: "2 Years",
    application: "Residential, Small Offices",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Microtek",
    modelName: "GTI 5KW-M12 On-Grid",
    capacity: "5kW",
    technology: "On-Grid, MPPT",
    warranty: "5 Years",
    application: "Commercial",
    features: ["MPPT technology", "Grid synchronization", "Smart monitoring"]
  },
  {
    brand: "Microtek",
    modelName: "Grid Tie 33KW M11",
    capacity: "33kW",
    technology: "On-Grid, Transformer-less",
    warranty: "5 Years",
    application: "Large Commercial",
    features: ["Transformer-less design", "High efficiency", "Advanced monitoring"]
  }
];

export const luminous_inverters: Inverter[] = [
  {
    brand: "Luminous",
    modelName: "NXG 850/850e",
    capacity: "500VA",
    technology: "Pure Sine Wave",
    warranty: "2 Years",
    application: "Small Homes, Shops",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Luminous",
    modelName: "NXG 1150",
    capacity: "850VA",
    technology: "Pure Sine Wave",
    warranty: "2 Years",
    application: "Homes, Offices",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Luminous",
    modelName: "NXG 1400",
    capacity: "900VA",
    technology: "Pure Sine Wave",
    warranty: "2 Years",
    application: "Homes, Small Offices",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Luminous",
    modelName: "NXG 1850",
    capacity: "1500VA",
    technology: "Pure Sine Wave",
    warranty: "2 Years",
    application: "Medium Homes, Offices",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Luminous",
    modelName: "NXG 2350",
    capacity: "2000VA",
    technology: "Pure Sine Wave",
    warranty: "2 Years",
    application: "Large Homes, Small Businesses",
    features: ["Pure sine wave output", "Battery protection", "Overload protection"]
  },
  {
    brand: "Luminous",
    modelName: "Solar On-Grid GTI 5kW",
    capacity: "5kW",
    technology: "On-Grid, MPPT",
    warranty: "5 Years",
    application: "Commercial",
    features: ["MPPT technology", "Grid synchronization", "Smart monitoring"]
  },
  {
    brand: "Luminous",
    modelName: "Solar On-Grid NXI 3600",
    capacity: "60kW",
    technology: "On-Grid, MPPT",
    warranty: "5 Years",
    application: "Large Commercial",
    features: ["MPPT technology", "Grid synchronization", "Smart monitoring"]
  }
];

export const other_brands: Inverter[] = [
  {
    brand: "UTL Solar",
    modelName: "Off-Grid and Hybrid Series",
    capacity: "Various",
    technology: "Off-Grid, Hybrid",
    warranty: "2-5 Years",
    application: "Residential, Commercial",
    features: ["Hybrid technology", "Battery management", "Smart monitoring"]
  },
  {
    brand: "V-Guard",
    modelName: "Smart Series",
    capacity: "Various",
    technology: "Smart Inverters with IoT",
    warranty: "2 Years",
    application: "Homes, Small Offices",
    features: ["IoT integration", "Smart monitoring", "Mobile app control"]
  },
  {
    brand: "Livguard",
    modelName: "High-Efficiency Series",
    capacity: "Various",
    technology: "High-Efficiency",
    warranty: "2 Years",
    application: "Residential, Commercial",
    features: ["Fast charging", "High efficiency", "Battery protection"]
  },
  {
    brand: "Delta",
    modelName: "Commercial Series",
    capacity: "Various",
    technology: "Commercial-Grade",
    warranty: "5 Years",
    application: "Commercial, Utility-Scale",
    features: ["High efficiency", "Commercial-grade", "Advanced monitoring"]
  },
  {
    brand: "SMA Solar",
    modelName: "Advanced Series",
    capacity: "Various",
    technology: "Advanced with Global Monitoring",
    warranty: "5 Years",
    application: "Commercial, Utility-Scale",
    features: ["Global monitoring", "High efficiency", "Advanced features"]
  },
  {
    brand: "Growatt",
    modelName: "Smart Series",
    capacity: "Various",
    technology: "Smart Features",
    warranty: "2-5 Years",
    application: "Residential, Commercial",
    features: ["Smart features", "Affordable", "Easy monitoring"]
  },
  {
    brand: "GoodWe",
    modelName: "Hybrid Series",
    capacity: "Various",
    technology: "Hybrid with Battery Storage",
    warranty: "2-5 Years",
    application: "Homes, Businesses",
    features: ["Battery storage", "Hybrid technology", "Smart monitoring"]
  }
];

export const allInverters: Inverter[] = [
  ...microtek_inverters,
  ...luminous_inverters,
  ...other_brands
]; 