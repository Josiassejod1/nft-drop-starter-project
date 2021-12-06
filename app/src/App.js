import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";
import glb from "../src/assets/astro.glb";
import poster from "../src/assets/poster.png";
import book from "../src/assets/book.png";
import { modelviewer } from "@google/model-viewer";


// Constants
const TWITTER_HANDLE = "officialdalvinj";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  /*
    Declare your function
  */

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      style={{ backgroundColor: "lightgreen" }}
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          const publicKey = response.publicKey.toString();
          console.log("Connected with Public Key:", publicKey);

          setWalletAddress(publicKey);
        }
      } else {
        alert("Solana object not  found! Get a Phantom Wallet");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="text-center">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built by @${TWITTER_HANDLE}`}</a>
      </div>
      <div className="container" style={{textAlign: "center"}}>
        <div className="header-container">
          <p className="header">The Astronaut NFT Drop 👨‍🚀</p>
          <p className="sub-text">
            Support Dalvin's Book{" "}
            <a
              href="https://securinginternships.com"
              target="_blank"
              style={{ color: "lightgreen" }}
            >
              {" "}
              The Guidebook To Securing Internships
            </a>
          </p>
          <model-viewer
            style={{ margin: "auto", padding: 0, height: 250,  }}
            alt="Astronaut"
            src={glb}
            ar
            ar-modes="webxr scene-viewer quick-look"
            poster={poster}
            seamless-poster
            shadow-intensity="1"
            camera-controls
          ></model-viewer>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
          { walletAddress  && <CandyMachine walletAddress={window.solana} />} 
        </div>
        <div className="container text-center">
          <p className="sub-text">While Supplies Last 🚀</p>
          <p>Exclusive Coaching on Securing Internships</p>
          <p>Limited Time Resume Editing Services</p>
          <p>Discounts on Future Courses & Material</p>
        </div>
      </div>
    </div>
  );
};

export default App;
