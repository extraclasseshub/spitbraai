import React from 'react';
import { X, Plus, Users, Flame, Zap } from 'lucide-react';
import { Meal, SpitbraaiType } from '../types';

interface MealModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (meal: Meal) => void;
  spitbraaiType?: SpitbraaiType;
}

export const MealModal: React.FC<MealModalProps> = ({ meal, isOpen, onClose, onAddToCart, spitbraaiType }) => {
  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full text-lg font-bold">
            R{meal.price}
          </div>
          {spitbraaiType && meal.category === 'spitbraai' && (
            <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
              {spitbraaiType === 'charcoal' ? (
                <Flame className="h-4 w-4" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              <span>{spitbraaiType === 'charcoal' ? 'Charcoal/Firewood' : 'Gas Spitbraai'}</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{meal.name}</h2>
          
          {meal.servings && (
            <div className="flex items-center text-gray-600 mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span>Serves {meal.servings}</span>
            </div>
          )}
          
          <p className="text-gray-700 mb-6 leading-relaxed">{meal.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What's Included:</h3>
            <ul className="text-gray-600 space-y-1">
              {meal.category === 'spitbraai' && (
                <>
                  <li>• Premium quality meat</li>
                  <li>• Traditional South African spices</li>
                  <li>• Professional cooking service</li>
                  <li>• Basic serving utensils</li>
                  {spitbraaiType && (
                    <li>• {spitbraaiType === 'charcoal' ? 'Charcoal/firewood cooking for authentic flavor' : 'Gas cooking for consistent heat control'}</li>
                  )}
                </>
              )}
              {meal.category === 'sides' && (
                <>
                  <li>• Fresh ingredients</li>
                  <li>• Traditional preparation</li>
                  <li>• Serving bowls included</li>
                </>
              )}
              {meal.category === 'desserts' && (
                <>
                  <li>• Homemade traditional recipe</li>
                  <li>• Served warm</li>
                  <li>• Choice of custard or ice cream</li>
                </>
              )}
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToCart(meal);
                onClose();
              }}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};