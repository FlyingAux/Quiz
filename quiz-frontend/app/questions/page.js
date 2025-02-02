"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NContext } from "../utils/Context";

const QuizPage = () => {
  const router = useRouter();
  const { questions } = useContext(NContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [hint, setHint] = useState("");
  const [superCoins, setSuperCoins] = useState(5);
  const [isClient, setIsClient] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedSuperCoins = localStorage.getItem("superCoins");
    if (storedSuperCoins) {
      setSuperCoins(parseInt(storedSuperCoins));
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      setScore((prevScore) => prevScore - 1);
      setIsTimedOut(true);
      setShowNext(true);

      setSelectedOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[currentIndex] = questions.data[currentIndex].options.find(opt => opt.is_correct);
        return updatedOptions;
      });

      setTimeout(() => {
        if (currentIndex < questions.data.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          resetState();
        }
      }, 2000);
    }
  }, [timer]);

  const resetState = () => {
    setHint("");
    setTimer(15);
    setIsTimedOut(false);
    setShowNext(false);
  };

  const handleOptionSelect = (option) => {
    if (selectedOptions[currentIndex] || isTimedOut) return;

    const updatedOptions = [...selectedOptions];
    updatedOptions[currentIndex] = option;
    setSelectedOptions(updatedOptions);
    setShowNext(true);

    if (option.is_correct) {
      setScore((prevScore) => prevScore + 4);
    } else {
      setScore((prevScore) => prevScore - 1);
      setIsTimedOut(true);

      setSelectedOptions((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[currentIndex] = option;
        return updatedOptions;
      });
    }
  };

  const handleHint = () => {
    if (superCoins > 0) {
      setSuperCoins(superCoins - 1);
      localStorage.setItem("superCoins", superCoins - 1);
      const currentQuestion = questions.data[currentIndex];
      setHint(`Hint: ${currentQuestion.description.substring(0, 30)}...`);
    } else {
      alert("Not enough super coins!");
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      resetState();
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
    localStorage.setItem("quizScore", score);

    // Save the selected options and correctness for summary
    const quizState = {
      selectedOptions: selectedOptions.map((option, index) => ({
        question: questions.data[index],
        selectedAnswer: option,
        isCorrect: option.is_correct,
      })),
    };

    localStorage.setItem("quizState", JSON.stringify(quizState));
    router.push("/leaderboards");
  };

  const buySuperCoins = () => {
    router.push("/purchaseCoinPackages");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Quiz Questions</h1>
      <p className="text-red-500 font-bold">Time Left: {timer} seconds</p>

      {questions && questions.data ? (
        <div className="relative w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">{questions.data[currentIndex].description}</h2>

          <ul className="space-y-4">
            {questions.data[currentIndex].options.map((option) => {
              const isSelected = selectedOptions[currentIndex]?.id === option.id;
              const isCorrect = option.is_correct;
              const isHighlighted = isTimedOut && isCorrect;

              return (
                <li
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`cursor-pointer px-4 py-2 rounded-md ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : isHighlighted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } ${selectedOptions[currentIndex] || isTimedOut ? "cursor-not-allowed" : ""}`}
                >
                  {option.description}
                </li>
              );
            })}
          </ul>

          <div className="mt-4">
            <p className="font-bold">Total Score: {score}</p>
            <p className="font-bold">Super Coins: {superCoins}</p>
          </div>

          <div className="mt-4 flex items-center w-full justify-between">
            <button
              onClick={handleHint}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md"
            >
              Get Hint
            </button>
            <button
              onClick={buySuperCoins}
              className="bg-purple-500 text-white px-6 py-2 rounded-md ml-4"
            >
              Buy Super Coins
            </button>
          </div>

          {hint && <p className="mt-2 text-sm italic">{hint}</p>}

          <div className="flex items-center justify-center w-full mt-4">
            {showNext && currentIndex < questions.data.length - 1 && (
              <button
                onClick={goToNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            )}
            {currentIndex === questions.data.length - 1 && !quizSubmitted && showNext && (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-2 rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default QuizPage;
