"use client";

import React, { useState, useEffect } from "react";

const PurchaseCoinsPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(0);


  useEffect(() => {
    const storedCoins = localStorage.getItem("superCoins");
    if (storedCoins) {
      setCurrentCoins(parseInt(storedCoins));
    }
  }, []);

  const handlePurchase = (coins) => {
    const newCoinBalance = currentCoins + coins;

    localStorage.setItem("superCoins", newCoinBalance);
    setCurrentCoins(newCoinBalance);
    setTransactionSuccess(true);

    setTimeout(() => {
      setTransactionSuccess(false);
      window.location.href = "/questions";
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Purchase Super Coins</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-medium mb-4">Choose a Super Coin Package</h2>

        <div className="space-y-4">
          <div
            onClick={() => setSelectedPackage(5)}
            className={`cursor-pointer p-4 border rounded-md ${
              selectedPackage === 5 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <p>5 Super Coins - $1</p>
          </div>

          <div
            onClick={() => setSelectedPackage(10)}
            className={`cursor-pointer p-4 border rounded-md ${
              selectedPackage === 10 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <p>10 Super Coins - $2</p>
          </div>

          <div
            onClick={() => setSelectedPackage(20)}
            className={`cursor-pointer p-4 border rounded-md ${
              selectedPackage === 20 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <p>20 Super Coins - $4</p>
          </div>
        </div>

        {transactionSuccess && (
          <p className="mt-4 text-green-500 font-semibold">Transaction Successful!</p>
        )}

        <div className="mt-6">
          <button
            onClick={() => handlePurchase(selectedPackage)}
            className="bg-green-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
            disabled={!selectedPackage}
          >
            Purchase {selectedPackage ? selectedPackage : "Select"} Coins
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => (window.location.href = "/questions")}
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            Go Back to Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoinsPage;
