import React from 'react';
import { Plus, Users, Flame, Zap } from 'lucide-react';
import { Meal, SpitbraaiType } from '../types';

interface MealCardProps {
  meal: Meal;
  onAddToCart: (meal: Meal) => void;
  onViewDetails: (meal: Meal) => void;
  spitbraaiType?: SpitbraaiType;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onAddToCart, onViewDetails, spitbraaiType }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={meal.image} 
          alt={meal.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewDetails(meal)}
        />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          R{meal.price}
        </div>
        {spitbraaiType && meal.category === 'spitbraai' && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            {spitbraaiType === 'charcoal' ? (
              <Flame className="h-3 w-3" />
            ) : (
              <Zap className="h-3 w-3" />
            )}
            <span>{spitbraaiType === 'charcoal' ? 'Charcoal' : 'Gas'}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{meal.description}</p>
        {meal.servings && (
          <div className="flex items-center text-gray-500 mb-4">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{meal.servings}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onViewDetails(meal)}
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(meal)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};