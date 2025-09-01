import React from 'react';
import { X, Users, Flame, Zap, Phone } from 'lucide-react';
import { Service, SpitbraaiType } from '../types';

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  spitbraaiType?: SpitbraaiType;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose, spitbraaiType }) => {
  if (!isOpen || !service) return null;

  const getDisplayPrice = () => {
    if (service.basePrice === 0) {
      return 'Quote on Request';
    }
    
    if (service.category === 'equipment') {
      if (spitbraaiType === 'gas') {
        return `From R${service.basePrice + 400}`;
      }
      return `From R${service.basePrice}`;
    }
    
    return `From R${service.basePrice}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full text-lg font-bold">
            {getDisplayPrice()}
          </div>
          {spitbraaiType && (service.category === 'spitbraai' || service.category === 'equipment') && (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h2>
          
          {service.servings && (
            <div className="flex items-center text-gray-600 mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span>Serves {service.servings}</span>
            </div>
          )}
          
          <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
            <ul className="text-gray-600 space-y-2">
              {service.includes.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {spitbraaiType && (service.category === 'spitbraai' || service.category === 'equipment') && (
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>{spitbraaiType === 'charcoal' ? 'Charcoal/firewood cooking for authentic smoky flavor' : 'Gas cooking for consistent heat control and convenience'}</span>
                </li>
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
            <a
              href="tel:+27627270654"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>Get Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};