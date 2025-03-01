import React, { useState } from 'react';

const ReportResponsePage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [response, setResponse] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [responseType, setResponseType] = useState('');
  
  // Sample report data - replace with your actual data
  const report = {
    id: 'RPT-2025-0142',
    dateSubmitted: '2025-02-20T14:30:00Z',
    status: 'pending_response',
    reportType: 'copyright_infringement',
    artworkId: 'ART-39582',
    artworkTitle: 'Sunset Horizons',
    reportedBy: 'user_45892',
    claimDescription: 'This artwork appears to be a direct copy of my original piece "Evening Sky" created on January 10, 2025. The composition, color palette, and distinctive brush strokes are identical to my original work.',
    evidenceLinks: [
      'https://example.com/evidence/img1.jpg',
      'https://example.com/evidence/comparison.pdf'
    ],
    responseDeadline: '2025-03-05T23:59:59Z'
  };

  // Calculate remaining days for response
  const calculateRemainingDays = () => {
    const deadline = new Date(report.responseDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setEvidenceFiles([...evidenceFiles, ...newFiles]);
    }
  };

  // Remove an uploaded file
  const removeFile = (index) => {
    const updatedFiles = [...evidenceFiles];
    updatedFiles.splice(index, 1);
    setEvidenceFiles(updatedFiles);
  };

  // Submit the response
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      reportId: report.id,
      responseType,
      responseText: response,
      evidenceFiles
    });
    alert('Your response has been submitted successfully!');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-lg font-semibold text-red-800">Copyright Infringement Report</h2>
        </div>
        <p className="mt-2 text-red-600">
          Action Required: You have {calculateRemainingDays()} days to respond to this report
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('details')}
          >
            Report Details
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'respond' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('respond')}
          >
            Respond to Report
          </button>
        </div>

        {/* Report Details Tab */}
        {activeTab === 'details' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Report Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Report ID:</span>
                    <p className="mt-1">{report.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Date Submitted:</span>
                    <p className="mt-1">{formatDate(report.dateSubmitted)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Awaiting Your Response
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Response Deadline:</span>
                    <p className="mt-1">{formatDate(report.responseDeadline)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Report Type:</span>
                    <p className="mt-1">Copyright Infringement</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Reported Artwork</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Artwork ID:</span>
                    <p className="mt-1">{report.artworkId}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <p className="mt-1">{report.artworkTitle}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">Preview:</span>
                    <div className="mt-2 border border-gray-200 rounded-lg p-2 bg-gray-50 h-48 flex items-center justify-center">
                      <span className="text-gray-400">Artwork preview would appear here</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Claim Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{report.claimDescription}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Claimant's Evidence</h3>
              <ul className="space-y-2">
                {report.evidenceLinks.map((link, index) => (
                  <li key={index} className="flex items-center text-blue-600 hover:underline">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a.5.5 0 01-1 0V7a4 4 0 00-8 0v4a4 4 0 008 0V7a1 1 0 012 0v4a6 6 0 01-12 0V7a7 7 0 0114 0v1.5a2.5 2.5 0 01-5 0V7a1 1 0 012 0v4a.5.5 0 01-1 0V7a3 3 0 00-6 0v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 01-14 0V7a5 5 0 0110 0v1.5a1.5 1.5 0 01-3 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path>
                    </svg>
                    <a href={link} target="_blank" rel="noopener noreferrer">Evidence Document {index + 1}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setActiveTab('respond')}
              >
                Respond to this Report
              </button>
            </div>
          </div>
        )}

        {/* Respond to Report Tab */}
        {activeTab === 'respond' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Response</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your response type:
                </label>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="acknowledge"
                      name="responseType"
                      type="radio"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 mt-1"
                      value="acknowledge"
                      onChange={(e) => setResponseType(e.target.value)}
                      required
                    />
                    <label htmlFor="acknowledge" className="ml-3">
                      <div className="text-sm font-medium text-gray-700">I acknowledge the copyright claim</div>
                      <p className="text-sm text-gray-500">The artwork will be removed from your profile and the platform.</p>
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      id="dispute"
                      name="responseType"
                      type="radio"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 mt-1"
                      value="dispute"
                      onChange={(e) => setResponseType(e.target.value)}
                    />
                    <label htmlFor="dispute" className="ml-3">
                      <div className="text-sm font-medium text-gray-700">I dispute this claim</div>
                      <p className="text-sm text-gray-500">Provide evidence that this artwork is your original creation or that you have rights to use it.</p>
                    </label>
                  </div>
                </div>
              </div>

              {responseType === 'dispute' && (
                <>
                  <div className="mb-6">
                    <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                      Explain why you believe this claim is incorrect:
                    </label>
                    <textarea
                      id="response"
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Provide details about your original creation process, inspiration, or rights to use this artwork..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      required={responseType === 'dispute'}
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload evidence to support your claim:
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>

                  {evidenceFiles.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                        {evidenceFiles.map((file, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v1.5a.5.5 0 01-1 0V7a4 4 0 00-8 0v4a4 4 0 008 0V7a1 1 0 012 0v4a6 6 0 01-12 0V7a7 7 0 0114 0v1.5a2.5 2.5 0 01-5 0V7a1 1 0 012 0v4a.5.5 0 01-1 0V7a3 3 0 00-6 0v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 01-14 0V7a5 5 0 0110 0v1.5a1.5 1.5 0 01-3 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                                onClick={() => removeFile(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important Information</h4>
                    <div className="mt-1 text-sm text-yellow-700">
                      <p>Deliberately submitting false information may result in penalties including account suspension. Our team will review all evidence before making a determination.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setActiveTab('details')}
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Response
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportResponsePage;