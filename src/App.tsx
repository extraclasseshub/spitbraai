import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Menu, X, ChefHat, Users, Calendar, Star, ShoppingCart, ArrowUp, Flame, Zap } from 'lucide-react';
import { meals } from './data/meals';
import { MealCard } from './components/MealCard';
import { MealModal } from './components/MealModal';
import { Cart } from './components/Cart';
import { Meal, CartItem, SpitbraaiType } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedSpitbraaiType, setSelectedSpitbraaiType] = useState<SpitbraaiType>('charcoal');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll to show/hide scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (meal: Meal) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === meal.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...meal, quantity: 1 }];
      }
    });
  };

  const handleViewMealDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsMealModalOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-800/95 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Maftown Spitbraai Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  // Fallback to icon if logo doesn't exist
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <ChefHat className="h-12 w-12 text-orange-600 hidden" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-orange-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-orange-400 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <a 
                href="tel:+27627270654"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors shadow-lg"
              >
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-white hover:text-orange-400 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-orange-400"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-gray-700">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400"
                >
                  Menu
                </button>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-white hover:text-orange-400"
                >
                  Contact
                </button>
                <a 
                  href="tel:+27627270654"
                  className="block bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/spitbraai.jpg")'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Authentic Spitbraai in Mafikeng
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium">
            Delicious flame-grilled meals, catering for all occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+27627270654"
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </a>
            <button 
              onClick={() => scrollToSection('about')}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              About Maftown Spitbraai
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Bringing Traditional South African Flavors to Your Events
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                At Maftown Spitbraai, we specialize in authentic South African spitbraai services that bring people together. Based in the heart of Mafikeng, North West, we've been serving our community with delicious flame-grilled meals that capture the true essence of traditional braai culture.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Whether you're planning a wedding, corporate event, birthday party, or family gathering, our experienced team delivers exceptional spitbraai experiences that will leave your guests talking long after the last bite.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Team</h4>
                    <p className="text-gray-600 text-sm">Professional chefs & staff</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Guaranteed</h4>
                    <p className="text-gray-600 text-sm">Fresh, premium ingredients</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Traditional spitbraai cooking"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Menu
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Authentic South African spitbraai meals and traditional sides, perfect for any occasion.
            </p>
          </div>

          {/* Spitbraai Type Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Spitbraai Type</h3>
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-2 rounded-lg flex space-x-2">
                <button
                  onClick={() => setSelectedSpitbraaiType('charcoal')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedSpitbraaiType === 'charcoal'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flame className="h-5 w-5" />
                  <span>Charcoal/Firewood</span>
                </button>
                <button
                  onClick={() => setSelectedSpitbraaiType('gas')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedSpitbraaiType === 'gas'
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Zap className="h-5 w-5" />
                  <span>Gas Spitbraai</span>
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Charcoal/Firewood Pricing */}
              <div className={`border-2 rounded-lg p-6 transition-all ${
                selectedSpitbraaiType === 'charcoal' 
                  ? 'border-orange-600 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Charcoal/Firewood Spitbraai</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Traditional authentic flavor with charcoal or firewood. Perfect for that authentic South African braai experience with smoky, rich flavors.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Spitbraai for Hire</span>
                    <span className="font-bold text-orange-600">R800</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">With Chef Service</span>
                    <span className="font-bold text-orange-600">R1,300</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Complete Package</span>
                    <span className="font-semibold text-gray-500 text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Gas Spitbraai Pricing */}
              <div className={`border-2 rounded-lg p-6 transition-all ${
                selectedSpitbraaiType === 'gas' 
                  ? 'border-orange-600 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Gas Spitbraai</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Clean, convenient cooking with consistent heat control. Ideal for venues with restrictions or when you need precise temperature management.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">Spitbraai for Hire</span>
                    <span className="font-bold text-orange-600">R1,200</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">With Chef Service</span>
                    <span className="font-bold text-orange-600">R1,600</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Complete Package</span>
                    <span className="font-semibold text-gray-500 text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Service Options</h4>
                  <p className="text-blue-800 text-sm">
                    <strong>Hire Only:</strong> Equipment rental for self-service cooking.<br/>
                    <strong>With Chef:</strong> Professional chef handles all cooking and service.<br/>
                    <strong>Complete Package:</strong> Full-service catering with sides and setup (pricing to be finalized).
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Spitbraai Meals */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Whole Carcass Spitbraai</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> We specialize in whole lamb and pork carcass spitbraai. For braai meat cuts or other arrangements, please call us to discuss your specific needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meals.filter(meal => meal.category === 'spitbraai' && (meal.name.toLowerCase().includes('lamb') || meal.name.toLowerCase().includes('pork'))).map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAddToCart={(meal) => handleAddToCart({...meal, spitbraaiType: selectedSpitbraaiType})}
                  onViewDetails={handleViewMealDetails}
                  spitbraaiType={selectedSpitbraaiType}
                />
              ))}
            </div>
          </div>

          {/* Side Dishes */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Sides</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.filter(meal => meal.category === 'sides').map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewMealDetails}
                />
              ))}
            </div>
          </div>

          {/* Desserts */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Desserts</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.filter(meal => meal.category === 'desserts').map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewMealDetails}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg inline-flex items-center space-x-2 mr-4"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View Cart ({cartItemsCount})</span>
            </button>
            <a 
              href="tel:+27627270654"
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg inline-flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call for Custom Orders</span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Gallery
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See our delicious spitbraai creations and successful events we've catered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Grilled meat on spitbraai"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Fresh Grilled Meats</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Event setup and catering"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Event Catering</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Traditional braai setup"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Traditional Setup</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/2313682/pexels-photo-2313682.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Delicious side dishes"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Side Dishes</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/1539662/pexels-photo-1539662.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Wedding catering service"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Wedding Catering</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Happy customers enjoying meal"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to make your event unforgettable? Get in touch with us today for a personalized quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a 
                      href="tel:+27627270654"
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      +27 62 727 0654
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Facebook</h4>
                    <a 
                      href="https://facebook.com/MaftownSpitbraai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Maftown Spitbraai on Facebook
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">Mafikeng, North West, South Africa</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your event, number of guests, preferred date, and any special requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="Maftown Spitbraai Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    // Fallback to text if logo doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="flex items-center space-x-2 hidden">
                  <ChefHat className="h-8 w-8 text-orange-600" />
                  <span className="font-bold text-xl">Maftown Spitbraai</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Bringing authentic South African spitbraai flavors to your special events in Mafikeng and surrounding areas.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/MaftownSpitbraai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-600" />
                  <a 
                    href="tel:+27627270654"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +27 62 727 0654
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <span className="text-gray-400">Mafikeng, North West, South Africa</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Spitbraai Catering</li>
                <li>• Event Planning</li>
                <li>• Wedding Catering</li>
                <li>• Corporate Events</li>
                <li>• Private Parties</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Maftown Spitbraai. All rights reserved. | Mafikeng, North West, South Africa
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Modals */}
      <MealModal
        meal={selectedMeal}
        isOpen={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
        onAddToCart={(meal) => handleAddToCart({...meal, spitbraaiType: selectedSpitbraaiType})}
        spitbraaiType={selectedSpitbraaiType}
      />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedSpitbraaiType={selectedSpitbraaiType}
      />
    </div>
  );
}

export default App;