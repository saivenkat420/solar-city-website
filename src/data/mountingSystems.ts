export interface MountingSystem {
  brand: string;
  productTypes: string[];
  material: string;
  applications: string[];
  features: string[];
  website?: string;
}

export const mountingSystems: MountingSystem[] = [
  {
    brand: 'Waaree Energies Ltd.',
    productTypes: ['Ground Mount', 'Rooftop', 'Carport', 'Tracker Systems'],
    material: 'Galvanized Steel, Aluminum',
    applications: ['Residential', 'Commercial', 'Utility-scale'],
    features: ['Customizable designs', 'Corrosion-resistant', 'Easy installation']
  },
  {
    brand: 'Tata International',
    productTypes: ['Ground Mount', 'Rooftop Structures'],
    material: 'Steel',
    applications: ['Commercial'],
    features: ['Durable structures', 'Engineered for high wind loads'],
    website: 'birkansolar.com'
  },
  {
    brand: 'Strolar Mounting Systems',
    productTypes: ['Tracker', 'Carport', 'Rooftop', 'Ground Mount', 'Accessories'],
    material: 'Aluminum, Steel',
    applications: ['Residential', 'Commercial'],
    features: ['Innovative designs', 'Easy to install', 'Cost-effective solutions'],
    website: 'strolar.com'
  },
  {
    brand: 'Pennar Industries',
    productTypes: ['Ground Mount', 'Rooftop', 'Canal Top', 'Carport'],
    material: 'Galvanized Steel',
    applications: ['Utility-scale', 'Commercial', 'Residential'],
    features: ['High production capacity', 'Customized solutions', 'Corrosion-resistant'],
    website: 'pennarindia.com'
  },
  {
    brand: 'Loom Solar',
    productTypes: ['Rooftop Mounting Structures'],
    material: 'Aluminum',
    applications: ['Residential'],
    features: ['Lightweight', 'Easy installation', 'Suitable for various roof types']
  },
  {
    brand: 'JSW Steel',
    productTypes: ['Galvalume Sheets for Mounting Structures'],
    material: 'Galvalume Steel',
    applications: ['Rooftop', 'Ground Mount'],
    features: ['Corrosion-resistant', 'High strength-to-weight ratio'],
    website: 'jswsteel.in'
  },
  {
    brand: 'Ganges Internationale',
    productTypes: ['Ground Mount', 'Rooftop Structures'],
    material: 'Steel',
    applications: ['Utility-scale', 'Commercial'],
    features: ['End-to-end engineering solutions', 'Durable designs']
  },
  {
    brand: 'Metalkraft',
    productTypes: ['Ground Mount', 'Rooftop Structures'],
    material: 'Steel',
    applications: ['Commercial', 'Industrial'],
    features: ['Customized solutions', 'Robust structures']
  },
  {
    brand: 'Nuevosol Energy',
    productTypes: ['Ground Mount', 'Rooftop', 'Carport'],
    material: 'Steel, Aluminum',
    applications: ['Utility-scale', 'Commercial', 'Residential'],
    features: ['Innovative designs', 'Turnkey solutions']
  },
  {
    brand: 'SNS Corporation',
    productTypes: ['Ground Mount', 'Rooftop Structures'],
    material: 'Steel',
    applications: ['Commercial', 'Industrial'],
    features: ['High-quality materials', 'Customized designs']
  }
]; 