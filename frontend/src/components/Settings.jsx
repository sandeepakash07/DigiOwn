import React, { useState } from 'react';

const UserSettingsPage = () => {
  // Active section state
  const [activeSection, setActiveSection] = useState('profile');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    displayName: 'ArtistX',
    bio: 'Digital artist specializing in abstract crypto art and generative designs.',
    website: 'https://artistx.io',
    twitter: '@artistx',
    instagram: 'artistx_nft'
  });
  
  const [accountForm, setAccountForm] = useState({
    email: 'artist@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [walletForm, setWalletForm] = useState({
    primaryWallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    secondaryWallet: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bidAlerts: true,
    priceAlerts: true,
    newFollowers: true,
    promotions: false
  });
  
  // Profile image state
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('/api/placeholder/150/150');
  
  // Handle profile image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  
  // Handle form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleWalletChange = (e) => {
    const { name, value } = e.target;
    setWalletForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle form submissions
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log('Profile update:', profileForm, profileImage);
    alert('Profile updated successfully!');
  };
  
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    // Validate password match
    if (accountForm.newPassword !== accountForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Here you would typically send the account update to your backend
    console.log('Account update:', accountForm);
    alert('Account details updated successfully!');
  };
  
  const handleWalletSubmit = (e) => {
    e.preventDefault();
    // Here you would validate and update wallet addresses
    console.log('Wallet update:', walletForm);
    alert('Wallet addresses updated successfully!');
  };
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Here you would update notification preferences
    console.log('Notification settings:', notificationSettings);
    alert('Notification preferences updated!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
          <nav className="space-y-1">
            <button 
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'profile' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveSection('profile')}
            >
              Profile
            </button>
            <button 
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'account' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveSection('account')}
            >
              Account Security
            </button>
            <button 
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'wallets' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveSection('wallets')}
            >
              Wallet Addresses
            </button>
            <button 
              className={`w-full text-left px-4 py-2 rounded-md ${activeSection === 'notifications' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveSection('notifications')}
            >
              Notifications
            </button>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <form onSubmit={handleProfileSubmit}>
                {/* Profile Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img 
                        src={previewImage} 
                        alt="Profile preview" 
                        className="h-24 w-24 object-cover rounded-full"
                      />
                    </div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">JPG, PNG, or GIF. 2MB max.</p>
                </div>
                
                {/* Display Name */}
                <div className="mb-4">
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profileForm.displayName}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Bio */}
                <div className="mb-4">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                {/* Website */}
                <div className="mb-4">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={profileForm.website}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Social Media */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={profileForm.twitter.replace('@', '')}
                        onChange={handleProfileChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={profileForm.instagram}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Account Security Settings */}
          {activeSection === 'account' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Security</h2>
              <form onSubmit={handleAccountSubmit}>
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={accountForm.email}
                    onChange={handleAccountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Change Password</h3>
                
                {/* Current Password */}
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={accountForm.currentPassword}
                    onChange={handleAccountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* New Password */}
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={accountForm.newPassword}
                    onChange={handleAccountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Must be at least 8 characters with a number and special character.
                  </p>
                </div>
                
                {/* Confirm Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={accountForm.confirmPassword}
                    onChange={handleAccountChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mt-6 flex items-center space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Account
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Wallet Settings */}
          {activeSection === 'wallets' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Wallet Addresses</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-yellow-700">
                    Make sure to double-check your wallet addresses. Incorrect addresses can result in permanent loss of NFTs or payments.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleWalletSubmit}>
                {/* Primary Wallet */}
                <div className="mb-4">
                  <label htmlFor="primaryWallet" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Wallet Address
                  </label>
                  <input
                    type="text"
                    id="primaryWallet"
                    name="primaryWallet"
                    value={walletForm.primaryWallet}
                    onChange={handleWalletChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0x..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This is your main wallet for receiving payments and minting NFTs.
                  </p>
                </div>
                
                {/* Secondary Wallet */}
                <div className="mb-6">
                  <label htmlFor="secondaryWallet" className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Wallet Address (Optional)
                  </label>
                  <input
                    type="text"
                    id="secondaryWallet"
                    name="secondaryWallet"
                    value={walletForm.secondaryWallet}
                    onChange={handleWalletChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0x..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    You can add a backup wallet for additional security or specific collections.
                  </p>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Wallet Settings
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-4">
                  {/* Email Notifications Master Toggle */}
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          name="emailNotifications" 
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                          className="sr-only" 
                        />
                        <div className={`block w-14 h-8 rounded-full ${notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${notificationSettings.emailNotifications ? 'transform translate-x-6' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  
                  {/* Individual Notification Types */}
                  <div className="ml-2 mt-4 space-y-3">
                    {/* Bid Notifications */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="bidAlerts"
                          name="bidAlerts"
                          type="checkbox"
                          checked={notificationSettings.bidAlerts}
                          onChange={handleNotificationChange}
                          disabled={!notificationSettings.emailNotifications}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="bidAlerts" className={`font-medium ${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                          Bid Alerts
                        </label>
                        <p className={`${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get notified when someone bids on your NFTs
                        </p>
                      </div>
                    </div>
                    
                    {/* Price Alerts */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="priceAlerts"
                          name="priceAlerts"
                          type="checkbox"
                          checked={notificationSettings.priceAlerts}
                          onChange={handleNotificationChange}
                          disabled={!notificationSettings.emailNotifications}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="priceAlerts" className={`font-medium ${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                          Price Alerts
                        </label>
                        <p className={`${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get notified about price changes on your watchlist
                        </p>
                      </div>
                    </div>
                    
                    {/* New Followers */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newFollowers"
                          name="newFollowers"
                          type="checkbox"
                          checked={notificationSettings.newFollowers}
                          onChange={handleNotificationChange}
                          disabled={!notificationSettings.emailNotifications}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newFollowers" className={`font-medium ${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                          New Followers
                        </label>
                        <p className={`${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get notified when someone follows your profile
                        </p>
                      </div>
                    </div>
                    
                    {/* Promotions */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="promotions"
                          name="promotions"
                          type="checkbox"
                          checked={notificationSettings.promotions}
                          onChange={handleNotificationChange}
                          disabled={!notificationSettings.emailNotifications}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="promotions" className={`font-medium ${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-700'}`}>
                          Promotions
                        </label>
                        <p className={`${!notificationSettings.emailNotifications ? 'text-gray-400' : 'text-gray-500'}`}>
                          Receive updates about marketplace events and promotions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;