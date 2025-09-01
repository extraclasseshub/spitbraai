export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: 'spitbraai' | 'equipment' | 'catering' | 'corporate' | 'wedding';
  servings?: string;
  includes: string[];
  spitbraaiType?: SpitbraaiType;
}

export type SpitbraaiType = 'charcoal' | 'gas';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  message: string;
}