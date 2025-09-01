import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Menu, X, ChefHat, Users, Calendar, Star, ArrowUp, Flame, Zap } from 'lucide-react';
import { services } from './data/services';
import { ServiceCard } from './components/ServiceCard';
import { ServiceModal } from './components/ServiceModal';
import { Chatbot } from './components/Chatbot';
import { Service, SpitbraaiType } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedSpitbraaiType, setSelectedSpitbraaiType] = useState<SpitbraaiType>('charcoal');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

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

  const handleViewServiceDetails = (service: Service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleGetQuote = () => {
    scrollToSection('contact');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('YOUR_FORMSPREE_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          spitbraaiType: selectedSpitbraaiType
        }),
      });

      if (response.ok) {
        alert('Thank you for your inquiry! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try calling us directly.');
    }
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
                Services
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
              <a 
                href="tel:+27627270654"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors shadow-lg"
              >
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
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
                  Services
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
            Professional Spitbraai Services in Mafikeng
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium">
            Expert spitbraai catering and equipment hire for all your special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
  onClick={handleGetQuote}
  className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
>
  <Phone className="h-5 w-5" />
  <span>Get Quote</span>
</button>

            <button 
              onClick={() => scrollToSection('about')}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
              Our Services
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
                Professional Spitbraai Services & Equipment Hire
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                At Maftown Spitbraai, we are your trusted spitbraai service provider in Mafikeng, North West. We offer professional spitbraai equipment hire and expert catering services that bring authentic South African flavors to your events.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Whether you need equipment rental for a DIY braai or full-service catering with our professional chefs, we provide everything you need to make your event memorable. We specialize in whole carcass spitbraai for weddings, corporate events, and private celebrations.
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
                    <h4 className="font-semibold text-gray-900">Quality Service</h4>
                    <p className="text-gray-600 text-sm">Equipment & catering</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Professional spitbraai service"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional spitbraai equipment hire and catering services for all occasions.
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
                    <span className="text-gray-700">Equipment Hire Only</span>
                    <span className="font-bold text-orange-600">R800</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">With Professional Chef</span>
                    <span className="font-bold text-orange-600">R1,300</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Full Catering Package</span>
                    <span className="font-semibold text-gray-500 text-sm">Quote on Request</span>
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
                    <span className="text-gray-700">Equipment Hire Only</span>
                    <span className="font-bold text-orange-600">R1,200</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">With Professional Chef</span>
                    <span className="font-bold text-orange-600">R1,600</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Full Catering Package</span>
                    <span className="font-semibold text-gray-500 text-sm">Quote on Request</span>
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
                    <strong>Equipment Hire:</strong> Spitbraai equipment rental for self-service cooking.<br/>
                    <strong>With Chef:</strong> Professional chef handles all cooking and service.<br/>
                    <strong>Full Catering:</strong> Complete catering service with sides, setup, and cleanup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={handleViewServiceDetails}
                  onGetQuote={handleGetQuote}
                  spitbraaiType={selectedSpitbraaiType}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="tel:+27627270654"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg inline-flex items-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Call for Custom Quote</span>
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
              See our professional spitbraai services in action at various events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="/1.jpg"
                alt="Professional spitbraai service"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg">Professional Service</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src="/2.jpg"
                alt="Event catering setup"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg">Event Catering</p>
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
              Get Your Quote
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to make your event unforgettable? Contact us today for a personalized quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
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
                    <h4 className="font-semibold text-gray-900">Service Area</h4>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Request a Quote</h3>
              
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your event: type of occasion, number of guests, preferred date, location, and any special requirements..."
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Selected Service Type:</h4>
                  <div className="flex items-center space-x-2 text-gray-700">
                    {selectedSpitbraaiType === 'charcoal' ? (
                      <Flame className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Zap className="h-5 w-5 text-orange-600" />
                    )}
                    <span>{selectedSpitbraaiType === 'charcoal' ? 'Charcoal/Firewood Spitbraai' : 'Gas Spitbraai'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send Quote Request</span>
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
                Professional spitbraai services and equipment hire for authentic South African braai experiences in Mafikeng and surrounding areas.
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
                <li>• Spitbraai Equipment Hire</li>
                <li>• Professional Chef Services</li>
                <li>• Event Catering</li>
                <li>• Wedding Services</li>
                <li>• Corporate Events</li>
                <li>• Private Functions</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Maftown Spitbraai. All rights reserved. | Professional Spitbraai Services in Mafikeng, North West
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

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        spitbraaiType={selectedSpitbraaiType}
      />

      {/* Chatbot */}
      <Chatbot onGetQuote={handleGetQuote} />
    </div>
  );
}

export default App;