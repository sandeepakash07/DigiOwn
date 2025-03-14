import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ArtistSignup from "./components/ArtistSignup";
import ArtistDashboard from "./components/ArtistDashboard";
import CollectorSignup from "./components/CollectorSignup";
import CollectorDashboard from "./components/CollectorDashboard";
import NFTArtUpload from "./components/NFTArtUpload";
import RoyalityCertificate from "./components/RoyalityCertificate";
import NFTMarketplace from "./components/NFTMartketplace";
import Reports from "./components/Reports";
import Transaction from "./components/Transaction";
import Settings from "./components/Settings";
import NotFound from "./components/NFT404Page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/artist-signup" element={<ArtistSignup />} />
        <Route path="/artist" element={<ArtistDashboard />} />
        <Route path="/collector-signup" element={<CollectorSignup />} />
        <Route path="/collector" element={<CollectorDashboard />} />
        <Route path="/create-nft" element={<NFTArtUpload />} />
        <Route path="/royality-certificate" element={<RoyalityCertificate />} />
        <Route path="/marketplace" element={<NFTMarketplace />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
