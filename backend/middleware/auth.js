// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// utils/ipfs.js
const { create } = require('ipfs-http-client');
const { Buffer } = require('buffer');

// Connect to an IPFS gateway (in production, you would use your own IPFS node or a service like Pinata/Infura)
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

// Upload file to IPFS
const uploadToIPFS = async (fileBuffer) => {
  try {
    const result = await ipfs.add(Buffer.from(fileBuffer));
    return `ipfs://${result.path}`;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error('Failed to upload to IPFS');
  }
};

module.exports = {
  uploadToIPFS
};