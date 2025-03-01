const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    royalty: Number,  // Percentage
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    minted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('NFT', NFTSchema);
