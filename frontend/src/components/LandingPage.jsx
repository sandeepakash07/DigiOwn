import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons
import backgroundVideo from "../assets/background.mp4";
import ArtistSignup from './ArtistSignup';

export default function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div>
        <nav className="fixed top-0 left-0 w-full bg-transparent bg-opacity-90 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DigiOwn
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li><Link to="/artist" className="hover:text-blue-600">Artist</Link></li>
          <li><Link to="/collector" className="hover:text-blue-600">Collector</Link></li>
          <li><Link to="/create-nft" className="hover:text-blue-600">Create NFT</Link></li>
          <li><Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link></li>
          
          {/* Wallet Button or Profile */}
          <li className="relative">
            {walletConnected ? (
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg flex items-center"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                Profile ⌄
              </button>
            ) : (
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg"
                onClick={() => setWalletConnected(true)}
              >
                Connect Wallet
              </button>
            )}

            {/* Profile Dropdown */}
            {walletConnected && profileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg text-sm">
                <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link></li>
                <li><Link to="/transactions" className="block px-4 py-2 hover:bg-gray-700">Transactions</Link></li>
                <li><Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">Settings</Link></li>
                <li><Link to="/report" className="block px-4 py-2 hover:bg-gray-700">Report</Link></li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-900 text-white p-4 space-y-3 mt-2">
          <li><Link to="/artist" className="block hover:text-blue-400">Artist</Link></li>
          <li><Link to="/collector" className="block hover:text-blue-400">Collector</Link></li>
          <li><Link to="/create-nft" className="block hover:text-blue-400">Create NFT</Link></li>
          <li><Link to="/marketplace" className="block hover:text-blue-400">Marketplace</Link></li>
          
          {/* Wallet / Profile in Mobile */}
          <li className="mt-3">
            {walletConnected ? (
              <div>
                <button className="bg-blue-600 px-4 py-2 rounded-lg w-full" onClick={() => setProfileOpen(!profileOpen)}>
                  Profile ⌄
                </button>
                {profileOpen && (
                  <ul className="mt-2 space-y-2">
                    <li><Link to="/dashboard" className="block hover:text-blue-400">Dashboard</Link></li>
                    <li><Link to="/transactions" className="block hover:text-blue-400">Transactions</Link></li>
                    <li><Link to="/settings" className="block hover:text-blue-400">Settings</Link></li>
                    <li><Link to="/report" className="block hover:text-blue-400">Report</Link></li>
                  </ul>
                )}
              </div>
            ) : (
              <button className="bg-blue-600 px-4 py-2 w-full rounded-lg" onClick={() => setWalletConnected(true)}>
                Connect Wallet
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
     {/* Hero Section */}
     <main className="relative w-full h-screen flex items-center justify-center text-center">
     <video autoPlay loop muted className="fixed top-0 left-0 w-full h-full object-cover z-[-1]">
       <source src={backgroundVideo} type="video/mp4" />
     </video>
     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
     <div className="relative z-10">
       <h1 className="text-5xl text-white font-bold mb-4">Where Art Meets Innovation</h1>
       <p className="text-lg text-white mb-6">Join our thriving community of artists and collectors in the next generation of digital art marketplace.</p>
       <div className="flex gap-4 justify-center">
         <Link to="/Artist" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg">Start Creating</Link>
         <Link to="/Collector" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg">Start Collecting</Link>
       </div>
     </div>
   </main>

   {/* Footer */}
   <footer className="bg-gray-900 text-white py-12">
     <div className="container mx-auto px-4">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="text-center">
           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
           <ul className="space-y-2">
             <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
             <li><Link to="/gallery" className="hover:text-gray-400">Gallery</Link></li>
             <li><Link to="/faq" className="hover:text-gray-400">FAQ</Link></li>
           </ul>
         </div>
         <div className="text-center">
           <h3 className="text-lg font-semibold mb-4">Support</h3>
           <ul className="space-y-2">
             <li><Link to="/help" className="hover:text-gray-400">Help Center</Link></li>
             <li><Link to="/terms" className="hover:text-gray-400">Terms of Service</Link></li>
             <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
           </ul>
         </div>
         <div className="text-center">
           <h3 className="text-lg font-semibold mb-4">Connect</h3>
           <ul className="space-y-2">
             <li><a href="https://www.instagram.com" className="hover:text-gray-400">Twitter</a></li>
             <li><a href="https://www.instagram.com" className="hover:text-gray-400">Discord</a></li>
             <li><a href="https://www.instagram.com" className="hover:text-gray-400">Instagram</a></li>
           </ul>
         </div>
       </div>
       <div className="border-t border-gray-800 mt-8 pt-8 text-center">
         <p>© 2025 DigiOwn. All rights reserved.</p>
       </div>
     </div>
   </footer>
    </div>
    
  );
}
