import React from 'react';
import { Users, Flame, Zap, Eye, Phone } from 'lucide-react';
import { Service, SpitbraaiType } from '../types';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
  onGetQuote: () => void;
  spitbraaiType?: SpitbraaiType;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails, onGetQuote, spitbraaiType }) => {
  const getDisplayPrice = () => {
    if (service.basePrice === 0) return 'Quote on Request';

    if (service.category === 'equipment') {
      return spitbraaiType === 'gas'
        ? `From R${service.basePrice + 400}`
        : `From R${service.basePrice}`;
    }

    return `From R${service.basePrice}`;
  };

  // Fixed scroll function to consider navbar height
  const handleGetQuote = () => {
    const navbarHeight = 64; // Adjust if your navbar is taller
    const element = document.getElementById('contact');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
    onGetQuote?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewDetails(service)}
        />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-2 rounded-full text-sm font-semibold">
          {getDisplayPrice()}
        </div>
        {spitbraaiType && (service.category === 'spitbraai' || service.category === 'equipment') && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            {spitbraaiType === 'charcoal' ? <Flame className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
            <span>{spitbraaiType === 'charcoal' ? 'Charcoal' : 'Gas'}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{service.description}</p>
        {service.servings && (
          <div className="flex items-center text-gray-500 mb-4">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{service.servings}</span>
          </div>
        )}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onViewDetails(service)}
            className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full flex items-center space-x-2 transition-colors font-semibold"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
          <button
            onClick={handleGetQuote}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors font-semibold"
          >
            <Phone className="h-4 w-4" />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
