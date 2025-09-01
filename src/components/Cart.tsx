import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, MessageCircle, Flame, Zap } from 'lucide-react';
import { CartItem, CustomerDetails, SpitbraaiType } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  selectedSpitbraaiType: SpitbraaiType;
}

export const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  selectedSpitbraaiType
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const generateWhatsAppMessage = () => {
    let message = `🍖 *Maftown Spitbraai Order*\n\n`;
    message += `*Spitbraai Type:* ${selectedSpitbraaiType === 'charcoal' ? 'Charcoal/Firewood 🔥' : 'Gas ⚡'}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${customerDetails.name}\n`;
    message += `Phone: ${customerDetails.phone}\n`;
    message += `Email: ${customerDetails.email}\n`;
    message += `Address: ${customerDetails.address}\n\n`;
    
    message += `*Order Details:*\n`;
    cartItems.forEach(item => {
      message += `• ${item.name} x${item.quantity} - R${item.price * item.quantity}\n`;
    });
    
    message += `\n*Total: R${total}*\n\n`;
    message += `Please confirm this order and provide delivery/pickup details.\n\n`;
    message += `*Special Note:* We specialize in whole lamb and pork carcass spitbraai. For braai meat cuts or other special arrangements, please let us know your requirements.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/27627270654?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after order
    onClearCart();
    setShowCheckout(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span>Your Cart</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!showCheckout ? (
          <>
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        {item.category === 'spitbraai' && (
                          <div className="flex items-center space-x-1 text-xs text-gray-600 mt-1">
                            {selectedSpitbraaiType === 'charcoal' ? (
                              <Flame className="h-3 w-3" />
                            ) : (
                              <Zap className="h-3 w-3" />
                            )}
                            <span>{selectedSpitbraaiType === 'charcoal' ? 'Charcoal/Firewood' : 'Gas'}</span>
                          </div>
                        )}
                        <p className="text-orange-600 font-bold">R{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: R{total}</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={onClearCart}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="+27 XX XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  name="address"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
                  placeholder="Your delivery address or pickup preference"
                ></textarea>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                {selectedSpitbraaiType === 'charcoal' ? (
                  <Flame className="h-4 w-4" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                <span>Spitbraai Type: {selectedSpitbraaiType === 'charcoal' ? 'Charcoal/Firewood' : 'Gas'}</span>
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.name} x{item.quantity}</span>
                  <span>R{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>R{total}</span>
              </div>
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                <strong>Note:</strong> We specialize in whole carcass spitbraai. For braai meat cuts or special arrangements, please mention in your WhatsApp message.
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};