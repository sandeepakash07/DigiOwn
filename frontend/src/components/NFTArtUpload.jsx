import React, { useState } from 'react';
import { Upload, CreditCard, Tag, FileText, Share2, CheckCircle, XCircle } from 'lucide-react';

const NFTArtUpload = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    artStyles: "",
    price: "",
    royaltyPercentage: "10",
    unlockableContent: "",
    artFile: null,
  });

  const validateStep = (step, data) => {
    const errors = {};
    
    switch(step) {
      case 1:
        if (!data.artFile) errors.artFile = "Please upload your artwork";
        if (!data.title?.trim()) errors.title = "Title is required";
        if (!data.description?.trim()) errors.description = "Description is required";
        break;
      case 2:
        if (!data.category) errors.category = "Please select a category";
        if (!data.artStyles?.trim()) errors.artStyles = "Please add at least one art style";
        break;
      case 3:
        if (!data.price?.trim()) errors.price = "Price is required";
        else if (isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
          errors.price = "Please enter a valid price";
        }
        if (isNaN(parseFloat(data.royaltyPercentage)) || 
            parseFloat(data.royaltyPercentage) < 0 || 
            parseFloat(data.royaltyPercentage) > 50) {
          errors.royaltyPercentage = "Royalty must be between 0% and 50%";
        }
        break;
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        artFile: file
      }));
      setPreviewUrl(URL.createObjectURL(file));
      if (errors.artFile) {
        setErrors(prev => ({ ...prev, artFile: "" }));
      }
    }
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Simulate API call - This would be replaced with actual blockchain minting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate mock NFT transaction hash
        const txHash = "0x" + Array(64).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)).join('');
        
        setFormData(prev => ({
          ...prev,
          txHash,
          certificateUrl: `https://metastrokes.io/certificate/${txHash}`
        }));
        setUploadComplete(true);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: "Failed to mint NFT. Please try again."
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const generateQRCode = () => {
    // This would be replaced with actual QR code generation
    return "data:image/png;base64,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";
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Artwork Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Upload Artwork</h3>
              <div 
                className={`border-2 ${errors.artFile ? 'border-red-300' : 'border-dashed border-gray-300'} rounded-lg p-6 flex flex-col items-center justify-center`}
              >
                {previewUrl ? (
                  <div className="text-center">
                    <img 
                      src={previewUrl} 
                      alt="Artwork preview" 
                      className="max-h-60 mb-4 mx-auto rounded-md object-contain"
                    />
                    <div className="flex space-x-4 justify-center">
                      <button 
                        onClick={() => {
                          setPreviewUrl(null);
                          setFormData(prev => ({ ...prev, artFile: null }));
                        }}
                        className="text-red-600 text-sm hover:text-red-800 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Remove
                      </button>
                      <label 
                        htmlFor="artwork-upload"
                        className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-1" /> Change
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        PNG, JPG, GIF, WEBP, or MP4. Max 100MB.
                      </p>
                    </div>
                    <div className="mt-4">
                      <label 
                        htmlFor="artwork-upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Select File
                      </label>
                    </div>
                  </div>
                )}
                <input
                  id="artwork-upload"
                  name="artFile"
                  type="file"
                  className="hidden"
                  accept="image/*,video/mp4"
                  onChange={handleFileChange}
                />
              </div>
              {errors.artFile && <p className="text-red-500 text-sm">{errors.artFile}</p>}
            </div>
            
            {/* Title and Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Give your artwork a name"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Tell the story behind your artwork"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Artwork Details</h3>
            
            {/* Category Selection */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select a category</option>
                <option value="digital">Digital Art</option>
                <option value="painting">Painting</option>
                <option value="illustration">Illustration</option>
                <option value="photography">Photography</option>
                <option value="3d">3D Art</option>
                <option value="animation">Animation</option>
                <option value="generative">Generative Art</option>
                <option value="pixel">Pixel Art</option>
                <option value="abstract">Abstract</option>
                <option value="collage">Collage</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            
            {/* Art Styles Tags */}
            <div className="space-y-2">
              <label htmlFor="artStyles" className="block text-sm font-medium text-gray-700">
                Art Styles <span className="text-sm text-gray-500">(comma-separated)</span>
              </label>
              <input
                id="artStyles"
                name="artStyles"
                type="text"
                value={formData.artStyles}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.artStyles ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Abstract, Surrealism, Minimalist..."
              />
              {errors.artStyles && <p className="text-red-500 text-sm">{errors.artStyles}</p>}
            </div>
            
            {/* Unlockable Content */}
            <div className="space-y-2">
              <label htmlFor="unlockableContent" className="block text-sm font-medium text-gray-700">
                Unlockable Content <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <textarea
                id="unlockableContent"
                name="unlockableContent"
                rows="3"
                value={formData.unlockableContent}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add content that will only be visible to the owner after purchase (e.g., high-res file, making-of video)"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Pricing & Royalties</h3>
            
            {/* Price Setting */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (ETH)</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="0.05"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">ETH</span>
                  </div>
                </div>
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>
              
              {/* Current ETH rates */}
              {formData.price && !isNaN(parseFloat(formData.price)) && (
                <p className="text-sm text-gray-500">
                  ≈ ${(parseFloat(formData.price) * 3500).toFixed(2)} USD at current rates
                </p>
              )}
            </div>
            
            {/* Royalties Setting */}
            <div className="space-y-2">
              <label htmlFor="royaltyPercentage" className="block text-sm font-medium text-gray-700">
                Royalty Percentage
                <span className="ml-1 text-sm text-gray-500">(you'll receive this % on secondary sales)</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="royaltyPercentage"
                  name="royaltyPercentage"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.royaltyPercentage}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.royaltyPercentage ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors.royaltyPercentage && <p className="text-red-500 text-sm">{errors.royaltyPercentage}</p>}
            </div>
            
            {/* Platform Fee Info */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Fee Structure</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>2.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>Gas Fee (estimated)</span>
                  <span>Varies (~0.003-0.005 ETH)</span>
                </li>
                <li className="flex justify-between pt-2 border-t border-gray-200 mt-2 font-medium">
                  <span>You'll Receive</span>
                  <span>
                    {formData.price && !isNaN(parseFloat(formData.price)) 
                      ? `${(parseFloat(formData.price) * 0.975).toFixed(4)} ETH`
                      : '0 ETH'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">NFT Created Successfully!</h2>
            <p className="mt-2 text-gray-600">Your artwork has been minted as an NFT on the blockchain.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Artwork Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img 
                  src={previewUrl} 
                  alt={formData.title} 
                  className="rounded-md shadow-sm max-h-40 mx-auto"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium">{formData.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{formData.description}</p>
                <p className="text-sm font-medium">{formData.price} ETH</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Authenticity Certificate</h3>
            <div className="flex items-center">
              <div className="mr-4">
                <img 
                  src={generateQRCode()} 
                  alt="Certificate QR Code"
                  className="w-32 h-32"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  This QR code links to the certificate of authenticity for your artwork.
                </p>
                <p className="text-xs text-gray-500 break-all mb-2">
                  Transaction Hash: {formData.txHash}
                </p>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <FileText className="w-4 h-4 mr-1" /> View Certificate
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Share2 className="w-4 h-4 mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                setStep(1);
                setUploadComplete(false);
                setPreviewUrl(null);
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  artStyles: "",
                  price: "",
                  royaltyPercentage: "10",
                  unlockableContent: "",
                  artFile: null,
                });
              }}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create NFT Artwork</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Mint your artwork as an NFT and start earning royalties
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {stepNumber === 1 ? "Upload" : 
                   stepNumber === 2 ? "Details" : "Pricing"}
                </div>
              </div>
            ))}
          </div>

          {/* Error Alert */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errors.submit}
            </div>
          )}

          {renderStep()}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Back
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto`}
            >
            {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : step === 3 ? (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Mint NFT
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTArtUpload;