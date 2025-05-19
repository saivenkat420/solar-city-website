export interface BatteryProduct {
  modelName: string;
  capacity: string;
  technology: string;
  warranty: string;
  application: string;
  brand: string;
}

export const microtekBatteries: BatteryProduct[] = [
  {
    modelName: 'MS2006024TT NEW',
    capacity: '200Ah',
    technology: 'Tall Tubular',
    warranty: '3 Years',
    application: 'Residential, Commercial',
    brand: 'Microtek'
  },
  {
    modelName: 'MS2256024TT',
    capacity: '225Ah',
    technology: 'Tall Tubular',
    warranty: '3 Years',
    application: 'Residential, Commercial',
    brand: 'Microtek'
  },
  {
    modelName: 'MS1506024TT',
    capacity: '150Ah',
    technology: 'Tall Tubular',
    warranty: '3 Years',
    application: 'Residential, Commercial',
    brand: 'Microtek'
  }
];

export const luminousBatteries: BatteryProduct[] = [
  {
    modelName: 'LPT 1240H',
    capacity: '40Ah',
    technology: 'Short Tubular',
    warranty: '60 Months',
    application: 'Homes, Small Shops',
    brand: 'Luminous'
  },
  {
    modelName: 'LPT 1280H',
    capacity: '80Ah',
    technology: 'Tall Tubular',
    warranty: '60 Months',
    application: 'Homes, Small Shops',
    brand: 'Luminous'
  },
  {
    modelName: 'LPT 12150H',
    capacity: '150Ah',
    technology: 'Tall Tubular',
    warranty: '60 Months',
    application: 'Homes, Offices',
    brand: 'Luminous'
  },
  {
    modelName: 'LPT 12200H',
    capacity: '200Ah',
    technology: 'Tall Tubular',
    warranty: '60 Months',
    application: 'Homes, Offices',
    brand: 'Luminous'
  }
];

export interface OtherBrandInfo {
  brand: string;
  notableFeatures: string;
  applicationAreas: string;
}

export const otherBrands: OtherBrandInfo[] = [
  {
    brand: 'Exide',
    notableFeatures: 'Wide selection of tubular flooded and gel batteries',
    applicationAreas: 'Residential, Commercial'
  },
  {
    brand: 'Okaya',
    notableFeatures: 'High-quality solar batteries with long life',
    applicationAreas: 'Residential, Commercial'
  },
  {
    brand: 'Amaron',
    notableFeatures: 'Durable batteries with high backup',
    applicationAreas: 'Residential, Commercial'
  },
  {
    brand: 'V-Guard',
    notableFeatures: 'Smart batteries with advanced technology',
    applicationAreas: 'Homes, Small Offices'
  },
  {
    brand: 'Servotech',
    notableFeatures: 'Advanced solar batteries for home and office use',
    applicationAreas: 'Residential, Commercial'
  }
];

// Combine all batteries into one array
export const allBatteries: BatteryProduct[] = [
  ...microtekBatteries,
  ...luminousBatteries
]; 