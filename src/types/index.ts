export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'spitbraai' | 'sides' | 'desserts';
  servings?: string;
  spitbraaiType?: SpitbraaiType;
}

export interface CartItem extends Meal {
  quantity: number;
}

export type SpitbraaiType = 'charcoal' | 'gas';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}