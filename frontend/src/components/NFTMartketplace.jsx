import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, User, DollarSign, Flag, X, ExternalLink, Zap, Award, TrendingUp, Clock, Star } from 'lucide-react';

const NFTMarketplaceGallery = () => {
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [likedArtworks, setLikedArtworks] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Category definitions with icons
  const categories = [
    { id: 'all', name: 'All', icon: null },
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={16} className="mr-1 text-orange-500" /> },
    { id: 'fast-selling', name: 'Fast Selling', icon: <Zap size={16} className="mr-1 text-yellow-500" /> },
    { id: 'recommended', name: 'Staff Picks', icon: <Star size={16} className="mr-1 text-purple-500" /> },
    { id: 'new-arrivals', name: 'New Arrivals', icon: <Clock size={16} className="mr-1 text-blue-500" /> },
    { id: 'top-rated', name: 'Top Rated', icon: <Award size={16} className="mr-1 text-green-500" /> }
  ];
  
  // Sample NFT artwork data
  const artworks = [
    {
      id: 1,
      image: "/api/placeholder/400/400",
      name: "Celestial Harmony #42",
      artist: "cosmic_dreamer",
      artistAvatar: "/api/placeholder/50/50",
      description: "A mesmerizing blend of cosmic elements that symbolize the harmony between celestial bodies. This piece represents the delicate balance of the universe.",
      price: "2.4 ETH",
      royaltyPercentage: "10%",
      likes: 127,
      comments: 24,
      categories: ['trending', 'top-rated']
    },
    {
      id: 2,
      image: "/api/placeholder/400/400",
      name: "Digital Renaissance",
      artist: "pixel_master",
      artistAvatar: "/api/placeholder/50/50",
      description: "Inspired by classical Renaissance art, this digital masterpiece bridges the gap between traditional artistic expression and modern digital techniques.",
      price: "1.8 ETH",
      royaltyPercentage: "12%",
      likes: 95,
      comments: 16,
      categories: ['fast-selling', 'new-arrivals']
    },
    {
      id: 3,
      image: "/api/placeholder/400/400",
      name: "Neural Pathways",
      artist: "ai_visionary",
      artistAvatar: "/api/placeholder/50/50",
      description: "An exploration of consciousness through generative algorithms. Each line represents neural connections forming complex thought patterns.",
      price: "3.2 ETH",
      royaltyPercentage: "15%",
      likes: 213,
      comments: 37,
      categories: ['trending', 'recommended']
    },
    {
      id: 4,
      image: "/api/placeholder/400/400",
      name: "Quantum Landscape",
      artist: "future_nomad",
      artistAvatar: "/api/placeholder/50/50",
      description: "A visualization of quantum mechanics principles portrayed as an otherworldly landscape where reality and possibility merge into one.",
      price: "2.1 ETH",
      royaltyPercentage: "8%",
      likes: 156,
      comments: 29,
      categories: ['recommended', 'top-rated']
    },
    {
      id: 5,
      image: "/api/placeholder/400/400",
      name: "Blockchain Genesis",
      artist: "crypto_creator",
      artistAvatar: "/api/placeholder/50/50",
      description: "A symbolic representation of the first blockchain, showcasing the revolutionary concept of decentralized record-keeping that changed the digital world forever.",
      price: "4.5 ETH",
      royaltyPercentage: "20%",
      likes: 289,
      comments: 42,
      categories: ['trending', 'fast-selling']
    },
    {
      id: 6,
      image: "/api/placeholder/400/400",
      name: "Virtual Wilderness",
      artist: "meta_explorer",
      artistAvatar: "/api/placeholder/50/50",
      description: "A procedurally generated wilderness that exists only in digital form, raising questions about the nature of reality in our increasingly virtual world.",
      price: "1.6 ETH",
      royaltyPercentage: "10%",
      likes: 178,
      comments: 31,
      categories: ['new-arrivals', 'recommended']
    }
  ];

  const toggleLike = (id) => {
    setLikedArtworks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const toggleDescription = (id) => {
    setExpandedDescription(expandedDescription === id ? null : id);
  };
  
  // Filter artworks based on selected category
  const filteredArtworks = artworks.filter(artwork => 
    activeCategory === 'all' || artwork.categories.includes(activeCategory)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">NFT Royalty Marketplace</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Discover unique digital art and invest in royalty rights. Own a piece of digital history and earn from future transfers.
        </p>
      </div>
      
      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-all ${
                activeCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 border hover:shadow-sm'
              }`}
            >
              {category.icon}
              {category.name}
              {category.id === 'trending' && activeCategory !== 'trending' && (
                <span className="ml-1">🔥</span>
              )}
              {category.id === 'fast-selling' && activeCategory !== 'fast-selling' && (
                <span className="ml-1">⚡</span>
              )}
              {category.id === 'recommended' && activeCategory !== 'recommended' && (
                <span className="ml-1">✨</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* NFT Image */}
            <div className="aspect-square relative">
              <img 
                src={artwork.image} 
                alt={artwork.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Category badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {artwork.categories.includes('trending') && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <TrendingUp size={12} className="mr-1" /> Trending 🔥
                  </span>
                )}
                {artwork.categories.includes('fast-selling') && (
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Zap size={12} className="mr-1" /> Fast Selling ⚡
                  </span>
                )}
                {artwork.categories.includes('recommended') && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Star size={12} className="mr-1" /> Staff Pick ✨
                  </span>
                )}
              </div>
            </div>
            
            {/* Art Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{artwork.name}</h3>
                  <div className="flex items-center mt-1">
                    <img 
                      src={artwork.artistAvatar} 
                      alt={artwork.artist} 
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">by <span className="text-blue-500">@{artwork.artist}</span></span>
                  </div>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => toggleMenu(artwork.id)} 
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreHorizontal size={20} className="text-gray-500" />
                  </button>
                  
                  {/* Three dots menu */}
                  {openMenu === artwork.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                          <ExternalLink size={15} className="mr-2" /> View Royalty History
                        </button>
                        <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                          <Flag size={15} className="mr-2" /> Report
                        </button>
                        <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center">
                          <X size={15} className="mr-2" /> Not Interested
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-3">
                <p className={`text-sm text-gray-600 ${expandedDescription === artwork.id ? '' : 'line-clamp-2'}`}>
                  {artwork.description}
                </p>
                {artwork.description.length > 100 && (
                  <button 
                    className="text-xs text-blue-500 mt-1"
                    onClick={() => toggleDescription(artwork.id)}
                  >
                    {expandedDescription === artwork.id ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
              
              {/* Price and Royalty */}
              <div className="flex justify-between items-center mt-4">
                <div className="font-medium text-green-600">{artwork.price}</div>
                <div className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Royalty: {artwork.royaltyPercentage}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between mt-4 pt-3 border-t">
                <button 
                  className={`flex items-center ${likedArtworks[artwork.id] ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={() => toggleLike(artwork.id)}
                >
                  <Heart 
                    size={18} 
                    className={`mr-1 ${likedArtworks[artwork.id] ? 'fill-current' : ''}`} 
                  />
                  <span className="text-sm">{artwork.likes + (likedArtworks[artwork.id] ? 1 : 0)}</span>
                </button>
                <button className="flex items-center text-gray-500">
                  <MessageCircle size={18} className="mr-1" />
                  <span className="text-sm">{artwork.comments}</span>
                </button>
                <button className="flex items-center text-gray-500">
                  <Share2 size={18} className="mr-1" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  <DollarSign size={14} className="mr-1" />
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplaceGallery;