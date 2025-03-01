import React, { useState } from 'react';
import { Heart, Users, Clock, Play } from 'lucide-react';

// Sample artist data
const artist = {
  avatar: "/api/placeholder/100/100",
  coverImage: "/api/placeholder/1200/400",
  displayName: "NFT Artist",
  username: "@nftartist",
  bio: "A passionate NFT artist creating unique digital art pieces.",
  stats: {
    posts: 12,
    followers: 150,
    following: 75,
  },
};

// Sample artwork data
const artworks = [
  { id: 1, title: "Artwork 1", image: "/api/placeholder/300/300", status: "available" },
  { id: 2, title: "Artwork 2", image: "/api/placeholder/300/300", status: "sold" },
  { id: 3, title: "Artwork 3", image: "/api/placeholder/300/300", status: "available" },
  { id: 4, title: "Artwork 4", image: "/api/placeholder/300/300", status: "available" },
  { id: 5, title: "Artwork 5", image: "/api/placeholder/300/300", status: "sold" },
];

const NFTArtistDashboard = () => {
  const [followed, setFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredArtworks = artworks.filter((artwork) => {
    if (activeTab === "all") return true;
    return artwork.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-40">
        <img src={artist.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 p-4">
          <div className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
            <img src={artist.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{artist.displayName}</h1>
            <p className="text-gray-500">{artist.username}</p>
          </div>
          <button 
            className={`px-4 py-2 rounded-md ${followed ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`} 
            onClick={() => setFollowed(!followed)}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
        <p className="mt-2 text-gray-700">{artist.bio}</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{artist.stats.followers} followers</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{artist.stats.following} following</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{artist.stats.posts} posts</span>
          </div>
        </div>
      </div>

      {/* Artwork Gallery */}
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === "all" ? 'bg-gray-200' : 'border border-gray-300'}`} 
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === "available" ? 'bg-gray-200' : 'border border-gray-300'}`} 
            onClick={() => setActiveTab("available")}
          >
            Available
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === "sold" ? 'bg-gray-200' : 'border border-gray-300'}`} 
            onClick={() => setActiveTab("sold")}
          >
            Sold
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="border rounded-lg shadow-sm relative">
              <div className="p-4">
                <h3 className="text-lg font-medium">{artwork.title}</h3>
              </div>
              <div className="px-4 pb-4">
                <img src={artwork.image} alt={artwork.title} className="w-full h-40 object-cover rounded" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 flex justify-between items-center">
                <div className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  <span>View</span>
                </div>
                <div className="text-sm text-gray-500">
                  {artwork.status === "available" ? "Available" : "Sold"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTArtistDashboard;