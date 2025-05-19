export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

export const STOCK_IMAGE = '/images/products/solar-panel-img.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Solar Panels',
    category: 'Panels',
    image: '/images/products/solar-panel-img.jpg',
    description: 'High-efficiency solar panels for residential and commercial installations.',
  },
  {
    id: '2',
    name: 'Inverters',
    category: 'Inverters',
    image: '/images/products/solar-inverter-img.jpg',
    description: 'Advanced solar inverters for optimal energy conversion.',
  },
  {
    id: '3',
    name: 'Battery Storage',
    category: 'Storage',
    image: '/images/products/solar-battery-img.jpg',
    description: 'Reliable battery storage solutions for energy independence.',
  },
  {
    id: '4',
    name: 'Mounting Systems',
    category: 'Accessories',
    image: '/images/products/solar-mounting-system-img.jpg',
    description: 'Durable mounting systems for secure panel installation.',
  }
]; 