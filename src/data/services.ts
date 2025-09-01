import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Whole Lamb Spitbraai',
    description: 'Professional whole lamb spitbraai service with traditional South African spices. Perfect for large gatherings and special occasions.',
    basePrice: 2500,
    image: 'https://images.pexels.com/photos/1539684/pexels-photo-1539684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'spitbraai',
    servings: '20-25 people',
    includes: [
      'Premium quality whole lamb',
      'Traditional South African spice blend',
      'Professional cooking service',
      'Basic serving utensils',
      'Setup and cleanup'
    ]
  },
  {
    id: '2',
    name: 'Whole Pork Spitbraai',
    description: 'Succulent whole pork carcass seasoned with herbs and spices, slow-roasted to perfection on the spit.',
    basePrice: 1800,
    image: 'https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'spitbraai',
    servings: '15-20 people',
    includes: [
      'Premium quality whole pork',
      'Traditional herb and spice marinade',
      'Professional cooking service',
      'Basic serving utensils',
      'Setup and cleanup'
    ]
  },
  {
    id: '3',
    name: 'Equipment Hire Only',
    description: 'Rent our professional spitbraai equipment for your DIY event. Includes all necessary equipment and basic instructions.',
    basePrice: 800,
    image: 'https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'equipment',
    servings: 'Various sizes available',
    includes: [
      'Professional spitbraai equipment',
      'Basic cooking instructions',
      'Delivery and pickup service',
      'Equipment cleaning included'
    ]
  },
  {
    id: '4',
    name: 'Full Catering Package',
    description: 'Complete spitbraai catering service including meat, sides, professional service, and full event setup.',
    basePrice: 0,
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'catering',
    servings: 'Customizable',
    includes: [
      'Choice of spitbraai meat',
      'Traditional side dishes',
      'Professional chef and staff',
      'Complete setup and cleanup',
      'Serving equipment and utensils',
      'Event coordination'
    ]
  },
  {
    id: '5',
    name: 'Corporate Events',
    description: 'Professional spitbraai services tailored for corporate functions, team building events, and business gatherings.',
    basePrice: 0,
    image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'corporate',
    servings: 'Any group size',
    includes: [
      'Professional presentation',
      'Flexible menu options',
      'Corporate invoicing',
      'Event planning assistance',
      'Professional staff uniforms'
    ]
  },
  {
    id: '6',
    name: 'Wedding Catering',
    description: 'Make your special day unforgettable with our premium wedding spitbraai catering services.',
    basePrice: 0,
    image: 'https://images.pexels.com/photos/1539662/pexels-photo-1539662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'wedding',
    servings: 'Any guest count',
    includes: [
      'Premium meat selection',
      'Elegant presentation',
      'Professional wedding service',
      'Coordination with venue',
      'Special dietary accommodations'
    ]
  }
];