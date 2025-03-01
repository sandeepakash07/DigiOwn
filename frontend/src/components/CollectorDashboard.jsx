import React, { useState } from 'react';
import { Camera, Heart, MessageCircle, Share2, User, Search, Filter, Clock, Users, Play } from 'lucide-react';

const NFTCollectorDashboard = () => {
  const [followed, setFollowed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample collector data
  const collector = {
    username: "nft_whale",
    displayName: "NFT Whale",
    avatar: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/1200/400",
    bio: "Building a curated collection of digital art from emerging creators. Supporting the future of digital ownership.",
    stats: {
      collected: 24,
      following: 153,
      value: "45.8 ETH"
    }
  };
  
  // Sample collected NFTs
  const collectedNFTs = [
    { 
      id: 1, 
      image: "/api/placeholder/400/400", 
      title: "Cosmic Dreams #1", 
      artist: "cosmic_creator", 
      artistAvatar: "/api/placeholder/50/50",
      price: "0.5 ETH", 
      purchaseDate: "2025-01-15",
      category: "abstract"
    },
    { 
      id: 2, 
      image: "/api/placeholder/400/400", 
      title: "Ethereal Space", 
      artist: "digital_nomad", 
      artistAvatar: "/api/placeholder/50/50",
      price: "1.2 ETH", 
      purchaseDate: "2025-01-28",
      category: "space"
    },
    { 
      id: 3, 
      image: "/api/placeholder/400/400", 
      title: "Quantum Resonance", 
      artist: "quantum_artist", 
      artistAvatar: "/api/placeholder/50/50",
      price: "2.5 ETH", 
      purchaseDate: "2025-02-03",
      category: "abstract"
    },
    { 
      id: 4, 
      image: "/api/placeholder/400/400", 
      title: "Crypto Horizon", 
      artist: "blockchain_visionary", 
      artistAvatar: "/api/placeholder/50/50",
      price: "1.5 ETH", 
      purchaseDate: "2025-02-10",
      category: "landscape"
    },
    { 
      id: 5, 
      image: "/api/placeholder/400/400", 
      title: "Digital Dreamscape", 
      artist: "cosmic_creator", 
      artistAvatar: "/api/placeholder/50/50",
      price: "0.8 ETH", 
      purchaseDate: "2025-02-14",
      category: "portrait"
    },
    { 
      id: 6, 
      image: "/api/placeholder/400/400", 
      title: "Neural Network #42", 
      artist: "ai_dreamer", 
      artistAvatar: "/api/placeholder/50/50",
      price: "1.1 ETH", 
      purchaseDate: "2025-02-22",
      category: "generative"
    }
  ];

  // Categories for filtering
  const categories = ['all', 'abstract', 'space', 'landscape', 'portrait', 'generative'];
  
  // Filter NFTs based on active filter and search
  const filteredNFTs = collectedNFTs.filter(nft => {
    const matchesCategory = activeFilter === 'all' || nft.category === activeFilter;
    const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nft.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-40">
        <img src={collector.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 p-4">
          <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden">
            <img src={collector.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{collector.displayName}</h1>
            <p className="text-gray-500">@{collector.username}</p>
          </div>
          <button 
            className={`px-4 py-2 rounded-md ${followed ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}
            onClick={() => setFollowed(!followed)}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
        <p className="mt-2 text-gray-700">{collector.bio}</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{collector.stats.collected} collected</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{collector.stats.following} artists followed</span>
          </div>
          <div className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            <span>{collector.stats.value} collection value</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or artist..."
              className="pl-10 pr-4 py-2 w-full md:w-64 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === category ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Collection Grid */}
      {filteredNFTs.length > 0 ? (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="border rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-square">
                <img 
                  src={nft.image} 
                  alt={nft.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg">{nft.title}</h3>
                
                {/* Artist info */}
                <div className="flex items-center mt-2">
                  <img 
                    src={nft.artistAvatar} 
                    alt={nft.artist} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-blue-500">@{nft.artist}</span>
                </div>
                
                {/* Purchase info */}
                <div className="flex justify-between mt-3">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>Acquired: {nft.purchaseDate}</span>
                  </div>
                  <div className="font-medium text-green-700">{nft.price}</div>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between mt-4">
                  <button className="text-gray-500 flex items-center text-sm">
                    <Share2 size={14} className="mr-1" />
                    Share
                  </button>
                  <button className="text-blue-500 flex items-center text-sm">
                    <User size={14} className="mr-1" />
                    View Artist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Camera size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800">No NFTs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default NFTCollectorDashboard;