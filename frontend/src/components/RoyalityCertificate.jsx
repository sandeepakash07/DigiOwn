import React, { useState, useEffect } from 'react';
import { Clock, Shield, FileCheck, UserCheck, Eye, QrCode, ArrowRight, Clipboard, CheckCircle } from 'lucide-react';

const RoyaltyCertificate = () => {
  const [nftData, setNftData] = useState({
    id: "RAYTRANS-9284",
    title: "Quantum Horizon #42",
    artist: "Alex Morgan",
    creationDate: "2024-11-15T14:32:21Z",
    tokenId: "0x723fA0b23FE8D22c2781b8f8b0e10Dba2d5fE6F7",
    contractAddress: "0x3a762DC01e5F36e7c76F8ba289C4f8281914783D",
    royaltyPercentage: 10,
    ownerAddress: "0x91f8ba39Fd4C61297582Ea13BdEcf97E3768fb32",
    lastTransactionDate: "2025-02-12T09:18:43Z",
    verificationStatus: "Verified",
    blockchain: "Ethereum",
    ipfsHash: "QmT7PnKBs4R3nilJizHgHfcH8fnrVrCCSKHFD5bHJRNTTi",
    certificateId: "CERT-ETH-78241539"
  });
  
  const [isVerified, setIsVerified] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  // Simulate verification check
  useEffect(() => {
    const verifyTimer = setTimeout(() => {
      setIsVerified(true);
    }, 1500);
    
    return () => clearTimeout(verifyTimer);
  }, []);
  
  // Reset copied state
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
    });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format an address to show first and last few characters
  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-6 relative">
          <div className="absolute top-0 right-0 m-4 flex items-center">
            {isVerified ? (
              <div className="flex items-center text-green-400 bg-black bg-opacity-30 px-3 py-1 rounded-full">
                <Shield size={16} className="mr-1" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-400 bg-black bg-opacity-30 px-3 py-1 rounded-full">
                <Clock size={16} className="mr-1 animate-pulse" />
                <span className="text-sm font-medium">Verifying...</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Royalty Certificate</h1>
          <p className="text-purple-200 opacity-90">Rayality Transformation Series</p>
          
          <div className="flex flex-wrap items-center mt-4 text-sm text-purple-200">
            <div className="flex items-center mr-4 mb-2">
              <FileCheck size={16} className="mr-1" />
              <span>Certificate ID: {nftData.certificateId}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock size={16} className="mr-1" />
              <span>Issued: {formatDate(nftData.creationDate)}</span>
            </div>
          </div>
        </div>
        
        {/* Certificate Body */}
        <div className="p-6">
          {/* NFT Preview */}
          <div className="mb-8 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-blue-700 flex items-center justify-center overflow-hidden relative">
                <span className="text-xl font-bold text-white">NFT Preview</span>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
                  <Eye size={12} className="inline mr-1" />
                  View Original
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{nftData.title}</h2>
              <div className="flex items-center mb-4">
                <UserCheck size={16} className="mr-2 text-purple-400" />
                <span className="text-lg">by {nftData.artist}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">NFT ID</p>
                  <p className="font-medium">{nftData.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Creation Date</p>
                  <p className="font-medium">{formatDate(nftData.creationDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Blockchain</p>
                  <p className="font-medium">{nftData.blockchain}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Royalty Percentage</p>
                  <p className="font-medium text-green-400">{nftData.royaltyPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-700 mb-6">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'details' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('ownership')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'ownership' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
              >
                Ownership
              </button>
              <button 
                onClick={() => setActiveTab('verification')}
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'verification' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
              >
                Verification
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Contract Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token ID</span>
                      <div className="flex items-center group">
                        <span className="font-medium">{formatAddress(nftData.tokenId)}</span>
                        <button 
                          onClick={() => copyToClipboard(nftData.tokenId)}
                          className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? <CheckCircle size={16} className="text-green-400" /> : <Clipboard size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contract Address</span>
                      <div className="flex items-center">
                        <span className="font-medium">{formatAddress(nftData.contractAddress)}</span>
                        <button 
                          onClick={() => copyToClipboard(nftData.contractAddress)}
                          className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? <CheckCircle size={16} className="text-green-400" /> : <Clipboard size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">IPFS Hash</span>
                      <div className="flex items-center">
                        <span className="font-medium">{formatAddress(nftData.ipfsHash)}</span>
                        <button 
                          onClick={() => copyToClipboard(nftData.ipfsHash)}
                          className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? <CheckCircle size={16} className="text-green-400" /> : <Clipboard size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Royalty Terms</h3>
                  <p className="text-gray-300 mb-4">
                    This NFT entitles the original creator ({nftData.artist}) to receive {nftData.royaltyPercentage}% of the sale price 
                    for all secondary market transactions in perpetuity.
                  </p>
                  <div className="bg-gray-800 p-3 rounded border border-gray-700 text-sm">
                    <p className="text-gray-300">
                      Royalty payments are automatically enforced through smart contract functionality and comply with 
                      EIP-2981 Royalty Standard.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'ownership' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Current Owner</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Owner Address</span>
                    <div className="flex items-center">
                      <span className="font-medium">{formatAddress(nftData.ownerAddress)}</span>
                      <button 
                        onClick={() => copyToClipboard(nftData.ownerAddress)}
                        className="ml-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {copied ? <CheckCircle size={16} className="text-green-400" /> : <Clipboard size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Transfer</span>
                    <span className="font-medium">{formatDate(nftData.lastTransactionDate)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Ownership History</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                    <div className="space-y-4 relative">
                      <div className="ml-10 relative">
                        <div className="absolute -left-10 mt-1.5 rounded-full w-4 h-4 bg-purple-500"></div>
                        <div className="bg-gray-800 p-3 rounded border border-gray-700">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Transfer to {formatAddress(nftData.ownerAddress)}</span>
                            <span className="text-gray-400">{formatDate(nftData.lastTransactionDate)}</span>
                          </div>
                          <p className="text-gray-400 text-xs">Price: 2.75 ETH</p>
                        </div>
                      </div>
                      
                      <div className="ml-10 relative">
                        <div className="absolute -left-10 mt-1.5 rounded-full w-4 h-4 bg-gray-600"></div>
                        <div className="bg-gray-800 p-3 rounded border border-gray-700">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Transfer to 0x45fA2...98a4</span>
                            <span className="text-gray-400">November 28, 2024, 03:42 PM</span>
                          </div>
                          <p className="text-gray-400 text-xs">Price: 1.8 ETH</p>
                        </div>
                      </div>
                      
                      <div className="ml-10 relative">
                        <div className="absolute -left-10 mt-1.5 rounded-full w-4 h-4 bg-gray-600"></div>
                        <div className="bg-gray-800 p-3 rounded border border-gray-700">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Minted by {nftData.artist}</span>
                            <span className="text-gray-400">{formatDate(nftData.creationDate)}</span>
                          </div>
                          <p className="text-gray-400 text-xs">Initial Mint</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'verification' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-900 flex items-center justify-center mr-4">
                      <CheckCircle size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Authenticity Verified</h3>
                      <p className="text-gray-400 text-sm">This certificate has been cryptographically verified</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-3 rounded border border-gray-700">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">Blockchain Verification</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400">Confirmed</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded border border-gray-700">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">Smart Contract Audit</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400">Passed</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded border border-gray-700">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">IPFS Content</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400">Verified</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded border border-gray-700">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">Royalty Mechanism</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg">
                      <QrCode size={100} className="text-black" />
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-gray-400">
                    Scan to verify authenticity or visit
                    <a href="#" className="text-purple-400 ml-1 hover:underline">verify.rayality.art/c/{nftData.certificateId}</a>
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-3">Security Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">Cryptographic signature by artist {nftData.artist}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">Immutable blockchain record of ownership and transactions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">EIP-2981 compliant royalty implementation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">Decentralized storage via IPFS ensures content persistence</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Certificate Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
              View on Blockchain
              <ArrowRight size={16} className="ml-2" />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
              Download Certificate
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        {/* Certificate Footer */}
        <div className="border-t border-gray-700 p-4 text-center text-xs text-gray-400">
          <p>This digital certificate is secured by blockchain technology. Verify authenticity at verify.rayality.art</p>
          <p className="mt-1">© 2025 Rayality Art Gallery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RoyaltyCertificate;